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
    Posts
    .insert(req.body)
    .then( post => {
        res.status(200).json(post)
    })
    .catch( err => console.log(err))
})

module.exports = router;