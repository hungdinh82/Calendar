import classNames from "classnames/bind";

import styles from './NotifyItem.module.scss';

import { Button, Tooltip } from "antd";
import "./Library.scss"
import { useState } from "react";
import Swal from "sweetalert2";
import DialogDetails from "../../../DialogDetails/DialogDetails";

const cx = classNames.bind(styles);

function NotifyItem({ notify }) {
    const [isResolve, setIsResolve] = useState(notify.isResolve)
    const [isAccept, setIsAccept] = useState(notify.isAccept)
    const [isOpen, setIsOpen] = useState(false);
    const listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
    const sender = listAccounts.filter((account) => account.mail === notify.fromMail)
    const listEvents = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
    let targetName;
    if (notify.event.raw.target) {
        const target = listEvents.filter((e) => e.id === notify.event.raw.target)
        targetName = target[0].eventName;
    }

    function updateArrayObjects(listEvents, id, calendarId, changes) {
        return listEvents.map(obj => {
            if (obj.id === id && obj.calendarId === calendarId) {
                return { ...obj, ...changes }
            }
            return obj;
        });
    }

    function updateArrayObjectsInformation(listInformation, id, changes) {
        return listInformation.map(obj => {
            if (obj.id === id) {
                return { ...obj, ...changes }
            }
            return obj;
        });
    }

    const handleAccept = () => {
        const listEvents = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
        notify.event.raw.helper.push(notify.toMail)
        const newListEvents = updateArrayObjects(listEvents, notify.event.id, notify.event.calendarId, {
            raw: {
                ...notify.event.raw,
                helper: notify.event.raw.helper
            }
        })
        localStorage.setItem("listEvents", JSON.stringify(newListEvents));

        const listInformation = localStorage.getItem("listInformations")[0] ? JSON.parse(localStorage.getItem("listInformations")) : [];
        const newListInformation = updateArrayObjectsInformation(listInformation, notify.id, {
            isResolve: true,
            isAccept: true,
        })
        setIsResolve(true)
        setIsAccept(true)
        localStorage.setItem("listInformations", JSON.stringify(newListInformation));
        Swal.fire({
            icon: "success",
            title: "Accepted!",
        })
    }

    const handleReject = () => {
        Swal.fire({
            title: 'Are you sure reject?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continue'
        }).then((result) => {
            if (result.isConfirmed) {
                const listInformation = localStorage.getItem("listInformations")[0] ? JSON.parse(localStorage.getItem("listInformations")) : [];
                const newListInformation = updateArrayObjectsInformation(listInformation, notify.id, {
                    isResolve: true,
                    isAccept: false,
                })
                setIsResolve(true)
                setIsAccept(false)
                localStorage.setItem("listInformations", JSON.stringify(newListInformation));
                Swal.fire({
                    icon: "success",
                    title: "Rejected!",
                })
            }
        })


    }
    return (
        <>
            <div className={cx('notify-item') + " notifyLibrary"}>
                <p className={cx('title')}>
                    <Tooltip title={sender[0].mail}>
                        <span className={cx("userName")}>{sender[0].userName + " "}</span>
                    </Tooltip>
                    {notify.text}
                    <span className={cx("target")}> {targetName || ""} </span>
                </p>
                <p className={cx('task')} onClick={() => setIsOpen(true)}>{notify.event.eventName}</p>
                {
                    !isResolve &&
                    <div className={cx("button-layout")}>
                        <span className="notify-accept">
                            <Button onClick={handleAccept}>Accept</Button>
                        </span>
                        <span className="notify-reject" style={{ marginLeft: "15px" }}>
                            <Button onClick={handleReject}>Reject</Button>
                        </span>
                    </div>
                }
                {
                    isResolve && isAccept &&
                    <div className={cx("accepted-mess")}>Accepted!</div>
                }
                {
                    isResolve && !isAccept &&
                    <div className={cx("rejected-mess")}>Rejected!</div>
                }
            </div>
            {isOpen &&
                <DialogDetails
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    event={notify.event}
                    isOnlyView={true}
                />
            }
        </>
    );
}

export default NotifyItem;