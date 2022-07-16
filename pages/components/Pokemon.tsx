import { Box, Button, List, ListItem } from '@chakra-ui/react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { PokemonState } from '../pokemon-api/pokemonSelectors';
import { PokemonFavesAtom } from '../pokemon-api/pokemonAtoms';

const Pokemon = ({ name }: { name: string }) => {
  const [pokemonFave, addPokemonToFaves] = useRecoilState(PokemonFavesAtom);
  const pokemonData = useRecoilValueLoadable(PokemonState(name));
  const { base_experience, height, weight, sprites } = pokemonData.contents;
  const wasAlreadyAdded = pokemonFave.includes(name);

  const handleAdd = (): void => {
    addPokemonToFaves((prevVals: string[]) => [...prevVals, name]);
  };

  const handleDelete = (): void => {
    addPokemonToFaves((prevVals: string[]) =>
      prevVals.filter((pk: string) => pk !== name)
    );
  };

  switch (pokemonData.state) {
    case 'hasValue':
      return (
        <Box>
          <img src={sprites.front_default} alt={`${name} pokemon image`} />
          <List>
            <ListItem>{`Experience: ${base_experience}`}</ListItem>
            <ListItem>{`Height: ${height}`}</ListItem>
            <ListItem>{`Weight: ${weight}`}</ListItem>
            <Button
              colorScheme="cyan"
              size="sm"
              marginTop={2}
              onClick={wasAlreadyAdded ? handleDelete : handleAdd}
            >
              {wasAlreadyAdded ? 'Remove From Favorites' : 'Add To Favorites'}
            </Button>
          </List>
        </Box>
      );
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw pokemonData.contents;
  }
};

export default Pokemon;
