import express from 'express';
import {
  createDocument,
  editDocument,
  getAllDocsByOwner,
  getDocument,
  deleteCellInDocument,
  setOrderInDocument,
  setCellsContentInDocument,
} from '../controllers/document.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/document', createDocument);

router.patch('/document/:id', editDocument);
router.patch('/document/order/:id', setOrderInDocument);
router.patch('/document/cells/:id', setCellsContentInDocument);

router.get('/document/:id', getDocument);
router.get('/documents/:id', getAllDocsByOwner);

router.delete('/document/:id', deleteCellInDocument);
export default router;
