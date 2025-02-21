import express from 'express';
import { get_all_timelines_by_patient_id } from '../controllers/timeline.js';

const router = express.Router();

/**
 * @swagger
 * /timeline/{patient_id}/all:
 *   get:
 *     summary: Get all timelines by patient ID
 *     tags:
 *       - Timeline
 *     parameters:
 *       - in: path
 *         name: patient_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the patient
 *     responses:
 *       200:
 *         description: Successfully retrieved all timelines
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: No timelines found
 *       500:
 *         description: Server error
 */
router.get('/timeline/:patient_id/all', get_all_timelines_by_patient_id);

export default router;
