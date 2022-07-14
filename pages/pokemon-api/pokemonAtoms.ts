import { atom } from 'recoil';

export const PokemonAtom = atom({
  key: 'pokemonList',
  default: [],
});
