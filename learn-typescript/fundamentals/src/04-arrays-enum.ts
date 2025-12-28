export {};
const numbers = [1, 2, 3];
numbers.push(4)

enum CourseType {
    // FREE = "FREE",
    // PREMIUM = "PREMIUM",
    // PRIVATE = "PRIVATE",
    // HIDDEN = "HIDDEN",
    FREE,
    PREMIUM,
    PRIVATE,
    HIDDEN,
}

const course = {
    title: "TypeScript Bootcamp",
    type: CourseType.HIDDEN
}
console.log(course)
