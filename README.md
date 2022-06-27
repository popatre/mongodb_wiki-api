# Wiki RESTful API

This is a RESTful API built in a MVC patter, using MongoDB, Mongoose and Express. This is a wikipedia style api and only requires a title and content to make a contribution.
Users can add an article, as well as edit, replace and delete.

<br>

A link the the github repository can be found here: <https://github.com/popatre/mongodb_wiki-api>

<br>

## Prerequisites

Please ensure the following are installed:

-   Node: v16.14.0
-   MongoDB v. 4.4
-   Node Package Manager: v7.24.0

## Getting Started

To set up your own repository, please follow the instructions below

1.  Copy the code and paste into your terminal, in the usual directory for your projects

        git clone https://github.com/popatre/mongodb_wiki-api

2.  Once it has been successfully cloned, type the following code and press enter, in order to access the directory.

        cd mongodb_wiki-api

3.  From here, you can open the directory in your source-code editor of choice e.g. visual-studio, atom etc.

<br>

4.  Once in your editor, the dependencies to run the project can be installed using npm package manager.

    In your terminal, type the code below to install the packages need to run the project

        npm install

<br>

**The following dependencies should have been installed:**

-   dotenv
-   express
-   mongoose
-   ejs

**Developer dependencies for testing:**

-   Mocha
-   Chai
-   supertest

<br>

5. Created two .env files in order to link to the development and test databases
   These files should be called:

-   `.env.development`
-   `.env.test`

6.  Inside each file add: `MONGODB_URI=mongodb://localhost:27017/wikiDB` and `MONGODB_URI=mongodb://localhost:27017/wikiDB_test` depending on the file.

7.  The development database can be seeded by running the following command in the terminal:

         npm run seed

    _The console should confirm that the wikiDB has been connected to, and inform you of the seed progress_

 <br>

8.  To run the server locally, type the code below into your terminal. The terminal should confirm that it has started listening

        npm start

<br>

9. Method requests (GET, PATCH, POST, DELETE) can now be performed at `http://localhost:3000` using your API endpoint testing tool of choice i.e. postman, insomnia etc

_The available routes and methods can be found below_

# Routes

**The server has the following endpoints:**

-   GET /api/articles which serves a list of all articles

-   POST /api/articles adds a new article to the database

-   DELETE /api/articles deletes all articles

-   GET /api/articles/:article_title which serves an articles based on the title

-   PUT /api/articles/:article_title replaces an articles based on the title

-   PATCH /api/articles/:article_title edits an article based on the title

-   DELETE /api/articles/:article_title deletes the specific article requested

# Testing

The tests created can be found in the: `__tests__/app.test.js` directory

To run the testing suite, type the code below in your terminal

        npm run test

Please ensure you have the testing dependencies listed above installed, in order to ensure the tests complete successfully.

This should seed the tests database, with the test data, before each test.

The terminal should confirm that this is happening
