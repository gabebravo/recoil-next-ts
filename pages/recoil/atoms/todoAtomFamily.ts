import { atomFamily } from 'recoil';
import TodoType from '../../types/TodoType';

const todoAtomFamily = atomFamily<TodoType, number>({
  key: 'row',
  default: {
    id: 0,
    text: '',
    complete: false,
  },
});

export default todoAtomFamily;
