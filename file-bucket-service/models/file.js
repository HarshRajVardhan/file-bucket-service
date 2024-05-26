const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  bucketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bucket',
    required: true,
  }
});

module.exports = mongoose.model('File', FileSchema);
