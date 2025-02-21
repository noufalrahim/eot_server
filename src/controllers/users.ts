import {
    deleteUser,
    getAllUsers,
    getUserById,
    postUser,
    putUser
} from '../models/Users.js'

export const get_users = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const get_user_by_id = async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = await getUserById(userId);
        res.json(user);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const post_users = async (req, res) => {
    try {
        const {role, username, departmentName, name, password} = req.body;
        if(!role || !username || !departmentName || !name || !password) {
            return res.status(400).json({error: "All fields are required"});
        }

        const userId = await postUser({role, username, departmentName, name, password});
        res.status(201).json({message: "User created successfully", userId});
    }
    catch (e) {
        res.status(500).json({error: e.message});
    }
};

export const put_users = async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const updatedUser = await putUser(userId, req.body);
        if(updatedUser) {
            res.status(200).json({message: "User updated successfully"});
        }
        else {
            res.status(401).json({error: "User not found"});
        }
    } 
    catch (e) {
        res.status(500).json({error: e.message});
    }
};

export const delete_user = async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const deletedUserResp = await deleteUser(userId);
        if(deletedUserResp) {
            res.status(200).json({message: "User deleted successfully"});
        }
        else {
            res.status(401).json({error: "User not found"});
        }
    }
    catch (e) {
        res.status(500).json({error: e.message});
    };
};