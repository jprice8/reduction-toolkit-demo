import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = [
  {
    id: "1a",
    userFirstName: "George",
    userLastName: "Harrison",
    facility: "Baptist Hospital",
    targetedExt: 2000,
    removedExt: 0,
    incomingExt: 0,
  },
  {
    id: "2a",
    userFirstName: "John",
    userLastName: "Lennon",
    facility: "Methodist Hospital",
    targetedExt: 0,
    removedExt: 0,
    incomingExt: 0,
  },
  {
    id: "3a",
    userFirstName: "Ringo",
    userLastName: "Starr",
    facility: "University Hospital",
    targetedExt: 0,
    removedExt: 0,
    incomingExt: 0,
  },
  {
    id: "4a",
    userFirstName: "Paul",
    userLastName: "McCartney",
    facility: "Central Hospital",
    targetedExt: 0,
    removedExt: 0,
    incomingExt: 0,
  },
]

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addTargetedExt(state, action) {
      const { userId, ext } = action.payload
      const existingUser = state.find((u) => u.id === userId)
      if (existingUser) {
        existingUser.targetedExt += ext
      }
    },
    removeTargetedExt(state, action) {
      const { userId, ext } = action.payload 
      const existingUser = state.find((u) => u.id === userId)
      if (existingUser) {
        existingUser.targetedExt -= ext
      }
    },
    addRemovedExt(state, action) {
      const { userId, ext } = action.payload
      const existingUser = state.find((u) => u.id === userId)
      if (existingUser) {
        existingUser.removedExt += ext
      }
    },
  },
})

export const { addTargetedExt, removeTargetedExt, addRemovedExt } = usersSlice.actions
export default usersSlice.reducer
