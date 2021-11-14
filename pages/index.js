import Link from "next/link"

import NavBar from "../shared/components/NavBar"
import Footer from "../shared/components/Footer"

export default function Home() {
  return (
    <NavBar>
     <div className="max-w-3xl mx-auto flex flex-col h-full justify-between">
        <div className="mt-20 bg-white p-10 shadow-md rounded-md space-y-4">
          <h2 className="text-center text-3xl text-gray-900 font-bold">
            Welcome!
          </h2>

          <p>
            The web app you are using is a demonstration of a tool that was
            built for a health system&apos;s supply chain team in 2021. This
            demo app was built to serve as a point of reference and to help
            visualize and explain how this process works.
            <span className="font-semibold pl-1">
              The data that is used within this app has been randomly generated
              and contains no sensitive or proprietary information.
            </span>
          </p>

          <h4 className="text-xl font-semibold">Background</h4>

          <p>
            The scenario that this demo app portrays is the following. You are a
            supply chain director for a local hospital. Every week on Sunday
            night, the backend of the production tool generates a list of five
            items that the system's algorithm has deemed to be held in excess of
            what your historical demand has shown. You find an email in your
            inbox telling you that there are five new items for you to review
            and reset. You then follow the link on the email to this site where
            you can start resetting your inventory levels on the
            &quot;Reset&quot; tab.
          </p>

          <h4 className="text-xl font-semibold">Specs</h4>

          <p>
            The version of this app that is in production uses a backend API
            that is written in Python using the Django Rest Framework. Data is
            saved using a PostgreSQL cluster which is managed by AWS. The
            frontend client is very similiar to the demo app you are using right
            now. It is a Single Page Application using the React library with
            state management using Redux. To help simplify the demo app, it is
            disconnected from a backend and is maintaining all data within the
            client using Redux. Simply refresh the browser to start over.
          </p>

        </div>
        <div>
          <Footer />
        </div>
      </div>
    </NavBar>
  )
}
