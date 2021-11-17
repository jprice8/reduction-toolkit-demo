import { createSlice, nanoid } from "@reduxjs/toolkit"

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

export const selectShippingById = createSelector(
  [(state) => state.shipping, (state, shippingId) => shippingId],
  (shipping, shippingId) => shipping.find((s) => s.id === shippingId)
)

export const { shippingAdded } = shippingSlice.actions
export default shippingSlice.reducer
