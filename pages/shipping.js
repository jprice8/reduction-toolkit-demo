import React from "react"
import { useSelector } from "react-redux"
import NavBar from "../shared/components/NavBar"
import Table from "../shared/components/Table"
import { selectShippingByUserId } from "../shared/redux/shippingSlice"
import { NoFilter } from "../shared/utils/tableHelpers"

const shippingData = [
  {
    id: 1,
    description: "CATHETER, ARTHRECTROMY CROWN DIAMONDBACK 1.25MM",
    shippedFrom: "872",
    shippedTo: "954",
    dateShipped: "May 10, 2021",
    estimatedDelivery: "May12, 2021",
    confirmationNumber: "123456",
  },

  {
    id: 2,
    description: "CATHETER, ARTHRECTROMY CROWN DIAMONDBACK 1.25MM",
    shippedFrom: "872",
    shippedTo: "954",
    dateShipped: "May 10, 2021",
    estimatedDelivery: "May12, 2021",
    confirmationNumber: "123456",
  },

  {
    id: 3,
    description: "CATHETER, ARTHRECTROMY CROWN DIAMONDBACK 1.25MM",
    shippedFrom: "872",
    shippedTo: "954",
    dateShipped: "May 10, 2021",
    estimatedDelivery: "May12, 2021",
    confirmationNumber: "123456",
  },
]

const Shipping = () => {
  const user = useSelector((state) => state.users[0])
  const shipping = useSelector((state) => selectShippingByUserId(state, user.id))
  console.log(shipping)
  
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
      accessor: "dateShipped",
      Filter: NoFilter,
    },
    {
      Header: "Estimated Arrival",
      accessor: "estimatedArrival",
      Filter: NoFilter,
    },
  ])

  return (
    <NavBar>
      <div className="max-w-7xl mx-auto mt-10">
        <div className="bg-white py-10 px-5 mb-10 rounded-lg">
          <h3 className="text-3xl">Shipping Dashboard</h3>
          <p className="text-gray-500 pt-2">Explain shipping concept.</p>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto bg-white rounded-lg">
            <div className="shadow sm:rounded-lg">
              <Table columns={columns} data={shipping} />
            </div>
          </div>
        </div>
                
      </div>
    </NavBar>
  )
}

export default Shipping
