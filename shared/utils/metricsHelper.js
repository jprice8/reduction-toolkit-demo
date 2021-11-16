export const calcCurrentlyTargeted = (targets) => {
  let sum = 0
  for (let i = 0; i < targets.length; i++) {
    let tmpExt = targets[0].unitCost * targets[0].qtyRemaining
    sum += tmpExt
  }
  return sum
}