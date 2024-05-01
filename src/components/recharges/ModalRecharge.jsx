import { useState } from 'react';
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
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import {
  useMutateAddCharge,
  useMutateUpdateCharge,
} from '../../hooks/balanceHooks';
import PropTypes from 'prop-types';

export const ModalRecharge = ({ isOpen, onClose, title, showStr, charge }) => {
  const [disabledBtn, setDisabledBtn] = useState(false);

  const mutation = useMutateAddCharge();

  const mutateUpdate = useMutateUpdateCharge(charge.id);

  let obj = {};

  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      bank: '',
      amount: '',
      correction: '',
    },
  });

  const shopId = sessionStorage.getItem('shopId');

  const onSubmit = (e) => {
    if (showStr === 'none') {
      // new  charge
      obj = {
        charged: +new Date(),
        idShop: shopId,
        bank: e.bank,
        amount: Number(e.amount),
      };
      shopId &&
        mutation.mutate(obj, {
          onError: () => {
            toast({
              title: 'No se registró. Vuelva a intentarlo',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          },
          onSuccess: (data) => {
            if (data?.ok === true) {
              toast({
                title: 'Registro Exitoso',
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
              setDisabledBtn(true);
            }
          },
        });
    }

    if (showStr === 'block') {
      obj = {
        newBank: e.bank,
        newAmount: Number(e.amount),
        correction: e.correction,
        oldBank: charge?.bank,
        oldAmount: Number(charge?.amount),
      };
      shopId &&
        mutateUpdate.mutate(obj, {
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
                title: 'Actualización	 Exitosa',
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
              setDisabledBtn(true);
            }
          },
        });
    }
    reset();
  };

  ModalRecharge.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    showStr: PropTypes.string.isRequired,
    charge: PropTypes.object,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w={340} my={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Select
                id='bank'
                placeholder='Banco y Cuenta'
                w={340}
                borderColor='gray.400'
                type='text'
                {...register('bank', {
                  required: 'Campo Obligatorio',
                })}
              >
                <option value='Davivienda Ahorros'>Davivienda Ahorros</option>
                <option value='Bancolombia Ahorros'>Bancolombia Ahorros</option>
                <option value='Caja Social Ahorros'>Banco Caja Social</option>
                <option value='BBVA'>BBVA</option>
                <option value='Nequi'>Nequi</option>
                <option value='AV Villas Ahorros'>
                  Banco AV Villas Ahorros
                </option>
              </Select>

              <FormControl isInvalid={errors.amount} w={340} my={2}>
                <Input
                  type='number'
                  placeholder='Valor de la Recarga'
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
                display={showStr}
                w={340}
                my={4}
                placeholder='Razon de la Corrección'
                borderColor='gray.400'
                {...register('correction')}
              />

              <Button
                type='submit'
                isDisabled={disabledBtn}
                colorScheme='blue'
                mr={3}
                w={340}
                justifyContent={'center'}
              >
                Registrar Recarga
              </Button>
            </form>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
