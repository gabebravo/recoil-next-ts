import { Box } from '@chakra-ui/react';

type ItemProps = {
  label: string;
  checked: boolean;
  onClick: () => void;
};

const Item = ({ label, checked, onClick }: ItemProps) => {
  return (
    <Box
      rounded="md"
      textDecoration={checked ? 'line-through' : ''}
      opacity={checked ? 0.5 : 1}
      _hover={{ textDecoration: 'line-through' }}
      cursor="pointer"
      width="100%"
      onClick={onClick}
    >
      {label}
    </Box>
  );
};

export default Item;
