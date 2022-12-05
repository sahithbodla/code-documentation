import express from 'express';
import { createDocument, editDocument } from '../controllers/document.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/createDocument', createDocument);
router.patch('/editDocument/:id', editDocument);

export default router;
