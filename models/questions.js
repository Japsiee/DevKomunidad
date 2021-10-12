const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  comments: {
    type: Array
  },
  ups: {
    type: Array
  },
  from: {
    type: String,
    required: true
  }
}, { timestamps: true } )

const QuestionSchema = mongoose.model('question', questionSchema);

module.exports = QuestionSchema;