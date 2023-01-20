
const express = require('express');

const app = express();
var knex = require('knex')({
    client: 'mysql2',
    connection: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Boodis',
    database: 'Users'
    }
    });
    const { Model } = require('objection');
    Model.knex(knex);
    class Users extends Model {
    static get tableName() {
    return 'Users';
    }
    }
    
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
    app.use(allowCrossDomain);
    app.use(express.json());
    
    app.post('/create', (req, res) => {
        Users.query().insert({
        Username: req.body.username,
        Pass: req.body.password,
     })
        .then(res => console.log(res))
        .catch(err => console.log(err));

      })

    app.post('/login', (req, res) => {

    if (Users.query().where('Username', req.body.username).andWhere('Pass', req.body.password))
      {
        Users.query().where('Username', req.body.username).andWhere('Pass', req.body.password).update({Lastlog: new Date()})
        .then(res.end("Logged in"))
        .catch(err => console.log(err));
      }
      else
      {
        res.status(401).send("Unauthorized")
        console.log("Unauthorized")
      }
    })
    
    app.get('/', (request, response) => {
    Users.query()
    
    .then(results => response.send(results))
    .catch(err => { console.log(err);
    response
    .status(500)
    .send('Internal Server Error')});
    });

    app.listen(8080, () => {
    console.log('Example app listening at http://localhost:8080');
    });