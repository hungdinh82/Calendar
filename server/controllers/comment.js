import { connect } from "../db.js";

const commentController = {
    addComment: async (req, res) => {
        const { comment, userId, eventId } = req.body;
    
        const sql = "INSERT INTO Comments (comment, userId, eventId) VALUES (?, ?, ?)"
        try {
            const [result] = await connect.query(sql, [comment, userId, eventId]);
            res.json(true);
        } catch (error) {
            console.error(error);
            res.json(false);
        }
    },
    getComment: async (req, res) => {
        const { userId, eventId } = req.query;
        let sql;
        let queryParams = [userId];
        
        if (eventId && eventId !== "undefined") {
            sql = "SELECT comment, created_at FROM Comments WHERE userId = ? AND eventId = ?";
            queryParams.push(eventId);
        } else {
            sql = "SELECT comment, created_at FROM Comments WHERE userId = ? AND (eventId IS NULL OR eventId = '')";
        }
    
        try {
            const [result] = await connect.query(sql, queryParams);
            const comments = result.map(comment => ({ ...comment }));
            res.json(comments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
}

export default commentController;