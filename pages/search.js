import React, { useState } from "react"
import toast from "react-hot-toast"

import { NoFilter } from "../shared/utils/tableHelpers"
import NavBar from "../shared/components/NavBar"
import Table from "../shared/components/Table"

import searchInventory from "../search_inventory_data.json"

const inventory = [
  {
    id: 1,
    description: "VALVE, STRATA ADJUSTABLE SMALL",
    imms: "226579",
    remaining: "8",
    unitCost: "$4,000",
    total: "$32,000",
  },
  {
    id: 2,
    description: "VALVE, STRATA ADJUSTABLE SMALL",
    imms: "226579",
    remaining: "8",
    unitCost: "$4,000",
    total: "$32,000",
  },
  {
    id: 3,
    description: "VALVE, STRATA ADJUSTABLE SMALL",
    imms: "226579",
    remaining: "8",
    unitCost: "$4,000",
    total: "$32,000",
  },
]

const Search = () => {
  const [nonMoving, setNonMoving] = useState(false)

  const calculateExtCost = (row) => {
    return row.unitCost * row.remaining
  }

  const downloadHandler = () => {
    toast.error("Export to spreadsheet function disabled for demo!")
  }

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
      Header: "On Hand",
      accessor: "remaining",
      Filter: NoFilter
    },
    {
      Header: "Unit Cost",
      accessor: "unitCost",
      Filter: NoFilter
    },
    {
      Header: "Ext Cost",
      accessor: row => calculateExtCost(row),
      Filter: NoFilter
    },
  ])

  return (
    <NavBar>
      <div className="max-w-6xl mx-auto mt-10">
        <div className="bg-white py-10 px-5 mb-10 rounded-lg">
          <h3 className="text-3xl">Search Inventory</h3>
          <p className="text-gray-500 pt-2">Explain the search concept.</p>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto  bg-white rounded-lg">

            <div className="shadow border-b border-200 sm:rounded-lg">
              <Table columns={columns} data={searchInventory} />
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default Search
