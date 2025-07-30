import Problem from "../models/problem.js";

// ✅ Add a new question
export const addQuestion = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      inputFormat,
      outputFormat,
      sampleTestCases = [],
      hiddenTestCases = [],
    } = req.body;

    // Prevent duplicate titles
    const found = await Problem.findOne({ title: title.trim() });
    if (found) {
      return res.status(400).json({
        success: false,
        message: "Question already exists with this title",
      });
    }

    const newQuestion = new Problem({
      title: title.trim(),
      description,
      difficulty,
      inputFormat,
      outputFormat,
      sampleTestCases,
      hiddenTestCases,
    });

    await newQuestion.save();

    return res.status(201).json({
      success: true,
      message: "Question successfully added",
      question: newQuestion,
    });
  } catch (error) {
    console.error("Error in addQuestion:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Edit an existing question
export const editQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedQuestion = await Problem.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    console.error("Error in editQuestion:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete a question by ID
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await Problem.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteQuestion:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
