import mongoose from "mongoose";
import User from "./user.js";
import Problem from "./problem.js";

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Problem,
      required: true,
    },
    language: String,
    code: String,
    status: String,
    results: [
      {
        input: String,
        expectedOutput: String,
        userOutput: String,
        passed: Boolean,
      },
    ],
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
