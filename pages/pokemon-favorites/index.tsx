import { List, ListItem, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import BackLink from '../components/BackLink';
import { PokemonFavesAtom } from '../pokemon-api/pokemonAtoms';
import Pokemon from '../components/Pokemon';

const PokemonFavesList = () => {
  const pokemonFavorites = useRecoilValue(PokemonFavesAtom);

  return pokemonFavorites.length > 0 ? (
    <List>
      {pokemonFavorites.map((pk: string) => (
        <ListItem key={pk}>
          <Pokemon name={pk} />
        </ListItem>
      ))}
    </List>
  ) : (
    <div>You have no Favorite Pokemon yet</div>
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
