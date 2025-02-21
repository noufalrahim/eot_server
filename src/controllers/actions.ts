import { deleteAction, getAllActions, postAction, putAction } from "../models/Actions.js";

export const get_actions = async (req, res) => {
    try {
        const actions = await getAllActions();
        res.json(actions);
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
};

export const post_actions = async (req, res) => {
    try {
        const { action_name } = req.body;

        if (!action_name) {
            return res.status(400).json({ error: 'Action name is required' });
        }

        const actionId = await postAction({ action_name });
        res.status(201).json({ message: "Action created successfully", actionId });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const put_action = async (req, res) => {
    try {
        const actionId = parseInt(req.params.id, 10);
        const updatedAction = await putAction(actionId, req.body);

        if (updatedAction) {
            res.status(200).json({ message: "Action updated successfully" })
        }
        else {
            res.status(404).json({ error: "Action not found" });
        }
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const delete_action = async (req, res) => {
    try {
        const actionId = parseInt(req.params.id, 10);
        const deleteActionResp = await deleteAction(actionId);
        if (deleteActionResp) {
            res.status(200).json({ message: "Action deleted successfully" });
        }
        else {
            res.status(401).json({ error: "Action not found" });
        }
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    };
};