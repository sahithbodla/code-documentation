import express from 'express';
import {
  createDocument,
  editDocument,
  getAllDocsByOwner,
  getDocument,
  deleteCellInDocument,
  setOrderInDocument,
  setCellsContentInDocument,
  getOrder,
  deleteCellsInDocument,
} from '../controllers/document.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/document', createDocument);

router.patch('/document/:id', editDocument);
router.patch('/document/order/:id', setOrderInDocument);
router.patch('/document/cells/:id', setCellsContentInDocument);

router.get('/document/:id', getDocument);
router.get('/document/order/:id', getOrder);
router.get('/documents/:id', getAllDocsByOwner);

router.delete('/document/:id/:cellId', deleteCellInDocument);
router.delete('/document/:id/', deleteCellsInDocument);
export default router;
