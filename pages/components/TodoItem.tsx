import { useSetRecoilState } from 'recoil';
import todosAtom from '../atoms/todosAtom';
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
  const setTodos = useSetRecoilState(todosAtom);

  const deleteTodo = (id: number): void => {
    setTodos((todos) => {
      const newTodos = todos.filter((todo: TodoType) => todo.id !== id);
      return newTodos;
    });
  };

  const markDone = (id: number): void => {
    setTodos((todos: any) => {
      const newTodos = todos.map((todo: TodoType) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return newTodos;
    });
  };

  return (
    <ListItem padding={2}>
      <Box display="flex" alignItems="center">
        {todo.completed ? (
          <ListIcon as={CheckCircleIcon} color="green.400" w={5} h={5} />
        ) : (
          <ListIcon as={QuestionOutlineIcon} color="orange.400" w={5} h={5} />
        )}
        <Text w={300}>{todo.text}</Text>
        <Button
          m={2}
          colorScheme="blue"
          size="xs"
          onClick={() => markDone(todo.id)}
        >
          {todo.completed ? 'Unmark done' : 'Mark done'}
        </Button>
        <Icon as={DeleteIcon} w={4} h={4} onClick={() => deleteTodo(todo.id)} />
      </Box>
      <Divider w={450} />
    </ListItem>
  );
};

export default TodoItem;
