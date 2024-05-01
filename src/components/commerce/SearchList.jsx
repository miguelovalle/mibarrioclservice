import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSearch } from "../../hooks/commerceHooks";
import { SlMagnifier } from "react-icons/sl";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const SearchList = () => {
  const [searchState, setSearchState] = useState({ q: "" });

  const navigate = useNavigate();

  const { data, isSuccess, isLoading } = useSearch(searchState);

  let result;

  const { q } = searchState;

  const handleChange = (e) => {
    e.preventDefault();
    setSearchState({
      ...searchState,
      [e.target.name]: e.target.value,
    });
  };
  isSuccess && data?.ok === true ? (result = data?.commerces) : (result = []);

  return (
    <Box bg={"gray.200"} minW={470} h={"100vh"}>
      <VStack mt={4}>
        <HStack>
          <Button onClick={() => navigate(-1)}>
            <Icon as={IoMdArrowRoundBack} boxSize={6} color={"blue.600"} />
          </Button>

          <InputGroup>
            <InputRightElement alignContent={"center"}>
              <SlMagnifier />
            </InputRightElement>
            <Input
              type="search"
              size={"md"}
              color="black "
              name="q"
              my={2}
              value={q}
              onChange={handleChange}
              variant={"filled"}
              placeholder="vamos a encontrar..."
            />
          </InputGroup>
        </HStack>

        {isLoading && <Spinner />}

        {result?.map((item) => (
          <Box w={480} key={item._id} mt={4}>
            <Flex
              direction={"row"}
              align={"center"}
              justify={"space-between"}
              my={4}
              w={450}
            >
              <Text>{item.name}</Text>
              <IconButton
                onClick={() => {
                  sessionStorage.setItem("shopName", item.name);
                  sessionStorage.setItem("shopId", item._id);
                  navigate("/header/shoplist");
                }}
                colorScheme="blue"
                aria-label="Search database"
                icon={<SlMagnifier />}
              />
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
