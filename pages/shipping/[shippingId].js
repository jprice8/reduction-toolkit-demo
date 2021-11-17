import { format } from 'date-fns'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../../shared/components/NavBar'
import { selectShippingById } from '../../shared/redux/shippingSlice'

const ShippingDetail = () => {
  const router = useRouter()
  const { shippingId } = router.query
  const shipping = useSelector((state) => selectShippingById(state, shippingId))
  const formattedShipDate = format(new Date(shipping?.dateShipped), 'PPPpp')
  const formattedArrivalDate = format(new Date(shipping?.dateShipped), 'MMMM d')

  return (
    <NavBar>
      <div className="max-w-5xl mx-auto mt-10">
        <div className="bg-white p-10 rounded-md shadow-md">
          <h2 className="text-4xl">Shipping Details</h2>
          <p className="text-gray-500 pt-1">
            Shipped on {formattedShipDate}
          </p>
        </div>

        <div className="mt-5 rounded-md bg-white shadow-md">
          <div className=" bg-gray-200 p-5 flex justify-between rounded-md">
            <p className="text-gray-700">Shipped {formattedShipDate}</p>
            <p className="text-gray-700">FedEx Confirmation # {shipping?.confirmationNumber}</p>
          </div>
          <div className="p-5 rounded-md space-y-3">
            <p className="text-2xl text-blue-800">Arriving {formattedArrivalDate}</p>
            <p className="text-2xl">{shipping?.description}</p>
            <p className="font-light">IMMS # {shipping?.imms}</p>
            <p className="text-lg">{shipping?.sendQty} units shipped to {shipping?.shippedTo}</p>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default ShippingDetail
