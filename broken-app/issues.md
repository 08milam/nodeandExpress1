# Broken App Issues


* use express instead of Flask to create the web server.

* We use axios to make HTTP requests instead of requests.

* We define an asynchronous function getUserInfo to fetch user information from the GitHub API.

* define a POST route / to handle incoming requests. 
This route expects a JSON payload containing an array of GitHub usernames under the key developers.
It then retrieves information about each user and returns it as JSON.