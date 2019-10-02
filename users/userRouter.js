const express = require('express');

const userModel = require('./userDb.js');
const postModel = require("../posts/postDb.js");

const router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.name) {
        res.status(400).json( {errorMessage: "Please provide name for the user."}
   );
    } else {
        userModel
      .insert(req.body)
      .then(user => {
        res.status(201).json(req.body);
      })
      .catch(error => {
        res.status(500).json({
          error: "The user information could not be retrieved."
        });
      });
    }
    
});

router.post('/:id/posts', (req, res) => {
if (!req.body.text) {
  res.status(400).json({ errorMessage: "Please provide text for the post." });
} else {
  postModel
    .insert(req.body)
    .then(post => {
      if (post) {
        res.status(201).json(req.body);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The user information could not be retrieved."
      });
    });
}
});

router.get('/', (req, res) => {
    userModel
      .get()
      .then(user => {
        res.status(200).send(user);
      })
      .catch(error => {
        res.status(500).json({
          error: "The user information could not be retrieved."
        });
      });
});

router.get('/:id', (req, res) => {
    userModel
      .getById(req.params.id)
      .then(user => {
        if (user) {
          res.send(user);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "The user information could not be retrieved."
        });
      });
});

router.get('/:id/posts', (req, res) => {
userModel
  .getUserPosts(req.params.id)
  .then(user => {
    if (user) {
      res.send(user);
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      error: "The user information could not be retrieved."
    });
  });
});

router.delete('/:id', (req, res) => {
    userModel
      .remove(req.params.id)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "The user information could not be retrieved."
        });
      });
});

router.put('/:id', (req, res) => {
    if (!req.body.name) {
      res.status(400).json({
        errorMessage: "Please provide name for the user."
      });
    } else {
      userModel
        .update(req.params.id, req.body)
        .then(user => {
          if (user) {
            res.status(200).json(req.body);
          } else {
            res.status(404).json({
              message: "The user with the specified ID does not exist."
            });
          }
        })
        .catch(() => {
          res.status(500).json({
            error: "The user information could not be modified."
          });
        });
    }
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
