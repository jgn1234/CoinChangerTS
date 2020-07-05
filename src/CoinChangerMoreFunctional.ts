export {coinChanger, makeChange}

import * as FP from './FP'

type Tracker = {
  remainingChange: number,
  coinsToReturn: string,
}

type Coin = {
  coinId: string,
  value: number,
}

type TrackerCoin = {
  tracker: Tracker,
  coin: Coin,
}

const Penny: Coin = {coinId: 'P', value: 1}
const Nickel: Coin = {coinId: 'N', value: 5}
const Dime: Coin = {coinId: 'D', value: 10}
const Quarter: Coin = {coinId: 'Q', value: 25}
const Fifty: Coin = {coinId: 'F', value: 50}
const Dollar: Coin = {coinId: 'S', value: 100}

const makeTrackerCoin = (tracker: Tracker, coin: Coin): TrackerCoin => ({tracker, coin})

const moreChange = ({tracker, coin} : TrackerCoin) => FP.gteZero(tracker.remainingChange)

const calcRemainingChange = ({tracker, coin} : TrackerCoin) => tracker.remainingChange - coin.value
const calcCoinsToReturn = ({tracker, coin} : TrackerCoin) => tracker.coinsToReturn + coin.coinId

const makeChangeForCoin = ({tracker, coin} : TrackerCoin) => {
  const remainingChange = calcRemainingChange({tracker, coin})
  const coinsToReturn = calcCoinsToReturn({tracker, coin})
  const newTracker = FP.pipe()
  return makeTrackerCoin({remainingChange, coinsToReturn}, coin)
}

const makeChange = (acc : Tracker, currentCoin : Coin, ) => 
    FP.While(moreChange, makeTrackerCoin(acc, currentCoin))
      .attempt(makeChangeForCoin)
      .finally((result: TrackerCoin)=>result.tracker)

const coinChanger = (changeToMake: number) => {
  const coins = [ Quarter, Dime, Nickel, Penny ]
  
  const res = coins.reduce(makeChange, <Tracker> {remainingChange: changeToMake, coinsToReturn: ''})
  return res.coinsToReturn
}