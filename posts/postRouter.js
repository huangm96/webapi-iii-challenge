const express = require('express');

const postModel = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
    postModel.get().then(post => {
        res.send(post);
    }).catch(() => {
        res.status(500).json({
          error: "The posts information could not be retrieved."
        });
    })
});

router.get('/:id', (req, res) => {
    postModel
      .getById(req.params.id)
      .then(post => {
        if (post) {
          res.send(post);
        } else {
          res.status(404).json({
            message: "The posts with the specified ID does not exist."
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "The posts information could not be retrieved."
        });
      });
});

router.delete('/:id', (req, res) => {
    postModel
      .remove(req.params.id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "The user could not be removed"
        });
      });
});

router.put('/:id', (req, res) => {
    if (!req.body.text) {
      res
        .status(400)
        .json({
          errorMessage: "Please provide text and user_id for the post."
        });
    } else {
        postModel
          .update(req.params.id, req.body)
          .then(post => {
            if (post) {
              res.status(200).json(req.body);
            } else {
              res.status(404).json({
                message: "The user with the specified ID does not exist."
              });
            }
          })
          .catch(error => {
            res.status(500).json({
              error: "The post information could not be modified."
            });
          });
    }
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;