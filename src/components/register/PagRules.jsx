import { useState } from "react";
import {
  Input,
  Grid,
  FormControl,
  FormErrorMessage,
  Button,
  Flex,
  Center,
  VStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { PageHeader } from "../header/PageHeader";
import { comercioObj } from "../helpers/comercioObj";
import {
  useMutateAddShop,
  useMutateUpdateShop,
} from "../../hooks/commerceHooks";
import { useNavigate } from "react-router-dom";

export const PagRules = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const [showBtn, setShowBtn] = useState("none");

  const shopId = sessionStorage.getItem("shopId");

  const commerce = comercioObj();

  const resultUpdate = useMutateUpdateShop(shopId);

  const resultAdd = useMutateAddShop();

  const navigate = useNavigate();

  const onSubmit = (e) => {
    commerce.rules = {
      minimum: Number(e.minimum),
      commision: Number(e.commision),
    };
    // commerce.minimum = e.minimum;
    // commerce.commision = e.commision;
    console.log(commerce);
    if (!shopId) {
      resultAdd.mutate(commerce, {
        onError: () => {
          toast({
            title: `el error es:${resultAdd.error}`,
            status: "warning",
            duration: 6000,
            isClosable: true,
          });
        },
        onSuccess: () => {
          if (resultAdd.ok === true) {
            sessionStorage.setItem("shopId", resultAdd.data._id);
            return toast({
              title: "Su negocio ha sido agregado a nuestra Base de Datos",
              status: "success",
              duration: 6000,
              isClosable: true,
            });
          }
          if (resultAdd.ok === false) {
            console.log("tenemos un error", resultAdd.error);
            toast({
              title: `el error es:${resultAdd.error}`,
              status: "warning",
              duration: 6000,
              isClosable: true,
            });
          }
        },
      });
    }

    if (shopId) {
      resultUpdate.mutate(commerce, {
        onError: () => {
          toast({
            title: "No se pudo actualizar el registro. Intente más tarde",
            status: "warning",
            duration: 6000,
            isClosable: true,
          });
        },
        onSuccess: () => {
          toast({
            title:
              "Los datos de su negocio fueron actualizados en la Base de Datos",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
        },
      });
    }
    setShowBtn("inline");
  };

  return (
    <Flex mb={2} p={2}>
      <Center w="100%">
        <VStack>
          <PageHeader
            pageName={"Reglas de Negocio"}
            pageTitle={"Registrar Nuevo Negocio"}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3}>
              <label htmlFor="minimum">Saldo Mínimo</label>
              <FormControl isInvalid={errors.minimum}>
                <Input
                  type="number"
                  borderColor="gray.400"
                  {...register("minimum", {
                    required: true,
                  })}
                />
                <FormErrorMessage>
                  {errors.minimum && errors.minimum.message}
                </FormErrorMessage>
              </FormControl>

              <label htmlFor="commision">Comisión en Porcentaje</label>
              <FormControl isInvalid={errors.commision}>
                <Input
                  type="number"
                  borderColor="gray.400"
                  {...register("commision", {
                    required: true,
                    min: 0,
                    max: 40,
                  })}
                />
                <FormErrorMessage>
                  {errors.commision && errors.commision.message}
                </FormErrorMessage>
              </FormControl>
            </Grid>
            {resultAdd.isLoading && <Spinner />}
            {resultUpdate.isLoading && <Spinner />}
            <Button type="submit" colorScheme="blue" size="lg" mt={6} w="100%">
              Registrar Negocio...
            </Button>
            <Button
              display={showBtn}
              colorScheme="blue"
              size="lg"
              mt={6}
              w="100%"
              onClick={() => {
                navigate("/header");
              }}
            >
              Ir a Servicio al Cliente
            </Button>
          </form>
        </VStack>
      </Center>
    </Flex>
  );
};
