import { createSlice } from "@reduxjs/toolkit"

import { createSelector } from "reselect"

import inventoryCount from "../../mockInventoryCount.json"

const initialState = inventoryCount

// const initialState = [
//   {
//     id: "1a",
//     facilityName: "Baptist Hospital",
//     description: "BLADE",
//     imms: "123456",
//     qtyRemaining: 10,
//     unitCost: 100.0,
//     isTarget: true,
//     movementPlans: 1,
//     systemOutlook: [
//       {
//         facilityName: "Central Hospital",
//         countQty: 0,
//         poQty: 12,
//         issueQty: 0,
//       },
//       {
//         facilityName: "Methodist Hospital",
//         countQty: 0,
//         poQty: 24,
//         issueQty: 0,
//       },
//       {
//         facilityName: "University Hospital",
//         countQty: 0,
//         poQty: 0,
//         issueQty: 0,
//       },
//     ],
//   },

//   {
//     id: "2a",
//     facilityName: "Baptist Hospital",
//     description: "SCALPEL",
//     imms: "234567",
//     qtyRemaining: 5,
//     unitCost: 200.0,
//     isTarget: false,
//     movementPlans: 0,
//     systemOutlook: [
//       {
//         facilityName: "Central Hospital",
//         countQty: 20,
//         poQty: 100,
//         issueQty: 0,
//       },
//       {
//         facilityName: "Methodist Hospital",
//         countQty: 10,
//         poQty: 50,
//         issueQty: 0,
//       },
//       {
//         facilityName: "University Hospital",
//         countQty: 0,
//         poQty: 0,
//         issueQty: 0,
//       },
//     ],
//   },

//   {
//     id: "3a",
//     facilityName: "Baptist Hospital",
//     description: "CATHETER",
//     imms: "345678",
//     qtyRemaining: 10,
//     unitCost: 200.0,
//     isTarget: true,
//     movementPlans: 0,
//     systemOutlook: [
//       {
//         facilityName: "Central Hospital",
//         countQty: 80,
//         poQty: 300,
//         issueQty: 0,
//       },
//       {
//         facilityName: "Methodist Hospital",
//         countQty: 40,
//         poQty: 150,
//         issueQty: 0,
//       },
//       {
//         facilityName: "University Hospital",
//         countQty: 20,
//         poQty: 80,
//         issueQty: 0,
//       },
//     ],
//   },
// ]

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
      const { inventoryId } = action.payload
      const existingInventory = state.find((i) => i.id === inventoryId)
      if (existingInventory) {
        // existingInventory.isTarget = !isTarget
        if (existingInventory.isTarget === 'false') {
          existingInventory.isTarget = 'true'
        } else {
          existingInventory.isTarget = 'false'
        }
      }
    },
  },
})

// Selectors
export const selectNonTargets = createSelector(
  (state) => state.inventory,
  (inv) => inv.filter((i) => i.isTarget === "false")
)

export const selectTargets = createSelector(
  (state) => state.inventory,
  (inv) => inv.filter((i) => i.isTarget === "true")
)

export const selectInventoryById = createSelector(
  [(state) => state.inventory, (state, itemId) => itemId],
  (inventory, itemId) =>
    inventory.find((i) => (i.id) === itemId)
)

export const { addMovementPlan, toggleTarget } = inventorySlice.actions
export default inventorySlice.reducer
