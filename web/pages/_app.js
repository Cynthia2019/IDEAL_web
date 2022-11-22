import '../styles/globals.css'
import '../styles/header.css'
import PyodideProvider from '../components/pyodide-provider'


function MyApp({ Component, pageProps }) {
  return (
          <PyodideProvider>
      <Component {...pageProps} />
          </PyodideProvider>
  )
}

export default MyApp
