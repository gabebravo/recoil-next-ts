import React from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { Text, Button, Flex } from '@chakra-ui/react';

const countAtom = atom({
  key: 'count',
  default: 0,
});

const clickCounterAtom = atom({
  key: 'clickCount',
  default: 0,
});

// NOTE : this is just as an example.
// GET = x10 count (derived state) && SET = increment clickCount and update actual count
const countTimesTenSelector = selector<number | string>({
  key: 'countTimesTen',
  get: ({ get }) => get(countAtom) * 10,
  set: ({ set, get }, newValue) => {
    const currentCount = get(countAtom);
    if (newValue === 'inc') {
      set(countAtom, currentCount + 1);
    } else {
      set(countAtom, currentCount - 1);
    }
    const currentClickCount = get(clickCounterAtom);
    set(clickCounterAtom, currentClickCount + 1);
  },
});

const MoreSelectors = () => {
  const count = useRecoilValue(countAtom);
  const clickCount = useRecoilValue(clickCounterAtom);
  const [countTimesTen, updateCount] = useRecoilState(countTimesTenSelector);

  const incrementCount = () => {
    updateCount('inc');
  };

  const decrementCount = () => {
    updateCount('dec');
  };

  return (
    <div>
      <Text fontSize={24}>Recoil Couter</Text>
      <div>
        <span>{`Click Count: ${clickCount}`}</span>
      </div>
      <div>
        <span>{`Count: ${count}`}</span>
      </div>
      <div>
        <span>{`Count x 10: ${countTimesTen}`}</span>
      </div>
      <div>
        <Button
          marginRight={2}
          colorScheme="blue"
          size="xs"
          onClick={incrementCount}
        >
          Inc
        </Button>
        <Button colorScheme="blue" size="xs" onClick={decrementCount}>
          Dec
        </Button>
      </div>
    </div>
  );
};

export default MoreSelectors;
