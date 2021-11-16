import { configureStore } from "@reduxjs/toolkit"
import inventorySlice from "./inventorySlice"
import planSlice from "./planSlice"
import usersSlice from "./usersSlice"

export default configureStore({
  reducer: {
    users: usersSlice,
    inventory: inventorySlice,
    plan: planSlice,
  },
})
