import React, { useState } from "react"
import toast from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux"

import { NoFilter } from "../shared/utils/tableHelpers"
import { usdTwoDigits } from "../shared/utils/currencyHelper"
import NavBar from "../shared/components/NavBar"
import NoDetailTable from "../shared/components/NoDetailTable"
import searchInventory from "../search_inventory_data.json"
import { notifyApiDisabled } from "../shared/utils/toastHelpers"
import { selectNonTargets, toggleTarget } from "../shared/redux/inventorySlice"
import { selectDemoUser } from "../shared/redux/usersSlice"

const Search = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user[0])
  console.log(user)
  const nonTargets = useSelector(selectNonTargets)
  console.log(nonTargets)

  const calculateExtCost = (row) => {
    const formatttedExt = row.unitCost * row.qtyRemaining
    return usdTwoDigits(formatttedExt)
  }

  const targetHandler = (item) => {
    dispatch(
      toggleTarget({
        inventoryId: parseInt(item.id),
        isTarget: item.isTarget
      })
    )

    toast.success(`Item ${item.imms} targeted!`)
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
      accessor: "qtyRemaining",
      Filter: NoFilter
    },
    {
      Header: "Unit Cost",
      id: "unitCost",
      accessor: row => usdTwoDigits(row.unitCost),
      Filter: NoFilter
    },
    {
      Header: "Ext Cost",
      id: "extCost",
      accessor: row => calculateExtCost(row),
      Filter: NoFilter
    },
    {
      id: "target",
      Cell: ({row}) => (
        <button 
          onClick={() => targetHandler(row.original)}
          className="px-6 py-2 text-xs font-medium text-indigo-600 hover:text-indigo-700 tracking-wider cursor-pointer hover:bg-gray-200 rounded-lg uppercase"
        >
          Target
        </button>
      ),
      Filter: NoFilter
    }
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
            <div className="shadow sm:rounded-lg">
              <NoDetailTable columns={columns} data={nonTargets} />
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default Search
