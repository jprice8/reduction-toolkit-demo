import { useRouter } from "next/router"
import React from "react"

import NavBar from "../../../shared/components/NavBar"
import NoDetailTable from "../../../shared/components/NoDetailTable"
import { targetData } from "../../../shared/data/targetData"
import { submittedPlansData } from "../../../shared/data/submittedPlansData"
import { NoFilter } from "../../../shared/utils/tableHelpers"

const ViewItemPlans = () => {
  const router = useRouter()
  const { itemId } = router.query

  const item = targetData[itemId - 1]

  const columns = [
    {
      Header: "Destination",
      accessor: "destination",
    },
    {
      Header: "Date Requested",
      accessor: "date",
      Filter: NoFilter,
    },
    {
      Header: "Movement Method",
      accessor: "decision",
    },
    {
      Header: "Qty Requested",
      accessor: "requestedQty",
      Filter: NoFilter,
    },
    {
      Header: "Qty Accepted",
      accessor: "acceptedQty",
      Filter: NoFilter,
    },
    {
      Header: "LUOM Price",
      accessor: "unitPrice",
      Filter: NoFilter,
    },
    {
      Header: "Accepted Ext Price",
      accessor: "acceptedExtPrice",
      Filter: NoFilter,
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ]

  return (
    <NavBar>
      <div className="max-w-7xl mx-auto mt-10">
        <div className="bg-white py-8 px-5 mb-10 rounded-lg shadow-lg">
          <h3 className="text-3xl">{item.description}</h3>
          <p className="text-gray-500 pt-1">
            The following are all movement plans that you have set for the
            respective item.
          </p>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <div className="sm:rounded-lg">
              <NoDetailTable columns={columns} data={submittedPlansData} />
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default ViewItemPlans
