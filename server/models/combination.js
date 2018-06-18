const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CombinationSchema = new Schema({
  name: { type: String },
  techniques: [{ type: Schema.Types.ObjectId, ref: 'Technique' }]
});

module.exports = mongoose.model('Combination', CombinationSchema);