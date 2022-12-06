import { Document } from '../models/document.js';
import { asyncErrorHandler } from '../middlewares/errorMiddleware.js';

export const createDocument = asyncErrorHandler(async (req, res, next) => {
  const { docName, docData } = req.body;
  const user = 'req.user._id';
  const document = {
    docId: Math.random().toString(36).slice(2),
    docOwner: user,
    docName,
    docData,
  };

  await Document.create(document);

  res.status(201).json({
    success: true,
    message: 'Document created successfully',
  });
});

export const editDocument = asyncErrorHandler(async (req, res, next) => {
  const { cell } = req.body;
  const { docData } = await Document.findOne({ docId: req.params.id });
  const data = docData.data;
  data.set(cell.id, cell);

  await Document.updateOne(
    { docId: req.params.id },
    { $set: { 'docData.data': data } }
  );

  res.status(201).json({
    success: true,
    message: `Cell added successfully to ${req.params.id}`,
  });
});

export const getDocument = asyncErrorHandler(async (req, res, next) => {
  const document = await Document.findOne({ docId: req.params.id });

  res.status(201).json({
    success: true,
    document: {
      owner: document.docOwner,
      order: document.docData.order,
      data: document.docData.data,
      name: document.docName,
    },
  });
});

export const getAllDocsByOwner = asyncErrorHandler(async (req, res, next) => {
  const documents = await Document.find({ docOwner: req.params.id });
  const docsInfo = documents.map((doc) => {
    return {
      id: doc.docId,
      name: doc.docName,
    };
  });

  res.status(201).json({
    success: true,
    documents: docsInfo,
  });
});
