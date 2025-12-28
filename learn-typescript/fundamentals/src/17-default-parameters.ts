export {}
function doSomething(par1 = "abcd") {}

console.log(doSomething())
debugger;

let course = {
    title: "st",
    subtitle: "another string",
    stats: {
        lessonsCount: 10
    }
}

// const course {}
const newCourse = { ...course }
course.title = "new title"
course.stats.lessonsCount = 15
console.log(newCourse)
debugger;
const {title, subtitle} = course
console.log(title, subtitle)
