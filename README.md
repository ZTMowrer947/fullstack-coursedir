# ReactSchoolDatabaseClient
Treehouse FSJS Techdegree Unit 10 Project - A Full-Stack school database client

## Project Description
The final project of the Treehouse Full-Stack JavaScript Techdegree program, this project provides a frontend for the School Course REST API that I created earlier (found [here](https://github.com/ZTMowrer947/SchoolDatabaseAPI))

## Features
- Credentials are persisted using HTTP Cookies
- Course Deletion require confirmation before operation can be executed
- User-friendly validation and error handling

## Skills Demonstrated
- React
- React Router
- Cross-origin Resource Sharing
- HTTP Cookies
- Axios
- Requesting and using data from a REST API

## Running the project
To use this project, you must first set up the REST API that this project uses to perform operations.

First, clone this repository:
```git clone https://github.com/ZTMowrer947/SchoolDatabaseAPI```

Next, in the repository root, initialize the api submodule:
```
git submodule init
git submodule update
```

Then, install dependencies for both the rest API and the frontend app:
```
cd api
yarn install
cd ../client
yarn install
```

Finally, start the REST API first, then the frontend:
```
cd ../api
yarn start
(in another terminal, starting in repository root)
cd client
yarn start
```

The frontend app should open in your default browser automatically and display a course listing from the API.
