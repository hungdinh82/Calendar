import React, { useEffect, useState } from 'react'
import styles from './MonthView.module.scss'
import CellMonth from './CellMonth/CellMonth'
import { Row, Col } from 'antd'
import moment from 'moment'
import classNames from 'classnames/bind';
import DayOfWeek from './DayOfWeek/DayOfWeek'
import { useGetAllEventsByCurrentUserQuery } from "../../app/api/eventService";


const cx = classNames.bind(styles);
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const CustomCalendarMonthView = ({ dateRangeStart, dateRangeEnd, currentMonth, filter }) => {
    const [listEvents, setListEvents] = useState()
    const indexDayOfWeekStart = dateRangeStart.getDay() - 1
    const indexDayOfWeekEnd = dateRangeEnd.getDay()
    const countStart = -indexDayOfWeekStart;
    const countEnd = Math.round((Date.parse(dateRangeEnd) - Date.parse(dateRangeStart)) / 86400000);

    const { data: eventsPush, isError, isLoading } = useGetAllEventsByCurrentUserQuery(JSON.parse(localStorage.getItem("currentUser")).id);

    const addDays = (date, index) => {
        var dat = new Date(date)
        dat.setDate(dat.getDate() + index)
        dat.setHours(8, 0, 0)
        return dat
    }

    const getDayOfWeek = index => {
        if (index >= 0 && index <= 6)
            return days[index]
        return ''
    }

    let listDayOfMonthView = []
    for (let i = countStart; i <= countEnd; i++) {
        listDayOfMonthView.push(addDays(dateRangeStart, i));
    }

    const fetchData = () => {
        // const events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
        const events =  eventsPush ? eventsPush : [];
        const filterEvents = events.filter((e) => (e.eventType === "todo"))
        setListEvents(filterEvents);
    }

    useEffect(() => {
        fetchData()
    }, [])



    return (
        <div style={{ width: "100%", margin: "auto", cursor: "auto" }}>
            <Row>
                <Col span={24}>
                    <div className={cx("layout")}>
                        {days.map((day, index) => (
                            <div className={cx("cell")} key={"day" + index}>
                                <DayOfWeek day={day} />
                            </div>
                        ))}
                        {listDayOfMonthView.map((date, index) => {
                            const isToday = moment(new Date(date)).format('DD/MM/YYYY') === moment(new Date(Date.now())).format('DD/MM/YYYY')
                            const isCurrentMonth = new Date(date).getMonth() === currentMonth
                            return <div className={cx("cell")} key={index}>
                                <CellMonth
                                    filter={filter}
                                    day={date}
                                    isToday={isToday}
                                    isCurrentMonth={isCurrentMonth}
                                    listEvents={listEvents}
                                    setListEvents={setListEvents}
                                />
                            </div>

                        })}
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default CustomCalendarMonthView