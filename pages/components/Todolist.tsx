import React from 'react';
import { useRecoilValue } from 'recoil';
import TodoType from '../types/TodoType';
import todosAtom from '../atoms/todosAtom';
import { ListItem, OrderedList } from '@chakra-ui/react';

function Todolist() {
  const todos = useRecoilValue(todosAtom);

  return (
    <OrderedList>
      {todos?.map((todo: TodoType) => (
        <ListItem key={todo.id}>{todo.text}</ListItem>
      ))}
    </OrderedList>
  );
}

export default Todolist;
