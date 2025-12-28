export{}
interface HasId {
    id: string;
}
interface HasTitle {
    title: string;
}
type Course = HasId & HasTitle

const course: Course = {
    id: '123',
    title: 'str'
}
