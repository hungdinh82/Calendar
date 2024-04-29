import { connect } from "../db.js";

const userController = {
  signIn: async (req, res) => {
    const { mail, password } = req.body;
    var sql =
      "SELECT id, userName, avatar FROM Accounts WHERE mail = ? AND password = ?";
    try {
      const [result] = await connect.query(sql, [mail, password]);
      if (result[0] != null) {
        res.json({
          login: true,
          id: result[0].id,
          userName: result[0].userName,
          avatar: result[0].avatar,
        })
      } else res.json({ login: false })
    }
    catch (error) {
      console.log(error);
    }
  },

  signUp: async (req, res) => {
    const { id, mail, password, userName,  avatarUrl } = req.body;
    var sql = "SELECT id FROM Accounts WHERE mail = ? "
    try {
      const [mailConflict] = await connect.query(sql, [mail]);
      if (mailConflict[0] != null) res.json({ signUp: false });
      else {
        sql = "INSERT INTO Accounts( mail, password, userName,  avatar ) VALUES(?,?,?,?)"
        try {
          const [result] = await connect.query(sql, [ mail, password, userName,  avatarUrl]);
          res.json({ signUp: true });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },


};
export default userController;
