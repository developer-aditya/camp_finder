const express = require('express');
const { setOrder, confirmOrder } = require('../controller/payment.controller');
const { protected, authorized } = require('../middleware/auth');

const router = express.Router();

router.route('/payment').post(protected, authorized('admin', 'user'), setOrder);
router
	.route('/check')
	.post(protected, authorized('admin', 'user'), confirmOrder);

module.exports = router;
