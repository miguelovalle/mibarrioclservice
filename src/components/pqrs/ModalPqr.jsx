import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutateAddPqr } from '../../hooks/pqrHooks';
import PropTypes from 'prop-types';

export const ModalPqr = ({ isOpen, onClose }) => {
  const { register, handleSubmit, errors } = useForm();

  const { mutate } = useMutateAddPqr();

  const onSubmit = (e) => {
    const pqrObj = {
      created: +new Date(),
      idShop: sessionStorage.getItem('shopId'),
      specialist: 'Sin Especialista',
      subject: e.asunto,
      pqr: e.pqr,
      state: 'Radicado',
    };
    mutate(pqrObj);
  };

  ModalPqr.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nueva PQR</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Select
                id='asunto'
                w={340}
                borderColor='gray.400'
                type='text'
                {...register('asunto', {
                  required: 'Campo Obligatorio',
                })}
              >
                <option value='Entrega'>Entrega</option>
                <option value='Cobro'>Cobro</option>
                <option value='Producto'>Producto</option>
                <option value='Aplicacion'>Aplicación</option>
              </Select>
              <FormControl isInvalid={errors?.pqr} w={340} my={2}>
                <Textarea
                  my={4}
                  placeholder='Su sugerencia, petición, queja o reclamo'
                  borderColor='gray.400'
                  {...register('pqr')}
                />
                <FormErrorMessage>
                  {errors?.pqr && errors?.pqr.message}
                </FormErrorMessage>
              </FormControl>
              <Button type='submit' w={340} my={4}>
                Enviar
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};
