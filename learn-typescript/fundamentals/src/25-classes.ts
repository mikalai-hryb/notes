const date = new Date()

console.log(date.getHours())

class Course {
    private title = '';
    subtitle: string
    creationDate: Date

    constructor(title: string, subtitle: string, creationDate: Date) {
        this.title = title
        this.subtitle = subtitle
        this.creationDate = creationDate
    }

    age() {
        const ageInMs = new Date().getTime() - this.creationDate.getTime()
        return Math.floor(ageInMs / 1000 / 60 / 60 / 24)
    }
}

class Course2 {
    constructor(
        private title: string,
        private subtitle: string,
        private creationDate: Date,
    ) {

    }

    age() {
        const ageInMs = new Date().getTime() - this.creationDate.getTime()
        return Math.floor(ageInMs / 1000 / 60 / 60 / 24)
    }
}

const course = new Course("TypeScript Bootcamp", "subtitle", new Date(2024, 0, 1))
console.log(course.age())
course.subtitle

class Course3 {
    constructor(private _title: string, private creationDate: Date) {}

    set title(newTitle: string) {
        if (!newTitle) { throw 'Title cannot be empty.' }
        this._title = newTitle
    }
    get title() {return this._title}
    get age() {
        const ageInMs = new Date().getTime() - this.creationDate.getTime()
        return Math.floor(ageInMs / 1000 / 60 / 60 / 24)
    }
}
const course3 = new Course3('init title', new Date(2024, 0, 1))
console.log(`course3.age is ${course3.age}`)
console.log(`course3.title is ${course3.title}`)
console.log('course3 is', course3)
// course3.title = ''

class Course4 {
    static TOTAL_COURSES = 0
    constructor() {
        Course4.TOTAL_COURSES++;
    }

    static getTitle() {
        console.log('something:', this.TOTAL_COURSES)

    }
}
const course4 = new Course4()
Course4.TOTAL_COURSES = 10
console.log(Course4.TOTAL_COURSES)
Course4.getTitle()

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
    validate(): void {
        console.log('FreeCourse5 validate')
    }
}

const course5 = new Course5("My Course", 100)
console.log(course5)
const freeCourse5 = new FreeCourse5("My Free Course")
console.log(freeCourse5)

abstract class Course6 {
    protected constructor() {this.validate()}
    protected abstract validate(): void; // it's like a contract that subclasses need to implement
}
class ExtendedCourse6 extends Course6 {
    protected validate(): void {}
}

interface HasId {
    id: string
}
interface HasTitle {
    title: string
}

abstract class Course7 implements HasId, HasTitle {
    constructor(public id: string, public title: string) {}
}
