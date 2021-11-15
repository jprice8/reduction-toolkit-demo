import { createSlice } from "@reduxjs/toolkit";

import searchInventory from "../../search_inventory_data.json"

const initialState = searchInventory

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: initialState,
  reducers: {
    updateNestedMovementPlan(state, action) {
      const {
        inventoryId,
        
      }
    }
  }
})