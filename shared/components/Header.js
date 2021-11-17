import React from 'react'
import Head from 'next/head'

const Header = () => {
  return (
    <Head>
      <title>Reduction Toolkit</title>
      <meta 
        name="description"
        content="Identify and reduce non-moving non-stock inventory."
      />
      <link rel="icon" href="/favicon.svg" />
    </Head>
  )
}

export default Header
