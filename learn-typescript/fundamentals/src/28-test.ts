type Course = { title: string, lessonsCount: number }
type FunctionType = (arg1: string, arg2: string, callback: Function) => Course
const someVariable: FunctionType = (arg1: string) => ({title: "string", lessonsCount: 10}) // everything is CORRECT HERE because JS convention that not all arguments need to be provided to a function when calling it in plan JS

const lst: Course[] = [{title: "", lessonsCount: 10}]
const a = lst[2]
