import { Box, Button, Divider, Heading, VStack } from '@chakra-ui/react';

const Container: React.FC<{
  children: React.ReactNode;
  onClear: () => void;
}> = ({ children, onClear }) => {
  return (
    <Box display="flex" flexDir="column" alignItems="center" pt={10}>
      <Box width="400px" backgroundColor="yellow.100" p={5} borderRadius="lg">
        <Heading size="lg" mb={4}>
          Shopping List
        </Heading>
        <VStack
          spacing={3}
          divider={<Divider borderColor="rgba(86, 0, 0, 0.48)" />}
        >
          {children}
        </VStack>
      </Box>
      <Button variant="link" mt={3} onClick={onClear}>
        Clear list
      </Button>
    </Box>
  );
};

export default Container;
