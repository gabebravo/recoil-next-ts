import Link from 'next/Link';
import { Box, Button, List, ListItem, Text } from '@chakra-ui/react';
import { useRecoilValueLoadable } from 'recoil';
import { PokemonListState } from './pokemonSelectors';
import { PokemonType } from './types';
import { useRouter } from 'next/router'; // custom hook to get route params

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

const FavoritesButton = () => {
  const router = useRouter();
  const navToFaves = () => router.push('/pokemon-favorites');

  return (
    <Button colorScheme="cyan" size="sm" marginTop={2} onClick={navToFaves}>
      See Favorites
    </Button>
  );
};

const PokemonApi = () => {
  return (
    <Box>
      <Text fontSize={24}>Pokemon List</Text>
      <PokemonList />
      <FavoritesButton />
    </Box>
  );
};

export default PokemonApi;
