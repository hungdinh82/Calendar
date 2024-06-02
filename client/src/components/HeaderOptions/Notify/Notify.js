import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './Notify.module.scss';
import NotifyItem from "./NotifyItem/NotifyItem";
import { useGetAllNotificationsByToMailMutation } from "../../../app/api/notiService";
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Notify({notifications, setNotifyLength}) {
    // const socket = useSelector((state) => state.socket.socket);

    return (
        <div className={cx("notify")}>
            {notifications?.map((item) => {
                return <NotifyItem setNotifyLength={setNotifyLength} key={item.id} notify={item} ></NotifyItem>
            })}
        </div>
    );
}

export default Notify;