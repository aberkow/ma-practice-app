const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TechniqueSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    dropDups: true
  },
  style: {
    type: String,
    lowercase: true
  },
  techniqueType: {
    type: String,
    lowercase: true
  },
  description: String,
  rank: {
    type: String,
    lowercase: true
  },
  combinations: [{ type: Schema.Types.ObjectId, ref: 'Combination' }]
});

module.exports = mongoose.model('Technique', TechniqueSchema);