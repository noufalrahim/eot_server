import db from "../config/db.config.js";

const getNamesByIds = async (table, idColumn, nameColumn, ids) => {
    const [rows] = await db.query(`SELECT ${idColumn}, ${nameColumn} FROM ${table} WHERE ${idColumn} IN (?)`, [ids]);
    return rows.reduce((acc, row) => {
        acc[row[idColumn]] = row[nameColumn];
        return acc;
    }, {});
};

export const getAllPatients = async () => {
    const [patients] = await db.query('SELECT * FROM patients');
    
    const unitIds = [...new Set(patients.map(p => p.unit_id))];
    const diagnosisIds = [...new Set(patients.map(p => p.preoperative_diagnosis_id))];
    const actionIds = [...new Set(patients.map(p => p.actions_id))];

    const unitNames = await getNamesByIds('units', 'id', 'unit_name', unitIds);
    const diagnosisNames = await getNamesByIds('preoperative_diagnoses', 'id', 'diagnosis_name', diagnosisIds);
    const actionNames = await getNamesByIds('actions', 'id', 'action_name', actionIds);

    return patients.map(patient => ({
        ...patient,
        unit_name: unitNames[patient.unit_id] || null,
        preoperative_diagnosis: diagnosisNames[patient.preoperative_diagnosis_id] || null,
        action_name: actionNames[patient.actions_id] || null,
    }));
};

export const getPatientById = async (id) => {
    const [patients] = await db.query('SELECT * FROM patients WHERE id = ?', [id]);

    if (patients.length === 0) {
        return null;
    }

    const patient = patients[0];

    const [unit] = await db.query('SELECT unit_name FROM units WHERE id = ?', [patient.unit_id]);
    const [diagnosis] = await db.query('SELECT diagnosis_name FROM preoperative_diagnoses WHERE id = ?', [patient.preoperative_diagnosis_id]);
    const [action] = await db.query('SELECT action_name FROM actions WHERE id = ?', [patient.actions_id]);

    return {
        ...patient,
        unit_name: unit.length > 0 ? unit[0].unit_name : null,
        preoperative_diagnosis: diagnosis.length > 0 ? diagnosis[0].diagnosis_name : null,
        action_name: action.length > 0 ? action[0].action_name : null,
    };
};
