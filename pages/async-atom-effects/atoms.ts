import { shoppingListAPI } from './fakeAPI';
import { atom, atomFamily, DefaultValue } from 'recoil';

type ItemType = {
  label: string;
  checked: boolean;
};

// NOTE : for an async atom effect calling an API, you don't do an async/await.
// instead you pass the promise to the setSelf function (as done on line 19)
// and when the promise resolves it will update the atom state.
export const idsState = atom<number[]>({
  key: 'ids',
  default: [],
  effects_UNSTABLE: [
    ({ setSelf }) => {
      const itemsPromise = shoppingListAPI.getItems().then((items) => {
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
      const itemPromise = shoppingListAPI.getItem(id).then((item) => {
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
