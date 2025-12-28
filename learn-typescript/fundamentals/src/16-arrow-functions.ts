function saveCourse(course: {title: string}, callback: Function) {
    this.course = course
    // setTimeout(function() {
    //     callback(this.course.title);
    // }, 1000)
    setTimeout(() => {
        callback(this.course.title );
    }, 1000)
}

// saveCourse({title: "TypeScript Bootcamp"}, function() {
    // console.log("Save successful.")
// })

saveCourse({title: "TypeScript Bootcamp"}, (s: string) => console.log("Save successful v2." + " " + s))
