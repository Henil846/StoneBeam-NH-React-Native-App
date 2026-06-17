const express = require('express');
const { protect } = require('../middleware/auth');
const { getWorkStatus, toggleTask, getPayments } = require('../controllers/workStatusController');

const router = express.Router();

router.get('/', protect, getWorkStatus);
router.put('/tasks/:id', protect, toggleTask);
router.get('/payments', protect, getPayments);

module.exports = router;
