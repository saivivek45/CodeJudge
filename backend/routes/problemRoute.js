import express from 'express';
import { ListQuestions,singleQuestion } from "../controllers/problemController.js";


const questionController = express.Router()

questionController.get("/problems",ListQuestions)
questionController.get("/problems/:id",singleQuestion)

export default questionController

/**
 * @swagger
 * tags:
 *   name: Problems
 *   description: Public problem APIs
 */

/**
 * @swagger
 * /api/problems/problems:
 *   get:
 *     summary: Get all problems
 *     tags: [Problems]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: difficulty
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of problems
 */

/**
 * @swagger
 * /api/problems/problems/{id}:
 *   get:
 *     summary: Get single problem by ID
 *     tags: [Problems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Problem found
 *       404:
 *         description: Problem not found
 */
