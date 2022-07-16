import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router'; // custom hook to get route params
import BackLink from '../components/BackLink';
import Pokemon from '../components/Pokemon';

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
