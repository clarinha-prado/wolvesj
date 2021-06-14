// import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react"
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp
