import { connect } from "../db.js";

const userController = {
  // API để lấy danh sách các sự kiện quan trọng của một người dùng dựa trên userId
  getImportantsByUserId: async (req, res) => {
    const { userId } = req.params;
    const sql = "SELECT * FROM Importants JOIN Events ON Importants.eventId = Events.id WHERE Importants.eventId = Events.id AND Importants.userId = ? AND eventType = 'target' AND isImportant = 1";
    try {
      const [result] = await connect.query(sql, [userId]);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  // API để lấy thông tin quan trọng của sự kiện theo eventId và userId
  getImportantByEventIdUserId: async (req, res) => {
    const { eventId, userId } = req.params;
    const sql = "SELECT isImportant FROM Importants JOIN Events ON Importants.eventId = Events.id WHERE Importants.eventId = ? AND Importants.userId = ?";
    try {
      const [result] = await connect.query(sql, [eventId, userId]);
      if (result.length === 0) {
        return res.status(404).json({ success: false, message: "Important not found" });
      }
      res.json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  updateImportant: async (req, res) => {
    const { eventId, userId } = req.params;
    const sqlGet = "SELECT isImportant FROM Importants WHERE eventId = ? AND userId = ?";
    const sqlUpdate = "UPDATE Importants SET isImportant = ? WHERE eventId = ? AND userId = ?";
    try {
      // Lấy trạng thái quan trọng hiện tại từ cơ sở dữ liệu
      const [currentResult] = await connect.query(sqlGet, [eventId, userId]);
      if (currentResult.length === 0) {
        return res.status(404).json({ success: false, message: "Important not found" });
      }
      const currentIsImportant = currentResult[0].isImportant;
      // Thay đổi giá trị của trường isImportant
      const newIsImportant = currentIsImportant === 0 ? 1 : 0;
      // Cập nhật trạng thái quan trọng mới vào cơ sở dữ liệu
      const [result] = await connect.query(sqlUpdate, [newIsImportant, eventId, userId]);
      if (result.affectedRows > 0) {
        res.json({ success: true, message: "Important status updated successfully" });
      } else {
        res.status(500).json({ success: false, message: "Failed to update important status" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },
};

export default userController;
