import React from 'react'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

import { Toaster } from "react-hot-toast"

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </React.Fragment>
  )
}

export default MyApp
