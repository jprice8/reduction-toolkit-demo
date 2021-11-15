import React from "react"
import Link from "next/link"

import NavBar from "../../shared/components/NavBar"
import { FaHospital } from "react-icons/fa"
import { NoFilter } from "../../shared/utils/tableHelpers"
import Table from "../../shared/components/Table"

import { submittedPlansData } from "../../shared/data/submittedPlansData"

const metrics = [
  { name: "Currently Targeted", value: "$30,500", href: "/profile/currentlyTargeted" },
  { name: "Removed Inventory", value: "$30,500", href: "/profile/removedInventory" },
  { name: "Incoming Inventory", value: "$0", href: "/profile/incomingInventory" },
]

const requestData = [
  {
    id: 1,
    decision: "System",
    date: "July 20, 2021, 1:49 PM",
    destination: "Saint Mary's Hospital",
    description: "RELOAD, STAPLER GREEN DA VINCI XI",
    imms: "592309",
    status: "Accepted",
  },
  {
    id: 2,
    decision: "System",
    date: "July 20, 2021, 1:49 PM",
    destination: "Children's Hospital",
    description: "RELOAD, STAPLER GREEN DA VINCI XI",
    imms: "592309",
    status: "Accepted",
  },
  {
    id: 3,
    decision: "Sell",
    date: "July 20, 2021, 1:49 PM",
    destination: "Third Party Vendor",
    description: "RELOAD, STAPLER GREEN DA VINCI XI",
    imms: "592309",
    status: "Outstanding",
  },
]

const profile = () => {
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
      accessor: "date",
      Filter: NoFilter,
    },
    {
      Header: "Description",
      accessor: "description",
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
        <div className="bg-bannerBackground">
          <div className="max-w-7xl mx-auto py-10">
            <div className="text-white">
              <h2 className="text-3xl pb-2">Alex Bradford</h2>
              <div className="flex">
                <FaHospital className="h-6 w-6" />
                <h3 className="pl-2 text-lg">North Central Baptist Hospital</h3>
              </div>
            </div>
            {/* Metrics */}

            <div className="border-t mt-5 border-gray-600 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="my-10 rounded-lg bg-white">
            <div className="p-4">
              <h4 className="text-2xl">Outgoing Requests</h4>
              <p className="text-gray-500 pt-2">
                All submitted movement plans can be tracked in the Director's outgoing
                request table.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="overflow-x-auto bg-white rounded-lg">
              <div className="shadow border-b border-200 sm:rounded-lg">
                <Table
                  columns={columns}
                  data={submittedPlansData}
                  detailPath={"profile"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default profile
