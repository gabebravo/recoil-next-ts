import { atom } from 'recoil';

export const PokemonFavesAtom = atom<string[]>({
  key: 'favoritePokemon',
  default: [],
});

// export const PokemonFavesAtomFam = atomFamily<any, string>({
//   key: 'PokemonFavesAtomFam',
//   default: null,
// });
