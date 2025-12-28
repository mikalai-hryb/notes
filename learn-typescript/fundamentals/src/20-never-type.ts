export {}
type CourseStatus = "draft" | "published"
let courseStatus: CourseStatus = "draft"

if (courseStatus == "draft") {}
else if (courseStatus == "published") {}
else { const value = courseStatus; unexpectedError(value) }

function unexpectedError(value: never) {
    throw new Error(`Unexpected value: ${value}`)
}
