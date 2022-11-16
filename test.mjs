import fetch from "node-fetch";
const url = 'https://api.github.com/zen'


const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo');
    }, 300);
  });


const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const p1 = Promise.resolve([1,2,3,4,5])
const p2 = p1.then(result => result.map(x => x**2))
console.log(p2)
await wait(2 * 1000)
console.log(p2)

// function saySomething(t) {
//   console.log(t)
// }
// fetch

const myFetch = (url) => new Promise((resolve) => resolve(fetch(url)))
const r = await myFetch(url).then(r => {
  console.log(r.useFinalURL); 
  return r.text()
})
console.log(r)



// wait(2 * 1000)
//   .then(() => saySomething("2 seconds"))
//   .catch((error) => console.log(error));

Request.R
