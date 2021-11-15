import React from "react"
import NavBar from "../../shared/components/NavBar"
import Table from "../../shared/components/Table"
import { NoFilter, calculateExtCost } from "../../shared/utils/tableHelpers"

import { targetData } from "../../shared/data/targetData"

const Review = () => {
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
      Header: "Plans Set",
      accessor: "plansSet",
      Filter: NoFilter,
    },
    {
      Header: "Units Remaining",
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
      accessor: (row) => calculateExtCost(row),
      Filter: NoFilter,
    },
  ])
  return (
    <NavBar>
      <div className="max-w-6xl mx-auto mt-10">
        <div className="bg-white py-10 px-5 mb-10 rounded-lg">
          <h3 className="text-3xl">Review Target Items</h3>
          <p className="text-gray-500 pt-2">Explain review target items concept.</p>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto bg-white rounded-lg">
            <div className="shadow sm:rounded-lg">
              <Table columns={columns} data={targetData} detailPath="review" />
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default Review
