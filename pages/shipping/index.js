import { format } from "date-fns"
import React from "react"
import { useSelector } from "react-redux"
import NavBar from "../../shared/components/NavBar"
import Table from "../../shared/components/Table"
import { selectShippingByUserId } from "../../shared/redux/shippingSlice"
import { NoFilter } from "../../shared/utils/tableHelpers"

const Shipping = () => {
  const user = useSelector((state) => state.users[0])
  const shipping = useSelector((state) => selectShippingByUserId(state, user.id))
  
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
      Header: "Shipped From",
      accessor: "shippedFrom",
    },
    {
      Header: "Shipped To",
      accessor: "shippedTo",
    },
    {
      Header: "Date Shipped",
      accessor: row => format(new Date(row.dateShipped), 'PPpp'),
      Filter: NoFilter,
    },
    {
      Header: "Estimated Arrival",
      accessor: row => format(new Date(row.estimatedArrival), 'PPpp'),
      Filter: NoFilter,
    },
  ])

  return (
    <NavBar>
      <div className="max-w-7xl mx-auto mt-10">
        <div className="bg-white py-10 px-5 mb-10 rounded-md shadow-md">
          <h3 className="text-3xl">Shipping Dashboard</h3>
          <p className="text-gray-500 pt-2">The shipping dashboard lets you track items you have shipped to other facilities.</p>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto bg-white rounded-md shadow-md">
            <div className="shadow sm:rounded-lg">
              <Table columns={columns} data={shipping} detailPath="shipping" />
            </div>
          </div>
        </div>
                
      </div>
    </NavBar>
  )
}

export default Shipping
