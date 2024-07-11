// import socket from "socket.io";
import { Server } from "socket.io";

global.onlineUsers = [];

const connectSocket = (server, port) => {
  console.log("Socket server started on port", port);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Someone connected");

    socket.on("add-user", (user) => {
      onlineUsers.push({ information: user, socketId: socket.id });
    });


    socket.on("new-notification", ({ mails }) => {
      onlineUsers.forEach((user) => {
        mails.forEach((mail) => {
          // console.log(user.information.mail, mail);
          if (user.information.mail === mail) {
            socket
              .to(user.socketId)
              .emit("receive-notification");
          }
        });
      });
      // console.log(onlineUsers);
    });

    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      console.log("Someone disconnected");
    });
  });
};

export default connectSocket;