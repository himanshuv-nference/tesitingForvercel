import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/styles'
import { QueryProvider } from '../components'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer/Footer'
import { useRouter } from 'next/router'
import JssProvider from '../components/Styles/JssProvider'
import ThemeProvider from '../components/Styles/ThemeProvider'
import { PrismicProvider } from '@prismicio/react'
import {prismicClient} from "../utils/prismic";

const useStyles = makeStyles((theme) => {
  return {
    '@global': {
      html: {
        width: '100%',
      },
      body: {
        width: '100%',
        backgroundColor: '#FFF',
      },
    },
  }
})

function MyApp(props) {
  const { Component, pageProps } = props
  useStyles()
  const router = useRouter()
  const showHeader = router.pathname !== '/covid'

  React.useEffect(() => {
    // We don't need the static css any more once we have launched our application.
    const ssStyles = document.getElementById('jss-server-side')
    if (ssStyles) {
      ssStyles.parentNode.removeChild(ssStyles)
    }
  }, [])

    return (
      <PrismicProvider client={prismicClient}>
        <JssProvider>
          <QueryProvider>
            <ThemeProvider>
              <CssBaseline />
              {showHeader && <Navbar />}
              <Component {...pageProps} />
              <Footer />
            </ThemeProvider>
          </QueryProvider>
        </JssProvider>
      </PrismicProvider>
    )
}

export default MyApp
