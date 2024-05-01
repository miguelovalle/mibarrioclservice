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
import { PageHeader } from "../header/PageHeader";
import { useNavigate } from "react-router-dom";

export const Pag5RegNeg = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (e) => {
    sessionStorage.setItem("passwd", e.password);
    navigate("/pag6");
  };

  return (
    <Flex mb={2} p={2}>
      <Center w="100%">
        <VStack>
          <PageHeader
            pageName={"Registro de Contraseña"}
            pageTitle={"Registrar Nuevo Negocio"}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3}>
              <label htmlFor="password">Contraseña</label>
              <FormControl isInvalid={errors.password}>
                <Input
                  type="password"
                  borderColor="gray.400"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 7, message: "Mínimo 7 digitos" },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <label htmlFor="password2">Confirmar Contraseña</label>
              <FormControl isInvalid={errors.password2}>
                <Input
                  type="password"
                  borderColor="gray.400"
                  {...register("password2", {
                    required: "Confirme la Contraseña",
                    validate: {
                      coincidePswAnterior: (value) => {
                        const { password } = getValues();
                        return (
                          password === value ||
                          "Las contraseñas deben coincidir"
                        );
                      },
                    },
                    minLength: { value: 7, message: "Mínimo 7 digitos" },
                  })}
                />
                <FormErrorMessage>
                  {errors.password2 && errors.password2.message}
                </FormErrorMessage>
              </FormControl>
            </Grid>
            <Button type="submit" colorScheme="blue" size="lg" mt={6} w="100%">
              Siguiente...
            </Button>
          </form>
        </VStack>
      </Center>
    </Flex>
  );
};
