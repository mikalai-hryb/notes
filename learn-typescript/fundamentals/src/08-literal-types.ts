export {};
const title = "TypeScript Bootcamp";
let lessonsCount: 10 | 15 | 20 = 10;

function processSomething(lesson: number): number {
    return lesson + 1
}

enum ABC {
    FREE,
    NOT_FREE,
}

let d: ABC = 1
