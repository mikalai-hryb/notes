"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lessonsCount = 10.12;
var total = lessonsCount + 10;
console.log("total = ", total);
var title = "TypeScript Bootcamp";
var subTitle = "TypeScript Bootcamp v2";
var fullTitle = title + ": " + subTitle;
console.log("Full title: " + fullTitle);
var published = true;
if (published) {
    console.log("The course is published.");
}
// template strings
var string1 = "a";
var string2 = 'a';
var string3 = "a"; // string with backticks or template string
var fullTitle2 = "Full title: ".concat(title, ": ").concat(subTitle);
console.log(fullTitle2);
// objects
var course
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
};
