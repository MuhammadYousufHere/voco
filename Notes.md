<!-- Install -->

npx create-next-app --experimental-app my-next

<!-- Routing -->

=> every file in app folder is a route now

=> index.js is replaced by page.js for each route
=> nested routes are possible just create a folder with the name of the route and add an page.js file inside it

blog/[slug]/page.js => /blog/first-post => blog/first-post/page.js
to catch all routes use [...slug].js

to ignore a route add (name to ignore) to the folder name
(marketing)/home/page.js => works as /home
