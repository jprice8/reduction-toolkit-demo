import { createSlice, nanoid } from "@reduxjs/toolkit"

import { createSelector } from "reselect"

const initialState = [
  {
    id: nanoid(),
    dateSubmitted: new Date().toISOString(),
    inventoryId: "1a",
    userId: "1a",
    facilityName: "Baptist Hospital",
    sendQty: 5,
    decision: "system",
    destination: "University Hospital",
    unitCost: 100.0,
    imms: "123456",
    description: "BLADE",
    status: "accepted",
    acceptedQty: 5,
    acceptedExt: 500.0,
    isFinalized: false,
  },
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
    finalizePlan(state, action) {
      const { planId } = action.payload
      const existingPlan = state.find((p) => p.id === planId)
      if (existingPlan) {
        existingPlan.isFinalized = true
      }
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

export const selectCompletedUserPlans = createSelector(
  [(state) => state.plan, (state, userId) => userId],
  (plan, userId) => plan.filter((p) => p.userId === userId && p.isFinalized === true)
)

export const selectNonCompletedUserPlans = createSelector(
  [(state) => state.plan, (state, userId) => userId],
  (plan, userId) => plan.filter((p) => p.userId === userId && p.isFinalized === false)
)

export const { planAdded, finalizePlan } = planSlice.actions

export default planSlice.reducer
