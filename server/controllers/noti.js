import { connect } from "../db.js";

const notiController = {
    addNotification: async (req, res) => {
        const { toMail, fromMail, text, isResolve, eventId, isAccept } = req.body;

        const sql = "INSERT INTO Notifies (toMail, fromMail, text, isResolve, eventId, isAccept) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            const [result] = await connect.query(sql, [toMail, fromMail, text, isResolve, eventId, isAccept]);
            res.json(true);
        } catch (error) {
            console.error(error);
            res.json(false);
        }
    },
    getAllNotificationsByToMail: async (req, res) => {
        const { toMail } = req.params;
        let sql = "SELECT * FROM Notifies WHERE toMail = ?";
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
        const { toMail, fromMail, text, isResolve, eventId, isAccept } = req.body;

        const sql = "UPDATE Notifies SET toMail = ?, fromMail = ?, text = ?, isResolve = ?, eventId = ?, isAccept = ? WHERE id = ?";
        try {
            const [result] = await connect.query(sql, [toMail, fromMail, text, isResolve, eventId, isAccept, id]);
            if (result.affectedRows > 0) {
                res.json({ success: true, message: "Notification updated successfully" });
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
