import 'tailwindcss/tailwind.css'
import { Provider } from 'react-redux'
import '../styles/globals.css'

import { Toaster } from "react-hot-toast"
import store from '../shared/redux/store'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </Provider>
  )
}

export default MyApp
