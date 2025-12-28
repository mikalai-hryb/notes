export {}

let anyValue: any = 'abc'
const value1: number = anyValue

let unknownValue: unknown = 'abc'
if (typeof unknownValue == 'number') {
    const value2: number = unknownValue
}


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
