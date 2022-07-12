import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import todoAtomFamily from '../recoil/atoms/todoAtomFamily';
import todosAtom from '../recoil/atoms/todosAtom';
import TodoType from '../types/TodoType';
import {
  Box,
  Button,
  Divider,
  Icon,
  ListItem,
  ListIcon,
  Text,
} from '@chakra-ui/react';
import {
  CheckCircleIcon,
  QuestionOutlineIcon,
  DeleteIcon,
} from '@chakra-ui/icons';

const TodoItem = ({ todo }: { todo: TodoType }) => {
  const [todoAF, setTodoAf] = useRecoilState(todoAtomFamily(todo.id));
  const setTodos = useSetRecoilState(todosAtom);

  React.useEffect(() => {
    setTodoAf({ ...todo });
  }, [todo]);

  const deleteTodo = (id: number): void => {
    setTodos((todos) => {
      const newTodos = todos.filter((todo: TodoType) => todo.id !== id);
      return newTodos;
    });
  };

  const markDone = (todoAF: TodoType): void => {
    setTodoAf({ ...todoAF, complete: !todoAF.complete });
  };

  return (
    <ListItem padding={2}>
      <Box display="flex" alignItems="center">
        {todoAF.complete ? (
          <ListIcon as={CheckCircleIcon} color="green.400" w={5} h={5} />
        ) : (
          <ListIcon as={QuestionOutlineIcon} color="orange.400" w={5} h={5} />
        )}
        <Text w={300}>{todoAF.text}</Text>
        <Button
          m={2}
          colorScheme="blue"
          size="xs"
          onClick={() => markDone(todoAF)}
        >
          {todoAF.complete ? 'Unmark done' : 'Mark done'}
        </Button>
        <Icon as={DeleteIcon} w={4} h={4} onClick={() => deleteTodo(todo.id)} />
      </Box>
      <Divider w={450} />
    </ListItem>
  );
};

export default TodoItem;
