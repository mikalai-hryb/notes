export class CoursesService {
    private static INSTANCE: CoursesService

    private constructor() {
        console.log('running')
    }

    static instance() {
        if (!CoursesService.INSTANCE) {
            CoursesService.INSTANCE = new CoursesService()
        }
        return CoursesService.INSTANCE
    }
}

const service = CoursesService.instance()
const service2 = CoursesService.instance()
