export {coinChanger, makeChange}

import * as FP from './FP'

type ChangeTracker = {
  remainingChange: number,
  coinsToReturn: string,
}

type Coin = {
  coinId: string,
  value: number,
}

type ChangeTrackerCoin = {
  tracker: ChangeTracker,
  coin: Coin,
}

const Penny: Coin = {coinId: 'P', value: 1}
const Nickel: Coin = {coinId: 'N', value: 5}
const Dime: Coin = {coinId: 'D', value: 10}
const Quarter: Coin = {coinId: 'Q', value: 25}
const Fifty: Coin = {coinId: 'F', value: 50}
const Dollar: Coin = {coinId: 'S', value: 100}

const moreChange = ({tracker, coin} : ChangeTrackerCoin) => FP.gteZero(tracker.remainingChange)

const makeChangeForCoin = ({tracker, coin} : ChangeTrackerCoin) => {
  const remainingChange = tracker.remainingChange - coin.value
  const coinsToReturn = tracker.coinsToReturn + coin.coinId
  return ({
    tracker: {remainingChange, coinsToReturn },
    coin,
  })
}

const makeChange = (acc : ChangeTracker, currentCoin : Coin, ) => 
    FP.While(moreChange, <ChangeTrackerCoin> {tracker: acc, coin: currentCoin})
      .attempt(makeChangeForCoin)
      .finally((result: ChangeTrackerCoin)=>result.tracker)

const coinChanger = (changeToMake: number) => {
  const coins = [ Quarter, Dime, Nickel, Penny ]
  
  const res = coins.reduce(makeChange, <ChangeTracker> {remainingChange: changeToMake, coinsToReturn: ''})
  return res.coinsToReturn
}