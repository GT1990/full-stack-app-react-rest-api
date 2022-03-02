# full-stack-app-react-rest-api

    A full stack application using react and rest api.

## Usage

1. Requires REST API for data. See /api readme file.
2. Install dependencies by running `npm install`
3. Run app by typing `npm start`
   - Runs the app in the development mode.\
   - Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Example

## config.js

    Contains REST API base url.

## index.js

    Wraps the App component with the Context Provider.
    Links CSS files to app.

## App.js

    Contains all routes of the app rendering the corresponding components.

## Data.js

    Contains all functions that make calls to REST API using axios.

## Context.js

    Contains global context, providing global state and all functions to sign up,in,out and the calls to GET,POST,PUT,DELETE courses and users using the Data.js functions.

## Components

### Header.js

    Header for all pages with sign up,in,out links.

### Loading.js

    Loading spinning animation used while waiting for data to load.

### UserSignUp.js

    Sign up creates a new user then signs in the user

### UserSignIn.js

    Checks the user credentials vs the user stored in the REST API database, and signs in user if credentials match. Storing user in global state and cookie data.

### UserSignOut

    Signs out a user by deleting user from global state and removing cookie data.

### Courses.js

    Gets all courses from REST API and displays a list of all courses and a button to create a new course.

### CourseDetail.js

    Lists the details of the course selected and provides links to delete and update course if the signed in user matches the course's user.

### CreateCourse.js

    Private route (only accessed if user is signed in). Displays a form that creates a new course.

### UpdateCourse.js

    Private route (only accessed if user that is signed in matches the course's user). Allows course's user to update course details.

### PrivateRoute.js

    Checks if user is signed in before allowing access to nested routes.

### Forbidden.js

    If access is denied user is redirected to /forbidden

### NotFound.js

    If course is not found user is redirected to /notfound

### UnhandledError.js

    All other errors are redirected to /error
