import { atom, atomFamily } from 'recoil';

export const PokemonFavesAtom = atom({
  key: 'favoritePokemon',
  default: [],
});

export const PokemonFavesAtomFam = atomFamily<any, string>({
  key: 'PokemonFavesAtomFam',
  default: null,
});
