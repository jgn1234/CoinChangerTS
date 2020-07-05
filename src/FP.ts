export { Done, While, gte, gteZero, identity, pipe }

import * as Curry from './Curry'

const Done = (x: any) => {
  return ({
    name: 'Done',
    x: x,
    attempt: () => Done(x),
    finally: (fn: Function) => {
      return fn(x)
    }
  })
}

const While = (pred: Function, x: any) => {
  return ({
    name: 'While',
    x: x,
    attempt: (fn: Function): any => {
      const y = fn(x)
      const res = pred(x) ? While(pred, y) : Done(x)
      return res.attempt(fn)
    },
    finally: (fn: Function) => x,
  })
}

const gte = Curry.curry((x: number, y: number): boolean => y>=x)
const gteZero = gte(0)

const identity = <T>(v: T): T => v

const pipe = (...fns: Function[]): Function => (x: any): any => fns.reduce((v, f) => f(v), x)

