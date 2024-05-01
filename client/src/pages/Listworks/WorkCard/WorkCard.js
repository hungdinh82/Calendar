import classNames from "classnames/bind";
import { ArrowUpOutlined, StarFilled, AntDesignOutlined, UserOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dropdown, Space, Tooltip } from "antd"
import Swal from "sweetalert2";
import DialogCreateEvent from "../../../components/DialogCreateEvent/DialogCreateEvent";

import styles from './WorkCard.module.scss';
import './library.scss'
import { useGetUserByMailsQuery } from "../../../app/api/authService";


const cx = classNames.bind(styles);

let taskLists = [
    [],
    [],
    [],
]
function WorkCard({ event, setListEvents, listEvents, isCreator }) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const [Lists, setLists] = useState(taskLists);
    const [width, setWidth] = useState((Lists[2]?.length / (Lists[0]?.length + Lists[1]?.length + Lists[2]?.length)) * 100 + '%');
    const [target, setTarget] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [helper, setHelper] = useState([]);
    
    const { data: user } = useGetUserByMailsQuery(event.helper);
    // console.log(user);
    function removeObjectFromArray(listEvents, id, calendarid) {
        return listEvents.filter(obj => (obj.id !== id && obj.calendarid !== calendarid));
    }
    const handleDeleteEvent = () => {
        Swal.fire({
            title: 'Bạn thực sự muốn xóa?',
            text: "Nếu bạn xóa thì tất cả việc làm trong workspace này sẽ bị xóa",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const listEventsStorage = JSON.parse(localStorage.getItem("listEvents"))
                const updateListEvents = listEventsStorage.reduce((res, currentValue) => {
                    if (currentValue.raw.target === event.id) {
                        return res
                    }
                    return [...res, currentValue]
                }, [])
                const listEventsNew = removeObjectFromArray(updateListEvents, event.id, event.calendarId)
                localStorage.setItem("listEvents", JSON.stringify(listEventsNew));
                setListEvents(listEventsNew)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
    const items = [
        {
            key: '1',
            label: (
                <div className={cx("items-dropdown")} onClick={() => setIsOpen(true)}>Edit</div>
            ),
            style: { padding: 0 }
        },
        {
            key: '2',
            label: (
                <div className={cx("items-dropdown")} onClick={handleDeleteEvent}>Delete</div>
            ),
            style: { padding: 0 }
        },
    ];
    // const [isImportain, setIsImportain] = useState(event.raw.isImportain || false)

    function updateArrayObjects(listEvents, id, calendarId, changes) {
        return listEvents.map(obj => {
            if (obj.id === id && obj.calendarId === calendarId) {
                return { ...obj, ...changes }
            }
            return obj;
        });
    }

    const handleClickStar = (e) => {
        e.stopPropagation();
        const Events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
        // const newEvents = updateArrayObjects(Events, event.id, event.calendarId, { raw: { ...event.raw, isImportain: !isImportain } })
        // setListEvents(newEvents)
        // setIsImportain(!isImportain)
        // localStorage.setItem("listEvents", JSON.stringify(newEvents))
    }
    const filterEvent = () => {
        // const Events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
        const Events = listEvents;

        const targetArray = Events.filter((e) => {
            return Number(e.id) === Number(event.id)
        })
        setTarget(targetArray[0])
        const eventsOfTarget = Events.filter((event) => {
            return Number(event.target) === Number(targetArray[0]?.id)
        })
        const listReady = eventsOfTarget.filter((event) => event.status === "Ready")
        const listInprocess = eventsOfTarget.filter((event) => event.status === "In Progress")
        const listDone = eventsOfTarget.filter((event) => event.status === "Done")

        taskLists = [
            listReady,
            listInprocess,
            listDone
        ]

        setLists(taskLists)
    }

    const getHelper = () => {
        // let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
        // let listAccounts = event.helper;
        // const listHelper = listAccounts.filter((account) => {
        //     return event.helper.includes(account.mail) || Number(event.creatorId) === Number(account.id);
        // })
        // console.log(event.helper);
        setHelper(event.helper)
    }

    useEffect(() => {
        const lamTronSo = (Lists[2]?.length / (Lists[0]?.length + Lists[1]?.length + Lists[2]?.length)).toFixed(4);
        setWidth(lamTronSo * 100 + '%')
    }, [Lists])


    useEffect(() => {
        filterEvent()
    }, [searchParams.get("eventId"), listEvents])

    useEffect(() => {
        getHelper();
    }, [event])
    return (
        <div className={cx('card') + " card"} onClick={() => { navigate(`/overview?eventId=${event.id}`) }}>
            <div className={cx('card-header')}>
                <div className={cx('header-title')}>{event.eventName}</div>
                <div className={cx('header-icons')}>
                    {
                        // isImportain ?
                            <StarFilled onClick={handleClickStar} style={{ color: "#f48080" }} />
                            // : <StarOutlined onClick={handleClickStar} />
                    }
                    <ArrowUpOutlined onClick={() => { navigate(`/overview?eventId=${event.id}`) }} />
                </div>
            </div>

            <div className={cx('card-body')}>
                <p className={cx('description')} dangerouslySetInnerHTML={{ __html: event.description }}></p>
                <div className={cx('process')}>
                    <div className={cx('process-title')}>
                        <span>Completion</span>
                        <span className={cx('text-content')}>{Lists[2].length + '/' + (Lists[0].length + Lists[1].length + Lists[2].length)}</span>
                    </div>
                    <div className={cx('process-bar')}>
                        <div className={cx('process-value')} style={{ width: width }}></div>
                    </div>
                </div>
                <div className={cx('members')} onClick={(e) => e.stopPropagation()}>
                    <Avatar.Group size="small" maxCount={4} maxStyle={{ color: 'white', backgroundColor: '#413E54' }}>
                        {
                            helper?.map((helper) => (
                                <Tooltip title={helper.userName} placement="bottom">
                                    <Avatar size="small" style={{ backgroundColor: '#87d068' }} src={helper.avatar} />
                                </Tooltip>
                            ))
                        }
                    </Avatar.Group>
                    {isCreator &&
                        <Dropdown menu={{ items, style: { padding: "10px 6px", boxShadow: "rgb(136, 136, 136) 0px 0px 3px" } }}>
                            <Space>
                                <p onClick={(e) => e.stopPropagation()}>...</p>
                            </Space>
                        </Dropdown>
                    }
                </div>
            </div>

            {isOpen &&
                <DialogCreateEvent
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    start={event.start}
                    end={event.end}
                    event={event}
                    type={"update"}
                    setListEvents={setListEvents}
                    isTargetPage={true}
                    targetId={event.id}
                />
            }
        </div>
    );
}

export default WorkCard;