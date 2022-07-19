import { shoppingListAPI } from './fakeAPI';
import { atom, atomFamily, DefaultValue } from 'recoil';

type ItemType = {
  label: string;
  checked: boolean;
};

// ALT VERSION USING A CLASS
class CachedAPI {
  cachedItems: Record<string, ItemType> | undefined;

  private async getItems() {
    if (this.cachedItems) return this.cachedItems;

    this.cachedItems = await shoppingListAPI.getItems();
    return this.cachedItems;
  }

  async getIds() {
    const items = await this.getItems();
    return Object.keys(items).map((id) => parseInt(id));
  }

  async getItem(id: number) {
    const items = await this.getItems();
    return items[id];
  }
}

/* WHAT THIS IS DOING : caching data and returning it
  1. on line 48 we call cachedAPI.getIds() from line 13 (the first time the app runs)
  2. if there are no cached items, it will go and get them from the api and cache them
    2a. if there are already cached items, it will just return the ones that are there
  3. then when the atom family sets its initial values, it will call getItem() from line 58
    3a. getItem() calls getItems() and uses the id from the atomFamily to grab that specific item from the cache'
    NOTE : this will trigger step 1 again. so it will call again or just use whats in cache
*/

// CachedAPI instance
const cachedAPI = new CachedAPI();

export const idsState = atom<number[]>({
  key: 'ids',
  default: [],
  effects_UNSTABLE: [
    ({ setSelf }) => {
      setSelf(cachedAPI.getIds());
    },
  ],
});

export const itemState = atomFamily<ItemType, number>({
  key: 'item',
  default: { label: '', checked: false },
  effects_UNSTABLE: (id) => [
    ({ onSet, setSelf }) => {
      setSelf(cachedAPI.getItem(id));

      onSet((item) => {
        if (item instanceof DefaultValue) {
          shoppingListAPI.deleteItem(id);
        } else {
          shoppingListAPI.createOrUpdateItem(id, item);
        }
      });
    },
  ],
});
