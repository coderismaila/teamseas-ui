import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/300.css';
import * as React from 'react';
import { useQuery, useSubscription } from 'urql';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  Heading,
  extendTheme,
} from '@chakra-ui/react';
import { Logo } from './Logo';
import { Counter } from './donation/Counter';
import Leaderboard from './leaderboard/Leaderboard';

const theme = extendTheme({
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat',
  },
});

const TotalDonationsQuery = `
  query Query {
    totalDonations
  }
`;

const TotalUpdateQuery = `
  subscription Subscription {
    totalUpdated {
      total
    }
  }
`;

const handleSubscription = (previous: any, newTotal: any) => {
  return newTotal?.totalUpdated?.total;
};

export const App = () => {
  const [res] = useSubscription(
    { query: TotalUpdateQuery },
    handleSubscription
  );
  const [{ data, fetching, error }] = useQuery({
    query: TotalDonationsQuery,
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign='center' fontSize='xl'>
        <Grid minH='100vh' p={3}>
          <VStack spacing={8}>
            <Logo h='32' pointerEvents='none' />
            <Heading as='h1' size='xl'>
              JOIN THE MOVEMENT
            </Heading>
            <Text>
              Help us remove 30 million pounds of trash by January 1st, 2022.
            </Text>
            <Heading as='h2' size='4xl'>
              <Counter from={0} to={res.data || data.totalDonations} />
            </Heading>
            <Leaderboard />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
