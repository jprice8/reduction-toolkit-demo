import { createSlice, nanoid } from "@reduxjs/toolkit"

import { createSelector } from "reselect"

const initialState = [
  {
    id: nanoid(),
    inventoryId: "1a",
    userId: "1a",
    sendQty: 5,
    decision: "system",
    unitCost: 100.0,
    imms: "123456",
    description: "HONKY TONK",
    status: "accepted",
    isFinalized: true,
    shippedFrom: "Baptist Hospital",
    shippedTo: "University Hospital",
    dateShipped: new Date().toISOString(),
    estimatedArrival: "2021-11-17",
    confirmationNumber: "1234567",
  },
]

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
