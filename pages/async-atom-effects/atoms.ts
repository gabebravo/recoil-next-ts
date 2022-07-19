import { shoppingListAPI } from './fakeAPI';
import { atom, atomFamily, DefaultValue } from 'recoil';

type ItemType = {
  label: string;
  checked: boolean;
};

/* WHAT THIS IS DOING : caching data and returning it
  1. on line 38 we call getItems() from line 15 (the first time the app runs)
  2. if there are no cached items, it will go and get them from the api and cache them
    2a. if there are already cached items, it will just return the ones that are there
  3. then when the atom family sets its initial values, it will call getItem() from line 28
    3a. getItem() calls getItems() and uses the id from the atomFamily to grab that specific item from the cache'
    NOTE : this will trigger step 1 again. so it will call again or just use whats in cache
*/

let cachedItems: Record<string, ItemType> | undefined;
const getItems = async () => {
  if (!cachedItems) {
    // if there are no cachedItems (first time), assign the api data to the value
    cachedItems = await shoppingListAPI.getItems();
  }
  // if the data values have already been cached from the first time, just return them
  return cachedItems;
};

// this will get the specific item from the cache
const getItem = async (id: number) => {
  const items = await getItems();
  return items[id];
};

// NOTE : for an async atom effect calling an API, you don't do an async/await.
// instead you pass the promise to the setSelf function (as done on line 19)
// and when the promise resolves it will update the atom state.
export const idsState = atom<number[]>({
  key: 'ids',
  default: [],
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const itemsPromise = getItems().then((items) => {
        return Object.keys(items).map((id) => parseInt(id));
      });
      setSelf(itemsPromise);
    },
  ],
});

export const itemState = atomFamily<ItemType, number>({
  key: 'item',
  default: { label: '', checked: false },
  effects_UNSTABLE: (id) => [
    ({ onSet, setSelf }) => {
      // onSet runs once on initialization.
      // gets item from api and sets the atom to that value.
      const itemPromise = getItem(id).then((item) => {
        // getting the item from cache
        if (item === undefined) return new DefaultValue();
        else return item;
      });
      // for an async atom effect you pass the promise to the setSelf function
      setSelf(itemPromise);

      // onSet will get called each time the atomFamily setter is called (create/update)
      onSet((item) => {
        if (item instanceof DefaultValue) {
          // a hack to clear items from localStorage
          shoppingListAPI.deleteItem(id);
        } else {
          // if its a new item
          shoppingListAPI.createOrUpdateItem(id, item);
        }
      });
    },
  ],
});
