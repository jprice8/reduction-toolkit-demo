import { configureStore } from "@reduxjs/toolkit"
import inventorySlice from "./inventorySlice"
import planSlice from "./planSlice"
import usersSlice from "./usersSlice"
import shippingSlice from "./shippingSlice"

export default configureStore({
  reducer: {
    users: usersSlice,
    inventory: inventorySlice,
    plan: planSlice,
    shipping: shippingSlice,
  },
})
