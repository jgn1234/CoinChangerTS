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

const makeTracker = (remainingChange: number, coinsToReturn: string,): Tracker => 
  ({remainingChange, coinsToReturn})

const makeTrackerCoin = (tracker: Tracker, coin: Coin): TrackerCoin => 
  ({tracker, coin})

const moreChange = ({tracker, coin}: TrackerCoin): Boolean => 
  FP.gte(coin.value, tracker.remainingChange)

const calcRemainingChange = ({tracker, coin}: TrackerCoin): TrackerCoin => 
  makeTrackerCoin(makeTracker(tracker.remainingChange - coin.value, tracker.coinsToReturn), coin)

const calcCoinsToReturn = ({tracker, coin}: TrackerCoin): TrackerCoin => 
  makeTrackerCoin(makeTracker(tracker.remainingChange, tracker.coinsToReturn + coin.coinId), coin)

const makeChangeForCoin = (trackerCoin : TrackerCoin) => {
  return FP.pipe(calcRemainingChange, calcCoinsToReturn)(trackerCoin)
}

const returnTracker = (trackerCoin: TrackerCoin): Tracker => trackerCoin.tracker

const makeChange = (acc: Tracker, currentCoin: Coin, ): Tracker => {
  return(
    FP.While(moreChange, makeTrackerCoin(acc, currentCoin))
      .attempt(makeChangeForCoin)
      .finally(returnTracker)
  )
}

const coinChanger = (changeToMake: number): string => {
  const coins = [ Quarter, Dime, Nickel, Penny ]
  
  const res: Tracker = coins.reduce(makeChange, makeTracker(changeToMake, ''))
  return res.coinsToReturn
}
