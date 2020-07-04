export {coinChanger, makeChange}

const Done = (x: any) => {
  return ({
    attempt: () => Done(x),
    finally: (fn: Function) => fn(x),
  })
}

const While = (pred: Function, x: any) => {
  return ({
    attempt: (fn: Function): any => {
      const y = fn(x)
      const res = pred(y) ? While(pred, y) : Done(x)
      return res.attempt(fn)
    },
    finally: (fn: Function) => x,
  })
}

const gte = (x: number, y: number): boolean => y>=x
const identity = <T>(v: T): T => v

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

const moreChange = ({tracker, coin} : ChangeTrackerCoin) => gte(0,tracker.remainingChange)
// const moreChange = ({tracker, coin} : {tracker: ChangeTracker, coin: Coin}) => gte(0,tracker.remainingChange)

const makeChangeForCoin = ({tracker, coin} : ChangeTrackerCoin) => {
  const remainingChange = tracker.remainingChange - coin.value
  const coinsToReturn = tracker.coinsToReturn + coin.coinId
  return ({
    tracker: {remainingChange, coinsToReturn },
    coin,
  })
}

const makeChange = (acc : ChangeTracker, currentCoin : Coin, ) => 
    While(moreChange, <ChangeTrackerCoin> {tracker: acc, coin: currentCoin})
      .attempt(makeChangeForCoin)
      .finally((result: ChangeTrackerCoin)=>result.tracker)

const coinChanger = (changeToMake: number) => {
  const coins = [ Quarter, Dime, Nickel, Penny ]
  
  const res = coins.reduce(makeChange, <ChangeTracker> {remainingChange: changeToMake, coinsToReturn: ''})
  return res.coinsToReturn
}