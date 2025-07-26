import express from 'express';
import contactabout from '../controllers/contact-aboutController.js';

const router = express.Router();

router.get('/', contactabout.getAboutPage);

export default router;
