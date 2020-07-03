export {coinChanger, makeChange}

type ChangeTracker = {
  remainingChange: number,
  coinsToReturn: string,
}

const makeChange = (acc : ChangeTracker, currentCoin : any, ) => {
  let {remainingChange, coinsToReturn} = acc
  while(remainingChange >= currentCoin.value) {
    coinsToReturn += currentCoin.coin
    remainingChange -= currentCoin.value
  }
  return {remainingChange, coinsToReturn}
}

const coinChanger = (changeToMake: number) => {
  const coins = [
    {coin:'Q', value: 25},
    {coin:'D', value: 10},
    {coin:'N', value: 5},
    {coin:'P', value: 1},
  ]
  
  const res = coins.reduce(makeChange, <ChangeTracker> {remainingChange: changeToMake, coinsToReturn: ''})
  return res.coinsToReturn
}