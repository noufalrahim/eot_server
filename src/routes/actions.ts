import express from 'express';
import { delete_action, get_actions, post_actions, put_action } from '../controllers/actions.js';

const router = express.Router();

/**
 * @swagger
 * /actions:
 *   get:
 *     summary: Get all actions
 *     tags:
 *       - Actions
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of actions
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.get('/actions', get_actions);

/**
 * @swagger
 * /actions:
 *   post:
 *     summary: Create a new action
 *     tags:
 *       - Actions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action_name
 *             properties:
 *               action_name:
 *                 type: string
 *                 example: "Action 11"
 *     responses:
 *       201:
 *         description: Action created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/actions', post_actions);


/**
 * @swagger
 * /actions/{id}:
 *   put:
 *     summary: Update an existing action
 *     tags:
 *       - Actions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the action to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action_name
 *             properties:
 *               action_name:
 *                 type: string
 *                 example: "Action abc"
 *     responses:
 *       200:
 *         description: Action updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Action not found
 *       500:
 *         description: Server error
 */
router.put('/actions/:id', put_action);

/**
 * @swagger
 * /actions/{id}:
 *   delete:
 *     summary: Delete a action by ID
 *     description: "⚠️ **Note:** On deleting a action, all corresponding patients data will also be deleted."
 *     tags:
 *       - Actions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the action to delete
 *     responses:
 *       200:
 *         description: Action deleted successfully
 *       404:
 *         description: Action not found
 *       500:
 *         description: Server error
 */
router.delete('/actions/:id', delete_action);

export default router;