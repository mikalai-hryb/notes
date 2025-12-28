"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function doSomething(par1) {
    if (par1 === void 0) { par1 = "abcd"; }
}
console.log(doSomething());
debugger;
var course = {
    title: "st",
    subtitle: "another string",
    stats: {
        lessonsCount: 10
    }
};
// const course {}
var newCourse = __assign({}, course);
course.title = "new title";
course.stats.lessonsCount = 15;
console.log(newCourse);
debugger;
var title = course.title, subtitle = course.subtitle;
console.log(title, subtitle);
