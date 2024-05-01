import { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Fade,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Logo from './Logo';

export const Header = () => {
  const [showBtn, setShowBtn] = useState('none');
  const [name, setName] = useState('');
  const shopId = sessionStorage.getItem('shopId');
  const activeName = sessionStorage.getItem('shopName');
  const userName = 'A cargo:  ' + sessionStorage.getItem('name');
  //  const attendedShop =    "Negocio Atendido:  " + active

  useEffect(() => {
    if (shopId) {
      setName(activeName);
      setShowBtn('inline');
    } else {
      setShowBtn('none');
    }
  }, [shopId, activeName]);

  return (
    <>
      <Flex
        w={'85%'}
        ml={4}
        wrap='wrap'
        bg='orange.300'
        color={'gray.100'}
        direction={'column'}
      >
        <Flex justifyContent={'space-between'} p={2}>
          <Logo />
          <Flex direction={'column'}>
            <Text fontSize={20} align={'left'} color={'gray.100'}>
              {userName}
            </Text>
            <Fade in={true}>
              <Text fontSize={20} align={'left'} color={'gray.100'}>
                {name}
              </Text>
            </Fade>
          </Flex>
        </Flex>
        <HStack align={'center'} ml={4}>
          <Breadcrumb spacing='8px' color={'blue.600'}>
            <BreadcrumbItem>
              <BreadcrumbLink href='/header/shoplist'>Clientes</BreadcrumbLink>
            </BreadcrumbItem>
            
            <BreadcrumbItem display={showBtn}>
              <BreadcrumbLink href='/header/recharges'>Recargas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem display={showBtn}>
              <BreadcrumbLink href='/header/orderlist'>Consumos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem display={showBtn}>
              <BreadcrumbLink href='#'>PQRs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem display={showBtn}>
              <BreadcrumbLink href='#'>Promociones</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem display={showBtn}>
              <BreadcrumbLink href='#'>Notificaciones</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </HStack>
      </Flex>
      <Outlet context={[setName]} />;
    </>
  );
};
