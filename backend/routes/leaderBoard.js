
import express from "express";
import User from "../models/user.js";

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const leaderboard = await User.find({}, 'username solvedCount')
      .sort({ solvedCount: -1 })  
      .limit(50);                 
    res.status(200).json({ success: true, leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;

/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Leaderboard API
 */

/**
 * @swagger
 * /api/leaderboard:
 *   get:
 *     summary: Get leaderboard
 *     tags: [Leaderboard]
 *     responses:
 *       200:
 *         description: Top users
 */
