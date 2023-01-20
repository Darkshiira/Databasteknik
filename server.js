//import express from 'express' ?
const express = require('express');
const app = express();
//imports for database ?
var knex = require('knex')({
    client: 'mysql2',
    connection: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'Users'
    }
    });

    //import objection ?
    const { Model } = require('objection');
    Model.knex(knex);

    //imports our database - table
    class Users extends Model {
    static get tableName() {
    return 'Users';
    }
    }
    // Allows cross domain requests (CORS)
    var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          
        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
          res.send(200);
        }
        else {
          next();
        }
    };
    //Initilize the CORS-thingy
    app.use(allowCrossDomain);
    //Allows us to use json (otherwise it would be undefined)
    app.use(express.json());
    
    //Creates a new user by recieving the post from the register page and inserts it into the database
    app.post('/create', (req, res) => {
        Users.query().insert({
        Username: req.body.username,
        Pass: req.body.password,
     })
        .then(res => console.log(res))
        .catch(err => console.log(err));

      })

   //Endpoint for the login page
    app.post('/login', (req, res) => 
    {
 //Checks if the user exists in the database and if it does, it logs the user in and updates the last login time
    Users.query().select('Username', 'Pass').where('Username', req.body.username).where('Pass', req.body.password).then(results => {
      //if the user exists in the database, the result will be greater than 0. If it is, the user is logged in
      if (results.length > 0)
      {
        //Updates the last login time
        Users.query().where('Username', req.body.username).andWhere('Pass', req.body.password).update({Lastlog: new Date()})
        //Sends a response to the login page - the response is used to redirect the user to the home page
        .then(res.end("Logged in"))
        .catch(err => console.log('57 ' +err));
      }
      else
      {
        //Sends a response with the status code 401 - Unauthorized if the user does not exist in the database
        res.sendStatus(401)
        res.body.text='username'
       // res.status(401).send("Unauthorized")
      }
    })
  })
    //Endpoint for the home page
    app.get('/', (request, response) => {
    Users.query()
    
    .then(results => response.send(results))
    .catch(err => { console.log(err);
    response
    .status(500)
    .send('Internal Server Error')});
    });
//Starts the server
    app.listen(8080, () => {
    console.log('Example app listening at http://localhost:8080');
    });