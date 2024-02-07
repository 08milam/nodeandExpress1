### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
-one
<!--
 asyncFunction()
  .then(result => {
    // Handle success
  })
  .catch(error => {
    // Handle error
  });
   -->
   -two
<!--   
  async function fetchData() {
  try {
    const result = await asyncFunction();
    // Handle success
  } catch (error) {
    // Handle error
  }
} -->


- What is a Promise?
  *Pending, Fulfilled (Resolved) and Rejected :
  *The initial state when the Promise is created
  *he state when the asynchronous operation has completed 
  *The state when the asynchronous operation has encountered an error

- What are the differences between an async function and a regular function?
  *Regular Function: Synchronous functions execute sequentially, blocking the execution of subsequent code until the function returns.
  *Async Function: Async functions are asynchronous and non-blocking.

- What is the difference between Node.js and Express.js?
  *Node It is built on the V8 JavaScript engine and provides a platform for developing server-side applications using JavaScript.
  *Express It simplifies the process of building web applications by providing a set of high-level features and abstractions.
- What is the error-first callback pattern?

- What is middleware?
<!-- 
const express = require('express');
const app = express();

// Custom middleware function to log requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

// Route handler
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
}); -->

- What does the `next` function do?
  *you ensure that each middleware function and the route handler is executed in the specified order.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
<!-- 
async function getUsers(usernames) {
  try {
    const promises = usernames.map(username =>
      $.getJSON(`https://api.github.com/users/${username}`)
    );

    const userData = await Promise.all(promises);
    return userData;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error; // Rethrow the error to handle it higher up in the call stack.
  }
}

// Example usage:
const usernames = ['elie', 'joelburton', 'mmmaaatttttt'];
getUsers(usernames)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    // Handle the error gracefully
    console.error('Error:', error);
  }); 
  -->
