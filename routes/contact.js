const express = require('express');
const router = express.Router();
const contactabout = require('../controllers/contact-aboutController');

router.get('/', contactabout.getContactPage);
module.exports = router;