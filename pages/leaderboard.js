import React from "react"
import { useSelector } from "react-redux"

import NavBar from "../shared/components/NavBar"
import NoDetailTable from "../shared/components/NoDetailTable"
import { usdTwoDigits } from "../shared/utils/currencyHelper"
import { NoFilter } from "../shared/utils/tableHelpers"

const Leaderboard = () => {
  const users = useSelector((state) => state.users)
  const plans = useSelector((state) => state.plan)

  // Calculate leaderboard metrics for all directors in
  // Big O(N) time using a hash table.
  const userHm = {}
  const userLookup = {}
  for (let i = 0; i < users.length; i++) {
    // Create hashmap for metrics
    userHm[users[i].id] = {
      plansSubmitted: 0,
      plansFinalized: 0,
      inventoryReduced: 0,
    }

    // Create hashmap for user info
    userLookup[users[i].id] = {
      firstName: users[i].userFirstName,
      facility: users[i].facility,
    }
  }

  for (let j = 0; j < plans.length; j++) {
    let tmpPlan = plans[j]
    let existingUserHm = userHm[tmpPlan.userId]

    // Handle submitted
    existingUserHm.plansSubmitted++

    if (tmpPlan.isFinalized === true) {
      // Handle finalized
      existingUserHm.plansFinalized++
      // Handle reduced
      const ext = tmpPlan.unitCost * tmpPlan.sendQty
      existingUserHm.inventoryReduced += ext
    }
  }

  // Create leaderboard data array for table
  const leaderboardData = []
  const keys = Object.keys(userHm)
  for (let k = 0; k < keys.length; k++) {
    const tmpObject = {}
    // Add user
    tmpObject["user"] = userLookup[keys[k]].firstName
    // Add facility
    tmpObject["facility"] = userLookup[keys[k]].facility
    // Add plans submitted
    tmpObject["plansSubmitted"] = userHm[keys[k]].plansSubmitted
    // Add plans finalized
    tmpObject["plansFinalized"] = userHm[keys[k]].plansFinalized
    // Add ext reduced
    tmpObject["extReduction"] = userHm[keys[k]].inventoryReduced

    leaderboardData.push(tmpObject)
  }

  // Sort by reduction ext
  leaderboardData.sort(function(a, b) {
    return b.extReduction - a.extReduction
  })

  // Rank directors
  for (let d = 0; d < leaderboardData.length; d++) {
    leaderboardData[d]['rank'] = d + 1
  }

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
      Header: "$ Inventory Reduced",
      accessor: row => usdTwoDigits(row.extReduction),
      Filter: NoFilter,
    },
  ])
  return (
    <NavBar>
      <div className="max-w-5xl mx-auto mt-10">
        <div className="bg-white py-10 px-5 mb-10 rounded-md shadow-md">
          <h3 className="text-3xl">Leaderboard</h3>
          <p className="text-gray-500 pt-2">The leaderboard shows up-to-date metrics on how each facility is performing in inventory reduction.</p>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto bg-white rounded-md shadow-md">
            <div className="shadow sm:rounded-lg">
              <NoDetailTable columns={columns} data={leaderboardData} />
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  )
}

export default Leaderboard
