import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '@components/Layout/Layout'
import { RecoilRoot } from 'recoil'
import { theme } from 'frontend/chakra/theme'


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <ChakraProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </RecoilRoot>
    )
}

export default MyApp
