import { Box } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';
import { itemState } from '../atoms';

type ItemProps = {
  id: number;
};

const Item = ({ id }: ItemProps) => {
  const [item, setItem] = useRecoilState(itemState(id));

  React.useEffect(() => {
    let storedData = null;
    if (typeof window !== 'undefined') {
      // if the window object already mounted
      storedData = localStorage.getItem(`item__${id}`);
    }
    if (storedData !== null) {
      // if there is data in local storage, set it
      setItem(JSON.parse(storedData));
    }
  }, []);

  return (
    <Box
      rounded="md"
      textDecoration={item.checked ? 'line-through' : ''}
      opacity={item.checked ? 0.5 : 1}
      _hover={{ textDecoration: 'line-through' }}
      cursor="pointer"
      width="100%"
      onClick={() => setItem({ ...item, checked: !item.checked })}
    >
      {item.label}
    </Box>
  );
};

export default Item;
