import {
  Flex,
  Spinner,
  Text,
  Button,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { useShop } from '../../hooks/commerceHooks';
import { useOutletContext } from 'react-router-dom';
import {
  FaRegAddressCard,
  FaSearchengin,
  FaPenToSquare,
} from 'react-icons/fa6'; // FaMoneyCheckDollar,FaPenToSquare
import { useNavigate } from 'react-router-dom';

export const ShopProfile = () => {
  const [setName] = useOutletContext();
  const navigate = useNavigate();

  const { isPending, isError, data, error, isSuccess } = useShop();

  const shop = data?.result;

  const handleNewShop = () => {
    sessionStorage.removeItem('shopId');
    navigate('/pag1');
  };
  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return `el error es: ${error}`;
  }

  if (isSuccess) {
    return (
      <Flex direction={'column'} my={4} ms={6}>
        <Flex justifyContent={'space-between'} w={600}>
          <Button onClick={() => handleNewShop()}>
            <Icon as={FaRegAddressCard} boxSize={6} color={'blue.600'} />
            Nuevo Negocio
          </Button>
          <Button onClick={() => navigate('/searchtext')}>
            <Icon as={FaSearchengin} boxSize={6} color={'blue.600'} /> Busca Por
            Nombre/Nit
          </Button>
        </Flex>

          <Flex
            my={2}
            alignContent={'center'}
          >
            <Text>{shop.name}</Text>
            <Text>{shop.tipo}</Text>
            <Text>{shop.contact}</Text>
            <Text>{shop.phone}</Text>
            <Text>{shop.email}</Text>
            <Text display={'none'}>{shop.nit}</Text>


            <Tooltip label='Actualiza Data Tienda' fontSize='sm'>
              <Button
                colorScheme='gray'
                variant={'ghost'}
                w={8}
                h={8}
                onClick={() => {
                  sessionStorage.setItem('shopName', shop.name);
                  sessionStorage.setItem('shopId', shop.id);
                  setName(shop.name);
                  navigate('/pag1');
                }}
              >
                <Icon as={FaPenToSquare} boxSize={6} color={'blue.600'} />
              </Button>
              <Button
            
              >
                Activar Negocio
              </Button>
            </Tooltip>
          </Flex>
      </Flex>
    );
  }
};
