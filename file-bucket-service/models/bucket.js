const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BucketSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Bucket', BucketSchema);
