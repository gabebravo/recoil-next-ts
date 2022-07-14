import { Box, List, ListItem, Text } from '@chakra-ui/react';
import { useRecoilValueLoadable } from 'recoil';
import { useRouter } from 'next/router'; // custom hook to get route params
import BackLink from '../components/BackLink';
import { PokemonState } from './pokemonSelectors';

const Pokemon = ({ name }: { name: string }) => {
  const pokemonData = useRecoilValueLoadable(PokemonState(name));
  const { base_experience, height, weight, sprites } = pokemonData.contents;

  switch (pokemonData.state) {
    case 'hasValue':
      return (
        <Box>
          <img src={sprites.front_default} alt={`${name} pokemon image`} />
          <List>
            <ListItem>{`Experience: ${base_experience}`}</ListItem>
            <ListItem>{`Height: ${height}`}</ListItem>
            <ListItem>{`Weight: ${weight}`}</ListItem>
          </List>
        </Box>
      );
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw pokemonData.contents;
  }
};

const PokemonPage = () => {
  const router = useRouter(); // route object with all the data
  const pokemonName = router.query.pokemonName;

  return (
    <div>
      <BackLink url="/pokemon-api" />
      <Text fontSize={24}>{pokemonName}</Text>
      <Pokemon name={String(pokemonName)} />
    </div>
  );
};

export default PokemonPage;
