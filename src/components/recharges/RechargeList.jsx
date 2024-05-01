import {
  Button,
  Flex,
  useDisclosure,
  Text,
  Spinner,
  Grid,
  Spacer,
  Tooltip,
  Icon,
} from '@chakra-ui/react';
//import { useOutletContext } from "react-router-dom";
import { ModalRecharge } from './ModalRecharge';
import { useChargeList } from '../../hooks/balanceHooks';
import { NumberFormat, unixToString } from '../helpers/NumberFormat';
import { BalanceCalc } from '../helpers/BalanceCalc';
import { FaPenToSquare } from 'react-icons/fa6';
import { useState, useRef } from 'react';

export const RechargeList = () => {
  const charge = useRef({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showStr, setShowStr] = useState('none');

  const shopId = sessionStorage.getItem('shopId');

  const balance = BalanceCalc(shopId);

  const [title, setTitle] = useState('');

  const newRecharge = () => {
    setTitle('Nueva Recarga');
    onOpen();
    setShowStr('none');
  };

  const updateCharge = (id, bank, amount) => {
    setTitle('Actualizar Recarga');
    onOpen();
    setShowStr('block');
    charge.current = { id, bank, amount };
  };

  const { isLoading, isError, data, error, isSuccess } = useChargeList(shopId);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return `el error es: ${error}`;
  }

  if (isSuccess) {
    return (
      <Flex direction={'column'} ml={4} p={2}>
        <Flex justifyContent={'space-between'} w={370} align={'center'}>
          <Button
            justifyContent={'center'}
            size={'sm'}
            colorScheme='blue'
            ml={16}
            onClick={newRecharge}
          >
            Nueva Recarga
          </Button>
          <Spacer />
          <Text fontSize={16} color={'brown'}>
            {isNaN(balance) ? '' : `Saldo: ${NumberFormat(balance)}`}
          </Text>
        </Flex>

        {data?.recharges?.map((charge) => (
          <Grid
            key={charge._id}
            templateColumns='repeat(4, 1fr)'
            gap={2}
            w={'85%'}
            my={2}
            alignContent={'center'}
          >
            <Text>{unixToString(charge?.charged)}</Text>
            <Text>{charge?.bank}</Text>
            <Text>{NumberFormat(charge?.amount)}</Text>
            <Tooltip label='Actualizar Recarga'>
              <Button
                w={8}
                h={8}
                onClick={() =>
                  updateCharge(charge._id, charge.bank, charge.amount)
                }
              >
                <Icon as={FaPenToSquare} boxSize={6} color={'blue.400'} />
              </Button>
            </Tooltip>
          </Grid>
        ))}
        <ModalRecharge
          isOpen={isOpen}
          onClose={onClose}
          title={title}
          showStr={showStr}
          charge={charge.current}
        />
      </Flex>
    );
  }
};
