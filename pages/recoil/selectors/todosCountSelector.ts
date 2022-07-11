import { selector } from 'recoil';
import todosAtom from '../atoms/todosAtom';
import TodoType from '../../types/TodoType';
import TodoCountType from '../../types/TodoCountType';

const getCount = (todos: TodoType[]): any => {
  const newCount: TodoCountType = todos.reduce(
    (acc: TodoCountType, todo: TodoType) => {
      if (todo.complete) {
        acc.complete++;
      } else {
        acc.incomplete++;
      }
      return acc;
    },
    { incomplete: 0, complete: 0 }
  );

  return newCount;
};

const todoCountSelector = selector({
  key: 'todoCount',
  get: ({ get }) => {
    let todos = get(todosAtom);
    return getCount(todos);
  },
});

export default todoCountSelector;
