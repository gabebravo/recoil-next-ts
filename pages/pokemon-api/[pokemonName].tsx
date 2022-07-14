import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router'; // custom hook to get route params
import BackLink from '../components/BackLink';

const PokemonPage = () => {
  const router = useRouter(); // route object with all the data
  const pokemonName = router.query.pokemonName;
  console.log('IN HERE', pokemonName);

  return (
    <div>
      <BackLink url="/pokemon-api" />
      <Text fontSize={24}>{pokemonName}</Text>
    </div>
  );
};

export default PokemonPage;
