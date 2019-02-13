const express = require('express');

const Posts = require('../data/db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The posts information could not be retrieved." });
      }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if (post.length >= 1) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } 
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "The post information could not be retrieved." })
    }

});

router.post('/', (req, res) => {
    console.log(req.body.title)
    if (!req.body.title | !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts
        .insert(req.body)
        .then( post => {
            res.status(200).json(post)
        })
        .catch( err => res.status(500).json({ error: "There was an error while saving the post to the database" }))
    }
})

module.exports = router;