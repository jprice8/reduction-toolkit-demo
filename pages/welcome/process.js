import Link from "next/link"
import Image from "next/image"

import NavBar from "../../shared/components/NavBar"
import Footer from "../../shared/components/Footer"

export default function Process() {
  return (
    <NavBar>
      <div className="max-w-3xl mx-auto flex flex-col">
        <div className="mt-20 bg-white p-10 shadow-md rounded-md space-y-4">
          <h2 className="text-center text-3xl text-gray-900 font-bold">
            Process Flow
          </h2>

          <p>
            The following is a flow chart for how the process should go for
            a director trying to identify, target, and reduce their inventory.
          </p>

          <Image
            src="/kit_diagram1.jpeg"
            width={724}
            height={1224}
            alt="Reduction Toolkit process flow chart"
          />

          <div className="flex justify-evenly pt-10">
            <Link href="/">
              <div className="cursor-pointer text-indigo-500 hover:text-indigo-600">
                Background
              </div>
            </Link>
            <Link href="/welcome/specs">
              <div className="cursor-pointer text-indigo-500 hover:text-indigo-600">
                Specs
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
