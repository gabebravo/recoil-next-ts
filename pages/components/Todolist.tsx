import { useRecoilValue } from 'recoil';
import TodoType from '../types/TodoType';
import todosAtom from '../atoms/todosAtom';
import TodoItem from './TodoItem';
import { OrderedList } from '@chakra-ui/react';

function Todolist() {
  const todos = useRecoilValue(todosAtom);

  console.log('todos', todos);
  return (
    <OrderedList>
      {todos?.map((todo: TodoType) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </OrderedList>
  );
}

export default Todolist;
