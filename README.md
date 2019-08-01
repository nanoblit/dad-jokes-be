# dad-jokes-be
https://dad-jokes-be.herokuapp.com

# Libraries
* Express - Fast, unopinionated, minimalist web framework for Node.js.
* BcyrptJs - Hashes passwords to store safely in your database.
* JsonWebToken - Allows you to generate, verify and decode tokens for authorization.
* CORS - Middleware that configures the Access-Control-Allow-Origin.
* Helmet - Secures your Express.js apps by setting various HTTP headers.
* Dotenv - Loads environment variables from a .env file into process.env.
* Knex - A multi-dialect query builder for Node.js.
* Sqlite3 - Relational database management system.
* Cross-env - Runs scripts that set and use environment variables across platforms.
* Jest - A JavaScript Testing Framework with a focus on simplicity.

# Users endpoints
Table | Method | Endpoint | Required fields | Description
--- | --- | --- | --- | --- 
Users | Post | /signup | username: string, password: string | Creates a user profile, returns { id: number, username: string, (hashed) password: string }
Users | Post | /signin | username: string, password: string | Returns { message: string, token: string }

### /signup Post responses
400 - { error: 'Userame and password are required' }
400 - { error: 'Userame must be unique' }
201 - user

### /signin Post responses
401 - { error: 'Wrong username or password' }
200 - { message: 'Logged in', token }

# Jokes endpoints
Table | Method | Endpoint | Required fields | Description
--- | --- | --- | --- | --- 
Jokes | Get | /jokes | None | Returns all public and owned by the user jokes. Returns an array of { joke: string, username: string, isPrivate: number }
Jokes | Get | /jokes/:id | None | Returns a public or owned by the user joke. Returns { joke: string, username: string, isPrivate: number }
Jokes | Get | /jokes/mine | None | Returns all the jokes owned by this user. Returns an array of { joke: string, username: string, isPrivate: number }
Jokes | Put | /jokes/:id | joke: string (optional), isPrivate: bool (optional) | Updates the joke. Returns { joke: string, isPrivate: number, userId: number }
Jokes | Post | /jokes | joke: string, isPrivate: bool | Adds a new joke. Returns { joke: string, isPrivate: number, userId: number }
Jokes | Delete | /jokes/:id | None | Removes a joke. Returns { joke: string, isPrivate: number, userId: number }

### /jokes Get responses
200 - jokes
### /jokes/:id Get responses
404 - { error: "Joke with given id doesn't exist" }
401 - { error: 'You are not authorized to see this joke' }
200 - joke
### /jokes/mine Get responses
401 - { error: 'You are not authorized to see these jokes' }
200 - joke
### /jokes/:id Put responses
404 - { error: "Joke with given id doesn't exist" }
401 - { error: 'You are not authorized to change this jokes' }
200 - joke
### /jokes Post responses
400 - { error: 'Joke, userId and isPrivate are required' }
200 - joke
### /jokes/:id Delete responses
404 - { error: "Joke with given id doesn't exist" }
401 - { error: 'You are not authorized to delete this joke' }
200 - joke