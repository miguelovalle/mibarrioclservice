import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useToast,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { useMutateUpdateOrder } from '../../hooks/balanceHooks';
import PropTypes from 'prop-types';

export const ModalOrder = ({ isOpen, onClose, order }) => {
  const { mutate} = useMutateUpdateOrder(order.id);

  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
      correction: '',
    },
  });

  const shopId = sessionStorage.getItem('shopId');

  const onSubmit = (e) => {
    console.log(e);
    console.log('order', order);
    const obj = {
      newAmount: Number(e.amount),
      oldAmount: Number(order.amount),
      correction: e.correction,
    };

    shopId &&
      mutate(obj, {
        onError: () => {
          toast({
            title: 'No se actualizó. Vuelva a intentarlo',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
        onSuccess: (data) => {
          if (data?.ok === true) {
            toast({
              title: 'Actualización Exitosa',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          }
        },
      });
    reset();
  };

  ModalOrder.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    order: PropTypes.object,
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Actualizar Orden</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w={340} my={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.amount} w={340} my={2}>
                <Input
                  type='number'
                  placeholder='Valor de la Orden'
                  borderColor='gray.400'
                  {...register('amount', {
                    required: 'Campo Obligatorio',
                  })}
                />
                <FormErrorMessage>
                  {errors.amount && errors.amount.message}
                </FormErrorMessage>
              </FormControl>
              <Input
                type='text'
                w={340}
                my={4}
                placeholder='Razon de la Corrección'
                borderColor='gray.400'
                {...register('correction')}
              />

              <Button
                type='submit'
                colorScheme='blue'
                mr={3}
                w={340}
                justifyContent={'center'}
              >
                Registrar el Canbio
              </Button>
            </form>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
