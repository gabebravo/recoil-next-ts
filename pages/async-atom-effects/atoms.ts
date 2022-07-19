import { atom, AtomEffect, atomFamily, DefaultValue } from 'recoil';

type ItemType = {
  label: string;
  checked: boolean;
};

export const idsState = atom<number[]>({
  key: 'ids',
  default: [],
  effects_UNSTABLE: [
    () => {
      // TODO: Fetch a list of item ids from the server
    },
  ],
});

export const itemState = atomFamily<ItemType, number>({
  key: 'item',
  default: { label: '', checked: false },
  effects_UNSTABLE: (id) => [
    () => {
      // TODO:
      // 1. Fetch individual item data from the API and initialise the atoms
      // 2. Update/create individual item data via the API
    },
  ],
});

// WHAT YOU WOULD DO IF YOU WERENT USING NEXT JS
// const localPersist: AtomEffect<any> = ({ onSet, setSelf, node }) => {
//   const storedItems = window.localStorage.getItem(node.key);
//   if (storedItems != null) {
//     setSelf(JSON.parse(storedItems));
//   }

//   onSet((newItems) => {
//     if (newItems instanceof DefaultValue) {
//       localStorage.removeItem(node.key);
//     } else {
//       localStorage.setItem(node.key, JSON.stringify(newItems));
//     }
//   });
// };
