const express = require("express");

const postModel = require("./postDb.js");

const router = express.Router();

router.get("/", (req, res) => {
  postModel
    .get()
    .then(post => {
      res.send(post);
    })
    .catch(() => {
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  postModel
    .getById(req.params.id)
    .then(post => {
      res.send(post);
    })
    .catch(() => {
      res.status(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});

router.delete("/:id", validatePostId,(req, res) => {
  postModel
    .remove(req.params.id)
    .then(() => {
      
        res.status(200).json({message:"removed"});
      
    })
    .catch(error => {
      res.status(500).json({
        error: "The user could not be removed"
      });
    });
});

router.put("/:id", validatePost, validatePostId,(req, res) => {
  
    postModel
      .update(req.params.id, req.body)
      .then(post => {
        
          res.status(200).json(req.body);
        
      })
      .catch(error => {
        res.status(500).json({
          error: "The post information could not be modified."
        });
      });
  })

// custom middleware

function validatePostId(req, res, next) {
  postModel
    .getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "invalid post id" });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "The post information could not be retrieved."
      });
    });
}
function validatePost(req, res, next) {
    if (!req.body) {
      res.status(400).json({ message: "missing post data" });
    } else if (!req.body.text) {
      res.status(400).json({ message: "missing required text field" });
    } else {
      next();
    }
}
module.exports = router;
