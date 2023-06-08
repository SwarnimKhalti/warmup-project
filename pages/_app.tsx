import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, background } from '@chakra-ui/react';
import { ChakraTheme } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  const colors = {
    theme: {
      background: '#1f1f1f',
      button: '#222',
      font: '#bdc1c6',
    },
  };

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
