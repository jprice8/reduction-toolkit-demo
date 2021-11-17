import { createSlice } from "@reduxjs/toolkit"

import { createSelector } from "reselect"

import inventoryCount from "../data/mockInventoryCount2.json"

const initialState = inventoryCount

const inventorySlice = createSlice({
  name: "inventory",
  initialState: initialState,
  reducers: {
    addMovementPlan(state, action) {
      const {
        inventoryId,
        sendQty
      } = action.payload
      const existingInventory = state.find((i) => i.id === inventoryId)

      if (existingInventory) {
        // Increment plan count
        existingInventory.movementPlans += 1
        // Subtract sendQty from remaining qty
        existingInventory.qtyRemaining -= sendQty
      }

      
    },
    toggleTarget(state, action) {
      const { inventoryId, isTarget } = action.payload
      const existingInventory = state.find((i) => i.id === inventoryId)
      if (existingInventory) {
        existingInventory.isTarget = !isTarget
      }
    },
  },
})

// Selectors
export const selectNonTargets = createSelector(
  (state) => state.inventory,
  (inv) => inv.filter((i) => i.isTarget === false)
)

export const selectTargets = createSelector(
  (state) => state.inventory,
  (inv) => inv.filter((i) => i.isTarget === true)
)

export const selectInventoryById = createSelector(
  [(state) => state.inventory, (state, itemId) => itemId],
  (inventory, itemId) =>
    inventory.find((i) => (i.id) === itemId)
)

export const { addMovementPlan, toggleTarget } = inventorySlice.actions
export default inventorySlice.reducer
