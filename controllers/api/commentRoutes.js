const router = require("express").Router();
const { Comment, User } = require("../../models");
const authjs = require("../../utils/auth.js");

// Creates Comments
router.post("/", async (req, res) => {
  try { const commentNew = await Comment.create({
      ...req.body,
      // user_id: req.session.user_id,
    });

    res.status(200).json(commentNew);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updates Comments
router.put("/:id", authjs, async (req, res) => {
  try { const updateComment = {
      comment_content: req.body.comment_content,
    };

    const commentData = await Comment.update(updateComment, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!commentData)
      res.status(404).json({ message: "No post identified with this id!" });
        res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes Comments
router.delete("/:id", authjs, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!commentData)
      res
        .status(404)
        .json({ message: "No comment identified with this id" });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;