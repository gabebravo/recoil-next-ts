import produce from 'immer';
import React from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { shoppingListState } from './atoms';
import Container from './components/Container';
import Item from './components/Item';
import NewItemInput from './components/NewItem';

const AtomEffects = () => {
  const [items, setItems] = useRecoilState(shoppingListState);
  const resetList = useResetRecoilState(shoppingListState);

  React.useEffect(() => {
    let storedData = null;
    if (typeof window !== 'undefined') {
      // if the window object already mounted
      storedData = localStorage.getItem('ShoppingList');
    }
    if (storedData !== null) {
      // if there is data in local storage, set it
      setItems(JSON.parse(storedData));
    }
  }, []);

  const toggleItem = (index: number) => {
    setItems(
      produce(items, (draftItems) => {
        draftItems[index].checked = !draftItems[index].checked;
      })
    );
  };

  const insertItem = (label: string) => {
    setItems([...items, { label, checked: false }]);
  };

  return (
    <Container onClear={() => resetList()}>
      {items.length > 0 &&
        items.map((item, index) => (
          <Item
            key={item.label}
            label={item.label}
            checked={item.checked}
            onClick={() => {
              toggleItem(index);
            }}
          />
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
