import { Document } from '../models/document.js';
import { asyncErrorHandler } from '../middlewares/errorMiddleware.js';

// @post - creating a new document in DB
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

// @patch - adding a new cell (with empty content) for given document
export const editDocument = asyncErrorHandler(async (req, res, next) => {
  const cell = req.body;
  const { docData } = await Document.findOne({ docId: req.params.id });
  const data = docData.data;

  if (!data.get(cell.id)) {
    cell.content = '';
    data.set(cell.id, cell);

    await Document.updateOne(
      { docId: req.params.id },
      { $set: { 'docData.data': data } }
    );

    res.status(201).json({
      success: true,
      cellId: cell.id,
      documentId: req.params.id,
      message: `New cell has been added to given document successfully`,
    });
  } else {
    res.status(409).json({
      success: false,
      cellId: cell.id,
      documentId: req.params.id,
      message: `given cell id already exists for given document`,
    });
  }
});

// @get - get document data for given document ID
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

// @get - get all documents lists for a given user
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

// @delete  delete a particular cell for given document ID
export const deleteCellInDocument = asyncErrorHandler(
  async (req, res, next) => {
    const { cellId } = req.body;
    const { docData } = await Document.findOne({ docId: req.params.id });
    const data = docData.data;
    data.delete(cellId);

    await Document.updateOne(
      { docId: req.params.id },
      { $set: { 'docData.data': data } }
    );

    res.status(201).json({
      success: true,
      message: `Cell deleted successfully from ${req.params.id}`,
    });
  }
);
