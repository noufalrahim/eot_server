import { getAllPatients, getPatientById } from "../models/Patients.js";

export const get_patients = async (req, res) => {
    try {
        const patients = await getAllPatients();
        res.json(patients);
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
};

export const get_patient_by_id = async (req, res) => {
    try {
        const patientId = parseInt(req.params.id, 10);
        const patient = await getPatientById(patientId);
        res.json(patient);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};