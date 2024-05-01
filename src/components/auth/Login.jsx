import { useState } from "react";
import {
  Input,
  FormControl,
  FormErrorMessage,
  Button,
  Flex,
  Center,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BiEnvelope } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useLogin } from "../../hooks/loginHooks";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../header/PageHeader";
export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const toast = useToast();

  const [show, setshow] = useState(false); //show password characters

  const [mail, setMail] = useState({ mail: "", password: "" });

  const [hasMail, setHasMail] = useState(false); //enabled/disabled the usequery

  const { data, isSuccess } = useLogin(mail, hasMail);

  const handleClick = () => setshow(!show);

  const onSubmit = (e) => {
    setMail({ email: e.email, password: e.password });
    setHasMail(true);
  };

  if (isSuccess === true) {
    if (data?.ok === true) {
      sessionStorage.setItem("userId", data?.id);
      sessionStorage.setItem("name", data?.firstName);
      localStorage.setItem("token", data?.token);
      navigate("header");
    }

    if (data?.ok === false) {
      console.log(data?.msg);
      toast({
        title: "Inicio de sesión incorrecto",
        description: data?.msg,
        status: "warning",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex mb={2} p={2} w="full">
      <Center w={"100%"}>
        <VStack>
          <Box
            border="1px"
            borderColor="gray.200"
            rounded={"lg"}
            boxShadow={"lg"}
            p={12}
          >
            <PageHeader pageTitle={"Ingresar a Plataforma"} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack>
                <FormControl isInvalid={errors.email}>
                  <InputGroup>
                    <InputLeftElement>
                      <BiEnvelope />
                    </InputLeftElement>

                    <Input
                      type="email"
                      placeholder="Correo Electrónico"
                      borderColor="gray.400"
                      {...register("email", {
                        required: "El correo es obligatorio",
                      })}
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.password}>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      borderColor="gray.400"
                      placeholder="Contraseña"
                      {...register("password", {
                        required: "La Contraseña es obligatoria",
                      })}
                    />
                    <InputRightElement>
                      <Button
                        leftIcon={<BiHide />}
                        borderColor="gray.400"
                        variant="outline"
                        size="md"
                        onClick={handleClick}
                      ></Button>
                    </InputRightElement>
                  </InputGroup>

                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  mt={6}
                  w="100%"
                >
                  Ingresar
                </Button>
                <Link href="/header">Cambiar contraseña</Link>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Center>
    </Flex>
  );
};
