import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './Notify.module.scss';
import NotifyItem from "./NotifyItem/NotifyItem";
import { useGetAllNotificationsByToMailQuery } from "../../../app/api/notiService";
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Notify() {
    const socket = useSelector((state) => state.socket.socket);
    // const listInformation = localStorage.getItem("listInformations")[0] ? JSON.parse(localStorage.getItem("listInformations")) : [];
    const { data: listInformation }  = useGetAllNotificationsByToMailQuery(JSON.parse(localStorage.getItem("currentUser")).mail);
    // console.log(JSON.parse(localStorage.getItem("currentUser")).mail);
    // console.log(listInformation);
    // listInformation.reverse();
    const [newNotification, setNewNotification] = useState(null);

    useEffect(() => {
        socket?.on("receive-notification", (notification) => {
            setNewNotification(notification);
        //   if (notificationSetting < notification.type) {
        //     create({
        //       data: { ...notification },
        //       headers: {
        //         accessToken,
        //       },
        //     })
        //       .then((res) => {
        //         if (res.data?.error) {
        //           console.log(res.data?.error);
        //         }
        //       })
        //       .catch((err) => {
        //         console.log(err);
        //       });
        //   }
        });
      }, [socket]);

    return (
        <div className={cx("notify")}>
            {newNotification && <NotifyItem notify={newNotification} ></NotifyItem>}
            {listInformation?.map((item) => {
                // const listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
                // const currentUserId = localStorage.getItem("currentUserId")
                // const user = listAccounts.filter((account) => Number(account.id) === Number(currentUserId))
                // const user = JSON.parse(localStorage.getItem("currentUser"))
                // if (item.toMail === user[0].mail) return <NotifyItem notify={item} ></NotifyItem>
                return <NotifyItem notify={item} ></NotifyItem>
            })}
        </div>
    );
}

export default Notify;