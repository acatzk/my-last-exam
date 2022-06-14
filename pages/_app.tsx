import '../styles/tailwind.css'
import type { AppProps } from 'next/app'
import { nhost } from '../lib/nhostClient'
import 'react-toastify/dist/ReactToastify.css'
import { NhostNextProvider } from '@nhost/nextjs'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <ToastContainer />
        <Component {...pageProps} />
      </NhostApolloProvider>
    </NhostNextProvider>
  )
}

export default MyApp
