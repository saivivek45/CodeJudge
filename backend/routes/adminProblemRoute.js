import express from 'express';
import { addQuestion,editQuestion,deleteQuestion } from "../controllers/adminProblemController.js";
import adminMiddleware from '../middlewares/adminMiddleware.js'


const adminRouter = express.Router();


adminRouter.post('/add',adminMiddleware,addQuestion)
adminRouter.put('/edit',adminMiddleware,editQuestion)
adminRouter.delete('/delete',adminMiddleware,deleteQuestion)


export default adminRouter

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin problem management
 */

/**
 * @swagger
 * /api/admin/problems/add:
 *   post:
 *     summary: Add a new problem
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Problem added
 */

/**
 * @swagger
 * /api/admin/problems/edit:
 *   put:
 *     summary: Edit a problem
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Problem updated
 */

/**
 * @swagger
 * /api/admin/problems/delete:
 *   delete:
 *     summary: Delete a problem
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Problem deleted
 */
