import classNames from "classnames/bind";

import styles from './NotifyItem.module.scss';

import { Button, Tooltip } from "antd";
import "./Library.scss"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DialogDetails from "../../../DialogDetails/DialogDetails";
import { useUpdateNotificationMutation } from "../../../../app/api/notiService";


const cx = classNames.bind(styles);

function NotifyItem({ notify, setNotifyLength }) {
    const [isResolve, setIsResolve] = useState(notify.isResolve)
    const [isAccept, setIsAccept] = useState(notify.isAccept)
    const [isOpen, setIsOpen] = useState(false);
    const [updateNotification] = useUpdateNotificationMutation()

    const sender = notify.fromMail;
    let targetName = notify?.target;

    const handleAccept = () => {
        updateNotification({ id: notify.id, data: { eventId: notify.eventId, currentUserId: JSON.parse(localStorage.getItem("currentUser")).id, isAccept: 1 } })
        setIsResolve(1);
        setIsAccept(1);
        setNotifyLength((prev) => prev - 1);
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
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.isConfirmed) {
                updateNotification({ id: notify.id, data: { eventId: notify.eventId, currentUserId: JSON.parse(localStorage.getItem("currentUser")).id, isAccept: 0 } })
                setIsResolve(1);
                setIsAccept(0);
                setNotifyLength((prev) => prev - 1);
                Swal.fire({
                    icon: "success",
                    title: "Rejected!",
                })
            }
        })
    };



    useEffect(() => {
    }, [isResolve]);

    return (
        <>
            <div className={cx('notify-item') + " notifyLibrary"}>
                <p className={cx('title')}>
                    <Tooltip title={notify.fromMail}>
                        <span className={cx("userName")}>{notify.fromMail + " "}</span>
                    </Tooltip>
                    {notify.text}
                    <span className={cx("target")}> {targetName || ""} </span>
                </p>
                {/* <p className={cx('task')} onClick={() => setIsOpen(true)}>{notify.eventName}</p> */}
                <p className={cx('task')} >{notify.eventName}</p>
                {!isResolve ? (
                    <div className={cx("button-layout")}>
                        <span className="notify-accept">
                            <Button onClick={handleAccept}>Accept</Button>
                        </span>
                        <span className="notify-reject" style={{ marginLeft: "15px" }}>
                            <Button onClick={handleReject}>Reject</Button>
                        </span>
                    </div>
                ) : isAccept ? (
                    <div className={cx("accepted-mess")}>Accepted!</div>
                ) : (
                    <div className={cx("rejected-mess")}>Rejected!</div>
                )}
       
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