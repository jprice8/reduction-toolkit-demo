import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  {
    id: "1a",
    userFirstName: "George",
    userLastName: "Harrison",
    facility: "Baptist Hospital",
  },
  {
    id: "2a",
    userFirstName: "John",
    userLastName: "Lennon",
    facility: "Methodist Hospital",
  },
  {
    id: "3a",
    userFirstName: "Ringo",
    userLastName: "Starr",
    facility: "University Hospital",
  },
  {
    id: "4a",
    userFirstName: "Paul",
    userLastName: "McCartney",
    facility: "Central Hospital",
  },
]

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
})

export default usersSlice.reducer
