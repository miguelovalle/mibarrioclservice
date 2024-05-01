//import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  Grid,
  HStack,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useAdduser } from "../../hooks/loginHooks";
import { PageHeader } from "../header/PageHeader";

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  let message, stat;

  const toast = useToast();

  const navigate = useNavigate();

  const resultAddUser = useAdduser();

  const onSubmit = (e) => {
    // construct user oject to send to db
    const specialist = {
      name: {
        firstName: e.nombres,
        lastName: e.apellidos,
      },
      profile: e.profile,
      email: e.email,
      password: e.password,
    };
    resultAddUser.mutate(specialist, {
      onError: () => {
        toast({
          title: "No se completó la operación. Vuelva a intentarlo",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
      onSuccess: (data) => {
        console.log("response", data);
        if (data?.ok === true) {
          message = "Registro Exitoso";
          stat = "success";
        } else {
          message = "Hubo un problema al registrar el usuario.";
          stat = "warning";
        }
        toast({
          title: message,
          status: stat,
          duration: 5000,
          isClosable: true,
        });
        localStorage.setItem("userId", data.uid);
        navigate(-1);
      },
    });
  };

  return (
    <Flex mb={2} p={2} align={"center"} justify={"center"} mt={10}>
      <Center w="480px">
        <VStack>
          <PageHeader pageTitle={"Registrar Nuevo Usuario"} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <Text color={"gray.600"}>Nombres </Text>
              <FormControl>
                <Input
                  type="text"
                  borderColor="gray.400"
                  {...register("nombres", {
                    required: true,
                    message: "campo obligatorio",
                  })}
                />
                <FormErrorMessage>
                  {errors.nombres && errors.nombres.message}
                </FormErrorMessage>
              </FormControl>

              <Text color={"gray.600"}>Apellidos </Text>
              <FormControl>
                <Input
                  type="text"
                  borderColor="gray.400"
                  {...register("apellidos", { required: "Campo Obligatorio" })}
                />
                <FormErrorMessage>
                  {errors.apellidos && errors.apellidos.message}
                </FormErrorMessage>
              </FormControl>

              <Text color={"gray.600"}>Correo Electrónico </Text>
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

              <Text color={"gray.600"}>Especialidad </Text>
              <FormControl isInvalid={errors.profile}>
                <Input
                  type="text"
                  placeholder="Perfil de Negocio"
                  borderColor="gray.400"
                  {...register("profile", {
                    required: "Campo Obligatorio",
                  })}
                />
                <FormErrorMessage>
                  {errors.profile && errors.profile.message}
                </FormErrorMessage>
              </FormControl>

              <Text color={"gray.600"}>Contraseña </Text>
              <FormControl isInvalid={errors.password}>
                <Input
                  type="password"
                  borderColor="gray.400"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 6, message: "Mínimo 6 digitos" },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <Text color={"gray.600"}>Confirmar Contraseña </Text>
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
                    minLength: { value: 6, message: "Mínimo 6 digitos" },
                  })}
                />
                <FormErrorMessage>
                  {errors.password2 && errors.password2.message}
                </FormErrorMessage>
              </FormControl>
            </Grid>
            <HStack mt={4} w={"100%"}>
              <Button type="submit" colorScheme="blue" w={220} size="lg">
                Registrarse
              </Button>
              <Button
                colorScheme="blue"
                size="lg"
                w={220}
                onClick={() => navigate(-1)}
              >
                Regresar
              </Button>
            </HStack>
          </form>
        </VStack>
      </Center>
    </Flex>
  );
};
