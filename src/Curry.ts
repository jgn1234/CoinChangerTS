export { curry }

// /* https://www.freecodecamp.org/news/typescript-curry-ramda-types-f747e99744ab/ */
// /* https://github.com/pirix-gh/medium/blob/master/types-curry-ramda/src/index.ts */
// https://www.synthesis.co.za/functional-fun-typescript-generics/

type Cast<X, Y> = X extends Y ? X : Y

type Length<T extends any[]> =
    T['length']

type Prepend<E, T extends any[]> =
    ((head: E, ...args: T) => any) extends ((...args: infer U) => any)
    ? U
    : T

type Params<F extends (...args: any[]) => any> = 
    F extends ((...args: infer A) => any)
    ? A
    : never

type Head<T extends any[]> =
    T extends [any, ...any[]]
    ? T[0]
    : never

type Tail<T extends any[]> =
    ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any)
    ? TT
    : []

type HasTail<T extends any[]> =
    T extends ([] | [any])
    ? false
    : true

type Pos<I extends any[]> =
    Length<I>

type Next<I extends any[]> =
    Prepend<any, I>

type Prev<I extends any[]> =
    Tail<I>

type Iterator<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
  0: Iterator<Index, Next<From>, Next<I>>
  1: From
}[
  Pos<I> extends Index
  ? 1 
  : 0
]

type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
  0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>
  1: R
}[
  Pos<I> extends Length<T>
  ? 1 
  : 0
]

type Drop<N extends number, T extends any[], I extends any[] = []> = {
  0: Drop<N, Tail<T>, Prepend<any, I>>
  1: T
}[
  Length<I> extends N
  ? 1 
  : 0
]

type Concat<T1 extends any[], T2 extends any[]> =
    Reverse<Reverse<T1> extends infer R ? Cast<R, any[]> : never, T2>

type Append<E, T extends any[]> =
    Concat<T, [E]>

type ObjectInfer<O> =
    O extends { a: infer A }
    ? A             // If true
    : never         // If false

type FunctionInfer<F> =
    F extends (...args: infer A) => infer R
    ? [A, R]        // If true
    : never         // If false

type ClassInfer<I> =
    I extends Promise<infer G>
    ? G
    : never
 
type ArrayInfer<T> =
    T extends (infer U)[]
    ? U
    : never

type TupleInfer<T> =
    T extends [infer A, ...(infer B)[]]
    ? [A, B]
    : never

type Curry1<A, R> = (a: A) => R;

type Curry2<A, B, R> = {
    (a: A): Curry1<B, R>;
    (a: A, b: B): R;
};

type Curry3<A, B, C, R> = {
    (a: A): Curry2<B, C, R>;
    (a: A, b: B): Curry1<C, R>;
    (a: A, b: B, c: C): R;
};

type Curry4<A, B, C, D, R> = {
    (a: A): Curry3<B, C, D, R>;
    (a: A, b: B): Curry2<C, D, R>;
    (a: A, b: B, c: C): Curry1<D, R>;
    (a: A, b: B, c: C, d: D): R;
};

type Curry5<A, B, C, D, E, R> = {
    (a: A): Curry4<B, C, D, E, R>;
    (a: A, b: B): Curry3<C, D, E, R>;
    (a: A, b: B, c: C): Curry2<D, E, R>;
    (a: A, b: B, c: C, d: D): Curry1<E, R>;
    (a: A, b: B, c: C, d: D, e: E): R;
};

type Curry6<A, B, C, D, E, F, R> = {
    (a: A, ): Curry5<B, C, D, E, F, R>;
    (a: A, b: B): Curry4<C, D, E, F, R>;
    (a: A, b: B, c: C): Curry3<D, E, F, R>;
    (a: A, b: B, c: C, d: D): Curry2<E, F, R>;
    (a: A, b: B, c: C, d: D, e: E): Curry1<F, R>;
    (a: A, b: B, c: C, d: D, e: E, f: F): R;
};

type VariadicCurry<T, R> =
    T extends [any, any, any, any, any, any] ? Curry6<T[0], T[1], T[2], T[3], T[4], T[5], R> :
    T extends [any, any, any, any, any] ? Curry5<T[0], T[1], T[2], T[3], T[4], R> :
    T extends [any, any, any, any] ? Curry4<T[0], T[1], T[2], T[3], R> :
    T extends [any, any, any] ? Curry3<T[0], T[1], T[2], R> :
    T extends [any, any] ? Curry2<T[0], T[1], R> :
    T extends [any] ? Curry1<T[0], R> :
    unknown
;

const curry = <T extends any[], R>(func: (...args: T) => R): VariadicCurry<T, R> => {
//@ts-ignore    
  return function curried(...args: T) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2: Tail<T>) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}
