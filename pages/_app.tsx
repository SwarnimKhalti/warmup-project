import type { AppProps } from "next/app";
import { ChakraProvider, background } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import theme from "@/themes/theme";

export default function App({ Component, pageProps }: AppProps) {
  const colors = {
    theme: {
      background: "#1f1f1f",
      button: "#222",
      font: "#bdc1c6",
    },
  };

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
