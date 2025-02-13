import express from 'express';
import { delete_diagnosis, get_diagnosis, post_diagnosis, put_diagnosis } from '../controllers/diagnosis.js';

const router = express.Router();

/**
 * @swagger
 * /diagnoses:
 *   get:
 *     summary: Get all diagnoses
 *     tags:
 *       - Diagnoses
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of diagnoses
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.get('/diagnoses', get_diagnosis);

/**
 * @swagger
 * /diagnoses:
 *   post:
 *     summary: Create a new diagnosis
 *     tags:
 *       - Diagnoses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - diagnosis_name
 *             properties:
 *               diagnosis_name:
 *                 type: string
 *                 example: "Diagnosis 1"
 *     responses:
 *       201:
 *         description: Diagnosis created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/diagnoses', post_diagnosis);


/**
 * @swagger
 * /diagnoses/{id}:
 *   put:
 *     summary: Update an existing diagnosis
 *     tags:
 *       - Diagnoses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the diagnosis to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - diagnosis_name
 *             properties:
 *               diagnosis_name:
 *                 type: string
 *                 example: "Diagnosis abc"
 *     responses:
 *       200:
 *         description: Diagnosis updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Diagnosis not found
 *       500:
 *         description: Server error
 */
router.put('/diagnoses/:id', put_diagnosis);

/**
 * @swagger
 * /diagnoses/{id}:
 *   delete:
 *     summary: Delete a diagnosis by ID
 *     description: "⚠️ **Note:** On deleting a diagnosis, all corresponding patients data will also be deleted."
 *     tags:
 *       - Diagnoses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the diagnosis to delete
 *     responses:
 *       200:
 *         description: Diagnosis deleted successfully
 *       404:
 *         description: Diagnosis not found
 *       500:
 *         description: Server error
 */
router.delete('/diagnoses/:id', delete_diagnosis);

export default router;