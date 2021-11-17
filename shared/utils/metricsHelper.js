export const calcCurrentlyTargeted = (inventory) => {
  let targeted = 0

  // Loop through inventory items
  for (let i = 0; i < inventory.length; i++) {
    const ext = inventory[i].unitCost * inventory[i].qtyRemaining
    // If the item is targeted, add the ext to removed
    if (inventory[i].isTarget === 'true') {
      targeted += ext
    }
  }

  // Return targeted ext
  return targeted
}

export const calcRemovedInventory = (plans) => {
  let removed = 0

  // Loop through plans
  for (let i = 0; i < plans.length; i++) {
    // If the plan is finalized, add the ext to removed
    if (plans[i].isFinalized === true) {
      const ext = plans[i].unitCost * plans[i].sendQty
      removed += ext
    }
  }

  // Return removed ext
  return removed
}

export const calcPlansCompleted = (plans) => {
  let completed = 0

  // Loop through plans
  for (let i = 0; i < plans.length; i++) {
    // If the plan is finalized, add one to completed
    if (plans[i].isFinalized === true) {
      completed++
    }
  }

  // Return completed plans number
  return completed
}