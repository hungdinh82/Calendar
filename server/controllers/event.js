import { connect } from "../db.js";

const eventController = {
    getAllEventsByCurrentUser: async (req, res) => {
        try {
            const currentUserId = req.params.id;
            const userSql = "SELECT * FROM Helpers, Events WHERE Helpers.eventId = Events.id AND Helpers.userId = ? UNION SELECT * FROM Helpers,Events WHERE creatorId = ?";
            const [result] = await connect.query(userSql, [currentUserId, currentUserId]);
            // console.log(result);
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
        const sql = "INSERT INTO Events (eventName, calendarId, start, end, eventType, description, status, creatorId, target) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
            eventData.eventName,
            eventData.calendarId,
            eventData.start,
            eventData.end,
            eventData.eventType,
            eventData.description,
            eventData.status,
            eventData.creatorId,
            eventData.target
        ];
        try {
            const [result] = await connect.query(sql, values);
            res.json({ id: result.insertId });
            // console.log(eventData.helper);
            const eventMailString = [];
            if (eventData.helper.indexOf(',') !== -1) {
                eventMailString = eventData.helper.split(',');
            } else {
                eventMailString.push(eventData.helper);
            }
            const sql2 = "INSERT INTO Helpers (userId, eventId) VALUES (?, ?)";
            for (let i = 0; i < eventMailString.length; i++) {
                const values2 = [
                    eventMailString[i],
                    result.insertId
                ];
                await connect.query(sql2, values2);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    editEvent: async (req, res) => {
        const eventData = req.body;
        const eventId = req.params.id; // Lấy ID của sự kiện cần cập nhật từ URL

        // Cập nhật sự kiện trong bảng Events
        const updateEventSql = "UPDATE Events SET eventName = ?, calendarId = ?, start = ?, end = ?, eventType = ?, description = ?, status = ?, creatorId = ?, target = ? WHERE id = ?";
        const updateEventValues = [
            eventData.eventName,
            eventData.calendarId,
            eventData.start,
            eventData.end,
            eventData.eventType,
            eventData.description,
            eventData.status,
            eventData.creatorId,
            eventData.target,
            eventId // Sử dụng ID của sự kiện để xác định sự kiện cần cập nhật
        ];

        // Cập nhật sự kiện trong bảng Events
        try {
            await connect.query(updateEventSql, updateEventValues);

            // Xóa các liên kết cũ giữa sự kiện và người dùng trong bảng Helpers
            const deleteHelperSql = "DELETE FROM Helpers WHERE eventId = ?";
            await connect.query(deleteHelperSql, [eventId]);

            // Thêm lại các liên kết mới giữa sự kiện và người dùng trong bảng Helpers
            const eventMailString = eventData.helper.split(',');
            const insertHelperSql = "INSERT INTO Helpers (userId, eventId) VALUES (?, ?)";
            for (let i = 0; i < eventMailString.length; i++) {
                const insertHelperValues = [
                    eventMailString[i],
                    eventId
                ];
                await connect.query(insertHelperSql, insertHelperValues);
            }

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    deleteEvent: async (req, res) => {
        const eventId = req.params.id;
        const sqlDeleteEvents = "DELETE FROM Events WHERE id = ?";
        const sqlDeleteHelpers = "DELETE FROM Helpers WHERE eventId = ?";
        try {
            await connect.query(sqlDeleteHelpers, [eventId]); // Xóa bản ghi từ bảng Helpers
            const [result] = await connect.query(sqlDeleteEvents, [eventId]); // Xóa bản ghi từ bảng Events
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
