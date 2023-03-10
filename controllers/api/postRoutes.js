const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  // find all posts
  // be sure to include its associated Id and Data
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment
        }
      ]
  });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one post
router.get('/:id', withAuth, async (req, res) => {
  // find a single post by its `id`
  try {
    const postData = await Post.findByPk(req.params.id, {
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updates Post
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(postData)
 } catch (err) {
    res.status(500).json(err)
 }
});

//delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
