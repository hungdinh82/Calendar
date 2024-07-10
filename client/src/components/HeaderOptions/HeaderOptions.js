import classNames from 'classnames/bind';
import { Badge, Popover } from 'antd';
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import { useState } from 'react';

import styles from './HeaderOptions.module.scss';
import "./library.scss"
import Notify from './Notify/Notify';
import Search from './Search/Search';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllNotificationsByToMailMutation } from "../../Services/api/notiService";
import { useGetAllEventsByCurrentUserQuery } from "../../Services/api/eventService";

const cx = classNames.bind(styles);


function HeaderOptions({ calendar = false }) {
    const [notifyLength, setNotifyLength] = useState(0);
    const [searchOpen, setSearchOpen] = useState(false);
    const [notyOpen, setNotyOpen] = useState(false);
    const socket = useSelector((state) => state.socket.socket);

    const [getAllNoti] = useGetAllNotificationsByToMailMutation();
    const [notifications, setNotifications] = useState([]);
    const [noLoop, setNoLoop] = useState(false);
    const { data: events } = useGetAllEventsByCurrentUserQuery(JSON.parse(localStorage.getItem("currentUser")).id);
    const listEvents = events;

    useEffect(() => {
        getAllNoti(JSON.parse(localStorage.getItem("currentUser")).mail).then(
            (response) => {
                setNotifyLength(0);
                response.data.map((message) => {
                    if (message.isResolve == 0) {
                        setNotifyLength(notifyLength => notifyLength + 1);
                    }
                })
                var reverseNoti = response.data.slice();
                reverseNoti.reverse();
                setNotifications(reverseNoti);
            }
        )
    }, [noLoop]);

    useEffect(() => {
        socket?.on("receive-notification", (notification) => {
            getAllNoti(JSON.parse(localStorage.getItem("currentUser")).mail).then(
                (response) => {
                    setNotifyLength(0);
                    response.data.map((message) => {
                        if (message.isResolve == 0) {
                            setNotifyLength(notifyLength => notifyLength + 1);
                        }
                    })
                    var reverseNoti = response.data.slice();
                    reverseNoti.reverse();
                    setNotifications(reverseNoti);
                }
            )
        });
    }, [socket]);

    return (
        <div className={cx('header-options', calendar ? "calendar" : "") + " header-options"}>
            <Popover defaultOpen={notyOpen} content={<Notify setNotifyLength={setNotifyLength} notifications={notifications} setOpen={setNotyOpen}></Notify>} trigger="click" placement="bottomRight" arrow={false}>
                <div className={cx('option-item')} onClick={() => { setNotyOpen(true); setSearchOpen(false) }} >
                    <Badge count={notifyLength} size="small">
                        <BellOutlined />
                    </Badge>
                </div>
            </Popover>
            <Popover onOpenChange={(visible) => setSearchOpen(visible)} open={searchOpen} content={<Search workList={listEvents} setOpen={setSearchOpen}></Search>} trigger="click" placement="bottomRight" arrow={false}>
                <div className={cx('option-item')} onClick={() => { setSearchOpen(!searchOpen); setNotyOpen(false) }}>
                    <SearchOutlined />
                </div>
            </Popover>
        </div>
    );
}

export default HeaderOptions;