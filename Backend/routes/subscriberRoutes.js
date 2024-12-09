import express from 'express';
import { subscribe, sendNewsletter, sendContactEmail } from '../controllers/subscriberController.js';

const router = express.Router();

router.post('/subscribe', subscribe);
router.post('/send-newsletter', sendNewsletter);
router.post('/send-contact-email', sendContactEmail);

export default router;
