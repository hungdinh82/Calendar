import { connect } from "../db.js";

const adminController = {
  getAccounts: async (req, res) => {
    const sql = "SELECT id, mail, userName, avatar, isAdmin FROM Accounts";
    try {
      const [results] = await connect.query(sql);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  addAccount: async (req, res) => {
    const { mail, password, userName, avatar, isAdmin } = req.body;
    const checkSql = "SELECT id FROM Accounts WHERE mail = ?";
    const insertSql = "INSERT INTO Accounts (mail, password, userName, avatar, isAdmin) VALUES (?, ?, ?, ?, ?)";
    
    try {
      const [mailConflict] = await connect.query(checkSql, [mail]);
      if (mailConflict[0] != null) {
        return res.status(409).json({ error: "Email already exists" });
      }

      const [result] = await connect.query(insertSql, [mail, password, userName, avatar, isAdmin]);
      res.status(201).json({ id: result.insertId, mail, userName, avatar, isAdmin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateAccount: async (req, res) => {
    const { id } = req.params;
    const { mail, userName,  isAdmin } = req.body;
    const sql = "UPDATE Accounts SET mail = ?,  userName = ?, isAdmin = ? WHERE id = ?";
    
    try {
      const [result] = await connect.query(sql, [mail, userName, isAdmin, id]);
      if (result.affectedRows > 0) {
        res.json({ id, mail, userName, isAdmin });
      } else {
        res.status(404).json({ error: "Account not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteAccount: async (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Accounts WHERE id = ?";
    
    try {
      const [result] = await connect.query(sql, [id]);
      if (result.affectedRows > 0) {
        res.json({ message: "Account deleted successfully" });
      } else {
        res.status(404).json({ error: "Account not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default adminController;
