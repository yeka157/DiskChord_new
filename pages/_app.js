import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
// import { rootStore } from '../reducers';
import {rootStore} from '../reducers';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={rootStore}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  )
}

export default MyApp
