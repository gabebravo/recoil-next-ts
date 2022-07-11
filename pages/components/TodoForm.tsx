import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import todosAtom from '../atoms/todosAtom';
import TodoType from '../types/TodoType';

const TodoForm = () => {
  const todoInputRef = React.useRef<HTMLInputElement>(null);
  const setTodos = useSetRecoilState(todosAtom);

  function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    const todoValue = todoInputRef?.current?.value;

    // @ts-ignore
    setTodos((todos: TodoType[]) => [
      ...todos,
      { id: todos.length + 1, text: todoValue, completed: false },
    ]);
    // @ts-ignore
    todoInputRef.current.value = '';
  }

  return (
    <Flex flexDir="column">
      <Box m={1}>
        <input
          style={{ border: '1px solid #000' }}
          placeholder="Enter Todo"
          type="text"
          required
          id="todo"
          ref={todoInputRef}
        />
      </Box>
      <Box m={1}>
        <Button colorScheme="blue" size="sm" onClick={submitHandler}>
          Add Todo
        </Button>
      </Box>
    </Flex>
  );
};

export default TodoForm;
