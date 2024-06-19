import { connect } from "../db.js";

const userController = {
  signIn: async (req, res) => {
    const { mail, password } = req.body;
    var sql =
      "SELECT id, userName, mail, avatar, isAdmin FROM Accounts WHERE mail = ? AND password = ?";
    try {
      const [result] = await connect.query(sql, [mail, password]);
      // console.log(result);
      if (result[0] != null) {
        res.json({
          login: true,
          id: result[0].id,
          userName: result[0].userName,
          mail: result[0].mail,
          avatar: result[0].avatar,
          isAdmin: result[0].isAdmin,
        })
      } else res.json({ login: false })
    }
    catch (error) {
      console.log(error);
    }
  },

  signUp: async (req, res) => {
    const { id, mail, password, userName, avatarUrl } = req.body;
    var sql = "SELECT id FROM Accounts WHERE mail = ? "
    try {
      const [mailConflict] = await connect.query(sql, [mail]);
      if (mailConflict[0] != null) res.json({ signUp: false });
      else {
        sql = "INSERT INTO Accounts( mail, password, userName,  avatar ) VALUES(?,?,?,?)"
        try {
          const [result] = await connect.query(sql, [mail, password, userName, avatarUrl]);
          res.json({ signUp: true });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  getUserByMail: async (req, res) => {
    // Retrieve email from request parameters
    const { mail } = req.params;
    // SQL query to select user by email
    const sql = "SELECT id, userName, mail, avatar FROM Accounts WHERE mail = ?";
    try {
      // Execute the query
      const [result] = await connect.query(sql, [mail]);
      // If user exists, send user data
      if (result[0] != null) {
        res.json({
          id: result[0].id,
          userName: result[0].userName,
          mail: result[0].mail,
          avatar: result[0].avatar,
        });
      } else {
        // If user does not exist, send user not found
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.log(error);
      // Handle any errors
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getCreatorById: async (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM Accounts WHERE id = ?";

    try {
        const [result] = await connect.query(sql, [userId]);

        if (result.length > 0) {
            res.json(result[0]); // Trả về thông tin của người dùng đầu tiên nếu tìm thấy
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
  },

};
export default userController;
