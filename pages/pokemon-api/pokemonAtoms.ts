import { atom } from 'recoil';

export const PokemonFavesAtom = atom({
  key: 'favoritePokemon',
  default: [],
});
