import { Button } from '@chakra-ui/react';
import { useResetRecoilState } from 'recoil';
import todosAtom from '../recoil/atoms/todosAtom';

const ResetTodo = () => {
  const resetTodosArray = useResetRecoilState(todosAtom);

  const resetTodos = () => {
    resetTodosArray();
  };

  return (
    <Button colorScheme="blue" size="sm" onClick={resetTodos}>
      Reset Todos
    </Button>
  );
};

export default ResetTodo;
