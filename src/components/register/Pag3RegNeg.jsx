import { Center, Flex, VStack } from "@chakra-ui/react";
import { PageHeader } from "../header/PageHeader";
import { UpFile } from "./UpFile";
import { useShop } from "../../hooks/commerceHooks";

export const Pag3RegNeg = () => {
  const shopId = sessionStorage.getItem("shopId");

  const { data } = useShop(shopId);

  const perfil = data?.result?.img;

  const img = perfil ? perfil?.commerce?.img : null;

  return (
    <Flex mb={2} p={2}>
      <Center w="100%">
        <VStack>
          <PageHeader
            pageName={"Subir Logo"}
            pageTitle={"Registrar Nuevo Negocio"}
          />
          <UpFile nextPage={"/pag4"} imgfile={img} />
        </VStack>
      </Center>
    </Flex>
  );
};
