interface Course {
    readonly title: string;
    subtitle: string;
}

interface Course {
    lessonsCount?: number
}


const course: Course = {
    title: "some string",
    subtitle: "another string",
    lessonsCount: 10,
}

// type Course = {
//     readonly title: string,
//     subtitle: string,
//     lessonsCount?: 10,
// }
