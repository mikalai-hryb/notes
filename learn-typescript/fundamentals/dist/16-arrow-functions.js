function saveCourse(course, callback) {
    var _this = this;
    this.course = course;
    // setTimeout(function() {
    //     callback(this.course.title);
    // }, 1000)
    setTimeout(function () {
        callback(_this.course.title);
    }, 1000);
}
// saveCourse({title: "TypeScript Bootcamp"}, function() {
// console.log("Save successful.")
// })
saveCourse({ title: "TypeScript Bootcamp" }, function (s) { return console.log("Save successful v2." + " " + s); });
