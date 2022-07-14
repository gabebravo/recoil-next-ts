import Link from 'next/Link';
import { Box, List, ListItem, Text } from '@chakra-ui/react';
import { useRecoilValueLoadable } from 'recoil';
import { PokemonListState } from './pokemonSelectors';
import { PokemonType } from './types';

const PokemonList = () => {
  const pokemonList = useRecoilValueLoadable(PokemonListState);
  switch (pokemonList.state) {
    case 'hasValue':
      return (
        <Box>
          <List>
            {pokemonList.contents.results.map((pk: PokemonType) => (
              <ListItem key={pk.name}>
                <Link href={`/pokemon-api/${pk.name}`}>{pk.name}</Link>
              </ListItem>
            ))}
          </List>
        </Box>
      );
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw <div>Whoops! Error...</div>;
  }
};

const PokemonApi = () => {
  return (
    <Box>
      <Text fontSize={24}>Pokemon List</Text>
      <PokemonList />
    </Box>
  );
};

export default PokemonApi;
