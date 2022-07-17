import { atom, AtomEffect, atomFamily, DefaultValue } from 'recoil';

type ItemType = {
  label: string;
  checked: boolean;
};

const localPersist: AtomEffect<any> = ({ onSet, node }) => {
  onSet((newItems) => {
    if (newItems instanceof DefaultValue) {
      localStorage.removeItem(node.key);
    } else {
      localStorage.setItem(node.key, JSON.stringify(newItems));
    }
  });
};

export const idsState = atom<number[]>({
  key: 'ids',
  default: [],
  effects_UNSTABLE: [localPersist],
});

export const itemState = atomFamily<ItemType, number>({
  key: 'item',
  default: { label: '', checked: false },
  effects_UNSTABLE: [localPersist],
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
