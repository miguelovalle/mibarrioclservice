import {
  Flex,
  Grid,
  Button,
  Spinner,
  Text,
  Tooltip,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { NumberFormat, unixToString } from '../helpers/NumberFormat';
import { useOrderList } from '../../hooks/balanceHooks';
import { FaPenToSquare } from 'react-icons/fa6';
import { BalanceCalc } from '../helpers/BalanceCalc';
import { useRef } from 'react';
import { ModalOrder } from './ModalOrder';

export const OrderList = () => {
  const shopId = sessionStorage.getItem('shopId');

  const { isLoading, isError, data, error, isSuccess } = useOrderList(shopId);

  const orders = data?.ordersById;

  const balance = BalanceCalc(shopId);

  const orderObj = useRef({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateOrder = (id, amount) => {
    onOpen();
    orderObj.current = { id, amount };
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return `el error es: ${error}`;
  }

  if (isSuccess) {
    return (
      <Flex direction={'column'} my={4} ms={6} w={370}>
        <Text fontSize={16} align={'center'} color={'brown'}>
          {isNaN(balance) ? '' : `Saldo: ${NumberFormat(balance)}`}
        </Text>
        {orders?.map((order) => (
          <Grid
            key={order._id}
            templateColumns='repeat(3, 1fr)'
            gap={2}
            w={600}
            my={2}
            alignContent={'center'}
          >
            <Text>{unixToString(order?.dateOrder)}</Text>
            <Text>{NumberFormat(order?.orderValue)}</Text>

            <Tooltip label='Actualizar compra'>
              <Button
                w={8}
                h={8}
                onClick={() => updateOrder(order._id, order.orderValue)}
              >
                <Icon as={FaPenToSquare} boxSize={6} color={'blue.400'} />
              </Button>
            </Tooltip>
          </Grid>
        ))}
        <ModalOrder
          isOpen={isOpen}
          onClose={onClose}
          order={orderObj.current}
        />
      </Flex>
    );
  }
};
