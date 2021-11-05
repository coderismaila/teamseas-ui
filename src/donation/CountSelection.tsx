import {
  Button,
  Heading,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Text,
  VStack,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RadioCard } from './RadioCard';

interface Props {
  initialCount: number;
  next: (values: any) => void;
}

const options = [5, 20, 50, 100];

export const CountSelection = ({ initialCount, next }: Props) => {
  const [pounds, setPounds] = useState(initialCount);
  const [customAmount, setCustomAmount] = useState(
    '' + (options.includes(pounds) ? '' : pounds)
  );
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'pounds',
    value: pounds,
    onChange: nextValue => {
      setCustomAmount('');
      setPounds(parseInt(nextValue));
    },
  });

  const group = getRootProps();

  const nextStep = () => {
    next({ count: pounds });
  };
  return (
    <VStack spacing={4} align='stretch' {...group}>
      <Heading as='h3' size='md'>
        JOIN #TEAMSEAS
      </Heading>
      <Text fontSize='md' fontWeight='bold'>
        $1 removes a pound of trash
      </Text>
      <SimpleGrid columns={2} spacing={2}>
        {options.map(value => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              {value} pounds
            </RadioCard>
          );
        })}
      </SimpleGrid>
      <NumberInput
        onChange={value => {
          setPounds(parseInt(value));
          setCustomAmount(value);
        }}
        value={customAmount}
      >
        <NumberInputField
          _active={{ bg: 'blue.900' }}
          _focus={{ bg: 'blue.900', color: 'white' }}
          placeholder='Other amount'
        />
      </NumberInput>

      <hr />

      <Button
        isFullWidth
        colorScheme='orange'
        size='lg'
        borderRadius='full'
        onClick={nextStep}
      >
        Next
      </Button>
    </VStack>
  );
};
