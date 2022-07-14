import { selector, selectorFamily } from 'recoil';
import { PokemonType } from './types';

// export const PokemonListState = selectorFamily({
//   key: 'pokemonState',
//   get: () => async () => {
//     const pokemonList = await fetch(
//       'https://pokeapi.co/api/v2/pokemon?limit=10'
//     ).then((res) => res.json());
//     return pokemonList;
//   },
// });

export const PokemonListState = selector({
  key: 'PokemonListState',
  get: async () => {
    const pokemonList = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=10'
    ).then((res) => res.json());
    return pokemonList;
  },
});
