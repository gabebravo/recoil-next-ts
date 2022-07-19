import React from 'react';
import { useRecoilCallback, useRecoilState, useResetRecoilState } from 'recoil';
import { idsState, itemState } from './atoms';
import Container from './components/Container';
import Item from './components/Item';
import NewItemInput from './components/NewItem';

const AtomEffects = () => {
  const [ids, setIds] = useRecoilState(idsState);
  const resetList = useResetRecoilState(idsState);
  const nextId = ids.length;

  React.useEffect(() => {
    let storedData = null;
    if (typeof window !== 'undefined') {
      // if the window object already mounted
      storedData = localStorage.getItem('ids');
    }
    if (storedData !== null) {
      // if there is data in local storage, set it
      setIds(JSON.parse(storedData));
    }
  }, []);

  const clearList = () => {
    localStorage.clear();
    resetList();
  };

  const insertItem = useRecoilCallback(({ set }) => (label: string) => {
    set(idsState, [...ids, nextId]);
    set(itemState(nextId), { label, checked: false });
  });

  return (
    <Container onClear={clearList}>
      {ids.map((id) => (
        <Item key={id} id={id} />
      ))}
      <NewItemInput
        onInsert={(label) => {
          insertItem(label);
        }}
      />
    </Container>
  );
};

export default AtomEffects;
