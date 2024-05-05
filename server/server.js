import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import fileUpload from "express-fileupload";

import comment from "./routers/comment.js";
import user from "./routers/user.js";
import event from "./routers/event.js";
import noti from "./routers/noti.js";
import important from "./routers/important.js";
import helper from "./routers/helper.js";
import session from "express-session";
import path from "path";
import connectSocket  from './socket/socket.js';


dotenv.config();

const port = process.env.PORT || 4000;
const app = express();
// const __dirname = path.resolve();

app.use(express.urlencoded());
app.use(express.json());
app.use(session({ secret: "0377234560", resave: false, saveUninitialized: true }))
app.use(cors());
app.use(fileUpload());
// app.use("/uploads",express.static(path.join(__dirname, 'uploads')))

comment(app);
user(app);
event(app);
noti(app);
important(app);
helper(app);

const server = app.listen(port, () => {
  console.log("Server started on port 4000");
});
connectSocket(server, port);
