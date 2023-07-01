# TS

https://masteringnuxt.com/nuxt3/lessons

ECMAScript - specification. The latest is ECMAScript 2022.

JavaScript - one of realization/implementation of ECMAScript specification.

`  backticks character

TypeScript is a static type-checker.

TypeScript’s core values:
* much of the time, you will know better than TypeScript

## English
* message bubble
* so there’s a tradeoff on what sorts of things a type-checker finds acceptable
* but generally speaking
* it pays for itself in the long run
* more thorough checks
* we can opt out of them individually
* simultaneously
* Much like something
* to narrow the union with code help

## Best Practices

* avaid any
* use interface until you need to use features from type
* let TS to infer the types
* use tuples where it's nessesary
* always prefer parameters with union types instead of overloads when possible

## Type annotations

The `: string` here is type annotation.

```ts
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
```

You can read that signature as `greet takes a person of type string, and a date of type Date`.

**Type annotations never change the runtime behavior of your program.**

Type annotations aren’t part of JavaScript (or ECMAScript to be pedantic), so **there really aren’t any browsers or other runtimes that can just run TypeScript unmodified**.

`Downleveling` - the process of moving from a newer or "higher" version of ECMAScript down to an older or "lower" one. For `tsc` compiler the `--target ES3` is a defaut option.

The `tsc` compiler compiles or transforms `.ts` files into `.js` files.

## Types string, number, and boolean

The type names `String`, `Number`, and `Boolean` (starting with capital letters) are legal, but refer to some special built-in types that will very rarely appear in your code. Always use `string`, `number`, or `boolean` for types.

Using `any` disables all further type checking, and it is assumed you know the environment better than TypeScript.

`contextual typing` is a process when the context that the function occurred within informs what type it should have. For example:

```ts
// TS is able to infer that s is going to be string type
const names = ["Alice", "Bob", "Eve"];
names.forEach((s) => {
  console.log(s.toUpperCase());
});
```

## Object Types

You can use `,` or `;` to separate the properties of an object type.

## Union Types

`Union type` is a type formed from two or more other types, representing values that may be any one of those types. Each member is called a union member.

```ts
function printId(id: number | string) {
  console.log(id);
}
```

## Type alias (named type)

`Type alias` - a name for any type.

**Being concerned only with the structure and capabilities of types is why we call TypeScript a structurally typed type system.**

## Differences Between Type Aliases and Interfaces

1. Both used to describe shape of an object/function.
2. **Unilke an interface, a type alias is used for primitives, unions, tuples**

    ```ts
    type Name = string;
    type Code = string | number;
    type Data = [number, string];
    ```

3. Both can be extended (extends and &)
4. Both can be used by a class with `implements`
    * Note: class cannon `implements` union types

## Type assertion

`Type assertion` allows you to set the type of a value and tell the compiler not to infer it.

```ts
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

*Reminder:* Because type assertions are removed at compile-time, there is no runtime checking associated with a type assertion. There won’t be an exception or null generated if the type assertion is wrong.

## Literal Types

The string literal types allow you to define a type that accepts only one specified string literal. They are not usefull really. But we can use the string literal types with union types and type aliases to define types that accept a finite set of string literals.

```ts
let mouseEvent: 'click' | 'dblclick' | 'mouseup' | 'mousedown';
```

We can use `as const` to convert the entire object to be type literals. The `as const` suffix acts like `const` but for the type system, ensuring that all properties are assigned the literal type instead of a more general version like `string` or `number`.

## Narrowing

`Narrowing` is a process of refining types to more specific types
We can use `narrowing` to check for values that might be null, the type guard is used here:

```ts
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  }
}
```

`Type guard` is some expression that performs a runtime check that guarantees the type in some scope. For example,

```ts
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") { // now we know that string is 100% an array
    for (const s of strs) {}
  } else if (typeof strs === "string") {}
}
```

Type guards:

* typeof guard
* Truthiness guard (if (something), if (!!something))
* Equality narrowing
* The in operator narrowing
* instanceof narrowing
* Assignments
* control flow analysis
* type predicates
* Discriminated unions

Writing `!` after any expression is effectively a type assertion that the value isn’t `null` or `undefined`:

```ts
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

`x != null` or `x != underfined` removes both `null` and `underfind` from the type

https://www.typescriptlang.org/docs/handbook/2/narrowing.html

`never` type is assignable to every type; however, no type is assignable to never (except never itself).
It's nice to use it in switch for default in order not to miss a new case.

## Generics

The generics are all about relating two or more values with the same type.
`generics` are used when we want to describe a correspondence between two values. We do this by declaring a type parameter in the function signature:

```ts
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
```

We constrain the type parameter to a type by writing an extends clause:

```ts
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
```

## Overload signatures

This example has 2 overload signatures (overloads) and implementation signature ( function implementation).

```ts
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
```
