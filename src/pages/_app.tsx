// import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import { IdsListProvider } from "../hooks/useIdsList";

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <IdsListProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </IdsListProvider>
  );
}

export default MyApp
