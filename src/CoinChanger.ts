export {coinChanger, makeChange}

type ChangeTracker = {
  remainingChange: number,
  coinsToReturn: string,
}

const Penny = {coin: 'P', value: 1}
const Nickel = {coin: 'N', value: 5}
const Dime = {coin: 'D', value: 10}
const Quarter = {coin: 'Q', value: 25}
const Fifty = {coin: 'F', value: 50}
const Dollar = {coin: 'S', value: 100}

const makeChange = (acc : ChangeTracker, currentCoin : any, ) => {
  let {remainingChange, coinsToReturn} = acc
  while(remainingChange >= currentCoin.value) {
    coinsToReturn += currentCoin.coin
    remainingChange -= currentCoin.value
  }
  return {remainingChange, coinsToReturn}
}

const coinChanger = (changeToMake: number) => {
  const coins = [ Quarter, Dime, Nickel, Penny ]
  
  const res = coins.reduce(makeChange, <ChangeTracker> {remainingChange: changeToMake, coinsToReturn: ''})
  return res.coinsToReturn
}
