import React from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { FaCheck, FaEdit, FaPaperPlane, FaTrash } from "react-icons/fa"

import NavBar from "../../shared/components/NavBar"
import { submittedPlansData } from "../../shared/data/submittedPlansData"
import { notifyApiDisabled } from "../../shared/utils/toastHelpers"
import { selectPlanById } from "../../shared/redux/planSlice"

const PlanDetail = () => {
  const router = useRouter()
  const { planId } = router.query

  const plan = useSelector((state) => selectPlanById(state, planId))
  console.log(plan)

  return (
    <NavBar>
      <div className="max-w-6xl mx-auto mt-10">
        <div>
          <h2 className="text-3xl">Outgoing Plan Details</h2>
          <p className="text-gray-500">Submitted on {plan?.dateSubmitted}</p>
        </div>

        <div className="mt-5 bg-white flex justify-between p-10 rounded-md">
          <div>
            <h3 className="text-2xl">{plan?.description}</h3>
            <p className="text-gray-600">IMMS# {plan?.imms}</p>
            <p>Reduction Method: {plan?.decision}</p>
            <p>Seeking to send {plan?.sendQty} units</p>
            <p>Result: {plan?.status}</p>
            {plan?.status === 'accepted' && (
              <p>Receiving director accepted {plan?.acceptedQty}</p>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={notifyApiDisabled}
            >
              <FaCheck className="-ml-1 mr-2 h-5 w-5" />
              Mark as Final
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={notifyApiDisabled}
            >
              <FaEdit className="-ml-1 mr-2 h-5 w-5" />
              Edit Plan
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={notifyApiDisabled}
            >
              <FaTrash className="-ml-1 mr-2 h-5 w-5" />
              Delete Plan
            </button>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={notifyApiDisabled}
            >
              <FaPaperPlane className="-ml-1 mr-2 h-5 w-5" />
              Remind DMM
            </button>
          </div>
        </div>

        <div className="mt-5 bg-white p-10 rounded-md">
          <h3 className="text-2xl">Item Details</h3>
        </div>
      </div>
    </NavBar>
  )
}

export default PlanDetail
