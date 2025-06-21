import Problem from '../models/problem.js';

export const ListQuestions = async (req, res) => {
  try {
    const { search, difficulty } = req.query;

    let query = {};

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' }; // case-insensitive search
    }

    const all_problems = await Problem.find(query);

    return res.status(200).json({ success: true, data: all_problems });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const singleQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const required_question = await Problem.findById(id);

    if (!required_question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    return res.status(200).json({ success: true, data: required_question });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Invalid question ID" });
  }
};
