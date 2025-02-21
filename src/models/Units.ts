import db from "../config/db.config.js";

export const getAllUnits = async () => {
    const [rows] = await db.query(`SELECT * FROM units`);
    return rows;
};

export const postUnit = async (unit) => {
    const { unit_name } = unit;

    const [existingUnits] = await db.query(
        `SELECT * FROM units WHERE unit_name = ?`,
        [unit_name]
    );

    if (existingUnits.length > 0) {
        throw new Error('Unit already exists');
    }

    const [result] = await db.query(
        `INSERT INTO units (unit_name) VALUES (?)`,
        [unit_name]
    );

    return result.insertId;
};

export const putUnit = async (id, unit) => {
    const { unit_name } = unit;

    const [existingUnit] = await db.query(
        `SELECT * FROM units WHERE unit_name = ? AND id != ?`,
        [unit_name, id]
    );

    if(existingUnit.length > 0) {
        throw new Error("Unit name already exists");
    }

    const [result] = await db.query(
        `UPDATE units SET unit_name = ? WHERE id = ?`,
        [unit_name, id]
    );

    return result.affectedRows > 0;
};

export const deleteUnit = async (id) => {
    const [result] = await db.query(
        `DELETE FROM units WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
};