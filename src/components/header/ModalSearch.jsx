import { useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useSearch } from '../../hooks/commerceHooks';
import { SlMagnifier } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ModalSearch = ({ isOpen, onClose }) => {
  const [searchState, setSearchState] = useState({ q: '' });

  const navigate = useNavigate();

  const { data, isSuccess, isLoading } = useSearch(searchState);

  let result;

  const { q } = searchState;

  const handleChange = (e) => {
    e.preventDefault();
    setSearchState({
      ...searchState,
      [e.target.name]: e.target.value,
    });
  };
  isSuccess && data?.ok === true ? (result = data?.commerces) : (result = []);

  ModalSearch.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Busqueda de Negocios</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w={450} my={2}>
            <HStack>
              <InputGroup alignItems={'center'}>
                <InputLeftAddon alignContent={'center'}>
                  <SlMagnifier />
                </InputLeftAddon>
                <Input
                  type='search'
                  size={'md'}
                  color='black '
                  name='q'
                  my={2}
                  value={q}
                  w={280}
                  onChange={handleChange}
                  variant={'filled'}
                  placeholder='vamos a encontrar...'
                />
              </InputGroup>
            </HStack>
            {isLoading && <Spinner />}
            {result?.map((item) => (
              <Box w={420} key={item._id} mt={4}>
                <Flex
                  direction={'row'}
                  align={'center'}
                  justify={'space-between'}
                  w={380}
                >
                  <Text bg={'gray.100'} w={330} h={10}>
                    {item.name}
                  </Text>
                  <IconButton
                    onClick={() => {
                      sessionStorage.setItem('shopName', item.name);
                      sessionStorage.setItem('shopId', item._id);
                      navigate('/header/shopprofile');
                    }}
                    colorScheme='blue'
                    aria-label='Search database'
                    icon={<SlMagnifier />}
                  />
                </Flex>
              </Box>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
