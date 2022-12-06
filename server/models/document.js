import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  docId: {
    type: String,
    required: true,
    unique: true,
  },
  docOwner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  docName: {
    type: String,
    required: true,
  },
  docData: {
    order: {
      type: [String],
      required: true,
    },
    data: {
      type: Map,
      of: new mongoose.Schema({
        content: {
          type: String,
        },
        type: {
          type: String,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
      }),
    },
  },
});

export const Document = mongoose.model('Document', schema);
