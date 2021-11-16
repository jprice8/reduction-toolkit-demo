import { nanoid } from "@reduxjs/toolkit"
import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

import ErrorModal from "../../shared/components/ErrorModal"
import { finalizePlan } from "../../shared/redux/planSlice"
import { shippingAdded } from "../../shared/redux/shippingSlice"

const ShippingForm = ({ plan, user }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { planId } = router.query

  // Handle form submit, create shipping instance
  const onSubmit = (data) => {
    // Create shipping instance
    dispatch(
      shippingAdded({
        id: nanoid(),
        inventoryId: plan.inventoryId,
        userId: plan.userId,
        sendQty: plan.sendQty,
        decision: plan.decision,
        unitCost: plan.unitCost,
        imms: plan.imms,
        description: plan.description,
        status: plan.status,
        isFinalized: plan.isFinalized,
        shippedFrom: plan.facilityName,
        shippedTo: plan.destination,
        dateShipped: new Date().toISOString(),
        estimatedArrival: data.arrival,
        confirmationNumber: data.confirmation,
      })
    )

    // Finalize movement plan
    dispatch(
      finalizePlan({
        planId: planId,
      })
    )

    toast.success("Successfully finalized movement plan!")
    router.push("/profile")
  }

  return (
    <div className="bg-white p-10 shadow-md rounded-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 divide-y divide-gray-200 sm:space-y-5"
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Shipping Form
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Confirm your movement plan by submitting the FedEx confirmation
                number and estimated arrival date you received when you shipped
                your items. (Enter any number for demo)
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="confirmation"
                  className="block text-sm font-medium text-gray-700 pt-1"
                >
                  FedEx Confirmation Number
                </label>
                <div>
                  <input
                    type="number"
                    name="confirmation"
                    id="confirmation"
                    className="py-1 px-4 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-200 rounded-md"
                    {...register("confirmation", {
                      required: true,
                    })}
                  />
                  {errors.confirmation && (
                    <ErrorModal errorMessage="Your input is required" />
                  )}
                </div>
              </div>
            </div>

            <div className="my-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="arrival"
                  className="block text-sm font-medium text-gray-700 pt-1"
                >
                  Estimated Arrival Date
                </label>
                <div>
                  <input
                    type="date"
                    name="arrival"
                    id="arrival"
                    className="py-1 px-4 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-200 rounded-md"
                    {...register("arrival", {
                      required: true,
                      min: plan.dateSubmitted,
                    })}
                  />
                  {errors.arrival && errors.arrival.type === "required" && (
                    <ErrorModal errorMessage="Your input is required" />
                  )}
                  {errors.arrival && errors.arrival.type === "min" && (
                    <ErrorModal errorMessage="Arrival date must be later than date submitted" />
                  )}
                </div>
              </div>
            </div>

            <div className="pt-5 sm:border-t sm:border-gray-200 sm:pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Movement Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ShippingForm
