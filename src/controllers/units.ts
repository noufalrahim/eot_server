import { deleteUnit, getAllUnits, postUnit, putUnit } from "../models/Units.js";

export const get_units = async (req, res) => {
    try {
        const units = await getAllUnits();
        res.json(units);
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
};

export const post_units = async (req, res) => {
    try {
        const { unit_name } = req.body;

        if (!unit_name) {
            return res.status(400).json({ error: 'Unit name is required' });
        }

        const unitId = await postUnit({ unit_name });
        res.status(201).json({ message: "Unit created successfully", unitId });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const put_unit = async (req, res) => {
    try {
        const unitId = parseInt(req.params.id, 10);
        const updatedUnit = await putUnit(unitId, req.body);

        if (updatedUnit) {
            res.status(200).json({ message: "Unit updated successfully" })
        }
        else {
            res.status(401).json({ error: "Unit not found" });
        }
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};

export const delete_unit = async (req, res) => {
    try {
        const unitId = parseInt(req.params.id, 10);
        const deleteUnitResp = await deleteUnit(unitId);
        if (deleteUnitResp) {
            res.status(200).json({ message: "Unit deleted successfully" });
        }
        else {
            res.status(401).json({ error: "Unit not found" });
        }
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    };
};