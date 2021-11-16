import { createSlice } from "@reduxjs/toolkit"

import { createSelector } from "reselect"

const initialState = []

const shippingSlice = createSlice({
  name: "shipping",
  initialState: initialState,
  reducers: {
    shippingAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
    },
  },
})

// Selectors
export const selectShippingByUserId = createSelector(
  [(state) => state.shipping, (state, userId) => userId],
  (shipping, userId) => shipping.filter((s) => s.userId === userId)
)

export const { shippingAdded } = shippingSlice.actions
export default shippingSlice.reducer
