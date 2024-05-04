import { connect } from "../db.js";

const notiController = {
    getAllNotificationsByToMail: async (req, res) => {
        const { toMail } = req.params;
        let sql = "SELECT Notifies.id AS id, Notifies.toMail, Notifies.fromMail, Notifies.text, Notifies.isResolve, Notifies.eventId AS notifyEventId, Events.id AS eventId, Events.eventName, Events.calendarId, Events.start, Events.end, Events.eventType, Events.description, Events.status, Events.creatorId, Events.target FROM Notifies JOIN Events ON Notifies.eventId = Events.id WHERE toMail = ?; ";
        let queryParams = [toMail];

        try {
            const [result] = await connect.query(sql, queryParams);
            const notifications = result.map(notification => ({ ...notification }));
            res.json(notifications);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    updateNotification: async (req, res) => {
        const { id } = req.params;
        const { eventId, currentUserId, isAccept } = req.body;

        const sql = "UPDATE Notifies SET isResolve = 1 WHERE id = ?";
        try {
            const [result] = await connect.query(sql, [id]);
            if (isAccept === 1) {
                const sql2 = "INSERT INTO Helpers (userId, eventId) VALUES (?, ?)";
                const [result2] = await connect.query(sql2, [currentUserId, eventId]);

                res.json({ success: true, message: "Notification updated successfully" });
                const sql3 = "UPDATE Notifies SET isAccept = 1 WHERE id = ?";
                const [result3] = await connect.query(sql3, [id]);
            } else {
                res.status(404).json({ success: false, message: "Notification not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    },
    deleteNotification: async (req, res) => {
        const { id } = req.params;
        const sql = "DELETE FROM Notifies WHERE id = ?";

        try {
            const [result] = await connect.query(sql, [id]);
            if (result.affectedRows === 1) {
                res.json({ success: true, message: "Notification deleted successfully" });
            } else {
                res.status(404).json({ success: false, message: "Notification not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

export default notiController;
