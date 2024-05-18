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
    getCommentByEventId: async (req, res) => {
        const eventId = req.params.eventId;
        const sql = "SELECT * FROM Comments WHERE eventId = ?";
        
        try {
            // Execute the SQL query
            const [result] = await connect.query(sql, [eventId]);
            
            // Send the query result as JSON response
            res.json(result);
        } catch (error) {
            // Handle any errors that occur during execution
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
}

export default commentController;