import {
  Flex,
  Spinner,
  Text,
  Grid,
  Button,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { useShopList } from '../../hooks/commerceHooks';
import { useOutletContext } from 'react-router-dom';
import {
  FaRegAddressCard,
  FaSearchengin,
  FaPenToSquare,
} from 'react-icons/fa6'; // FaMoneyCheckDollar,FaPenToSquare
import { useNavigate } from 'react-router-dom';

export const ShopList = () => {
  const [setName] = useOutletContext();
  const navigate = useNavigate();

  const { isLoading, isError, data, error, isSuccess } = useShopList();

  const shops = data?.result;

  const handleNewShop = () => {
    sessionStorage.removeItem('shopId');
    navigate('/pag1');
  };
  if (isLoading) {
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

        {shops?.map((shop, index) => (
          <Grid
            key={index}
            templateColumns='repeat(8, 1fr)'
            gap={2}
            w={900}
            my={2}
            alignContent={'center'}
          >
            <Text>{shop.name}</Text>
            <Text>{shop.tipo}</Text>
            <Text>{shop.contact}</Text>
            <Text>{shop.phone}</Text>
            <Text>{shop.email}</Text>
            <Text display={'none'}>{shop.nit}</Text>

            <Tooltip label='Cambiar Tienda'>
              <Button
                w={8}
                h={8}
                variant={'ghost'}
                colorScheme='gray'
                onClick={() => {
                  sessionStorage.setItem('shopName', shop.name);
                  sessionStorage.setItem('shopId', shop.id);
                  setName(shop.name);
                }}
              >
                <Icon as={FaRegAddressCard} boxSize={6} color={'blue.600'} />
              </Button>
            </Tooltip>

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
            </Tooltip>
          </Grid>
        ))}
      </Flex>
    );
  }
};
