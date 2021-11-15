import React from "react"
import { useRouter } from "next/router"
import { useForm, useWatch } from "react-hook-form"

import ErrorModal from "../../../shared/components/ErrorModal"
import NavBar from "../../../shared/components/NavBar"
import NoDetailTable from "../../../shared/components/NoDetailTable"
import { NoFilter } from "../../../shared/utils/tableHelpers"

const systemData = [
  { facility: "Central Hospital", qtyOnHand: 0, poQty: 12, issueQty: 0 },
  { facility: "University Hospital", qtyOnHand: 24, poQty: 0, issueQty: 0 },
  { facility: "Methodist Hospital", qtyOnHand: 0, poQty: 0, issueQty: 0 },
]

const CreateItemPlan = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm()

  const router = useRouter()
  const { itemId } = router.query

  // Handle cancel button
  const onCancel = () => {
    router.push(`/review/${itemId}`)
  }

  // Set up a watch for decison. Destination should only render
  // if decision is system move.
  const decisionState = useWatch({
    control,
    name: "decision",
    defaultValue: "noDecision"
  })
  console.log(decisionState)

  // Handle submit button
  const onSubmit = (data) => {
    console.log(data)
    // Empty UI inputs
    setValue("quantity", "")

    router.push(`/review/${itemId}`)
  }

  const columns = React.useMemo(() => [
    {
      Header: "Facility",
      accessor: "facility",
    },
    {
      Header: "Last Count",
      accessor: "qtyOnHand",
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
        <div className="bg-white p-5 shadow-md rounded-md">
          <h2 className="text-5xl">Set Movement Plan</h2>
          <p className="text-gray-500 pt-1">
            What would you like to do with this item?
          </p>
        </div>

        <div className="mt-5">
          <div className="bg-white p-5 shadow-md rounded-md mb-5">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">System Outlook</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">See what this item is doing around the system</p>
            </div>
            <div className="mt-4">
              <div>
                <div>
                  <NoDetailTable columns={columns} data={systemData} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 shadow-md rounded-md">
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
                      Tell the app how you'd like to move this item
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
                          })}
                        />
                        {errors.quantity && (
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

                    {decisionState === 'system' ? (
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
                          type="button"
                          onClick={onCancel}
                          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Cancel
                        </button>
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