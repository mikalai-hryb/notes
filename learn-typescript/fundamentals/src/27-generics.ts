const numbers = new Array<number>()
numbers.push(10)

const promise = new Promise<string>((resolve, reject) => {
    resolve("Hello world")
})

promise.then(val => {

})

interface Course {
    title: string
    subtitle: string
    lessonsCount: number
}

interface Lesson {
    title: string;
    seqNo: number;
}

export function updateCourse(courseId: string, update: Partial<Course>) {}


updateCourse("1", {title: "New version of title"})
updateCourse("2", {subtitle: "New version of subtitle", lessonsCount: 10})

function freeze<T>(obj: T): Readonly<T> { // <T> here is a function type parameter
    return Object.freeze(obj)
}

const lesson: Lesson = {title: "something", seqNo: 10}
const frozen = freeze(lesson)
const frozen2 = freeze<Lesson>({title: "something", seqNo: 10})













const someData = {
    title: "",
    subtitle: "",
    lessonsCount: 10
}
const moreData = {
    seqNo: 10,
    price: 100,
}

function merge<T1, T2>(obj1: T1, obj2: T2)  {
    return Object.assign(obj1, obj2) as (T1 & T2)
}

const merged = merge(someData, moreData)

function freeze2<T extends object | string>(obj: T): Readonly<T> {
    return obj
}
freeze2("d")
















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

const course:Course = {title: "", subtitle: "", lessonsCount: 10}
const val = extractProperty(course, 'lessonsCount')

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
