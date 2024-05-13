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
import { useGetAllNotificationsByToMailMutation } from "../../app/api/notiService";

const cx = classNames.bind(styles);

const notify_List = [
    {
        title: "Task completed",
        task: "Thiết kế cái quần"
    },

    {
        title: "Hiếu Phạm assigned you a task",
        task: "Vẽ user flow"
    },

];

function HeaderOptions({ calendar = false }) {
    const [listEvents, setListEvents] = useState((localStorage.getItem("listEvents") && localStorage.getItem("listEvents")[0]) ? JSON.parse(localStorage.getItem("listEvents")) : []);
    const [notifyLength, setNotifyLength] = useState();
    const [searchOpen, setSearchOpen] = useState(false);
    const [notyOpen, setNotyOpen] = useState(false);
    const socket = useSelector((state) => state.socket.socket);

    const [getAllNoti] = useGetAllNotificationsByToMailMutation();
    const [notifications, setNotifications] = useState([]);
    const [noLoop, setNoLoop] = useState(false);
    useEffect(() => {
        getAllNoti(JSON.parse(localStorage.getItem("currentUser")).mail).then(
            (response) => {
                // console.log(response.data);
                var reverseNoti = response.data.slice(); 
                reverseNoti.reverse();
                setNotifications(reverseNoti);
            }
        )
    }, [noLoop]);

    const listInformation = (localStorage.getItem("listInformations") && localStorage.getItem("listInformations")[0]) ? JSON.parse(localStorage.getItem("listInformations")) : [];
    useEffect(() => {
        let notifyLength = 0;
        listInformation.map((notify) => {
            const listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
            const currentUserId = JSON.parse(localStorage.getItem("currentUser")).id
            const user = listAccounts.filter((account) => Number(account.id) === Number(currentUserId))
            if (notify?.toMail === user[0]?.mail && !notify.isResolve) notifyLength++;
        })
        setNotifyLength(notifyLength)
    }, [])
    useEffect(() => {
        socket?.on("receive-notification", (notification) => {
            getAllNoti(JSON.parse(localStorage.getItem("currentUser")).mail).then(
                (response) => {
                    console.log(response.data);
                    var reverseNoti = response.data.slice(); 
                    reverseNoti.reverse();
                    setNotifications(reverseNoti);
                }
            )
        });
    }, [socket]);

    return (
        <div className={cx('header-options', calendar ? "calendar" : "") + " header-options"}>
            <Popover defaultOpen={notyOpen} content={<Notify notifications={notifications}  setOpen={setNotyOpen}></Notify>} trigger="click" placement="bottomRight" arrow={false}>
                <div className={cx('option-item')} onClick={() => { setNotyOpen(true); setSearchOpen(false) }} >
                    <Badge count={notifyLength} size="small">
                        <BellOutlined />
                    </Badge>
                </div>
            </Popover>
            <Popover defaultOpen={searchOpen} content={<Search workList={listEvents} setOpen={setSearchOpen}></Search>} trigger="click" placement="bottomRight" arrow={false}>
                <div className={cx('option-item')} onClick={() => { setSearchOpen(true); setNotyOpen(false) }}>
                    <SearchOutlined />
                </div>
            </Popover>
        </div>
    );
}

export default HeaderOptions;