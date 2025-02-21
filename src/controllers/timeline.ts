import { getAllTimelinesByPatientId } from "../models/Timeline.js";

export const get_all_timelines_by_patient_id = async (req, res) => {
    try {
        const patientId = Number(req.params.patient_id);

        if (isNaN(patientId) || patientId <= 0) {
            return res.status(400).json({ error: "Invalid patient ID" });
        }

        const timelines = await getAllTimelinesByPatientId(patientId);

        if (timelines.length === 0) {
            return res.status(404).json({ error: "No timelines found" });
        }

        res.json(timelines);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
