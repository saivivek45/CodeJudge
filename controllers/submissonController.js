import Problem from "../models/problem.js";
import Submission from "../models/submission.js";
import User from "../models/user.js";
import { runCode } from "../utils/dockerExecutor.js"; 

// ✅ Handle code submission
export const submitCode = async (req, res) => {
  try {
    const { problemId, language, code } = req.body;
    const userId = req.user._id;

    const required_question = await Problem.findById(problemId);
    if (!required_question) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    const { sampleTestCases = [], hiddenTestCases = [] } = required_question;
    const allTestCases = [...sampleTestCases, ...hiddenTestCases];

    const results = [];

    for (let i = 0; i < allTestCases.length; i++) {
      const testCase = allTestCases[i];
      const output = await runCode(language, code, testCase.input);

      if (!output.success) {
        req.app.get('io').emit('submission_status', {
          userId: userId.toString(),
          problemId: problemId.toString(),
          status: 'Error',
          error: output.error
        });
        return res.status(500).json({
          success: false,
          message: "Code execution failed",
          error: output.error,
        });
      }

      const passed = output.output.trim() === testCase.expectedOutput.trim();

      results.push({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        userOutput: output.output,
        passed,
        isSample: i < sampleTestCases.length,
      });
    }

    const allPassed = results.every(r => r.passed);
    const status = allPassed ? "Passed" : "Failed";

    if (allPassed) {
      await User.findByIdAndUpdate(userId, { $inc: { solvedCount: 1 } });
    }

    const submission = new Submission({
      user: userId,
      problem: required_question._id,
      language,
      code,
      status,
      results,
    });

    await submission.save();

    req.app.get('io').emit('submission_status', {
      userId: userId.toString(),
      problemId: problemId.toString(),
      status,
      totalCases: results.length,
      passedCases: results.filter(r => r.passed).length
    });

    return res.status(200).json({
      success: true,
      status,
      totalCases: results.length,
      passedCases: results.filter(r => r.passed).length,
      results,
    });
  } catch (error) {
    console.error("Error in submitCode:", error);
    req.app.get('io').emit('submission_status', {
      userId: req.user._id.toString(),
      problemId: req.body.problemId,
      status: 'Error',
      error: error.message
    });
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ Get past submissions
export const getSubmissions = async (req, res) => {
  try {
    const userId = req.user._id;
    const all_submissions = await Submission.find({ user: userId })
      .populate("problem", "title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      submissions: all_submissions,
    });
  } catch (error) {
    console.error("Error in getSubmissions:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
