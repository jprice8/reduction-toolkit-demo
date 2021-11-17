import React from "react"
import NavBar from "../../shared/components/NavBar"
import Table from "../../shared/components/Table"
import { NoFilter, calculateExtCost } from "../../shared/utils/tableHelpers"

import { useSelector } from "react-redux"
import { selectTargets } from "../../shared/redux/inventorySlice"
import { usdTwoDigits } from "../../shared/utils/currencyHelper"
import { selectPlansByItemId } from "../../shared/redux/planSlice"

const Review = () => {
  const targets = useSelector(selectTargets)

  const columns = React.useMemo(() => [
    {
      Header: "ID",
      accessor: "id",
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
      Header: "Plans Submitted",
      accessor: "movementPlans"
    },
    {
      Header: "Units Remaining",
      accessor: "qtyRemaining",
      Filter: NoFilter,
    },
    {
      Header: "Unit Cost",
      accessor: (row) => usdTwoDigits(row.unitCost),
      Filter: NoFilter,
    },
    {
      Header: "Ext Cost",
      accessor: (row) => calculateExtCost(row),
      Filter: NoFilter,
    },
  ])
  return (
    <NavBar>
      <div className="max-w-6xl mx-auto mt-10">
        <div className="bg-white py-10 px-5 mb-10 shadow-md rounded-md">
          <h3 className="text-3xl">Review Target Items</h3>
          <p className="text-gray-500 pt-1">Explain review target items concept.</p>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md bg-white rounded-md">
            <div className="shadow sm:rounded-md">
              <Table columns={columns} data={targets} detailPath="review" />
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default Review
