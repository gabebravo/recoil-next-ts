import { selector, selectorFamily } from 'recoil';
import { PokemonType } from './types';

// SEE THIS LINK ABOUT USING ASYNC SELECTORS WITH NEXT JS : using useRecoilValueLoadable hook
// https://github.com/facebookexperimental/Recoil/issues/722

// simple selector for READ-ONLY async state that has no React prop value dependency to make the api calls
export const PokemonListState = selector<{ results: PokemonType[] }>({
  key: 'PokemonListState',
  get: async () => {
    const pokemonList = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=10'
    ).then((res) => res.json());
    return pokemonList;
  },
});

// selectorFamily for READ-ONLY async state because there is a React prop value dependency to make the api calls
export const PokemonState = selectorFamily<PokemonType, string>({
  key: 'pokemonState',
  get: (pokemonName: string) => async () => {
    const pokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
    ).then((res) => res.json());
    return pokemon;
  },
});
