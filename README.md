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
Users | Post | /signup | username: string, password: string | Creates a user profile, returns id: number, username: string, (hashed) password: string
Users | Post | /signin | username: string, password: string | Returns token: string