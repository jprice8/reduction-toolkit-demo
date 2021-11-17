import React from "react"
import toast from "react-hot-toast"
import { HiDocumentDownload } from "react-icons/hi"
import { useSelector } from "react-redux"
import NavBar from "../../../shared/components/NavBar"
import NoDetailTable from "../../../shared/components/NoDetailTable"

import { selectTargets } from "../../../shared/redux/inventorySlice"
import { usdTwoDigits } from "../../../shared/utils/currencyHelper"
import { calculateExtCost, NoFilter } from "../../../shared/utils/tableHelpers"

const CurrentlyTargeted = () => {
  const targets = useSelector(selectTargets)

  const downloadHandler = () => {
    toast.error("Export to spreadsheet function disabled for demo!")
  }

  const columns = React.useMemo(() => [
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
      accessor: "movementPlans",
    },
    {
      Header: "Remaining Units",
      accessor: "qtyRemaining",
      Filter: NoFilter,
    },
    {
      Header: "Unit Cost",
      accessor: row => usdTwoDigits(row.unitCost),
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
      <div className="max-w-7xl mx-auto mt-10">
        <div className="bg-white p-10 mb-10 rounded-md shadow-md">
          <h3 className="text-3xl">Review Targeted Items</h3>
          <p className="text-gray-500 pt-1">
            Items that are targeted on the "Search" page can be reviewed and
            exported from here.
          </p>
        </div>

        <div className="mt-5">
          <div className="bg-white p-10 shadow-md rounded-md mb-5">
            <button
              type="button"
              className="items-center flex border border-gray-500 hover:bg-gray-500 hover:shadow-md px-2 py-2 rounded-md"
              onClick={downloadHandler}
            >
              <p className="pr-2 font-semibold">Download</p>
              <HiDocumentDownload className="h-5 w-5 text-indigo-500 hover:text-indigo-900" />
            </button>
            <div className="mt-4">
              <NoDetailTable columns={columns} data={targets} />
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default CurrentlyTargeted
