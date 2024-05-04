import { Flex, Spinner, Text, Button, Icon, Grid } from '@chakra-ui/react';
import { useShop } from '../../hooks/commerceHooks';
import { useOutletContext } from 'react-router-dom';
import { FaRegAddressCard, FaPenToSquare } from 'react-icons/fa6'; // FaMoneyCheckDollar,FaPenToSquare
import { useNavigate } from 'react-router-dom';

export const ShopProfile = () => {
  const [setName] = useOutletContext();
  const navigate = useNavigate();
  const shopId = sessionStorage.getItem('shopId');
  const { isPending, isError, data, error, isSuccess } = useShop(shopId);

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
      <Flex direction={'column'} my={4} ms={8} w={450}>
        <Flex direction={'row'} justifyContent={'space-between'}>
          <Button onClick={() => handleNewShop()}>
            <Icon as={FaRegAddressCard} boxSize={4} color={'blue.600'} />
            <Text fontSize={'xs'} ml={4}>
              Crear Nuevo Negocio
            </Text>
          </Button>
          <Button
            onClick={() => {
              // sessionStorage.setItem('shopName', shop?.name);
              // sessionStorage.setItem('shopId', shop?.id);
              // setName(shop?.name);
              navigate('/pag1');
            }}
          >
            <Icon as={FaPenToSquare} boxSize={4} color={'blue.600'} />
            <Text fontSize={'xs'} ml={4}>
              Actualizar Datos
            </Text>
          </Button>
        </Flex>

        <Grid
          templateColumns='repeat(2, 1fr)'
          columnGap={2}
          templateRows={'repeat(5, 1fr)'}
          rowGap={4}
          w={450}
          mt={4}
        >
          <Text>Nombre del Negocio: </Text>
          <Text>{shop?.name}</Text>
          <Text>Tipo Negocio: </Text>
          <Text>{shop?.tipo}</Text>
          <Text>Persona Contacto: </Text>
          <Text>{shop?.contact}</Text>
          <Text>Teléfono: </Text>
          <Text>{shop?.phone}</Text>
          <Text>E-mail: </Text>
          <Text>{shop?.email}</Text>
        </Grid>
      </Flex>
    );
  }
};
