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

    // socket.on("new-notification", ({ notification }) => {
    //   onlineUsers
    //     .filter((user) => user.information.id === notification.receiver_id)
    //     .forEach((followed) => {
    //       socket
    //         .to(followed.socketId)
    //         .emit("send-notification", { notification });
    //     });
    // });

    socket.on("new-notification", (notification) => {
      onlineUsers.forEach((user) => {
        if (user.id === notification.receiverId) {
          socket
            .to(user.socketId)
            .emit("receive-notification", { ...notification });
        }
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