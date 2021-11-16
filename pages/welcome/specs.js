import React from "react"
import Link from "next/link"

import Footer from "../../shared/components/Footer"
import NavBar from "../../shared/components/NavBar"

const Specs = () => {
  return (
    <NavBar>
      <div className="max-w-3xl mx-auto flex flex-col">
        <div className="mt-20 bg-white p-10 shadow-md rounded-md space-y-4">
          <h2 className="text-center text-3xl text-gray-900 font-bold">
            Specs
          </h2>

          <p className="py-5">
            The version of this app that is used in production uses a monolithic Django 
            app which communicates with a managed PostgreSQL cluster on AWS. The
            Django app itself is run in an EC2 instance on AWS and serves its
            Django templates to HTTP requests via a NGINX reverse proxy. 
          </p>

          <p className="pb-5">
            The demo you are using does not communicate to the backend Django app and
            is instead running as a NextJS app hosted on Vercel. The data is managed
            using Redux as a client side data store. So if you want to restart, just 
            refresh the page and start over.
          </p>

          <div className="flex justify-evenly">
            <Link href="/">
              <div className="cursor-pointer text-indigo-500 hover:text-indigo-600">
                Background
              </div>
            </Link>
            <Link href="/welcome/process">
              <div className="cursor-pointer text-indigo-500 hover:text-indigo-600">
                Process
              </div>
            </Link>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </NavBar>
  )
}

export default Specs
