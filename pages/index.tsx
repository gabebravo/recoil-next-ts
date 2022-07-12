import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Link, List, ListItem, Text } from '@chakra-ui/react';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Text fontSize="2em">Recoil Practice</Text>
      <List spacing={3}>
        <ListItem onClick={() => router.push('/basic-todo-atom')}>
          <Link>Basic Todo using an atom</Link>
        </ListItem>
        <ListItem onClick={() => router.push('/atom-family-todo')}>
          <Link>Todo atom family example</Link>
        </ListItem>
      </List>
    </div>
  );
};

export default Home;
