// import { css } from '@emotion/react';
import { Box, Text } from '@chakra-ui/react';
import BackLink from '../components/BackLink';
import TodoForm from '../components/TodoForm';
import Todolist from '../components/Todolist';
import TodoCount from '../components/TodoCount';
import ResetTodos from '../components/ResetTodos';

// const todoInput = css`
//   color: blue;
// `;

const BasicTodoAtom = () => {
  return (
    <div>
      <Box m="1em">
        <BackLink url="/" />
        <Text fontSize="xl">Basic Todo Atom</Text>
        <ResetTodos />
      </Box>
      <Box m="1em">
        <TodoCount />
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
