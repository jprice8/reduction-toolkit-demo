import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

const initialState = [
  {
    id: 1,
    userFirstName: "George",
    userLastName: "Harrison",
    facility: "Baptist Hospital",
  },
  {
    id: 2,
    userFirstName: "John",
    userLastName: "Lennon",
    facility: "Methodist Hospital",
  },
  {
    id: 3,
    userFirstName: "Ringo",
    userLastName: "Starr",
    facility: "University Hospital",
  },
  {
    id: 4,
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
