import { Flex, Center, Box, HStack, VStack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Logo from "./Logo";

export const PageHeader = ({ pageTitle }) => {
  PageHeader.propTypes = {
    pageTitle: PropTypes.string.isRequired,
  };

  return (
    <Flex w="100%" mb={2} p={2}>
      <Center w="100%">
        <Box bg="orange.400" w="100%" mb={2} p={2} color="white">
          <HStack w="100%">
            <Logo />
            <VStack>
              <Text mt="2" fontSize="24px" align="center">
                {pageTitle}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Center>
    </Flex>
  );
};
