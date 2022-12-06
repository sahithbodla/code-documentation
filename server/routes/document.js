import express from 'express';
import {
  createDocument,
  editDocument,
  getDocument,
} from '../controllers/document.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/document', createDocument);
router.patch('/document/:id', editDocument);
router.get('/document/:id', getDocument);

export default router;
