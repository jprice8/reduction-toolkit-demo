import React from "react"
import toast from "react-hot-toast"
import { HiDocumentDownload } from "react-icons/hi"
import MetricsDetailTable from "../../components/profile/metricsDetailTable"
import NavBar from "../../shared/components/NavBar"

import { targetData } from "../../shared/data/targetData"
import { NoFilter } from "../../shared/utils/tableHelpers"

const CurrentlyTargeted = () => {
  const downloadHandler = () => {
    toast.error("Export to spreadsheet function disabled for demo!")
  }

  const columns = React.useMemo(() => [
    {
      Header: "Count Date",
      accessor: "countDate",
      Filter: NoFilter,
    },
    {
      Header: "IMMS #",
      accessor: "imms",
    },
    {
      Header: "Mfr",
      accessor: "mfr",
    },
    {
      Header: "Catalog No",
      accessor: "mfrCatNo",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Remaining Units",
      accessor: "remaining",
      Filter: NoFilter,
    },
    {
      Header: "Unit Cost",
      accessor: "unitCost",
      Filter: NoFilter,
    },
    {
      Header: "Ext Cost",
      accessor: "extCost",
      Filter: NoFilter,
    },
  ])
  return (
    <NavBar>
      <div className="max-w-7xl mx-auto mt-10">
        <div className="bg-white py-10 px-5 mb-10 rounded-lg">
          <h3 className="text-3xl">Review Targeted Items</h3>
          <p className="text-gray-500 pt-2">
            Items that are targeted in the "Search" tab can be reviewed and
            exported from here.
          </p>
        </div>

        <div className="pb-2">
          <button
            type="button"
            className="items-center flex border border-gray-500 hover:bg-gray-500 hover:shadow-md px-2 py-2 rounded-md"
            onClick={downloadHandler}
          >
            <p className="pr-2 font-semibold">Download</p>
            <HiDocumentDownload className="h-5 w-5 text-indigo-500 hover:text-indigo-900" />
          </button>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto bg-white rounded-lg">
            <div className="shadow sm:rounded-lg">
              <MetricsDetailTable columns={columns} data={targetData} />
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default CurrentlyTargeted
