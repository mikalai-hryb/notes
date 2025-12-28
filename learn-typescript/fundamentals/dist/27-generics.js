"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourse = void 0;
var numbers = new Array();
numbers.push(10);
var promise = new Promise(function (resolve, reject) {
    resolve("Hello world");
});
promise.then(function (val) {
});
function updateCourse(courseId, update) { }
exports.updateCourse = updateCourse;
updateCourse("1", { title: "New version of title" });
updateCourse("2", { subtitle: "New version of subtitle", lessonsCount: 10 });
function freeze(obj) {
    return Object.freeze(obj);
}
var lesson = { title: "something", seqNo: 10 };
var frozen = freeze(lesson);
var frozen2 = freeze({ title: "something", seqNo: 10 });
var someData = {
    title: "",
    subtitle: "",
    lessonsCount: 10
};
var moreData = {
    seqNo: 10,
    price: 100,
};
function merge(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
var merged = merge(someData, moreData);
function freeze2(obj) {
    return obj;
}
freeze2("d");
function extractProperty(data, property) {
    return data[property];
}
var course = { title: "", subtitle: "", lessonsCount: 10 };
var val = extractProperty(course, 'lessonsCount');
var KeyValue = /** @class */ (function () {
    function KeyValue(key, value) {
        this.key = key;
        this.value = value;
    }
    KeyValue.prototype.print = function () {
        console.log("key = ".concat(this.key, ", value = ").concat(this.value));
    };
    return KeyValue;
}());
var v1 = new KeyValue("1", 10).key;
var v2 = new KeyValue("1", 10).value;
