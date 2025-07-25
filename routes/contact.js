import express from 'express';
import contactabout from '../controllers/contact-aboutController.js';

const router = express.Router();

router.get('/', contactabout.getContactPage);

export default router;
