import { createSlice, nanoid } from "@reduxjs/toolkit"

import { createSelector } from "reselect"

const initialState = [
  // {
  //   id: nanoid(),
  //   dateSubmitted: new Date().toISOString(),
  //   inventoryId: "1aa",
  //   userId: "4a",
  //   facilityName: "Central Hospital",
  //   sendQty: 4,
  //   decision: "sell",
  //   destination: "other",
  //   unitCost: 100.0,
  //   imms: "292929",
  //   description: "INTRODUCER, STEALTH 30MM",
  // },
]

const planSlice = createSlice({
  name: "plan",
  initialState: initialState,
  reducers: {
    planAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
    },
  },
})

// Selectors
export const selectPlansByItemId = createSelector(
  [(state) => state.plan, (state, itemId) => itemId],
  (plan, itemId) => plan.filter((p) => p.inventoryId === itemId)
)

export const selectPlansByUserId = createSelector(
  [(state) => state.plan, (state, userId) => userId],
  (plan, userId) => plan.filter((p) => p.userId === userId)
)

export const selectPlanById = createSelector(
  [(state) => state.plan, (state, planId) => planId],
  (plan, planId) => plan.find((p) => p.id === planId)
)

export const { planAdded } = planSlice.actions

export default planSlice.reducer
