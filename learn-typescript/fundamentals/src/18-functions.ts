

const abc = (a: string) => {
    return {
        title: a,
        lessonsCount: 2
    } as Course
}

const abc2 = function (a: string) {
    return {
        title: a,
        lessonsCount: 2
    } as Course
}

function abc3 (a: string) {
    return {
        title: a,
        lessonsCount: 2
    } as Course
}
type Course = { title: string, lessonsCount: number }
type FunctionType = (arg1: string, arg2: string, callback: Function) => Course
const someVariable: FunctionType = (arg1: string) => ({title: "string", lessonsCount: 10})

type CourseRecord = [string, string, number]
const courseRecord: CourseRecord = ["string1", "string", 100]
