import { atom, DefaultValue } from 'recoil';

type ItemType = {
  label: string;
  checked: boolean;
};

export const shoppingListState = atom<ItemType[]>({
  key: 'shoppingList',
  default: [],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newShoppingList) => {
        localStorage.setItem('ShoppingList', JSON.stringify(newShoppingList));
      });
    },
  ],
});

// WHAT YOU WOULD DO IF YOU WERENT USING NEXT JS
// export const shoppingListState = atom<ItemType[]>({
//   key: 'shoppingList',
//   default: [],
//   effects_UNSTABLE: [
//     ({ onSet, setSelf }) => {
//       const storedData = localStorage.getItem('ShoppingList');
//       if (storedData != null) {
//         setSelf(JSON.parse(storedData));
//       }

//       onSet((newShoppingList) => {
//         if (newShoppingList instanceof DefaultValue) {
//           localStorage.removeItem('ShoppingList');
//         } else {
//           localStorage.setItem('ShoppingList', JSON.stringify(newShoppingList));
//         }
//       });
//     },
//   ],
// });
