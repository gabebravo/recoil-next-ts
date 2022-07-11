import { atom } from 'recoil';

const todosAtom = atom({
  key: 'todos',
  default: [],
});

export default todosAtom;
