import { useState, useEffect } from 'react';
import {
  Button,
  VStack,
  Input,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  Image,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

//const baseURL = process.env.REACT_APP_API_URL + '/commerce';
const baseURL = import.meta.env.VITE_API_URL + '/commerce';
export const UpFile = ({ nextPage, imgfile }) => {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [alertFile, setalertFile] = useState(false);
  const [alertLoad, setalertLoad] = useState(false);
  const [showButton, setshowButton] = useState('block');
  const [showImg, setShowImg] = useState(imgfile);

  useEffect(() => {
    console.log('nextpage', nextPage, 'imgfile', imgfile);
    nextPage ? setshowButton('block') : setshowButton('none');
  }, [showButton, nextPage, imgfile]);

  const Cargar = async data => {
    const img = data.picture[0];
    const nameImg = data.picture[0].name;
    const imgName = import.meta.env.APP_IMG_URL + '/' + nameImg;

    if (img) {
      setShowImg(imgName);
      const formData = new FormData();
      formData.append('file', img);
//      try {
        const res = await fetch(baseURL, {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          sessionStorage.setItem('imgName', imgName);
          setalertLoad(true);
        } else {
          throw await res.json();
        }
  //    } catch (error) {
  //      throw error;
  //    }
    }
  };

  const onSubmit = data => {
    data.picture.length > 0 ? Cargar(data) : setalertFile(true);
  };

  const handleNext = () => {
    navigate(nextPage);
  };

  return (
    <Flex justifyContent={'center'}>
      {alertFile ? (
        <Alert status="warning">
          <AlertIcon />
          <AlertDescription display={'block'}>
            Haga click en el boton seleccionar archivo para cargar el logo o
            foto desde su PC. Si no tiene, ignore este paso
          </AlertDescription>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={() => setalertFile(false)}
          />
        </Alert>
      ) : (
        <></>
      )}
      {alertLoad ? (
        <Alert status="warning">
          <AlertIcon />
          Archivo listo para cargar.
        </Alert>
      ) : (
        <></>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={3}>
          <Text fontSize={'sm'}>
            El archivo de la foto o logo debe ser JPEG.
          </Text>
          <Text fontSize={'sm'}>El tamaño, no mayor a 700kbps</Text>
          <Image
            boxSize="100px"
            objectFit="cover"
            borderRadius="lg"
            src={showImg}
            alt={showImg}
          />
          <Input
            w={320}
            ml={20}
            type="file"
            name="picture"
            borderColor="gray.300"
            {...register('picture')}
          />
          <VStack>
            <Button colorScheme="blue" w="100%" size="lg" type="submit">
              Subir Archivo...
            </Button>

            <Button
              colorScheme="blue"
              w="100%"
              size="lg"
              display={showButton}
              onClick={handleNext}
            >
              Siguiente ...
            </Button>
          </VStack>
        </VStack>
      </form>
    </Flex>
  );
};
