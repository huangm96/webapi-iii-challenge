const express = require("express");

const userModel = require("./userDb.js");
const postModel = require("../posts/postDb.js");

const router = express.Router();

router.post("/", validateUser, validateUserId, (req, res) => {
  userModel
    .insert(req.body)
    .then(user => {
      res.status(201).json(req.body);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

router.post("/:id/posts", validatePost,validateUserId, (req, res) => {
 
    postModel
      .insert(req.body)
      .then(post => {
        res.status(201).json(req.body);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  
});

router.get("/", (req, res) => {
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

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  userModel
    .getUserPosts(req.params.id)
    .then(post => {
      res.send(post);
    })
    .catch(error => {
      res.status(500).json({
        error: "The user information could not be retrieved."
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  userModel
    .remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Removed" });
    })
    .catch(error => {
      res.status(500).json({
        error: "The user could not be removed"
      });
    });
});

router.put("/:id", validateUser, validateUserId, (req, res) => {
  userModel
    .update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(req.body);
    })
    .catch(() => {
      res.status(500).json({
        error: "The user information could not be modified."
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  userModel
    .getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "The user information could not be retrieved."
      });
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
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
