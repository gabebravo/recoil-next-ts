import { Box, Flex, Text } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import todoCountSelector from '../recoil/selectors/todosCountSelector';
import TodoCountType from '../types/TodoCountType';

const TodoCount = () => {
  const count = useRecoilValue<TodoCountType>(todoCountSelector);
  return (
    <Flex>
      <Box w={200}>
        <Text>Incomplete</Text>
        <Text>{count.incomplete}</Text>
      </Box>
      <Box w={200}>
        <Text>Complete</Text>
        <Text>{count.complete}</Text>
      </Box>
    </Flex>
  );
};

export default TodoCount;
