"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var courseStatus = "draft";
if (courseStatus == "draft") { }
else if (courseStatus == "published") { }
else {
    var value = courseStatus;
    unexpectedError(value);
}
function unexpectedError(value) {
    throw new Error("Unexpected value: ".concat(value));
}
