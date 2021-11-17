import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { HiPencilAlt, HiViewList, HiBackspace } from "react-icons/hi"
import { useDispatch } from "react-redux"

import NavBar from "../../shared/components/NavBar"
import { useSelector } from "react-redux"
import { selectInventoryById } from "../../shared/redux/inventorySlice"
import { selectPlansByItemId } from "../../shared/redux/planSlice"
import { toggleTarget } from "../../shared/redux/inventorySlice"
import toast from "react-hot-toast"

const ReviewDetail = () => {
  const router = useRouter()
  const { itemId } = router.query
  const dispatch = useDispatch()

  const item = useSelector((state) =>
    selectInventoryById(state, parseInt(itemId))
  )
  const plans = useSelector((state) => selectPlansByItemId(state, item?.id))
  const user = useSelector((state) => state.users[0])

  const depletedClickHandler = () => {
    toast.error("You have no more units remaining to move!")
  }

  const unTargetHandler = () => {
    dispatch(
      toggleTarget({
        inventoryId: parseInt(itemId),
        isTarget: item.isTarget,
      })
    )

    toast.success("Item removed from targets!")
    router.push("/review")
  }

  return (
    <NavBar>
      <div className="max-w-5xl mx-auto mt-10">
        <div className="bg-white p-10 rounded-md shadow-md">
          <h2 className="text-4xl">Review Target Item</h2>
          <ul className="ml-6 list-disc text-gray-500 pt-2">
            <li>
              Click "Create Plan" to create a movement plan for this item.
            </li>
            <li>Click "View Plans" to see all movement plans that you have created for this item.</li>
            <li>Click "UnTarget" to remove this item from the "Review" page and move it back to the "Search" page.</li>
          </ul>

          <p className="text-gray-500 pt-2">
            After creating a movement plan, go to the "Profile" page to finalize and manage your movement plan.
          </p>
        </div>

        <div className="mt-5 bg-white flex justify-between p-10 rounded-md shadow-md">
          <div className="border p-5 space-y-2 text-gray-900">
            <h3 className="text-2xl">{item?.description}</h3>
            <div className="font-light space-y-2">
              <p className="">IMMS # {item?.imms}</p>
              <p className="">{item?.qtyRemaining} Units Remaining</p>
              <p className="">{plans.length} Plans Set</p>
            </div>
          </div>

          <div className="flex flex-col space-y-4 border p-5">
            {item?.qtyRemaining > 0 ? (
              <Link href={`/review/create/${itemId}`}>
                <div className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <HiPencilAlt className="-ml-1 mr-2 h-5 w-5" />
                  Create Plan
                </div>
              </Link>
            ) : (
              <div
                onClick={depletedClickHandler}
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <HiPencilAlt className="-ml-1 mr-2 h-5 w-5" />
                Create Plan
              </div>
            )}

            <Link href={`/review/view/${itemId}`}>
              <div className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <HiViewList className="-ml-1 mr-2 h-5 w-5" />
                View Plans
              </div>
            </Link>
            <button
              type="button"
              onClick={unTargetHandler}
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <HiBackspace className="-ml-1 mr-2 h-5 w-5" />
              UnTarget
            </button>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default ReviewDetail
