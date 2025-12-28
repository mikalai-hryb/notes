Nuxt is a higher level framework built on top of Vue

Features
* File Based Routing
* Auto Imports
* Composables
* Server
* Universal Rendering

Client Side Rendering - means brouser gets an emty HTML, than it gets a JavaScript, parses it and renders UI

Server Side Rendering - means brouser gets a rendered HTML(server renders the HTML) as well as a JavaScript

Universal Rendering - means brouser gets a rendered HTML, at this point the site is ready-to-see but not it is not ready-to-iteract, after small period of time brouser gets a JavaScript and hydration process happens

Hydration - we make static UI elements interactive by parsing the JavaScript

Universal Rendering Pros
* performance
* search engine optimization

Universal Rendering Cons
* development constranits (check if the windows object available)
* cost (need to have a server that renders the HTML)

## Can we use useFetch within an event handler (ex: onSubmit)?

No.

The `useFetch` is composable, and composables must be used on the top level of `<script setup>`.
The `useFetch` is composable wrapper around `$fetch`.

We need to replace it with `$fetch` and surround with `try/catch` for error handling.

Note: use async for `onSubmit` function and await for `$fetch` function.

Sometimes we can

```js
const body = ref()
const { data, error, refresh } = useFetch('/api/login', { // note that we don't use async
  method: 'POST',
  body,
  immediate: false, // it's important because it does not trigger it during initialization the component
  watch: false, // it's important because it does not watch for changes in the reactive values
})

async function onSubmit() {
  await refresh()
  if (!error.value) { console.log('do something')}
}
```
