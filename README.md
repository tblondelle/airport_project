# Airport Project

Application to manage an airport.

(In development).

## Features
- authentificate users
- make a reservation for a flight
- as an admin, see the current et next flights 
- as an admin, add pilots, crew members, employees, aircraft in the database
- display a planning for the employees

## Means

- Web server with Node.JS
- MySQL database
- Passport authentification system based on [manjeshpv's code](https://github.com/manjeshpv/node-express-passport-mysql)
- Material Design templates

## Instructions

### 1. Installation
1. Clone the repository.
2. Install NodeJS, MySQL and packages: `npm install`
3. Create the database schema: `python scripts/db_create.py --create`

### 2. Running the server locally
1. Open a Terminal and run
``` 
export SQL_USER=root
export SQL_PASSWORD=root
export SQL_DATABASE=airport
```
2. Launch the server: `node server.js`
3. Visit in your browser at: `http://localhost:8080`


## Authors

By Thomas Blondelle and Thomas Duboudin

Ecole Centrale de Lyon, 2017.

