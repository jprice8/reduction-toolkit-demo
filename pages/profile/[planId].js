import React from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { FaCheck, FaPaperPlane, FaTrash } from "react-icons/fa"
import format from "date-fns/format"

import NavBar from "../../shared/components/NavBar"
import { notifyApiDisabled } from "../../shared/utils/toastHelpers"
import { selectPlanById } from "../../shared/redux/planSlice"
import PageNotFound from "../../shared/components/PageNotFound"

const PlanDetail = () => {
  const router = useRouter()
  const { planId } = router.query

  const plan = useSelector((state) => selectPlanById(state, planId))

  const markFinalHandler = () => {
    router.push(`/profile/finalize/${planId}`)
  }

  if (!plan) {
    return <PageNotFound />
  }

  return (
    <NavBar>
      <div className="max-w-5xl mx-auto mt-10">
        <div className="bg-white p-10 rounded-md shadow-md">
          <h2 className="text-4xl">Outgoing Plan Details</h2>
          <p className="text-gray-500 pt-2">
            Submitted on {format(new Date(plan?.dateSubmitted), "PPPpp")}
          </p>

          {plan?.decision === "system" ? (
            <p className="text-gray-500 pt-2 text-sm">
              In the production version of this app, you would need to wait for
              approval from the receiving facilities director before you
              finalized the movement plan. For the sake of the demo, the plan
              has been auto accepted and is now ready to be finalized. Click
              "Mark as Final" to finalize the plan.
            </p>
          ) : (
            <p className="text-gray-500 pt-2">
              Click "Mark as Final" to finalize the movement plan and let the
              system know that you have removed this item as indicated.
            </p>
          )}
        </div>

        <div className="mt-5 bg-white rounded-md shadow-md flex justify-between p-10">
          <div className="border p-5 space-y-2 text-gray-900">
            <h3 className="text-2xl">{plan?.description}</h3>
            <div className="font-light space-y-2">
              <p className="">IMMS # {plan?.imms}</p>
              <p>Reduction Method is {plan?.decision}</p>
              <p>Seeking to send {plan?.sendQty} units</p>
              <p>Result is {plan?.status}</p>
            </div>
          </div>

          <div className="flex flex-col space-y-4 border p-5">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={markFinalHandler}
            >
              <FaCheck className="-ml-1 mr-2 h-5 w-5" />
              Mark as Final
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={notifyApiDisabled}
            >
              <FaPaperPlane className="-ml-1 mr-2 h-5 w-5" />
              Remind DMM
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={notifyApiDisabled}
            >
              <FaTrash className="-ml-1 mr-2 h-5 w-5" />
              Delete Plan
            </button>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default PlanDetail
