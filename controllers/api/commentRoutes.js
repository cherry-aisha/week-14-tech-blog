const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all comments
router.get('/', withAuth, async (req, res) => {
  // find all comments
  // be sure to include its associated Id and Data
  try {
    const commentData = await Comment.findAll({
  });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one comment
router.get('/:id', withAuth, async (req, res) => {
  // find a single comment by its `id`
  try {
    const commentData = await Comment.findByPk(req.params.id, {
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

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

// Deletes Comments
router.delete("/:id", withAuth, async (req, res) => {
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