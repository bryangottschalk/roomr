const router = require('express').Router();
const { User } = require('../db/models');
const { Chatroom } = require('../db/models');
const Sequelize = require('sequelize');
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        phone: req.body.phone
      }
    });
    if (!user) {
      console.log('No such user found:', req.body.phone);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.phone);
      res.status(401).send('Wrong username and/or password');
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
});
router.post('/createChatroom', async (req, res, next) => {
  try {
    const chatroom = await Chatroom.findOrCreateChat(
      req.body.user1Id,
      req.body.user2Id
    );
    res.json(chatroom);
  } catch (err) {
    next(err);
  }
});
router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create({
      phone: req.body.phone,
      password: req.body.password
    });
    if (user) {
      res.json(user);
    } else {
      const err = new Error('Error creating new user');
      err.status = 500;
      next(err);
    }
  } catch (err) {
    next(err);
  }
});
router.put('/:userId', async (req, res, next) => {
  try {
    const userToEdit = await User.findByPk(Number(req.params.userId));
    const user = await userToEdit.update(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const userData = user.dataValues;
    const chatrooms = await Chatroom.findAll({
      where: {
        [Sequelize.Op.or]: [
          { user1Id: req.params.userId },
          { user2Id: req.params.userId }
        ]
      }
    });
    userData.chatrooms = chatrooms.map(chat => {
      return chat.dataValues;
    });
    res.json(userData);
  } catch (err) {
    next(err);
  }
});

// router.get('/:userId/chatroom', async (req, res, next) => {
//   try {
//     const user = await Chatroom.findAll({
//       where: {
//         userId: req.params.userId
//       },
//       include: [Chatroom]
//       // where: {
//       //   [Sequelize.Op.or]: [
//       //     { user1Id: req.params.userId },
//       //     { user2Id: req.params.userId }
//       //   ]
//       // }
//     });
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// });
module.exports = router;
