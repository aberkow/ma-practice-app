const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const mongo = 'mongodb://mongo:27017'

const schema = require('./graphql/schema');

mongoose.connect(mongo);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(`DB Error -> ${err}`);
})

// enable urlencoding and json on the server.
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// use the router.
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path
  })
}));

app.get('/', (req, res) => {
  res.send('Hello world');
});

/*
This way we wait for the db connection/port to be opened before the server begins listening.

The server instance can be constructed before the connection is open. But it won't actively listen until after. This solves an issue where the server would begin before the connection was fully established.
*/
db.once('open', () => {
  app.listen(port, () => {
    console.log(`App is listening on ${port}`);
  });
});