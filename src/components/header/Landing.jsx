import { Flex, Heading } from "@chakra-ui/react";

export const Landing = () => {
  return (
    <Flex direction={"column"} w={"100%"} align={"center"}>
      <Heading as="h2" size="xl" color="orange.400" mt="14" p="4">
        Vecinos Atendidos
      </Heading>
      <Heading as="h2" size="xl" color="orange.400" mt="14" p="4">
        Comercios Rentando
      </Heading>
      <Heading as="h2" size="xl" color="orange.400" mt="14" p="4">
        APP Evolucionando
      </Heading>
    </Flex>
  );
};
