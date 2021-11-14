import React from "react"
import NavBar from "../shared/components/NavBar"
import Table from "../shared/components/Table"
import LeaderboardTable from "../components/leaderboard/LeaderboardTable"
import { NoFilter } from "../shared/utils/tableHelpers"

const leaderboardData = [
  {
    rank: 1,
    user: "Alex",
    facility: "North Central Baptist Hospital",
    plansSubmitted: 20,
    plansFinalized: 17,
    extReduction: "$21,272.33",
  },
  {
    rank: 2,
    user: "Alex",
    facility: "North Central Baptist Hospital",
    plansSubmitted: 20,
    plansFinalized: 17,
    extReduction: "$21,272.33",
  },
  {
    rank: 3,
    user: "Alex",
    facility: "North Central Baptist Hospital",
    plansSubmitted: 20,
    plansFinalized: 17,
    extReduction: "$21,272.33",
  },
]

const Leaderboard = () => {
  const columns = React.useMemo(() => [
    {
      Header: "Rank",
      accessor: "rank",
      Filter: NoFilter,
    },
    {
      Header: "User",
      accessor: "user",
    },
    {
      Header: "Facility",
      accessor: "facility",
    },
    {
      Header: "Plans Submitted",
      accessor: "plansSubmitted",
      Filter: NoFilter,
    },
    {
      Header: "Plans Finalized",
      accessor: "plansFinalized",
      Filter: NoFilter,
    },
    {
      Header: "Inventory Reduced",
      accessor: "extReduction",
      Filter: NoFilter,
    },
  ])
  return (
    <NavBar>
      <div className="max-w-5xl mx-auto mt-10">
        <div className="bg-white py-10 px-5 mb-10 rounded-lg">
          <h3 className="text-3xl">Leaderboard</h3>
          <p className="text-gray-500 pt-2">Explain the leaderboard concept.</p>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto bg-white rounded-lg">
            <div className="shadow sm:rounded-lg">
              <LeaderboardTable columns={columns} data={leaderboardData} />
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default Leaderboard
