import { Avatar, Badge, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Donation } from '../types';
import formatDate from '../utils/formatDate';

interface Props {
  donation: Donation;
}

export default function LeaderboardItem({ donation }: Props) {
  return (
    <Flex boxShadow='md' p={3} bg='white' borderRadius='lg' maxW='xl' w='full'>
      <Avatar size='lg' />

      <Box flex='1' ml={4}>
        <Flex flex='1' justify='space-between'>
          <Flex flexDir='column' textAlign='left'>
            <Text
              fontWeight='bold'
              color='blue.500'
              fontSize='sm'
              textTransform='uppercase'
            >
              {donation.team}
            </Text>
            <Text fontWeight='bold'>{donation.displayName}</Text>
            <Text fontSize='sm'>{donation.message}</Text>
          </Flex>
          <Flex
            flexDir='column'
            justifyContent='space-around'
            textAlign='right'
          >
            <div>
              <Badge
                colorScheme='blue'
                borderRadius='full'
                textTransform='lowercase'
                py={1}
                px={3}
                as='div'
              >
                {donation.count} pounds
              </Badge>
            </div>

            <Text fontSize='xs'>{formatDate(donation.createdAt)}</Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
