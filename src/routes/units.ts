import express from 'express';
import { delete_unit, get_units, post_units, put_unit } from '../controllers/units.js';

const router = express.Router();

/**
 * @swagger
 * /units:
 *   get:
 *     summary: Get all units
 *     tags:
 *       - Units
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of units
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.get('/units', get_units);

/**
 * @swagger
 * /units:
 *   post:
 *     summary: Create a new unit
 *     tags:
 *       - Units
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - unit_name
 *             properties:
 *               unit_name:
 *                 type: string
 *                 example: "Unit 11"
 *     responses:
 *       201:
 *         description: Unit created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/units', post_units);


/**
 * @swagger
 * /units/{id}:
 *   put:
 *     summary: Update an existing unit
 *     tags:
 *       - Units
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the unit to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - unit_name
 *             properties:
 *               unit_name:
 *                 type: string
 *                 example: "Unit abc"
 *     responses:
 *       200:
 *         description: Unit updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Unit not found
 *       500:
 *         description: Server error
 */
router.put('/units/:id', put_unit);

/**
 * @swagger
 * /units/{id}:
 *   delete:
 *     summary: Delete a unit by ID
 *     description: "⚠️ **Note:** On deleting a unit, all corresponding patients data will also be deleted."
 *     tags:
 *       - Units
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the unit to delete
 *     responses:
 *       200:
 *         description: Unit deleted successfully
 *       404:
 *         description: Unit not found
 *       500:
 *         description: Server error
 */
router.delete('/units/:id', delete_unit);

export default router;