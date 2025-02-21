import express from 'express';
import { get_patient_by_id, get_patients } from '../controllers/patients.js';

const router = express.Router();


/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     tags:
 *       - Patients
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of patients
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/patients', get_patients);


/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the patient
 *     responses:
 *       200:
 *         description: Successfully retrieved the patient
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Server error
 */
router.get('/patients/:id', get_patient_by_id);

export default router;