const express = require('express');
const router = express.Router();
// Controller functions
const {
	getUsers,
	getUser,
	addUser,
	updateUser,
	deleteUser,
} = require('../controller/users.controller');
const User = require('../models/user.model');
const advanceQueryResult = require('../middleware/advanceQuery');
const { protected, authorized } = require('../middleware/auth');

// Logged In User && User must be Admin
router.use(protected);
router.use(authorized('admin'));

router
	.route('/')
	.get(advanceQueryResult(User, ''), getUsers)
	.post(addUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
