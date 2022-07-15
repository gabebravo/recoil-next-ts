import { Box, List, ListItem, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import BackLink from '../components/BackLink';
import { PokemonFavesAtom } from '../pokemon-api/pokemonAtoms';

const PokemonFavesList = () => {
  const pokemonFavorites = useRecoilValue(PokemonFavesAtom);

  return (
    <List>
      {pokemonFavorites.map((pk: any) => (
        <Box key={pk.id}>
          <img src={pk.sprites.front_default} alt={`${name} pokemon image`} />
          <ListItem>{`Experience: ${pk.base_experience}`}</ListItem>
          <ListItem>{`Height: ${pk.height}`}</ListItem>
          <ListItem>{`Weight: ${pk.weight}`}</ListItem>
        </Box>
      ))}
    </List>
  );
};

const PokemonFavorites = () => {
  return (
    <div>
      <BackLink url="/pokemon-api" />
      <Text>Pokemon Favorites</Text>
      <PokemonFavesList />
    </div>
  );
};

export default PokemonFavorites;
