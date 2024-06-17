import { connect } from "../db.js";

const helperController = {
    getAllHelperByEventId: async (req, res) => {
        const eventId = req.params.eventId;
        const sql = "SELECT * FROM Helpers,Accounts WHERE Helpers.userId = Accounts.id AND eventId = ?";
        
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
    getAllHelperAndCreatorByTodoId: async (req, res) => {
        const id = req.params.id;
        const sql = "SELECT * FROM Helpers,Accounts WHERE Helpers.userId = Accounts.id AND eventId = ?";
        
        try {
            // Execute the SQL query
            const [result] = await connect.query(sql, [id]);
            
            // Send the query result as JSON response
            res.json(result);
        } catch (error) {
            // Handle any errors that occur during execution
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

export default helperController;
