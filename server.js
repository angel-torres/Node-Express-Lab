const express = require('express');

const server = express();

const router = require('./posts/posts-router.js')

server.use(express.json());

server.use('/api/posts', router);

server.get('/', (req, res) => {
    res.send(
        "<h1> Hello World! </h1>"
    )
})

module.exports = server;