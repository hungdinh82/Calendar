import { connect } from "../db.js";

const eventController = {
    getAllEvents: async (req, res) => {
        const sql = "SELECT * FROM Events";
        try {
            const [result] = await connect.query(sql);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getEventById: async (req, res) => {
        const eventId = req.params.id;
        const sql = "SELECT * FROM Events WHERE id = ?";
        try {
            const [result] = await connect.query(sql, [eventId]);
            if (result.length === 0) {
                res.status(404).json({ error: "Event not found" });
            } else {
                res.json(result[0]);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getTodosByTarget: async (req, res) => {
        const targetId = req.params.targetId;
        const sql = "SELECT * FROM Events WHERE target = ?";
        try {
            const [result] = await connect.query(sql, [targetId]);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    createEvent: async (req, res) => {
        const eventData = req.body;
        const eventMailArray = req.body.helper;
        const eventMailString = eventMailArray.join(',');
        const sql = "INSERT INTO Events (eventName, calendarId, start, end, eventType, description, helper, status, creatorId, target) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
            eventData.eventName,
            eventData.calendarId,
            eventData.start,
            eventData.end,
            eventData.eventType,
            eventData.description,
            eventMailString,
            eventData.status,
            eventData.creatorId,
            eventData.target
        ];
        try {
            const [result] = await connect.query(sql, values);
            res.json({ id: result.insertId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    editEvent: async (req, res) => {
        const eventId = req.params.id;
        const eventData = req.body;
        const eventMailArray = req.body.helper;
        const eventMailString = eventMailArray.join(',');
        const sql = "UPDATE Events SET eventName = ?, calendarId = ?, start = ?, end = ?, eventType = ?, description = ?, helper = ?, status = ?, creatorId = ?, target = ? WHERE id = ?";
        const values = [
            eventData.eventName,
            eventData.calendarId,
            eventData.start,
            eventData.end,
            eventData.eventType,
            eventData.description,
            eventMailString,
            eventData.status,
            eventData.creatorId,
            eventData.target,
            eventId
        ];
        try {
            const [result] = await connect.query(sql, values);
            if (result.affectedRows === 0) {
                res.status(404).json({ error: "Event not found" });
            } else {
                res.json({ message: "Event updated successfully" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    deleteEvent: async (req, res) => {
        const eventId = req.params.id;
        const sql = "DELETE FROM Events WHERE id = ?";
        try {
            const [result] = await connect.query(sql, [eventId]);
            if (result.affectedRows === 0) {
                res.status(404).json({ error: "Event not found" });
            } else {
                res.json({ message: "Event deleted successfully" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export default eventController;
