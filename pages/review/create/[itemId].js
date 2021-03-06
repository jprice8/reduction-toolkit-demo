import React from "react"
import { useRouter } from "next/router"
import { useForm, useWatch } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import ErrorModal from "../../../shared/components/ErrorModal"
import NavBar from "../../../shared/components/NavBar"
import NoDetailTable from "../../../shared/components/NoDetailTable"
import { NoFilter } from "../../../shared/utils/tableHelpers"
import {
  addMovementPlan,
  selectInventoryById,
} from "../../../shared/redux/inventorySlice"
import { planAdded } from "../../../shared/redux/planSlice"
import PageNotFound from "../../../shared/components/PageNotFound"

const CreateItemPlan = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const router = useRouter()
  const { itemId } = router.query

  const dispatch = useDispatch()
  const user = useSelector((state) => state.users[0])
  const item = useSelector((state) =>
    selectInventoryById(state, parseInt(itemId))
  )

  // If bad itemId supplied in URL, return 404
  if (!item) {
    return <PageNotFound />
  }

  const systemData = []

  for (let i = 0; i < 3; i++) {
    let tmpObject = {}
    if (i === 0) {
      tmpObject["facilityName"] = "Central Hospital"
      tmpObject["countQty"] = item.centralCount
      tmpObject["poQty"] = item.centralPo
      tmpObject["issueQty"] = item.centralIssue
    } else if (i === 1) {
      tmpObject["facilityName"] = "Methodist Hospital"
      tmpObject["countQty"] = item.methodistCount
      tmpObject["poQty"] = item.methodistPo
      tmpObject["issueQty"] = item.methodistIssue
    } else if (i === 2) {
      tmpObject["facilityName"] = "University Hospital"
      tmpObject["countQty"] = item.universityCount
      tmpObject["poQty"] = item.universityPo
      tmpObject["issueQty"] = item.universityIssue
    }

    systemData.push(tmpObject)
  }

  // Set up a watch for decison. Destination should only render
  // if decision is system move.
  const decisionState = useWatch({
    control,
    name: "decision",
    defaultValue: "other",
  })

  // Handle submit button
  const onSubmit = (data) => {
    // If not system plan, set destination to other.
    if (data.decision != "system") {
      data.destination = "other"
    }

    // Calc send ext
    const sendExt = item.unitCost * data.quantity

    // Dispatch redux reducer to add movement plan to store
    dispatch(
      planAdded({
        id: nanoid(),
        dateSubmitted: new Date().toISOString(),
        inventoryId: parseInt(itemId),
        userId: user.id,
        facilityName: item.facilityName,
        sendQty: parseInt(data.quantity),
        sendExt: sendExt,
        decision: data.decision,
        destination: data.destination,
        unitCost: item.unitCost,
        imms: item.imms,
        description: item.description,
        status: "accepted",
        isFinalized: false,
      })
    )

    dispatch(
      addMovementPlan({
        inventoryId: parseInt(itemId),
        sendQty: parseInt(data.quantity),
      })
    )

    toast.success("Movement plan set successfully!")
    router.push(`/review/${itemId}`)
  }

  const columns = React.useMemo(() => [
    {
      Header: "Facility",
      accessor: "facilityName",
    },
    {
      Header: "Last Count",
      accessor: "countQty",
      Filter: NoFilter,
    },
    {
      Header: "Purchased Quantity",
      accessor: "poQty",
      Filter: NoFilter,
    },
    {
      Header: "Issued Quantity",
      accessor: "issueQty",
      Filter: NoFilter,
    },
  ])

  return (
    <NavBar>
      <div className="max-w-6xl mx-auto mt-10">
        <div className="bg-white p-10 shadow-md rounded-md">
          <h2 className="text-5xl">Set Movement Plan</h2>
          <p className="text-gray-500 pt-2">
            How would you like to reduce this item? Methods of removal should be
            prioritized as follows:
          </p>
          <ul className="list-disc pl-6 text-gray-500 pt-2">
            <li>Move the item to a facility within the system</li>
            <li>Sell the item to a third party vendor</li>
            <li>Discard the item</li>
          </ul>

          <p className="text-gray-500 pt-2">
            You can see how much of the item each facility is using in the
            "System Outlook" table below. The table shows you how much of the
            item each facility has purchased directly and been issued from the
            warehouse in the past 365 days.
          </p>
        </div>

        <div className="mt-5">
          <div className="bg-white p-10 shadow-md rounded-md mb-5">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                System Outlook
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                See what this item is doing around the system
              </p>
            </div>
            <div className="mt-4">
              <div>
                <div>
                  <NoDetailTable columns={columns} data={systemData} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 shadow-md rounded-md">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 divide-y divide-gray-200 sm:space-y-5"
            >
              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Movement Form
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      Tell the app how you'd like to move this item. You have{" "}
                      <span className="font-bold">
                        {item.qtyRemaining} units left
                      </span>{" "}
                      of this item.
                    </p>
                  </div>

                  <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 content-center">
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700 pt-1"
                      >
                        Quantity
                      </label>
                      <div>
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          className="py-1 px-4 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                          {...register("quantity", {
                            required: true,
                            max: item?.qtyRemaining,
                            min: 1,
                          })}
                        />
                        {errors.quantity && errors.quantity.type === "max" && (
                          <ErrorModal errorMessage="You are trying to move more units than you have recorded on hand" />
                        )}
                        {errors.quantity && errors.quantity.type === "min" && (
                          <ErrorModal errorMessage="You must enter a positive number" />
                        )}
                        {errors.quantity &&
                          errors.quantity.type === "required" && (
                            <ErrorModal errorMessage="Your input is required" />
                          )}
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 space-y-3">
                      <div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700 pt-1">
                        Decision
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            {...register("decision", { required: true })}
                            type="radio"
                            name="decision"
                            id="decision-system"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            value="system"
                          />
                          <label
                            htmlFor="decision-system"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Ship to a facility within the system
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            {...register("decision", { required: true })}
                            type="radio"
                            name="decision"
                            id="decision-sell"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            value="sell"
                          />
                          <label
                            htmlFor="decision-sell"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Sell to a third party vendor
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            {...register("decision", { required: true })}
                            type="radio"
                            name="decision"
                            id="decision-discard"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            value="discard"
                          />
                          <label
                            htmlFor="decision-discard"
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            Discard the item
                          </label>
                        </div>
                        {errors.decision && (
                          <ErrorModal errorMessage="Your input is required" />
                        )}
                      </div>
                    </div>

                    {decisionState === "system" ? (
                      <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5 content-center">
                          <label
                            htmlFor="destination"
                            className="block text-sm font-medium text-gray-700 pt-1"
                          >
                            Destination
                          </label>
                          <div className="col-span-2">
                            <select
                              className="max-w-lg border py-1 px-4 block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              {...register("destination", { required: true })}
                            >
                              <option value="Central Hospital">
                                Central Hospital
                              </option>
                              <option value="University Hospital">
                                University Hospital
                              </option>
                              <option value="Methodist Hospital">
                                Methodist Hospital
                              </option>
                            </select>
                          </div>
                          {errors.destination && (
                            <ErrorModal errorMessage="Your input is required" />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}

                    <div className="pt-5 sm:border-t sm:border-gray-200 sm:pt-5">
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="ml-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default CreateItemPlan
