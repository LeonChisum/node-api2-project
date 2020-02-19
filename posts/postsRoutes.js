const express = require("express");

// importing database
const db = require("../data/db");

const router = express.Router();

router.get("/posts", (req, res) => {
  db.find()
    .then(posts => res.json(posts))
    .catch(err =>
      res.json({ error: "The posts information could not be retrieved." })
    );
});

router.get("/posts/:id", (req, res) => {
  const id = req.params.id;

  if (id) {
    db.find()
      .then(posts => posts.find(u => u.id == id))
      .then(post => db.findById(post.id))
      .then(post => res.status(200).json(post))
      .catch(err =>
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
      );
  } else {
    return res
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  }
});

router.get("/posts/:id/comments", (req, res) => {
  const id = req.params.id;

  if (id) {
    db.find()
      .then(posts => posts.find(u => u.id == id))
      .then(post => db.findById(post.id))
      .then(postId => db.findPostComments(postId[0].id))
      .then(comments => res.status(200).json(comments))
      .catch(err =>
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
      );
  } else {
    return res
      .status(500)
      .json({ error: "The comments information could not be retrieved." });
  }
});

router.post("/posts", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  db.insert(req.body)
    .then(post => db.findById(post.id))
    .then(post => res.status(201).json(post))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      })
    );
});

// router.post("/posts/:id/comments", (req, res) => {
//   const { text } = req.body;
//   const { id } = req.params;

//   if (!text) {
//     return res
//       .status(400)
//       .json({ errorMessage: "Please provide text for the comment." });
//   }

//   if (id) {
//     db.find()
//       .then(posts => posts.find(u => u.id == id))
//       .then(post => {
//         console.log(post);
//       })
//       //   .then(post => db.findById(post.id))
//       //   .then(post => {
//       //       console.log(post.id)
//       //   })
//       .then(post => {
//         console.log(req.body);
//       })
//       .then(comments => db.insertComment(req.body))
//       .then(post => {
//         console.log(req.body);
//       })
//       .then(comment => res.status(201).json(comment))
//       .catch(err =>
//         res.status(500).json({
//           error: "There was an error while saving the comment to the database"
//         })
//       );
//   } else {
//     return res
//       .status(404)
//       .json({ message: "The post with the specified ID does not exist." });
//   }
// });

router.post("/posts/:id/comments", (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    db.insertComment(req.body)
    .then(comment => {
      return res.status(201).json(comment)
    })
    .catch(err => {
        console.log("Error posting comment")
        res.status(500).json(err)
    })})

module.exports = router;
