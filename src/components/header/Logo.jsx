import { Box, Image } from "@chakra-ui/react";
import logo from "../../assets/images/logoMiBarrio.png";

export default function Logo() {
  return (
    <Box>
      <Image src={logo} alt="Logo de MiBarrio" />
    </Box>
  );
}
