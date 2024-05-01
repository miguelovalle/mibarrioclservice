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
  InputGroup,
  Select,
} from "@chakra-ui/react";
import Gmap from "../GoogleMap/Gmap";
import { geolocation } from "../helpers/geolocation";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CgPlayTrackNextR } from "react-icons/cg";
import { PageHeader } from "../header/PageHeader";
import { BiMapPin } from "react-icons/bi";
import { useShop } from "../../hooks/commerceHooks";

export const Pag2RegNeg = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [showMap, setshowMap] = useState(false);
  const [center, setcenter] = useState(0);
  const [showBtn, setShowBtn] = useState(true);

  const shopId = sessionStorage.getItem("shopId");

  const { data, isSuccess } = useShop(shopId);

  const dataAddrr = data?.result?.addrritems;

  if (isSuccess) {
    if (data.ok) {
      if (dataAddrr) {
        setValue("principal", dataAddrr?.principal);
        setValue("cruceA", dataAddrr?.cruceA);
        setValue("cruceB", dataAddrr?.cruceB);
        setValue("puerta", dataAddrr?.puerta);
        setValue("detalles", dataAddrr?.detalles);
      }
    }
  }

  const onSubmit = async (e) => {
    const direccion = e.detalles
      ? `${e.principal} ${e.cruceA} ${e.cruceB} ${e.puerta} ${e.detalles}`
      : `${e.principal} ${e.cruceA} ${e.cruceB} ${e.puerta}`;

    const placeName = direccion + " Bogota, co";

    sessionStorage.setItem("address", direccion);
    sessionStorage.setItem(
      "cross",
      `${e.principal} ${e.cruceA} con ${e.cruceB}`
    );
    sessionStorage.setItem("principal", e.principal);
    sessionStorage.setItem("cruceA", e.cruceA);
    sessionStorage.setItem("cruceB", e.cruceB);
    sessionStorage.setItem("puerta", e.puerta);
    sessionStorage.setItem("detalles", e.detalles);

    await geolocation(placeName).then((position) => {
      setcenter({
        long: position.lng ? Number(position.lng) : 0,
        lat: position.lat ? Number(position.lat) : 0,
      });

      sessionStorage.setItem("long", Number(position.lng));
      sessionStorage.setItem("lat", Number(position.lat));
    });

    setshowMap(true);
    setShowBtn(false);
  };

  const handleNext = () => {
    navigate("/pag3");
  };

  return (
    <Flex mb={2} p={2}>
      <Center w="100%">
        <VStack>
          <PageHeader
            pageName={"Ubicación"}
            pageTitle={"Registrar Nuevo Negocio"}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack mt={8} spacing={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3}>
                <Select {...register("principal")}>
                  <option value="calle">Calle</option>
                  <option value="carrera">Carrera</option>
                  <option value="avenida">Avenida</option>
                  <option value="diagonal">Diagonal</option>
                  <option value="transversal">Transversal</option>
                </Select>

                <FormControl isInvalid={errors.cruceA}>
                  <Input
                    type="text"
                    borderColor="gray.300"
                    {...register("cruceA", {
                      required: "# Cra o Calle requerido",
                      maxLength: { value: 15, message: "máximo 15 caracteres" },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.cruceA && errors.cruceA.message}
                  </FormErrorMessage>
                </FormControl>
              </Grid>

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3}>
                <InputGroup>
                  <FormControl isInvalid={errors.cruceB}>
                    <Input
                      borderColor="gray.300"
                      type="text"
                      {...register("cruceB", {
                        required: "# Cra o Calle requerido",
                        maxLength: {
                          value: 15,
                          message: "máximo 15 caracteres",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.cruceB && errors.cruceB.message}
                    </FormErrorMessage>
                  </FormControl>
                </InputGroup>

                <FormControl isInvalid={errors.puerta}>
                  <Input
                    borderColor="gray.300"
                    type="text"
                    {...register("puerta", {
                      required: "# puerta requerido",
                      maxLength: { value: 15, message: "máximo 15 caracteres" },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.puerta && errors.puerta.message}
                  </FormErrorMessage>
                </FormControl>
              </Grid>
              <Input
                borderColor="gray.300"
                type="text"
                placeholder="Torre ? Apto ???"
                {...register("detalles")}
              />
            </VStack>

            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={3}>
              <Button
                type="submit"
                mt="6"
                rightIcon={<BiMapPin />}
                colorScheme="blue"
                size="lg"
                w="100%"
              >
                Ubicar en Mapa...
              </Button>

              <Button
                mt="6"
                disabled={showBtn}
                rightIcon={<CgPlayTrackNextR />}
                colorScheme="blue"
                size="lg"
                w="100%"
                onClick={handleNext}
              >
                Siguiente...
              </Button>
            </Grid>
          </form>
        </VStack>
      </Center>
      {
        <Gmap
          center={center}
          setcenter={setcenter}
          showMap={showMap}
          setshowMap={setshowMap}
        />
      }
    </Flex>
  );
};
