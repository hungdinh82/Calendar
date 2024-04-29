import classNames from "classnames/bind";
import { Avatar, Tooltip } from 'antd';
import { useNavigate } from "react-router-dom";
import DialogDetails from "../../../components/DialogDetails/DialogDetails";

import styles from './Task.module.scss';
import { useState, useEffect } from "react";
import './library.scss'

const cx = classNames.bind(styles);
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function Task({ isCreatorTarget, useNumber = 1, columnId, event, setListEvents }) {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [check, setCheck] = useState(false);
    const [helper, setHelper] = useState([])
    const [isPermission, setIsPermission] = useState(false);
    const handleOnDrag = (e) => {

        const fromColumnId = columnId;
        const data = [fromColumnId, event, useNumber]
        e.dataTransfer.setData('text/plain', JSON.stringify(data));

    }

    const onDragOver = (event) => {
        event.preventDefault();
    }

    const handleOnDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();


        let taskElement = e.target;
        while (taskElement.id !== "task") {
            taskElement = taskElement.parentNode;
        }


        const prevMovedElement = document.getElementsByClassName("move");
        if (!prevMovedElement[0]) {
            taskElement.classList.add("move");
            setCheck(true);
        } else
            if (prevMovedElement[0] !== taskElement) {
                prevMovedElement[0].classList.remove("move");
                taskElement.classList.add("move");
                setCheck(true);
            } else setCheck(false);

    }

    const handleOnDragExit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let taskElement = e.target;
        while (taskElement.id !== "task") {
            taskElement = taskElement.parentNode;
        }

        if (!taskElement.nextElementSibling && check === false) {
            taskElement.classList.remove("move");
        }
    }

    const getHelper = () => {
        let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
        const currentUserId = localStorage.getItem("currentUserId")
        const listHelper = listAccounts.filter((account) => {
            return event.raw?.helper?.includes(account.mail);
        })
        setHelper(listHelper)
        const user = listAccounts.filter((account) => Number(currentUserId) === Number(account.id))
        setIsPermission(Number(event?.raw?.creatorId) === Number(currentUserId) || event?.raw?.helper.includes(user[0].mail))
    }

    useEffect(() => {
        getHelper();
    }, [event])

    return (
        <>
            <Tooltip title={"Click 2 lần để xem chi tiết"}>
                <div
                    id="task"
                    className={cx('task') + " task"}
                    onDragLeave={handleOnDragExit}
                    onDragOver={onDragOver}
                    onDragEnter={handleOnDragEnter}
                    draggable={isPermission || isCreatorTarget}
                    onDragStart={handleOnDrag}
                    onDoubleClick={() => setIsOpen(true)}
                >
                    <div className={cx('content')}>
                        <div className={cx('content-title')}>{event?.eventName}</div>
                        <div className={cx('right-content')}>
                            <Avatar.Group maxCount={3}>
                                {
                                    helper?.map((helper) => (
                                        <Tooltip title={helper.userName} placement="bottom">
                                            <Avatar size="small" style={{ backgroundColor: '#87d068' }} src={helper.avatar} />
                                        </Tooltip>
                                    ))
                                }
                            </Avatar.Group>
                        </div>
                    </div>
                </div >
            </Tooltip>
            {
                isOpen && <DialogDetails
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    event={event}
                    setListEvents={setListEvents}
                />
            }
        </>
    );
}

export default Task;