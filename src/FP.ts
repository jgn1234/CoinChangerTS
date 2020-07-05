export { Done, While, gte, gteZero, identity }

import * as Curry from './Curry'

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

const gte = Curry.curry((x: number, y: number): boolean => y>=x)
const gteZero = gte(0)

const identity = <T>(v: T): T => v
