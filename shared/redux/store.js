import { configureStore } from "@reduxjs/toolkit"
import inventorySlice from "./inventorySlice"
import usersSlice from "./usersSlice"

export default configureStore({
  reducer: {
    user: usersSlice,
    inventory: inventorySlice,
  },
})
