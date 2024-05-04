import { connect } from "../db.js";

const notiController = {
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
        const { eventId, isAccept } = req.body;

        const sql = "UPDATE Notifies SET  isAccept = ? WHERE id = ?";
        try {
            const [result] = await connect.query(sql, [ isAccept, id]);
            if (result.affectedRows > 0) {
                const sqlToGetEventId = "SELECT eventId, toMail  FROM Notifies WHERE id = ?";
                const eventId = await connect.query(sqlToGetEventId, [id]);
                const sql2 = "SELECT helper FROM Events WHERE id = ?";
                const listHelper = await connect.query(sql2, [eventId[0][0].eventId]);
                // const helperString = listHelper[0][0].helper.replace(/\[/g, '').replace(/\]/g, '').replace(/"/g, '');
                const sql3 = "UPDATE Events SET helper = ? WHERE id = ?";
                const listHelperAdd = await connect.query(sql3, [`${listHelper[0][0].helper}, ${eventId[0][0].toMail}`,eventId[0][0].eventId]);

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
