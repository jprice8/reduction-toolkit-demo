import { createSlice } from "@reduxjs/toolkit"

import { createSelector } from "reselect"

const initialState = [
  {
    id: 1,
    facilityName: 'Baptist Hospital',
    description: 'BLADE',
    imms: '123456',
    qtyRemaining: 10,
    unitCost: 100.00,
    isTarget: false,
    movementPlans: []
  },
  {
    id: 2,
    facilityName: 'Baptist Hospital',
    description: 'SCALPEL',
    imms: '234567',
    qtyRemaining: 5,
    unitCost: 200.00,
    isTarget: false,
    movementPlans: []
  },
  {
    id: 3,
    facilityName: 'Baptist Hospital',
    description: 'CATHETER',
    imms: '345678',
    qtyRemaining: 10,
    unitCost: 200.00,
    isTarget: true,
    movementPlans: []
  },
]

const inventorySlice = createSlice({
  name: "inventory",
  initialState: initialState,
  reducers: {
    updateNestedMovementPlan(state, action) {
      const {
        userId,
        inventoryId,
        facilityName,
        sendQty,
        decision,
        destination,
      } = action.payload
      const existingInventory = state.find((i) => i.id === inventoryId)
      if (existingInventory) {
        existingInventory.movementPlans.userId = userId
        existingInventory.movementPlans.facilityName = facilityName
        existingInventory.movementPlans.sendQty = sendQty
        existingInventory.movementPlans.decision = decision
        existingInventory.movementPlans.destination = destination
        existingInventory.movementPlans.dateSubmitted = new Date().toISOString()
        existingInventory.movementPlans.isFinalized = false
      }
    },
    toggleTarget(state, action) {
      const { inventoryId, isTarget } = action.payload
      const existingInventory = state.find((i) => i.id === inventoryId)
      if (existingInventory) {
        existingInventory.isTarget = !isTarget
      }
    }
  },
})

// Selectors
export const selectNonTargets = createSelector(
  (state) => state.inventory,
  (inv) => inv.filter((i) => i.isTarget === false)
)

export const { updateNestedMovementPlan, toggleTarget } = inventorySlice.actions
export default inventorySlice.reducer
