import React from 'react'
import Link from 'next/link'

import { HiArrowSmRight } from "react-icons/hi"

const PageNotFound = () => {
  return (
    <div className="max-w-xl mx-auto px-8 flex items-center justify-center h-screen">
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-bold leading-none">Page not found.</h1>
        <p className="text-gray-500 text-lg">Sorry, we couldn&apos;t find the page you were looking for.</p>
        <Link href="/profile">
          <div className="flex justify-center items-center text-indigo-500 hover:text-indigo-700 cursor-pointer tracking-wide text-lg pt-5">
            <p>Go back home</p>
            <HiArrowSmRight />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
