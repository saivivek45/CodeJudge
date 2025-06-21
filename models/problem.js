import mongoose from 'mongoose';

// Reusable test case schema
const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true }
});

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  inputFormat: { type: String },
  outputFormat: { type: String },
  sampleTestCases: [testCaseSchema],
  hiddenTestCases: [testCaseSchema]
}, {
  timestamps: true
});

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;
