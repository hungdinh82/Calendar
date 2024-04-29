import classNames from "classnames/bind";
import { FolderOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { Select } from 'antd';
import { useSearchParams } from "react-router-dom";

import styles from './DetailTask.module.scss';
import Sidebar from "../../components/Sidebar/Sidebar";
import Detail from "../Overview/Detail/Detail";
import Comment from "../../components/Comment/Comment";
import HeaderOptions from "../../components/HeaderOptions/HeaderOptions";

const cx = classNames.bind(styles);

function DetailTask({ }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [event, setEvent] = useState()
    const [target, setTarget] = useState()
    const [listEvents, setListEvents] = useState([])
    const [processType, setProcesstype] = useState();
    const [isShowSideBar, setIsShowSideBar] = useState(true);

    function updateArrayObjects(listEvents, id, calendarId, changes) {
        return listEvents.map(obj => {
            if (obj.id === id && obj.calendarId === calendarId) {
                return { ...obj, ...changes }
            }
            return obj;
        });
    }

    useEffect(() => {
        const Events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
        setListEvents(Events)
    }, [])

    useEffect(() => {
        const eventArray = listEvents.filter((event) => {
            return Number(event.id) === Number(searchParams.get("eventId"))
        })
        setEvent(eventArray[0])
        setProcesstype(eventArray[0]?.raw?.status)
        if (eventArray[0]?.raw?.target) {
            const targetArray = listEvents.filter((event) => {
                return Number(event.id) === Number(eventArray[0].raw.target)
            })
            setTarget(targetArray[0])
        }
    }, [searchParams.get("eventId"), listEvents])

    const handleOnchangeSelect = (value) => {
        const events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
        const newEvents = updateArrayObjects(events, event.id, event.calendarId, { raw: { ...event.raw, status: value } })
        setProcesstype(value)
        localStorage.setItem("listEvents", JSON.stringify(newEvents));
    }

    return (
        <div className={cx('detail-task') + " taskbarLibrary"}>
            <div className={cx('grid')} style={{ height: "100%" }}>
                <div className={cx('row')} style={{ height: "100%" }}>
                    <div className={cx(isShowSideBar ? 'col l-2-4' : 'col l-1')}>
                        <Sidebar show={setIsShowSideBar}></Sidebar>
                    </div>
                    <div className={cx(isShowSideBar ? 'col l-10' : 'col l-11')} style={{ flex: 1 }}>
                        <div className={cx('content')}>
                            <div className={cx('content-header')}>
                                <div className={cx('header-title')}>{event?.eventName}</div>
                                <div className={cx('header-right')}>
                                    <div className={cx('process-item')}>
                                        <Select
                                            value={processType}
                                            style={{ width: 160 }}
                                            size="large"
                                            className={processType === "In Progress" ? "In-progress" : processType}
                                            onChange={handleOnchangeSelect}
                                            options={[
                                                {
                                                    options: [
                                                        { label: 'Done', value: 'Done' },
                                                        { label: 'Ready', value: 'Ready' },
                                                        { label: 'In Progress', value: 'In Progress' },
                                                    ],
                                                },
                                            ]}
                                        />
                                    </div>
                                    <HeaderOptions></HeaderOptions>
                                </div>
                            </div>

                            <div className={cx('sub-header')}>
                                <FolderOutlined style={{ fontSize: 20 }} />
                                <span>{target?.eventName}</span>
                            </div>

                            <div className={cx('content-body')}>
                                <div className={cx('grid')} style={{ height: "100%" }}>
                                    <div className={cx('row')} style={{ height: "100%" }}>
                                        <div className={cx('col l-7')}>
                                            <div className={cx('content-title')}>Description</div>
                                            <div className={cx('description')}>
                                                <div className={cx('wrapper')} dangerouslySetInnerHTML={{ __html: event?.raw?.description }}>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('col l-5')}>
                                            <div className={cx('detail')}>
                                                <div className={cx('content-title')}>Detail</div>
                                                <Detail event={event} setListEvents={setListEvents}></Detail>
                                            </div>

                                            <div className={cx('comment')}>
                                                <div className={cx('content-title')}>Comment</div>
                                                <Comment event={event}></Comment>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailTask;