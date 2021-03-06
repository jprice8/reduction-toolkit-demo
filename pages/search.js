import React from "react"
import toast from "react-hot-toast"
import { useSelector, useDispatch } from "react-redux"

import { NoFilter } from "../shared/utils/tableHelpers"
import { usdTwoDigits } from "../shared/utils/currencyHelper"
import NavBar from "../shared/components/NavBar"
import NoDetailTable from "../shared/components/NoDetailTable"
import { calculateExtCost } from "../shared/utils/tableHelpers"
import { selectNonTargets, toggleTarget } from "../shared/redux/inventorySlice"

const Search = () => {
  const dispatch = useDispatch()
  const nonTargets = useSelector(selectNonTargets)

  const targetHandler = (item) => {
    // Toggle inventory item's isTarget property in redux
    dispatch(
      toggleTarget({
        inventoryId: item.id,
        isTaget: item.isTarget,
      })
    )

    toast.success(`Item targeted!`)
  }

  const columns = React.useMemo(() => [
    {
      Header: "ID",
      accessor: "id",
      Filter: NoFilter,
    },
    {
      Header: "Description",
      accessor: (row) => row.description.substring(0, 20) + "...",
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
      Header: "Units Remaining",
      accessor: "qtyRemaining",
      Filter: NoFilter,
    },
    {
      Header: "Unit Cost",
      id: "unitCost",
      accessor: (row) => usdTwoDigits(row.unitCost),
      Filter: NoFilter,
    },
    {
      Header: "Ext Cost",
      id: "extCost",
      accessor: (row) => calculateExtCost(row),
      Filter: NoFilter,
    },
    {
      id: "target",
      Cell: ({ row }) => (
        <button
          onClick={() => targetHandler(row.original)}
          className="px-6 py-2 text-xs font-medium text-indigo-600 hover:text-indigo-700 tracking-wider cursor-pointer hover:bg-gray-200 rounded-lg "
        >
          Target
        </button>
      ),
      Filter: NoFilter,
    },
  ])

  return (
    <NavBar>
      <div className="max-w-7xl mx-auto mt-10">
        <div className="bg-white py-10 px-5 mb-10 rounded-md shadow-md">
          <h3 className="text-3xl">Search Inventory</h3>
          <p className="text-gray-500 pt-2">
            The Search page displays your non-stock inventory and allows you to
            target items that you would like to reduce. As explained on the Readme
            page, this list is comprised of your top 200 non-moving SKUs ordered
            by extended cost. Click the "Target" button to the right of an item
            to target it. Continue to the "Review" page once you are finished.
          </p>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto  bg-white rounded-md shadow-md">
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
