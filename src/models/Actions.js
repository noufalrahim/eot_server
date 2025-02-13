import db from "../config/db.config.js";

export const getAllActions = async () => {
    const [rows] = await db.query(`SELECT * FROM actions`);
    return rows;
};

export const postAction = async (action) => {
    const { action_name } = action;

    const [existingActions] = await db.query(
        `SELECT * FROM actions WHERE action_name = ?`,
        [action_name]
    );

    if (existingActions.length > 0) {
        throw new Error('Action already exists');
    }

    const [result] = await db.query(
        `INSERT INTO actions (action_name) VALUES (?)`,
        [action_name]
    );

    return result.insertId;
};

export const putAction = async (id, action) => {
    const { action_name } = action;

    const [existingAction] = await db.query(
        `SELECT * FROM actions WHERE action_name = ? AND id != ?`,
        [action_name, id]
    );

    if(existingAction.length > 0) {
        throw new Error("Action name already exists");
    }

    const [result] = await db.query(
        `UPDATE actions SET action_name = ? WHERE id = ?`,
        [action_name, id]
    );

    return result.affectedRows > 0;
};

export const deleteAction = async (id) => {
    const [result] = await db.query(
        `DELETE FROM actions WHERE id = ?`,
        [id]
    );

    return result.affectedRows > 0;
};