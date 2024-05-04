import {
  Grid,
  useDisclosure,
  Text,
  Button,
  Tooltip,
  Icon,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { ModalPqr } from './ModalPqr';
import { unixToString } from '../helpers/NumberFormat';
import { usePqrList } from '../../hooks/pqrHooks';
import {
  FaRegAddressCard,
  FaPenToSquare,
  FaArrowDownAZ,
} from 'react-icons/fa6';

export const PqrList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const shopId = sessionStorage.getItem('shopId');

  const result = usePqrList(shopId);

  const pqrs = result?.data?.pqrs;

  return (
    <Flex direction={'column'} ml={4} p={2} w={'86%'} mt={2} mb={2}>
      <Flex justifyContent={'space-between'} w={370} align={'center'}>
        <Button onClick={onOpen} h={8}>
          <Icon as={FaRegAddressCard} boxSize={4} color={'blue.600'} />
          <Text ml={2} fontSize={'xs'}>
            Nueva PQR
          </Text>
        </Button>
        <Spacer />
        <Button h={8}>
          <Icon as={FaArrowDownAZ} boxSize={4} color={'blue.600'} />
          <Text ml={2} fontSize={'xs'}>
            Ordenar por:
          </Text>
        </Button>
      </Flex>
      {pqrs?.map((pqr) => (
        <Grid
          key={pqr._id}
          templateColumns='70px 90px 90px 310px 70px 35px 35px'
          alignItems={'center'}
          bg={'gray.100'}
          mt={1}
        >
          <Text fontSize={'xs'} ml={2}>
            {unixToString(pqr?.created)}
          </Text>
          <Text fontSize={'xs'}>{pqr?.specialist}</Text>
          <Text fontSize={'xs'}>{pqr?.subject}</Text>
          <Text fontSize={'xs'}>{pqr?.pqr}</Text>
          <Text fontSize={'xs'}>{pqr?.state}</Text>
          <Tooltip label='Actualizar PQR'>
            <Button variant={'ghost'} onClick={onOpen}>
              <Icon as={FaPenToSquare} boxSize={4} h={4} color={'blue.400'} />
            </Button>
          </Tooltip>
          <Tooltip label='Ver Actuaciones'>
            <Button variant={'ghost'}>
              <Icon
                as={FaRegAddressCard}
                boxSize={4}
                h={4}
                color={'blue.400'}
              />
            </Button>
          </Tooltip>
        </Grid>
      ))}
      <ModalPqr isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
