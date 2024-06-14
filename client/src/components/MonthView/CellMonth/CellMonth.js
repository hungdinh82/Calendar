import React, { useRef } from "react"
import styles from "./CellMonth.module.scss"
import moment from 'moment'
import { useState, useEffect } from "react"
import DialogCreateEvent from "../../DialogCreateEvent/DialogCreateEvent"
import classNames from 'classnames/bind';
import EventCard from "../EventCard/EventCard"
import { Popover } from "antd"
import PopupDetail from "./PopupDetail/PopupDetail"

const dateFormat = 'YYYY-MM-DD'
const cx = classNames.bind(styles)
const CellMonth = ({ day, dayOfTheWeek, isToday, isCurrentMonth, listEvents, setListEvents, filter }) => {
    const [showEventModal, setShowEventModal] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [events, setEvents] = useState([])
    const layout = useRef(null)
    const dayHTML = useRef(null)
    const dayOfTheWeekHTML = useRef(null)
    const startDay = moment(day).startOf("day");
    const handleAddNewWorklog = (e) => {
        if (layout?.current === e.target || dayHTML?.current === e.target || dayOfTheWeekHTML?.current === e.target) {
            setIsOpen(true)
            setShowEventModal("create")
        }
    }

    const checkMore = () => {
        let eventsNew = [];
        listEvents?.map((event) => {
            const startEvent = typeof (event.start) === "string" ? event.start : event.start.d.d;
            const currentUser = JSON.parse(localStorage.getItem("currentUser"))
            // console.log(currentUser.id);
            // let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
            // const user = listAccounts.filter((account) => Number(currentUser) === Number(account.id))
            const condition = new Date(startEvent).getDate() === new Date(day).getDate() && new Date(startEvent).getMonth() === new Date(day).getMonth()
            const conditionFilter = (filter.done && event.status === "Done") || (filter.ready && event.status === "Ready") || (filter.inProgress && event.status === "In Progress")
            const conditionUser = event.eventType === "todo" 
            // const checkMe = event.helper.length === 0;
            const checkMe = !event.helper || event.helper.length === 0;
            const checkMeCondition = (filter.onlyMe && checkMe) || (filter.coWork && !checkMe);
            if (condition && conditionFilter && conditionUser && checkMeCondition) {  // check 1 nếu mà todo không có target thì lấy todo có người tạo là current user 2) nếu to do có target thì lấy todo có helper là mình tức là mình được phân công cho todo này và lấy  cả todo do mình tạo ra
                eventsNew.push(event)
            }
        })
        setEvents(eventsNew)
    }
 
    useEffect(() => checkMore(), [listEvents, day, filter]);


    return (
        <>
            <div className={cx("layout")} style={dayOfTheWeek ? { height: "calc(80vh/5 + 5px)", minHeight: "110px" } : null} onClick={handleAddNewWorklog} ref={layout}>
                {dayOfTheWeek ? <div className={cx("dayOfTheWeek")} ref={dayOfTheWeekHTML}>{dayOfTheWeek}</div> : null}
                <div style={!isCurrentMonth ? { opacity: "0.5", position: "relative" } : { position: "relative" }}>
                    <div className={isToday ? cx("today") : cx("day")} ref={dayHTML}>{new Date(day).getDate()}</div>
                    <div className={cx("listEvents")} style={isToday ? { paddingTop: "25px" } : null}>
                        {events?.map((event, index) => {
                            console.log(event);
                            const startEvent = typeof (event.start) === "string" ? event.start : event.start.d.d;
                            const condition = new Date(startEvent).getDate() === new Date(day).getDate() && new Date(startEvent).getMonth() === new Date(day).getMonth()
                            if (condition && index < 2) return <EventCard setListEvents={setListEvents} event={event} key={index} />
                        })
                        }
                        {
                            (events.length > 2) && <Popover content={<PopupDetail setListEvents={setListEvents} events={events} setOpen={setOpen}></PopupDetail>} trigger="click" open={open} onOpenChange={() => setOpen(prev => !prev)}>
                                <div className={cx("more")}>More Events +{events.length - 2}</div>
                            </Popover>
                        }
                    </div>
                </div>
            </div>
            {showEventModal && (
                <DialogCreateEvent
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    type={showEventModal}
                    start={startDay}
                    end={Date.parse(startDay) + 1800000}
                    setListEvents={setListEvents}
                />
            )
            }
        </>
    )
}

export default CellMonth