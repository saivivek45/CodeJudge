import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { getSubmissions, submitCode } from '../controllers/submissonController.js'



const submissionRouter = express.Router()



submissionRouter.post('/submit',authMiddleware,submitCode)
submissionRouter.get('/submissions',authMiddleware,getSubmissions)


export default submissionRouter

/**
 * @swagger
 * tags:
 *   name: Submissions
 *   description: Code submission APIs
 */

/**
 * @swagger
 * /api/code/submit:
 *   post:
 *     summary: Submit code for a problem
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [problemId, language, code]
 *             properties:
 *               problemId:
 *                 type: string
 *               language:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Submission result
 */

/**
 * @swagger
 * /api/code/submissions:
 *   get:
 *     summary: Get user's submissions
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of submissions
 */
