"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var anyValue = 'abc';
var value1 = anyValue;
var unknownValue = 'abc';
if (typeof unknownValue == 'number') {
    var value2 = unknownValue;
}
var course = {
    title: "str",
    subtitle: "another str",
};
function isCourse(value) {
    var course = value;
    return (course === null || course === void 0 ? void 0 : course.title) != null && (course === null || course === void 0 ? void 0 : course.subtitle) != null;
}
if (isCourse(course)) {
    console.log(course.title);
}
