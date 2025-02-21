import { deleteDiagnoses, getAllDiagnosis, postDiagnoses, putDiagnoses } from "../models/Diagnosis.js";

export const get_diagnosis = async (req, res) => {
    try {
        const diagnosiss = await getAllDiagnosis();
        res.json(diagnosiss);
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
};

export const post_diagnosis = async (req, res) => {
    try {
        const { diagnosis_name } = req.body;

        if (!diagnosis_name) {
            return res.status(400).json({ error: 'Diagnosis name is required' });
        }

        const diagnosisId = await postDiagnoses({ diagnosis_name });
        res.status(201).json({ message: "Diagnosis created successfully", diagnosisId });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const put_diagnosis = async (req, res) => {
    try {
        const diagnosisId = parseInt(req.params.id, 10);
        const updatedDiagnosis = await putDiagnoses(diagnosisId, req.body);

        if (updatedDiagnosis) {
            res.status(200).json({ message: "Diagnosis updated successfully" })
        }
        else {
            res.status(401).json({ error: "Diagnosis not found" });
        }
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const delete_diagnosis = async (req, res) => {
    try {
        const diagnosisId = parseInt(req.params.id, 10);
        const deleteDiagnosisResp = await deleteDiagnoses(diagnosisId);
        if (deleteDiagnosisResp) {
            res.status(200).json({ message: "Diagnosis deleted successfully" });
        }
        else {
            res.status(401).json({ error: "Diagnosis not found" });
        }
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    };
};