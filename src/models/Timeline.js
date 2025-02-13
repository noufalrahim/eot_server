import db from "../config/db.config.js";

export const getAllTimelinesByPatientId = async (id) => {
    const [timelines] = await db.query('SELECT t.*, a.order_index FROM timeline t JOIN actions a ON t.action_id = a.id WHERE t.patient_id = ? ORDER BY a.order_index ASC', [id]);
    
    console.log("TImelines", timelines);

    if (timelines.length === 0) {
        return []; 
    }

    const result = await Promise.all(
        timelines.map(async (timeline) => {
            const [[performed_by] = [{}]] = await db.query('SELECT name FROM users WHERE id = ?', [timeline.performed_by]);
            const [[action] = [{}]] = await db.query('SELECT action_name FROM actions WHERE id = ?', [timeline.action_id]);

            return {
                ...timeline,
                performed_by: performed_by.name || null,
                action_name: action.action_name || null,
            };
        })
    );

    return result;
};
