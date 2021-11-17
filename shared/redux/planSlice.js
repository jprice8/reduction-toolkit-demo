import { createSlice, nanoid } from "@reduxjs/toolkit"

import { createSelector } from "reselect"

const initialState = []

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
        existingPlan.status = 'accepted'
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
