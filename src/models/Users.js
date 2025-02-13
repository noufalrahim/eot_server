import db from "../config/db.config.js";

export const getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
};

export const getUserById = async (id) => {
    const [rows] = await db.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows.length > 0 ? rows[0] : null;
};

export const postUser = async (user) => {
    const {role, username, departmentName, name, password} = user;

    const [existingUser] = await db.query(
        `SELECT * FROM users WHERE username = ?`, 
        [username]
    );

    if(existingUser.length > 0){
        throw new Error("Username already exists");
    }

    const [result] = await db.query(
        `INSERT INTO users (role, username, departmentName, name, password) VALUES (?, ?, ?, ?, ?)`,
        [role, username, departmentName, name, password]
    );

    return result.insertId;
};

export const putUser = async (id, user) => {
    const {role, username, departmentName, name, password} = user;

    const [existingUser] = await db.query(
        `SELECT * FROM users WHERE username = ? AND id != ?`,
        [username, id]
    );

    if(existingUser.length > 0) {
        throw new Error("Username already exists");
    }

    const [result] = await db.query(
        `UPDATE users SET role = ?, username = ?, departmentName = ?, name = ?, password = ? WHERE id = ?`,
        [role, username, departmentName, name, password, id]
    );

    return result.affectedRows > 0;
}

export const deleteUser = async (id) => {
    const [result] = await db.query(`DELETE FROM users WHERE id = ?`, [id]);
    return result.affectedRows > 0;
};