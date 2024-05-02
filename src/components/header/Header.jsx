import { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Fade,
  Flex,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Logo from './Logo';
import { ModalSearch } from './ModalSearch';
import { FaSearchengin } from 'react-icons/fa6';

export const Header = () => {
  const [showBtn, setShowBtn] = useState('none');
  const [name, setName] = useState('');
  const shopId = sessionStorage.getItem('shopId');
  const activeName = sessionStorage.getItem('shopName');
  const userName = 'A cargo:  ' + sessionStorage.getItem('name');
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <Button onClick={() => onOpen()}>
            <Icon as={FaSearchengin} boxSize={6} color={'blue.600'} /> Busca Por
            Nombre/Nit
          </Button>
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
              <BreadcrumbLink href='/header/shopprofile'>
                Cliente
              </BreadcrumbLink>
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
          <ModalSearch isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </HStack>
      </Flex>
      <Outlet context={[setName]} />;
    </>
  );
};
