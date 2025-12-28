"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var numbers = [1, 2, 3];
numbers.push(4);
var CourseType;
(function (CourseType) {
    // FREE = "FREE",
    // PREMIUM = "PREMIUM",
    // PRIVATE = "PRIVATE",
    // HIDDEN = "HIDDEN",
    CourseType[CourseType["FREE"] = 0] = "FREE";
    CourseType[CourseType["PREMIUM"] = 1] = "PREMIUM";
    CourseType[CourseType["PRIVATE"] = 2] = "PRIVATE";
    CourseType[CourseType["HIDDEN"] = 3] = "HIDDEN";
})(CourseType || (CourseType = {}));
var course = {
    title: "TypeScript Bootcamp",
    type: CourseType.HIDDEN
};
console.log(course);
