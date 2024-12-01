import { useEffect } from 'react'
// import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import requestInterceptor from './api/requestInterceptor';
import responseInterceptor from './api/responseInterceptor';
import { apiCallProtected } from './api/axios';
import { spotzyTheme } from './theme/spotzyTheme';
import { MantineProvider } from '@mantine/core';
import { Toaster } from 'react-hot-toast';
import RootRouter from './Routes/RootRouter';

function App() {
  requestInterceptor();
  responseInterceptor();
  const queryClient = new QueryClient();

  useEffect(() => {
    return () => {
      apiCallProtected.interceptors.request.eject(requestInterceptor)
      apiCallProtected.interceptors.response.eject(responseInterceptor)
    }
  }, [])

  return (
    <MantineProvider theme={spotzyTheme} stylesTransform={emotionTransform}>
    <Toaster position="top-center" reverseOrder={false} />
      <MantineEmotionProvider>
        <QueryClientProvider client={queryClient}>
          <RootRouter />
        </QueryClientProvider>
      </MantineEmotionProvider>
    </MantineProvider>
  )
}

export default App
