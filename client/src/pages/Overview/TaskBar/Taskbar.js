import classNames from "classnames/bind";
import { Select, Avatar, Tooltip } from 'antd';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogDetails from "../../../components/DialogDetails/DialogDetails";

import styles from './TaskBar.module.scss';
import './library.scss'


const cx = classNames.bind(styles);

function TaskBar({ callback, isCreatorTarget, event, protype, userNumber = 1, coloumnId, setLists, disabled = false, process = "", border = false, setListEvents }) {
    const navigate = useNavigate();
    const [processType, setProcesstype] = useState(event?.raw?.status);
    const [isOpen, setIsOpen] = useState(false)
    const [helper, setHelper] = useState([]);
    const [isPermission, setIsPermission] = useState(false);
    const handleChangeSelect = (value) => {
        if (value !== protype) {
            setLists(event, value, coloumnId, userNumber)
            setProcesstype(value);
        }
    }

    const getHelper = () => {
        let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
        const currentUserId = localStorage.getItem("currentUserId")
        const listHelper = listAccounts.filter((account) => {
            return event.raw.helper.includes(account.mail);
        })
        setHelper(listHelper)
        const user = listAccounts.filter((account) => Number(currentUserId) === Number(account.id))
        setIsPermission(Number(event.raw.creatorId) === Number(currentUserId) || event.raw.helper.includes(user[0].mail))
    }

    useEffect(() => {
        getHelper();
    }, [event])

    return (
        <>
            <div className={cx('taskbar', border ? "border" : "") + " taskbarLibrary"} onClick={() => { setIsOpen(true); if(callback) callback(false) }}>
                <div className={cx('task-content')}>
                    <div className={cx('content-title')}>{event?.eventName}</div>
                    <div className={cx('right-content')}>
                        {process ? <span className={cx('process')}>{process}</span> :
                            <Select
                                defaultValue={processType}
                                style={{ width: 140 }}
                                disabled={!isPermission && !isCreatorTarget}
                                className={processType === "In Progress" ? "In-progress" : processType}
                                onChange={handleChangeSelect}
                                onClick={(e) => e.stopPropagation()}
                                options={[
                                    {
                                        options: [
                                            { label: 'Done', value: 'Done' },
                                            { label: 'In Progress', value: 'In Progress' },
                                            { label: 'Ready', value: 'Ready' },
                                        ],
                                    },
                                ]}
                            />
                        }

                        <Avatar.Group maxCount={3} maxStyle={{ color: '#FFFFFF', backgroundColor: '#413E54' }} >
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

export default TaskBar;