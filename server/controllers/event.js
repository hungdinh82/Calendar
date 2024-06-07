import { connect } from "../db.js";
import moment from 'moment';

const eventController = {
    getAllEventsByCurrentUser: async (req, res) => {
        try {
            const currentUserId = req.params.id;
            const userSql = "SELECT Events.id AS eventId, Events.eventName, Events.calendarId, Events.start , Events.end, Events.eventType, Events.description, Events.status,  Events.creatorId, Events.target FROM Helpers, Events WHERE Helpers.eventId = Events.id AND Helpers.userId = ? UNION SELECT Events.id AS eventId, Events.eventName, Events.calendarId, Events.start , Events.end, Events.eventType, Events.description, Events.status,  Events.creatorId, Events.target FROM Helpers,Events WHERE Events.creatorId = ?";
            //  FROM Helpers, Events WHERE Helpers.eventId = Events.id AND Helpers.userId = ? UNION SELECT * FROM Helpers,Events WHERE creatorId = ?";
            // SELECT Notifies.id AS id, Notifies.toMail, Notifies.fromMail, Notifies.text, Notifies.isResolve, Notifies.isAccept, Notifies.eventId AS notifyEventId, Events.id AS eventId, Events.eventName, Events.calendarId, Events.start, Events.end, Events.eventType, Events.description, Events.status, Events.creatorId, Events.target FROM Notifies JOIN Events ON Notifies.eventId = Events.id WHERE toMail = ?; ";
            const [result] = await connect.query(userSql, [currentUserId, currentUserId]);
            // console.log(result);
            res.json(result);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getAllEventsTargetsByCurrentUser: async (req, res) => {
        try {
            const currentUserId = req.params.id;
            const userSql1 = "SELECT * FROM Events WHERE creatorId = ? AND eventType = 'target'";
            const [result1] = await connect.query(userSql1, [currentUserId]);
            const userSql2 = "SELECT * FROM Helpers, Events WHERE Helpers.eventId = Events.id AND Helpers.userId = ? AND eventType = 'target'";
            const [result2] = await connect.query(userSql2, [currentUserId]);
            // Merge the two result sets
            const resultMerge = [...result1, ...result2];

            res.json(resultMerge);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getAllTodoByTargetId: async (req, res) => {
        try {
            const { targetId } = req.params;

            // Query all events with the given targetId and eventType is 'todo'
            const sql = "SELECT * FROM Events WHERE target = ? AND eventType = 'todo'";
            const [result] = await connect.query(sql, [targetId]);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getEventById: async (req, res) => {
        const eventId = req.params.id;
        const sql = "SELECT * FROM Events WHERE id = ?";
        try {
            const [result] = await connect.query(sql, [eventId]);
            if (result.length === 0) {
                res.status(404).json({ error: "Event not found" });
            } else {
                res.json(result[0]);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    getTodosByTarget: async (req, res) => {
        const targetId = req.params.targetId;
        const sql = "SELECT * FROM Events WHERE target = ?";
        try {
            const [result] = await connect.query(sql, [targetId]);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    createEvent: async (req, res) => {
        const eventData = req.body;
        const sql = "INSERT INTO Events (eventName, calendarId, start, end, eventType, description, status, creatorId, target) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
            eventData.eventName,
            eventData.calendarId,
            eventData.start,
            eventData.end,
            eventData.eventType,
            eventData.description,
            eventData.status,
            eventData.creatorId,
            eventData.target
        ];
        try {
            const [result] = await connect.query(sql, values);
            res.json({ id: result.insertId });
            // add noti (if noti accept thi moi add vao helpers )
            const sql2 = "SELECT mail FROM Accounts WHERE id = ?"
            const [result2] = await connect.query(sql2, eventData.creatorId);
            eventData.helper.forEach(async helper => {
                const sql3 = "INSERT INTO Notifies (toMail, fromMail, text, isResolve, eventId, isAccept) VALUES (?, ?, ?, ?, ?, ?)";
                const values3 = [
                    helper,
                    result2[0].mail,
                    `assigned you join target ${eventData.eventName}`,
                    0,
                    result.insertId,
                    0
                ];
                await connect.query(sql3, values3);
            })
            // add default important
            const sql4 = "INSERT INTO Importants (eventId, userId) VALUES (?, ?)";
            await connect.query(sql4, [result.insertId, eventData.creatorId]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    // editEvent: async (req, res) => {
    //     const eventData = req.body;
    //     const eventId = req.params.id; // Lấy ID của sự kiện cần cập nhật từ URL
    //     // Định dạng lại startDate và endDate
    //     const formattedStartDate = moment(eventData.startDate).format("YYYY-MM-DD HH:mm:ss");
    //     const formattedEndDate = moment(eventData.endDate).format("YYYY-MM-DD HH:mm:ss");

    //     // Cập nhật giá trị mới vào eventData
    //     eventData.start = formattedStartDate;
    //     eventData.end = formattedEndDate;

    //     console.log(eventData);

    //     // Cập nhật sự kiện trong bảng Events
    //     const updateEventSql = "UPDATE Events SET eventName = ?, calendarId = ?, start = ?, end = ?, eventType = ?, description = ?, status = ?, creatorId = ?, target = ? WHERE id = ?";
    //     const updateEventValues = [
    //         eventData.eventName,
    //         eventData.calendarId,
    //         eventData.start,
    //         eventData.end,
    //         eventData.eventType,
    //         eventData.description,
    //         eventData.status,
    //         eventData.creatorId,
    //         eventData.target,
    //         eventId // Sử dụng ID của sự kiện để xác định sự kiện cần cập nhật
    //     ];

    //     // Cập nhật sự kiện trong bảng Events
    //     try {
    //         await connect.query(updateEventSql, updateEventValues);

    //         // Xóa các liên kết cũ giữa sự kiện và người dùng trong bảng Helpers
    //         const deleteHelperSql = "DELETE FROM Helpers WHERE eventId = ?";
    //         await connect.query(deleteHelperSql, [eventId]);

    //         // Thêm lại các liên kết mới giữa sự kiện và người dùng trong bảng Helpers
    //         const eventMailString = eventData.helper.split(',');
    //         const insertHelperSql = "INSERT INTO Helpers (userId, eventId) VALUES (?, ?)";
    //         for (let i = 0; i < eventMailString.length; i++) {
    //             const insertHelperValues = [
    //                 eventMailString[i],
    //                 eventId
    //             ];
    //             await connect.query(insertHelperSql, insertHelperValues);
    //         }

    //         res.json({ success: true });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: "Internal server error" });
    //     }
    // },

    editEvent: async (req, res) => {
        const eventData = req.body;
        const eventId = req.params.id;
        // console.log(eventData);
        // console.log(eventId);

        // Định dạng lại ngày bắt đầu và kết thúc nếu cần
        const formattedStartDate = moment(eventData.start).format("YYYY-MM-DD HH:mm:ss");
        const formattedEndDate = moment(eventData.end).format("YYYY-MM-DD HH:mm:ss");

        // Cập nhật giá trị mới vào eventData
        eventData.start = formattedStartDate;
        eventData.end = formattedEndDate;

        try {
            // Lấy dữ liệu hiện tại của sự kiện từ bảng Events
            const [currentEvent] = await connect.query("SELECT * FROM Events WHERE id = ?", [eventId]);

            if (currentEvent.length === 0) {
                return res.status(404).json({ error: "Không tìm thấy sự kiện" });
            }

            const currentEventData = currentEvent[0];
            console.log(currentEventData);

            // Kiểm tra giá trị nào đã thay đổi
            const fieldsToUpdate = {};
            const updateValues = [];

            for (const key in eventData) {
                if (eventData[key] !== currentEventData[key]) {
                    fieldsToUpdate[key] = eventData[key];
                    updateValues.push(eventData[key]);
                }
            }

            // Nếu không có giá trị nào thay đổi, trả về thông báo không cần cập nhật
            if (Object.keys(fieldsToUpdate).length === 0) {
                return res.json({ success: true, message: "Không có thay đổi nào được phát hiện" });
            }

            // Tạo câu lệnh SQL để cập nhật các trường đã thay đổi
            const setClause = Object.keys(fieldsToUpdate).map(field => `${field} = ?`).join(", ");
            updateValues.push(eventId);

            const updateEventSql = `UPDATE Events SET ${setClause} WHERE id = ?`;

            // Thực hiện câu lệnh SQL để cập nhật sự kiện trong bảng Events
            await connect.query(updateEventSql, updateValues);

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
        }
    },

    editTarget: async (req, res) => {
        const eventData = req.body;
        const eventId = req.params.id;
        console.log(eventId);
        console.log(eventData);
        // Định dạng lại ngày bắt đầu và kết thúc nếu cần
        const formattedStartDate = moment(eventData.start).format("YYYY-MM-DD HH:mm:ss");
        const formattedEndDate = moment(eventData.end).format("YYYY-MM-DD HH:mm:ss");

        // Cập nhật giá trị mới vào eventData
        eventData.start = formattedStartDate;
        eventData.end = formattedEndDate;

        try {
            // Lấy dữ liệu hiện tại của sự kiện từ bảng Events
            const [currentEvent] = await connect.query("SELECT * FROM Events WHERE id = ?", [eventId]);
            const [currentHelpers] = await connect.query("SELECT * FROM Helpers,Accounts WHERE Helpers.userId = Accounts.id AND eventId = ?", [eventId]);
            const [currentNotifies] = await connect.query("SELECT * FROM Notifies WHERE eventId = ?", [eventId]); //chỉ cần check ở bảng Noti không cần check ở bảng helper vì nếu đã là helper thì isAccept = 1

            if (currentEvent.length === 0) {
                return res.status(404).json({ error: "Không tìm thấy sự kiện" });
            }

            const currentEventData = currentEvent[0];

            // Kiểm tra giá trị nào đã thay đổi
            const fieldsToUpdate = {};
            const updateValues = [];

            for (const key in eventData) {
                if (key !== 'helper' && eventData[key] !== currentEventData[key]) {
                    fieldsToUpdate[key] = eventData[key];
                    updateValues.push(eventData[key]);
                }
            }

            // Nếu có thay đổi, cập nhật bảng Events
            if (Object.keys(fieldsToUpdate).length > 0) {
                const setClause = Object.keys(fieldsToUpdate).map(field => `${field} = ?`).join(", ");
                updateValues.push(eventId);

                const updateEventSql = `UPDATE Events SET ${setClause} WHERE id = ?`;
                await connect.query(updateEventSql, updateValues);
            }
            
            const currentHelperEmails = currentHelpers.map(helper => helper.mail);

            const sql2 = "SELECT mail FROM Accounts WHERE id = ?"
            const [result2] = await connect.query(sql2, eventData.creatorId);

            for (const email of eventData.helper) {       // Duyệt qua từng thằng helper mới xem đã tồn tại trong helper cũ chưa nếu chưa có thì thêm vào Noti
                console.log(email);
                if (!currentHelperEmails.includes(email)) {
                    // Kiểm tra xem helper có tồn tại trong bảng Notifies hay không
                    const [existingNotifies] = await connect.query(
                        "SELECT * FROM Notifies WHERE toMail = ? AND eventId = ?",
                        [email, eventId]
                    );
                    console.log(email);
                    if (existingNotifies.length === 0) {
                        // Giả sử bạn có cách để lấy userId từ email
                        const [user] = await connect.query("SELECT id FROM Accounts WHERE mail = ?", [email]);
                        if (user.length > 0) {
                            // Thêm helper mới vào bảng Notifies
                            const notifyText = `assigned you join target ${eventData.eventName}`;
                            await connect.query(
                                "INSERT INTO Notifies (toMail, fromMail, text, isResolve, eventId, isAccept) VALUES (?, ?, ?, ?, ?, ?)",
                                [email, result2[0].mail, notifyText, 0, eventId, 0]
                            );
                        }
                    }
                } else {
                    // const [existingNotifies] = await connect.query(
                    //     "SELECT * FROM Notifies WHERE toMail = ? AND eventId = ?",
                    //     [email, eventId]
                    // );
                    // console.log(existingNotifies);
                }
            }

            const currentNotifiesEmails = currentNotifies.map(helper => helper.toMail);
            console.log(currentNotifiesEmails);

            for (const email of currentNotifiesEmails) {       // Duyệt qua từng thằng helper cũ xem còn được tồn tại trong helper mới không. Nếu không còn tồn tại thì xoá nó đi trong cả Noti và Helper
                // console.log(email);
                if (!eventData.helper.includes(email)) {
                    // Kiểm tra xem helper có tồn tại trong bảng Notifies hay không
                    const [existingNotifies] = await connect.query(
                        "SELECT * FROM Notifies WHERE toMail = ? AND eventId = ?",
                        [email, eventId]
                    );
                    // Xoá helper cũ trong bảng Notifies
                    await connect.query(
                        "DELETE FROM Notifies WHERE toMail = ? AND eventId = ?",
                        [email, eventId]
                    );
                    const sql2 = "SELECT id FROM Accounts WHERE mail = ?"
                    const [result2] = await connect.query(sql2, email);
                    // Xoá helper cũ trong bảng Helpers
                    await connect.query(
                        "DELETE FROM Helpers WHERE userId = ? AND eventId = ?",
                        [result2[0].id, eventId]
                    );
                }
            }

            // Cập nhật tất cả các thông báo của eventId với text mới
            const newNotifyText = `assigned you join target ${eventData.eventName}`;
            await connect.query(
                "UPDATE Notifies SET text = ? WHERE eventId = ?",
                [newNotifyText, eventId]
            );

            // Nếu không có giá trị nào thay đổi, trả về thông báo không cần cập nhật
            if (Object.keys(fieldsToUpdate).length === 0) {
                return res.json({ success: true, message: "Không có thay đổi nào được phát hiện" });
            }
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
        }
    },

    deleteEvent: async (req, res) => {
        const eventId = req.params.id;
        const sqlDeleteComments = "DELETE FROM Comments WHERE eventId = ?";
        const sqlDeleteHelpers = "DELETE FROM Helpers WHERE eventId = ?";
        const sqlDeleteNotifies = "DELETE FROM Notifies WHERE eventId = ?";
        const sqlDeleteEvents = "DELETE FROM Events WHERE id = ?";
        const sqlDeleteImportants = "DELETE FROM Importants WHERE eventId = ?";

        try {
            await connect.query(sqlDeleteComments, [eventId]); // Xóa bản ghi từ bảng Comments
            await connect.query(sqlDeleteHelpers, [eventId]); // Xóa bản ghi từ bảng Helpers
            await connect.query(sqlDeleteNotifies, [eventId]); // Xóa bản ghi từ bảng Notifies
            await connect.query(sqlDeleteImportants, [eventId]); // Xóa bản ghi từ bảng Importants
            const [result] = await connect.query(sqlDeleteEvents, [eventId]); // Xóa bản ghi từ bảng Events

            if (result.affectedRows === 0) {
                res.status(404).json({ error: "Event not found" });
            } else {
                res.json({ message: "Event deleted successfully" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

};

export default eventController;
