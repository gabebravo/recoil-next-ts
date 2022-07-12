// import { css } from '@emotion/react';
import { Box, Text } from '@chakra-ui/react';
import HomeLink from '../components/HomeLink';
import TodoForm from '../components/TodoForm';
import Todolist from './Todolist';
import TodoCount from '../components/TodoCount';
import ResetTodos from '../components/ResetTodos';

// const todoInput = css`
//   color: blue;
// `;

const AtomFamilyTodo = () => {
  return (
    <div>
      <Box m="1em">
        <HomeLink />
        <Text fontSize="xl">Atom Family Todo</Text>
        <ResetTodos />
      </Box>
      {/* <Box m="1em">
        <TodoCount />
      </Box> */}
      <Box m="1em">
        <TodoForm />
      </Box>
      <Box>
        <Todolist />
      </Box>
    </div>
  );
};

export default AtomFamilyTodo;
