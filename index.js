// imports
const express = require('express');
const redis = require('redis');

// initialization
const app = express();
const client = redis.createClient({
  host: 'redis-server',
  port: 6379,
});

// setting variable
client.set('visits', 0);

// routes
app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    client.set('visits', parseInt(visits) + 1);
    return res.send(`Number of visits: ${visits}`);
  });
});

// port and listening
const PORT = process.env.PORT || 8080;
app.listen(PORT);
