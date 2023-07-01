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
