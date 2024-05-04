import { Box } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import { Header } from './Header';
import { useQueryClient } from '@tanstack/react-query';

export const Sw = () => {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(['login']);

  if (user?.ok === true) {
    return (
      <Box>
        <Header />
      </Box>
    );
  } else {
    return <Navigate to={'/'} />;
  }
};
