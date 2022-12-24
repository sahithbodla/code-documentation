import { Document } from '../models/document.js';
import { asyncErrorHandler } from '../middlewares/errorMiddleware.js';

// @post - creating a new document in DB
export const createDocument = asyncErrorHandler(async (req, res, next) => {
  const { docName, docData } = req.body;
  const user = 'req.user._id';
  const docId = Math.random().toString(36).slice(2);
  const document = {
    docId,
    docOwner: user,
    docName,
    docData,
  };

  await Document.create(document);

  res.status(201).json({
    success: true,
    documentId: docId,
    message: 'document created successfully',
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
      message: `new cell has been added to given document successfully`,
    });
  } else {
    res.status(409).json({
      success: false,
      cellId: cell.id,
      documentId: req.params.id,
      message: `duplicate_cell_id`,
    });
  }
});

// @get - get document data for given document ID
export const getDocument = asyncErrorHandler(async (req, res, next) => {
  const document = await Document.findOne({ docId: req.params.id });

  if (document) {
    res.status(201).json({
      success: true,
      document: {
        owner: document.docOwner,
        order: document.docData.order,
        data: document.docData.data,
        name: document.docName,
      },
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Document with ${req.params.id} does not exist`,
    });
  }
});

// @get - get document data for given document ID
export const getOrder = asyncErrorHandler(async (req, res, next) => {
  const document = await Document.findOne({ docId: req.params.id });

  if (document) {
    res.status(201).json({
      success: true,
      order: document.docData.order,
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Document with ${req.params.id} does not exist`,
    });
  }
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

// @delete - delete a particular cell for given document ID
export const deleteCellInDocument = asyncErrorHandler(
  async (req, res, next) => {
    const document = await Document.findOne({ docId: req.params.id });
    if (document) {
      const {
        docData: { data },
      } = document;
      data.delete(req.params.cellId);

      await Document.updateOne(
        { docId: req.params.id },
        { $set: { 'docData.data': data } }
      );

      res.status(201).json({
        success: true,
        message: `cell deleted successfully from ${req.params.id}`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `document_dont_exist`,
      });
    }
  }
);

// @delete - delete a particular cell for given document ID
export const deleteCellsInDocument = asyncErrorHandler(
  async (req, res, next) => {
    const { cells } = req.body;
    const { docData } = await Document.findOne({ docId: req.params.id });
    const data = docData.data;

    cells.forEach((cell) => {
      data.delete(cell);
    });

    await Document.updateOne(
      { docId: req.params.id },
      { $set: { 'docData.data': data } }
    );

    res.status(201).json({
      success: true,
      cells,
      message: `cells deleted successfully from ${req.params.id}`,
    });
  }
);

// @patch - edit order array for given document Id
export const setOrderInDocument = asyncErrorHandler(async (req, res, next) => {
  const { order } = req.body;
  const document = await Document.findOne({ docId: req.params.id });

  if (document) {
    await Document.updateOne(
      { docId: req.params.id },
      { $set: { 'docData.order': order } }
    );
    res.status(201).json({
      success: true,
      order: document.docData.order,
    });
  } else {
    res.status(404).json({
      success: false,
      message: `document_dont_exist`,
    });
  }

  res.status(201).json({
    success: true,
    order,
    documentId: req.params.id,
    message: 'order has been updated for the document successfully',
  });
});

// @patch - edit cells for given document ID
export const setCellsContentInDocument = asyncErrorHandler(
  async (req, res, next) => {
    const { cells } = req.body;
    const { docData } = await Document.findOne({ docId: req.params.id });
    const map = docData.data;
    cells.forEach((cell) => {
      const { cellId, content, type = 'text' } = cell;
      const cellObj = map.get(cellId);
      map.set(cellId, {
        content: content,
        type: cellObj?.type || type,
        id: cellId,
      });
    });
    await Document.updateOne(
      { docId: req.params.id },
      { $set: { 'docData.data': map } }
    );

    res.status(201).json({
      success: true,
      cells: cells.map((cell) => cell.cellId),
      documentId: req.params.id,
      message: 'cells has been updated for the document successfully',
    });
  }
);
