import {
  Input,
  Grid,
  FormControl,
  FormErrorMessage,
  Button,
  Flex,
  Center,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CgPlayTrackNextR } from "react-icons/cg";
import { PageHeader } from "../header/PageHeader";
import { useShop } from "../../hooks/commerceHooks";
export const Pag4RegNeg = () => {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const shopId = sessionStorage.getItem("shopId");

  const { data, isSuccess } = useShop(shopId);

  const commerce = data?.result;

  if (isSuccess) {
    if (data.ok) {
      if (commerce) {
        setValue("contact", commerce.contact);
        setValue("phone", commerce.phone);
        setValue("email", commerce.email);
      }
    }
  }

  const onSubmit = (data) => {
    sessionStorage.setItem("contact", data.contact);
    sessionStorage.setItem("phone", data.phone);
    sessionStorage.setItem("email", data.email);
    //ir a pag siguiente
    navigate("/pag5");
  };

  return (
    <Flex mb={2} p={2}>
      <Center w="100%">
        <VStack>
          <PageHeader
            pageName={"Persona Contacto"}
            pageTitle={"Registrar Nuevo Negocio"}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3}>
              <label htmlFor="contact">Nombre de la persona contacto</label>
              <FormControl isInvalid={errors.contact}>
                <Input
                  type="text"
                  borderColor="gray.400"
                  {...register("contact", { required: "Campo Obligatorio" })}
                />
                <FormErrorMessage>
                  {errors.contact && errors.contact.message}
                </FormErrorMessage>
              </FormControl>

              <label htmlFor="phone">Celular</label>
              <FormControl isInvalid={errors.phone}>
                <Input
                  type="text"
                  borderColor="gray.400"
                  placeholder="Ingrese solo números"
                  {...register("phone", {
                    required: "Campo Obligatorio",
                    maxLength: { value: 10, message: "Máximo 10 digitos" },
                    minLength: {
                      value: 7,
                      message: "Mínimo 7 digitos cuando es teléfono fijo",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.phone && errors.phone.message}
                </FormErrorMessage>
              </FormControl>

              <label htmlFor="email">email contacto del negocio</label>
              <FormControl isInvalid={errors.email}>
                <Input
                  type="email"
                  borderColor="gray.400"
                  {...register("email", { required: "Campo Inválido" })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              mt="6"
              rightIcon={<CgPlayTrackNextR />}
              colorScheme="blue"
              size="lg"
              w="100%"
            >
              Siguiente...
            </Button>
          </form>
        </VStack>
      </Center>
    </Flex>
  );
};
