import React from 'react';
import { css } from '@emotion/react';
import { Box, Text } from '@chakra-ui/react';
import HomeLink from '../components/HomeLink';
import TodoForm from '../components/TodoForm';
import Todolist from '../components/Todolist';

// const todoInput = css`
//   color: blue;
// `;

const BasicTodoAtom = () => {
  return (
    <div>
      <Box m="1em">
        <HomeLink />
        <Text fontSize="xl">Basic Todo Atom</Text>
      </Box>
      <Box m="1em">
        <TodoForm />
      </Box>
      <Box>
        <Todolist />
      </Box>
    </div>
  );
};

export default BasicTodoAtom;
