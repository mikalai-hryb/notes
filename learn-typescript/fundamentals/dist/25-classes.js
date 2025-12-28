var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var date = new Date();
console.log(date.getHours());
var Course = /** @class */ (function () {
    function Course(title, subtitle, creationDate) {
        this.title = '';
        this.title = title;
        this.subtitle = subtitle;
        this.creationDate = creationDate;
    }
    Course.prototype.age = function () {
        var ageInMs = new Date().getTime() - this.creationDate.getTime();
        return Math.floor(ageInMs / 1000 / 60 / 60 / 24);
    };
    return Course;
}());
var Course2 = /** @class */ (function () {
    function Course2(title, subtitle, creationDate) {
        this.title = title;
        this.subtitle = subtitle;
        this.creationDate = creationDate;
    }
    Course2.prototype.age = function () {
        var ageInMs = new Date().getTime() - this.creationDate.getTime();
        return Math.floor(ageInMs / 1000 / 60 / 60 / 24);
    };
    return Course2;
}());
var course = new Course("TypeScript Bootcamp", "subtitle", new Date(2024, 0, 1));
console.log(course.age());
course.subtitle;
var Course3 = /** @class */ (function () {
    function Course3(_title, creationDate) {
        this._title = _title;
        this.creationDate = creationDate;
    }
    Object.defineProperty(Course3.prototype, "title", {
        get: function () { return this._title; },
        set: function (newTitle) {
            if (!newTitle) {
                throw 'Title cannot be empty.';
            }
            this._title = newTitle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Course3.prototype, "age", {
        get: function () {
            var ageInMs = new Date().getTime() - this.creationDate.getTime();
            return Math.floor(ageInMs / 1000 / 60 / 60 / 24);
        },
        enumerable: false,
        configurable: true
    });
    return Course3;
}());
var course3 = new Course3('init title', new Date(2024, 0, 1));
console.log("course3.age is ".concat(course3.age));
console.log("course3.title is ".concat(course3.title));
console.log('course3 is', course3);
// course3.title = ''
var Course4 = /** @class */ (function () {
    function Course4() {
        Course4.TOTAL_COURSES++;
    }
    Course4.getTitle = function () {
        console.log('something:', this.TOTAL_COURSES);
    };
    Course4.TOTAL_COURSES = 0;
    return Course4;
}());
var course4 = new Course4();
Course4.TOTAL_COURSES = 10;
console.log(Course4.TOTAL_COURSES);
Course4.getTitle();
var Course5 = /** @class */ (function () {
    function Course5(title, price) {
        this.title = title;
        this.price = price;
        this.validate();
    }
    Course5.prototype.validate = function () {
        console.log('Course5 validate');
        if (this.price <= 0)
            throw 'Price cannot be less zero';
    };
    return Course5;
}());
var FreeCourse5 = /** @class */ (function (_super) {
    __extends(FreeCourse5, _super);
    function FreeCourse5(title) {
        return _super.call(this, title, 0) || this;
    }
    FreeCourse5.prototype.validate = function () {
        console.log('FreeCourse5 validate');
    };
    return FreeCourse5;
}(Course5));
var course5 = new Course5("My Course", 100);
console.log(course5);
var freeCourse5 = new FreeCourse5("My Free Course");
console.log(freeCourse5);
freeCourse5.validate();
