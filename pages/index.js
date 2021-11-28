import Link from "next/link"
import Image from "next/image"

import NavBar from "../shared/components/NavBar"
import Footer from "../shared/components/Footer"

export default function Home() {
  return (
    <NavBar>
      <div className="max-w-3xl mx-auto flex flex-col">
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
            supply chain director for a local hospital. Your health system is
            trying to reduce excess and non-moving inventory from its non-stock
            inventory (inventory that can&apos;t be tracked through a digital
            system). This turns out to be an unwieldy task because of the sheer
            size of the inventory. There are several thousand SKUs (Store
            Keeping Units) at each facility, so where do you even begin?
          </p>

          <p>Thanks to experience, you can logically conclude the following:</p>
          <ul className="ml-6 list-disc">
            <li>
              The Achilles&apos; heel to any supply chain is non-moving inventory, or
              inventory that just sits in your warehouse and doesn&apos;t move. All
              physical inventory incurs a carrying cost. Which means the more inventory
              you have on hand, the more you are spending to hold it.
            </li>
            <li>
              The 80/20 rule would have us believe that roughly 80% of the total
              cost would come from 20% of the items.
            </li>
          </ul>

          <p>
            Therefore, you should first take your several thousand SKUs and find
            out which of them are not moving. Once you have that, you should
            sort them by most expensive to least expensive and take the top 20%.
            The several hundred SKUs you get back should be where you start
            first.
          </p>

          <h4 className="text-xl font-semibold">Process</h4>

          <p>
            Even though you now have a list of the items that you should be
            targeting, you still don&apos;t have a way to manage the process. You
            could use a spreadsheet, but after several cycles of this process
            that spreadsheet would grow far too big. Plus, your hospital is in a
            system with several other facilities who are also doing the same
            thing. After several cycles of all the directors sending
            spreadsheets around labled, &quot;COPY OF COPY OF COPY OF Inventory
            Review FINAL v6&quot;, you quickly find yourself in spreadsheet
            hell.
          </p>

          <p className="font-semibold">
            The Reduction Toolkit app attempts to solve the problems above by
            providing a simple way to list your high priority SKUs and offer a
            way to manage the process in one place.
          </p>

          <p>
            Click on the process link to read more on how the process of the app 
            works. Click on the specs link if you would like to read more on the 
            technical specifications of the web app.
          </p>

          <div className="flex justify-evenly">
            <Link href="/welcome/process">
              <div className="cursor-pointer text-indigo-500 hover:text-indigo-600">
                Process
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
