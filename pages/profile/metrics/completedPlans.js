import { format } from "date-fns"
import React from "react"
import toast from "react-hot-toast"
import { HiDocumentDownload } from "react-icons/hi"
import { useSelector } from "react-redux"

import NavBar from "../../../shared/components/NavBar"
import NoDetailTable from "../../../shared/components/NoDetailTable"
import { selectCompletedUserPlans } from "../../../shared/redux/planSlice"
import { usdTwoDigits } from "../../../shared/utils/currencyHelper"

const CompletedPlans = () => {
  const user = useSelector((state) => state.users[0])
  const completed = useSelector((state) => selectCompletedUserPlans(state, user.id))

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
      Header: "Submitted",
      accessor: row => format(new Date(row.dateSubmitted), 'PPpp'),
    },
    {
      Header: "Method",
      accessor: "decision",
    },
    {
      Header: "Destination",
      accessor: "destination",
    },
    {
      Header: "Qty Removed",
      accessor: "sendQty",
    },
    {
      Header: "Ext Removed",
      accessor: (row) => usdTwoDigits(row.unitCost * row.sendQty),
    },
  ])

  return (
    <NavBar>
      <div className="max-w-7xl mx-auto mt-10">
        <div className="bg-white p-10 mb-10 rounded-md shadow-md">
          <h3 className="text-3xl">Review Completed Plans</h3>
          <p className="text-gray-500 pt-1">
            Movement plans that are finalized can be reviewed and exported from
            here.
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
              <NoDetailTable columns={columns} data={completed} />
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default CompletedPlans
