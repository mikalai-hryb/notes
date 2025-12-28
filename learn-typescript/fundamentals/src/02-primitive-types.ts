export {};

const lessonsCount:number = 10.12;

const total = lessonsCount + 10;
console.log("total = ", total)


const title = "TypeScript Bootcamp";
const subTitle = "TypeScript Bootcamp v2";

const fullTitle = title + ": " + subTitle;
console.log("Full title: " + fullTitle)


const published = true;
if (published) {
    console.log("The course is published.")
}

// template strings

const string1 = "a";
const string2 = 'a';
const string3 = `a`; // string with backticks or template string
const fullTitle2 = `Full title: ${title}: ${subTitle}`;
console.log(fullTitle2)

// objects

const course
// : {
//     title: string,
//     subTitle: string,
//     lessonsCount: number,
// }
= {
    title: "some ",
    subTitle: "another",
    lessonsCount: 10,
    author: {
        firstName: "Vasco",
        lastName: "Something",
        car: {
            name: "df",
            code: 123
        }
    }
}
