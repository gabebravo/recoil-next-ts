import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const BackLink = ({ url }: { url: string }) => {
  const router = useRouter();

  return (
    <Flex onClick={() => router.push(url)}>
      <div>
        <ArrowBackIcon w={8} h={8} color="red.500" />
      </div>
      <div>
        <Text fontSize="xl">Back</Text>
      </div>
    </Flex>
  );
};

export default BackLink;
