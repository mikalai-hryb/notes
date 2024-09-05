# TypeScript

## something

TypeScript is a strongly typed language that is superset of Javascript, meaning that JavaScript programs are valid TypeScript programs, but not the other way around.
TypeScript is statically typed language.
It is like JS on steroids.
TS extends the capabilities of JS with a powerful type system.
Some IDE can have built-in TS compiler which highlights the errors even if you don't have TS installed.

Static type system of TS is key feature.
Type system can automatically infer the types of most variables automatically.
The powerful type inference feature is killer feature.

TS Compiler
NodeJS runtime

to run a TS file we need to compile it first

```bash
npm install -g typescript
tsc --noEmitOnError 01-why-typescript.ts  # do not produce a JS file if any errors arise
tsc --watch --noEmitOnError --noImplicitAny --strictNullChecks --outDir ./dist 01-why-typescript.ts  # run the compiler in watch mode
node 01-why-typescript.js
```

### const, let, var

`const` can only be initialized once.

`let` can be mutated after being initialized.

`let` and `const` are scoped (between curly braces) compared to `var`.

### Numbers

10 and 10.2 (floating point number) are numbers

### Strings

Strings in JS are immutable.

### Should I use semicolons in the end of a line in TS?

### Booleans

Boolean is a flag, it can take only `true` or `false` values.

### What is Type Inference?

This is when the compiler is constantly trying to guess the types of each variable.

### When to use Type Annotations?

in functions (for parameters and return)

### How to determine the type of a variable in JS?

```js
typeof variableName
```

It returns JS runtime type and it's a string (`'number'`, `'string'`, `'object'`, ...)

### Provide examples of implicit and explicit types?

```ts
const car: string = 'Audi TT' // explicit type
const car = 'Audi TT' // implicit type, type is inferred by TypeScript type inference system
```

### What is the difference between `undefined` and `null`?

`undefined` means the variable has not yet been initialized (variable has been declared but no value has been assigned to it yet).
The value `undefined` is automatically assigned by the JS runtime to a variable that has no value defined yet.

`null` means an empty or non-existent value. Null is assigned, and explicitly means nothing.
We use `null` when we want to say that sometimes a variable can be empty (has no value).

`undefined` and `null` are falsy (not truthy)

### What is Optional Chaining?

The optional chaining (`?.`) operator accesses an object's property or calls a function.

```ts
let course = {}
if (course?.title) {console.log('present')} // course?.title returns undefined
```

Note: don't overuse the optional chaining operator, there is a chance that you need to implement error handling logic in order to reduce optional chaining operator uses.

### What is Null Coalescing?

The nullish coalescing (`??`) operator is a logical operator that returns its right-hand side operand when its left-hand side operand is `null` or `undefined`, and otherwise returns its left-hand side operand.

```ts
let course = null
const title = course?.textFields?.title ?? "No title found"
```

### What is any type?

`any` type is something to avoid in your program.

`any` type essentially bypasses completely the type system.

`any` makes our program not type safe anymore (you will stop getting any sort of compilation errors).

Type inference mechanism can implicitly assign `any` type to a variable in some situations. This is called implicit `any`. You can face it in functions' declarations. The best practice is to turn implicit `any` off and add the proper types.

### Union types

```ts
const id: number | string = 1000
const keys: (number | string) [] = [1, 2, "3"]
const numbers: number[] | string[] = [1, 2, 3]
let courseId: number | null = 1000;
```

### What is non-null assertion operator?

The non-null assertion operator is an exclamation mark (`!`), and this is placed after the variable or expression that we want to tell TypeScript isn't null or undefined.

You should use it sparingly.
Under the hood, the non-null assertion operator tells the compiler to bypass the compile time check.

```ts
let courseId : number | null
courseId!.toString() // we are saying that courseId will not be a null

let abc: number
abc = courseId!
```

### What are Literal Types?

This is when the compiler creates types that correspond to only one value of a primitive type.

If you assign a constant with an initial value, the type of that constant is not going to be associated type.

```ts
const title = "TypeScript Bootcamp";  // the type here is only this string
const lessonsCount = 10;  // the type here is only this number
let status: "published" | "archived" = "published"  // only these two values are allowed
```

### What is the difference between Literal types and Enum?

With Literal types the compiler does not generate any extra code, which leads to a smaller JS bundle. The compiler generates some code for an enum.

With an enum you can iterate over its values.

### What is Type Aliases?

This is when we can refer to a type by its name.

```ts
type Status = "published" | "archived"
let status: Status = "published"

type Course = {
    readonly title: string,
    subtitle: string,
    lessonsCount?: number,
}
```

### What is Interfaces?

Interface is a way of defining a contract that either an object or a class has to follow.

```ts
interface Course {
    readonly title: string;  // the key can be only read
    subtitle: string;
    lessonsCount?: number;  // optional key
}
```

### What is the difference between Interfaces and Type Aliases?

You can use them pretty much interchangeably.
TypeScript documentation recommends using interfaces instead of Type Aliases.

Type Aliases are good for declaring quick union types and simple objects.

Interfaces by default are open to extension.

```ts
interface Course {
    readonly title: string;
    subtitle: string;
}

interface Course {
    lessonsCount?: number
}
let course: Course; // this variable will have 3 keys (2 mandatory and 1 optional)
```

Interface cannot create custom primitives types, arrays, tuples and union types like type aliases.

Interfaces can use extends. Type aliases can use intersection type (`&`).
TypeScript can cache that interface by its name in an internal registry. This means that future checks against it can be made faster. With an intersection type using `&`, it can't cache it via the name - it has to compute it nearly every time.

```ts
interface User {
  id: string;
}

interface Admin extends User {
  name: string;
}

type Animal = {
  id: string;
};

type Cat = Animal & {
  name: string;
};
```

### What is Type Assertions?

Type Assertion is a language mechanism that allows us to directly assign a type to a given variable. This used to be called casting.

Casting is the process of overriding a type.
Using `<>` works the same as casting with `as`.

```ts
const input = document.getElementById('input-field') as HTMLInputElement;  // by default the inferred type is a generic HTMLElement
const input = <HTMLInputElement> document.getElementById('input-field');  // it's the same as with as keyword
```

Note: We can use Type Assertion (Casting) only for restricting a type to a more restrictive type.

```ts
const input = (document.getElementById('input-field') as any) as string;
```

### Modules

one file is a module and it has its own namespace

To make a variable visible outside the module we need to import it.

```ts
export const PAGE_SIZE = 100
const ABC = 123
export ABC

export default someFunction() {} // only one default export is allowed

export { // it's the same as exporting a variable at a time
  PAGE_SIZE,
  ABC,
}
```

```ts
import {PAGE_SIZE, ABC} from "./another-file"
import * as constants from "./another-file"
import myFunction from "./another-file" // it can be imported without curly braces, it can have any name you type

console.log(constants.PAGE_SIZE)
```

### What are Barrel files?

Barrel files consolidate the exports of multiple modules into a single file.

Barrel files (most common it's index.ts) contains reexports to simplify the imports for end-users.

### Functions

JS functions are first class objects.

First class object is an entity that can be dynamically created, destroyed, passed to a function, returned as a value, and have all the rights as other variables in the programming language have.

```ts
function generateIntro(name) {} // function declaration
const generateIntro = function(name) {}  // function expressions
const generateIntro = (name) => {} // arrow function expressions
makeSomeCall(function() {}) // here is example of inline anonymous function
typeof generateIntro // 'function'
```

Contextual typing with a return type of `void` does not force functions to not return something.

```ts
const f1: () => void = function () { return true } // yes, it's a valid TS code, the true will be ignored
function f2(): void { return true } // no, it's NOT CORRECT
```

### Function Types

```ts
type Course = { title: string, lessonsCount: number }
type FunctionType = (arg1: string, arg2: string, callback: Function) => Course
const someVariable: FunctionType = (arg1: string) => ({title: "string", lessonsCount: 10}) // everything is CORRECT HERE because JS convention that not all arguments need to be provided to a function when calling it in plan JS
```

```ts
const lst: Course[] = [{title: "", lessonsCount: 10}]
const a = lst[2] // it also CORRECT even if there is no such an index
```

### What are arrow functions?

It provides nice shortcut syntax for defining a function.
Arrow functions do not create their own (private) `this` binding / context.
Arrow functions are good use case for anonymous functions.

```ts
const abc = () => {};
```

### Function's default parameters

```ts
function doSomething(par1: string = "abcd") {}
```

### What is Spread Operator?

Spread operator is a way of doing shallow copies (nested properties are not going to be deep copied).

```ts
const course = { title: "title" }
const newCourse = { ...course }

const numbers = [1, 2, 3]
const moreNumbers = [...numbers, 4, 5, 6]
```

### What is Object/Array Destructuring?

Object destructuring is a feature to extract properties from objects and bind them to variables.

```ts
const course = { title: "title", subtitle: "subtitle", lessonsCount: 10 }
const { title, subtitle } = course
const { title, ...rest } = course

const numbers = [1, 2, 3]
const [first, ...rest] = numbers
```

### Rest Function Parameters

```ts
function printSomething(message: string, ...courses: string[]) {}
```

### How to debug JS/TS code?

* console.log()
* debugger
* source map (  --sourceMap)

  Source Map object allows the debugger to make mapping between the actual source (compiled JS program) with the original source (TS file). Source Map is used in a browser and Node.
* node --inspect-brk

### What is Shorthand Object Creation Notation?

```ts
const title = "some title"
const lessonsCount = 10

const course = {
  title,
  lessonsCount,
}
```

### Tuples

Tuple is a record in a table in a database.
It's a group of values, each with its own specific type and in the right order.
It's just like an array where TS expects certain types to be defined in certain positions.

```ts
type CourseRecord = [string, string, number]
const courseRecord: CourseRecord = ["string1", "string", 100]
```

### What is the difference between Any and Unknown Types?

The `any` and `unknown` types are catch all types.
The `any` type is much more permissive (you can assign it any value and you can also assign it to anything).

The `unknown` type is less permissive (you can assign it any value but to assign it to something else (except any and unknown) you need to check it)

The `unknown` type is a restrictive type that cannot be assigned to almost anything without doing some sort of checks first.

```ts
let anyValue: any = 'abc'
const value1: number = anyValue

let unknownValue: unknown = 'abc'
if (typeof unknownValue == 'number') {
    const value2: number = unknownValue // can be assigned only if we checked the type
}
```

### What is Type Narrowing?

Type narrowing is a process of refining or narrowing down the type using certain conditions with a particular code block.
It will help developers as well as TypeScript itself to infer the more accurate types within the code and work with them in a clean and strict code environment.

### What is Type Predicates?

A type predicate is a function that narrows types based on its return value.

It's just a function that returns a boolean but it has a type predicate in return type in a way `<arg> is <Type>`

```ts
type Course = {
    readonly title: string,
    subtitle: string,
    lessonsCount?: number,
}

const course: unknown = {
    title: "str",
    subtitle: "another str",
}

function isCourse(value: unknown): value is Course {
    const course = value as Course;
    return course?.title != null && course?.subtitle != null
}

if(isCourse(course)) {
    console.log(course.title)
}
```

### What Type Guards do you know?

```ts
if (typeof var1 == 'string') {} // typeof
if ( cat instanceof animal) {} // instanceof
if(isCourse(course)) {} // type predicate
```

### What is Never Type?

We can not assign literally anything to type `never`.
We also cannot do anything with it literally.

It used by type inference system in situations where the type system determines that a certain situation is impossible and it cannot happen.

```ts
type CourseStatus = "draft" | "published"
let courseStatus: CourseStatus = "draft"

if (courseStatus == "draft") {}
else if (courseStatus == "published") {}
else { const value = courseStatus; unexpectedError(value) } // variable value has never type

function unexpectedError(value: never) { // this is a good example how we can use never
    throw new Error(`Unexpected value: ${value}`)
}
```

### What is Intersection Type?

It's a concept that is a bit the opposite of a union.
It's a way to combine multiple types into one.

```ts
interface HasId { id: string }
interface HasTitle { title: string }
type Course = HasId & HasTitle // here is intersection type

const course: Course = {
    id: '123',
    title: 'str'
}
```

### What is the file to manage Compiler Options?

tsconfig.json

If a TS file has at least one `import` or at least one `export`, it will automatically be converted by the compiler to a separate isolate module. Constants will be visible inside the module unless we export them.

### What is Classes?

Class is a language construct where we have data and behavior that are tightly related together

```ts
class Course {
    creationDate: Date

    constructor(creationDate: Date) {
        this.creationDate = creationDate
    }

    age() {
        const ageInMs = new Date().getTime() - this.creationDate.getTime()
        return Math.floor(ageInMs / 1000 / 60 / 60 / 24)
    }
}
const course = new Course(new Date(2024, 0, 1))
console.log(course.age())

// you can use access modifiers in the constructor to get rid of verbosity
class Course2 {
    constructor(
        private title: string,
        private subtitle: string,
        private creationDate: Date
    ) {

    }
}
```

### What is the difference between `private`, `protected`, and `public` modifiers?

TypeScript provides three access modifiers to class properties and methods: private , protected , and public.

The private modifier allows access within the same class.
The protected modifier allows access within the same class and subclasses.
The public modifier allows access from any location.

### What is Class Member Variable?

It's also called class variable (not instance variable). This is when only one copy of the variable is shared with all instances of the class.

```ts
class Course {
  static readonly TIMEOUT = 10
}
```

### Getters and Setters

getter: This method comes when you want to access any property of an object. A getter is also called an accessor.

setter: This method comes when you want to change any property of an object. A setter is also known as a mutator.

```ts
class Course3 {
    constructor(private _title: string, private creationDate: Date) {}

    set title(newTitle: string) {
        if (!newTitle) { throw 'Title cannot be empty.' }
        this._title = newTitle
    }
    get age() {
        const ageInMs = new Date().getTime() - this.creationDate.getTime()
        return Math.floor(ageInMs / 1000 / 60 / 60 / 24)
    }
}
const course3 = new Course3('init title', new Date(2024, 0, 1))
console.log(`course3.age is ${course3.age}`)
console.log(`course3.title is ${course3.title}`)
console.log('course3 is', course3)
course3.title = '' // error is expected
```

### Multiple constructors are not allowed

### What are static properties and methods?

Static properties can only be accessed with the class name

```ts
class Course4 {
    static TOTAL_COURSES = 0
    constructor() {
        Course4.TOTAL_COURSES++;
    }

    static getTitle() {console.log('total courses:', this.TOTAL_COURSES)}
}
const course4 = new Course4()
console.log(Course4.TOTAL_COURSES)
Course4.getTitle()
```

### What is inheritance?

With inheritance you can take an existing class and create a new child class derived from it and reuse most of its existing functionality.

Note: TS does not support multiple object oriented inheritance (`extends` accepts only one argument)

```ts
class Course5 {
    constructor(private title: string, private price: number) {
        this.validate()
    }
    protected validate(): void {
        console.log('Course5 validate')
        if (this.price <= 0) throw 'Price cannot be less zero'
    }
}

class FreeCourse5 extends Course5 {
    constructor(title: string) {
        super(title, 0)
    }
    protected validate(): void {
        console.log('FreeCourse5 validate')
    }
}

const course5 = new Course5("My Course", 100)
console.log(course5)
const freeCourse5 = new FreeCourse5("My Free Course")
console.log(freeCourse5)
```

### Abstract classes

Abstract class by default cannot be instantiated.
It's like a template for a class.
constructor() has to be protected (by design)

```ts
abstract class Course6 {
    protected constructor() {this.validate()}
    protected abstract validate(): void; // it's like a contract that subclasses need to implement
}
class ExtendedCourse6 extends Course6 {
    protected validate(): void {}
}
```

### What is the difference between abstract class and interface?

```ts
interface HasId { id: string }
interface HasTitle { title: string }

abstract class Course7 implements HasId, HasTitle {
    constructor(public id: string, public title: string) {}
}
```

### Singleton

```ts
export class CoursesService {
    private static INSTANCE: CoursesService

    private constructor() {
        console.log('running')
    }

    static instance() {
        if (!CoursesService.INSTANCE) {
            CoursesService.INSTANCE = new CoursesService()
        }
        return CoursesService.INSTANCE
    }
}
```

### What is Generics?

Generics enable writing code that can work with a variety of data types while maintaining type safety.

```ts
interface Lesson {
    title: string;
    seqNo: number;
}
function freeze<T>(obj: T): Readonly<T> { // <T> here is a function type parameter
    return Object.freeze(obj)
}
function freeze2<T extends object>(obj: T): Readonly<T> {} // only object-like entities are allowed, this is a way how to constrain T type
const lesson: Lesson = {title: "something", seqNo: 10}
const frozen = freeze(lesson)
const frozen2 = freeze<Lesson>({title: "something", seqNo: 10})
```

### What is Promises?

### Optional Interface

`Partial<Type>` constructs a type with all properties of Type set to optional.
This utility will return a type that represents all subsets of a given type.

```ts
interface Course {
    title: string
    subtitle: string
    lessonsCount: number
}
function updateCourse(courseId: string, update: Partial<Course>) {}
updateCourse("1", {title: "New version of title"})
updateCourse("2", {subtitle: "New version of subtitle", lessonsCount: 10})
```

### Generic Type Constraints

It can be implemented with the help of `extends` keyword

```ts
function freeze2<T extends object | string>(obj: T): Readonly<T> {
    return obj
}
```

Another `keyof`

```ts
interface Course {
    title: string
    subtitle: string
    lessonsCount: number
}
type CourseKeys1 = "title" | "subtitle" | "lessonsCount"
type CourseKeys2 = keyof Course

function extractProperty<T, K extends keyof T>(data: T, property: K) {
    return data[property];
}
```

### Generic Classes

```ts
class KeyValue<K, V> {
    constructor(
        public readonly key: K,
        public readonly value: V
    ) {}

    print() {
        console.log(`key = ${this.key}, value = ${this.value}`)
    }
}

const v1 = new KeyValue("1", 10).key
const v2 = new KeyValue("1", 10).value
```

### Decorators

Decorators are powerful tools that provide an elegant way to modify or extend the behavior of classes, methods, properties, or parameters.
