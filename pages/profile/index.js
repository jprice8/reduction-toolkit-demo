import React from "react"
import Link from "next/link"

import NavBar from "../../shared/components/NavBar"
import { FaHospital } from "react-icons/fa"
import { NoFilter } from "../../shared/utils/tableHelpers"
import Table from "../../shared/components/Table"

import { useSelector } from "react-redux"
import { selectNonCompletedUserPlans, selectPlansByUserId } from "../../shared/redux/planSlice"
import { calcCurrentlyTargeted, calcPlansCompleted, calcRemovedInventory } from "../../shared/utils/metricsHelper"
import { usdTwoDigits } from "../../shared/utils/currencyHelper"
import { format } from "date-fns"


const profile = () => {
  const user = useSelector((state) => state.users[0])
  const plans = useSelector((state) => selectPlansByUserId(state, user?.id))
  const inventory = useSelector((state) => state.inventory)
  const nonCompletedPlans = useSelector((state) => selectNonCompletedUserPlans(state, user?.id))

  const targetedExt = calcCurrentlyTargeted(inventory)
  const removedExt = calcRemovedInventory(plans)
  const completedPlans = calcPlansCompleted(plans)

  const metrics = [
    {
      name: "Currently Targeted",
      value: usdTwoDigits(targetedExt),
      href: "/profile/metrics/currentlyTargeted",
    },
    {
      name: "Removed Inventory",
      value: usdTwoDigits(removedExt),
      href: "/profile/metrics/completedPlans",
    },
    {
      name: "Plans Completed",
      value: completedPlans,
      href: "/profile/metrics/completedPlans",
    },
  ]

  const columns = React.useMemo(() => [
    {
      Header: "ID",
      accessor: "id",
      Filter: NoFilter,
    },
    {
      Header: "Decision",
      accessor: "decision",
    },
    {
      Header: "Destination",
      accessor: "destination",
    },
    {
      Header: "Date Submitted",
      accessor: row => format(new Date(row.dateSubmitted), 'PPpp'),
      Filter: NoFilter,
    },
    {
      Header: "Description",
      accessor: row => row.description.substring(0, 20),
    },
    {
      Header: "IMMS #",
      accessor: "imms",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ])

  return (
    <NavBar>
      <div>
        {/* Welcome Banner */}
        <div className="bg-logoSecond">
          <div className="max-w-7xl mx-auto py-10">
            <div className="text-gray-700">
              <h2 className="text-3xl pb-2">{user.userFirstName} {user.userLastName}</h2>
              <div className="flex">
                <FaHospital className="h-6 w-6" />
                <h3 className="pl-2 text-lg">{user.facility}</h3>
              </div>
            </div>
            {/* Metrics */}

            <div className="border-t mt-5 border-gray-300 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {metrics.map((item) => (
                <div
                  key={item.name}
                  className="relative mt-5 px-4 pb-10 pt-5 bg-white rounded-lg shadow"
                >
                  <p className="text-lg text-gray-500 font-semibold">
                    {item.name}
                  </p>

                  <dd className="pb-6 flex items-baseline sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900 pt-2">
                      {item.value}
                    </p>
                    <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6 rounded-lg">
                      <div className="text-sm">
                        <Link href={item.href}>
                          <a className="font-medium text-indigo-600 hover:text-indigo-900">
                            View All
                          </a>
                        </Link>
                      </div>
                    </div>
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outgoing Requests */}
        <div className="max-w-7xl mx-auto">
          <div className="my-10 rounded-md shadow-md bg-white">
            <div className="p-4">
              <h4 className="text-2xl">Outgoing Requests</h4>
              <p className="text-gray-500 pt-2">
                All submitted movement plans can be tracked in the Director's
                outgoing request table.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="overflow-x-auto bg-white rounded-md shadow-md">
              <div className="shadow border-b border-200 sm:rounded-lg">
                <Table columns={columns} data={nonCompletedPlans} detailPath={"profile"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default profile
