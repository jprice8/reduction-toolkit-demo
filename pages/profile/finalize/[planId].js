import { useRouter } from "next/router"
import React from "react"
import { useDispatch, useSelector } from "react-redux"

import NavBar from "../../../shared/components/NavBar"
import ShippingForm from "../../../components/profile/ShippingForm"
import { finalizePlan, selectPlanById } from "../../../shared/redux/planSlice"
import { usdTwoDigits } from "../../../shared/utils/currencyHelper"
import toast from "react-hot-toast"

const FinalizeForm = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { planId } = router.query
  const plan = useSelector((state) => selectPlanById(state, planId))
  const user = useSelector((state) => state.users[0])

  const submitNonShippingHandler = () => {
    // Finalize plan
    dispatch(
      finalizePlan({
        planId: planId,
      })
    )

    toast.success("Successfully finalized movement plan!")
    router.push("/profile")
  }

  return (
    <NavBar>
      <div className="max-w-6xl mx-auto mt-10">
        <div className="bg-white p-10 shadow-md rounded-md">
          <h2 className="text-4xl">Confirm Movement Plan</h2>
          <p className="text-gray-500 pt-1">
            Please review and confirm the following details are correct
          </p>
        </div>

        <div className="bg-white p-10 shadow-md rounded-md mt-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Review Movement Plan
            </h3>
            <div className="border p-5 mt-5 max-w-3xl flex justify-between">
              <div className="space-y-1">
                <h4 className="text-lg font-medium text-gray-900">
                  {plan?.description}
                </h4>
                <p className="text-sm text-red-600">
                  {usdTwoDigits(plan?.unitCost)}
                </p>
                <p className="text-sm">Qty: {plan?.sendQty}</p>
              </div>
              <div className="text-gray-900 font-light">
                <p>Moving via {plan?.decision}</p>
                {plan?.decision === "system" && (
                  <p>Sending to {plan?.destination}</p>
                )}
              </div>
            </div>

            <div className="border p-5 mt-5 mb-8 max-w-3xl">
              <h4 className="font-semibold text-red-600">
                Movement Total: {usdTwoDigits(plan?.sendExt)}
              </h4>
            </div>

            {plan?.decision != "system" && (
              <div className="pt-5 sm:border-t sm:border-gray-200 sm:pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={submitNonShippingHandler}
                    className="ml-3 py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-indigo-500 hover:bg-indigo-700"
                  >
                    Submit Movement Plan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          {plan?.decision === "system" && (
            <ShippingForm plan={plan} user={user} />
          )}
        </div>
      </div>
    </NavBar>
  )
}

export default FinalizeForm
