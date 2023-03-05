const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  // find all users
  // be sure to include its associated Id and Data
  try {
    const userData = await User.findAll({
  });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one user
router.get('/:id', async (req, res) => {
  // find a single user by its `id`
  try {
    const userData = await User.findByPk(req.params.id, {
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete one user by its `id` value
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedUser) => {
      res.json(deletedUser);
    })
    .catch (err => {
    res.status(500).json(err);
});
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// update user
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(userData)
 } catch (err) {
    res.status(500).json(err)
 }
});

module.exports = router;
