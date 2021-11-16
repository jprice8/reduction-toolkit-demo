import { useRouter } from "next/router"
import React from "react"
import { format } from "date-fns"

import NavBar from "../../../shared/components/NavBar"
import NoDetailTable from "../../../shared/components/NoDetailTable"
import { submittedPlansData } from "../../../shared/data/submittedPlansData"
import { NoFilter } from "../../../shared/utils/tableHelpers"
import { useSelector } from "react-redux"
import { selectTargetById } from "../../../shared/redux/inventorySlice"
import { selectPlansByItemId } from "../../../shared/redux/planSlice"
import { usdTwoDigits } from "../../../shared/utils/currencyHelper"

const ViewItemPlans = () => {
  const router = useRouter()
  const { itemId } = router.query

  const item = useSelector((state) => selectTargetById(state, itemId))
  const plans = useSelector((state) => selectPlansByItemId(state, itemId))
  console.log(plans?.length)

  const columns = [
    {
      Header: "Destination",
      accessor: "destination",
    },
    {
      Header: "Date Requested",
      accessor: row => format(new Date(row.dateSubmitted), 'PPpp'),
      Filter: NoFilter,
    },
    {
      Header: "Movement Method",
      accessor: "decision",
    },
    {
      Header: "Qty Requested",
      accessor: "sendQty",
      Filter: NoFilter,
    },
    {
      Header: "Qty Accepted",
      accessor: "acceptedQty",
      Filter: NoFilter,
    },
    {
      Header: "LUOM Price",
      accessor: row => usdTwoDigits(row.unitCost),
      Filter: NoFilter,
    },
    {
      Header: "Accepted Ext Price",
      accessor: row => usdTwoDigits(row.acceptedExt),
      Filter: NoFilter,
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ]

  return (
    <NavBar>
      <div className="sm:max-w-7xl mx-auto mt-10">
        <div className="bg-white py-8 px-5 mb-10 rounded-lg shadow-lg">
          <h3 className="text-3xl">{item?.description}</h3>
          <p className="text-gray-500 pt-1">
            The following are all movement plans that you have set for the
            respective item.
          </p>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <div className="sm:rounded-lg">
              <NoDetailTable columns={columns} data={plans ? plans : []} />
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default ViewItemPlans
