import db from "../config/db.config.js";

export const getAllDiagnosis = async () => {
    const [rows] = await db.query(`SELECT * FROM preoperative_diagnoses`);
    return rows;
};

export const postDiagnoses = async (diagnosis) => {
    const { diagnosis_name } = diagnosis;

    const [existingDiagnosis] = await db.query(
        `SELECT * FROM preoperative_diagnoses WHERE diagnosis_name = ?`,
        [diagnosis_name]
    );

    if (existingDiagnosis.length > 0) {
        throw new Error('Diagnosis already exists');
    }

    const [result] = await db.query(
        `INSERT INTO preoperative_diagnoses (diagnosis_name) VALUES (?)`,
        [diagnosis_name]
    );

    return result.insertId;
};

export const putDiagnoses = async (id, diagnosis) => {
    const { diagnosis_name } = diagnosis;

    const [existingDiagnoses] = await db.query(
        `SELECT * FROM preoperative_diagnoses WHERE diagnosis_name = ? AND id != ?`,
        [diagnosis_name, id]
    );

    if(existingDiagnoses.length > 0) {
        throw new Error("Diagnosis name already exists");
    }

    const [result] = await db.query(
        `UPDATE preoperative_diagnoses SET diagnosis_name = ? WHERE id = ?`,
        [diagnosis_name, id]
    );

    return result.affectedRows > 0;
};

export const deleteDiagnoses = async (id) => {
    const [result] = await db.query(
        `DELETE FROM preoperative_diagnoses WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
};