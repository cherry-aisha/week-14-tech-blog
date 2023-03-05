const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create Comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updates Comments
router.put("/:id", withAuth, async (req, res) => {
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
      res.status(404).json({ message: "No comment identified with this id!" });
        res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;