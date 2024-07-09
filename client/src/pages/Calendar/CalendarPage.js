import { Radio, message } from "antd";
import { useEffect, useRef, useState } from "react";
import styles from './CalendarPage.module.scss';
import classNames from 'classnames/bind';
import Calendar from "@toast-ui/calendar";
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import moment from "moment"
import "./library.scss"
import { MenuUnfoldOutlined } from "@ant-design/icons";
import ButtonCreateEvent from "../../components/ButtonCreateEvent/ButtonCreateEvent";
import CustomCalendarAntd from "../../components/CustomCalendarAntd/CustomCalendarAntd";
import DialogEditTodo from "../../components/DialogEditTodo/DialogEditTodo";
import avatar_hung from '../../imgs/avatar/hung.png';
import avatar_linh from '../../imgs/avatar/linh.png';
import icon_folder from '../../imgs/icon_folder.jpeg';
import { useNavigate } from "react-router-dom";


import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Badge } from 'antd';
import icon_more from "../../imgs/Vector.png"
import icon_next from "../../imgs/icon_next.png"
import icon_folder_popup from '../../imgs/icon_folder.png';
import icon_comment from '../../imgs/icon_comment.png';
import image_60 from '../../imgs/avatar/Image-60.png';
import Contributors from '../../imgs/avatar/Participants.png';
import CustomCalendarMonthView from "../../components/MonthView/MonthView";
import HeaderOptions from "../../components/HeaderOptions/HeaderOptions";
import DialogDetails from "../../components/DialogDetails/DialogDetails";
import { useGetAllEventsByCurrentUserQuery, useEditTimeTodoMutation, useEditToDoMutation, useDeleteEventMutation } from "../../Services/api/eventService";
import DialogCreateEvent from "../../components/DialogCreateEvent/DialogCreateEvent";


const dateFormat = 'YYYY-MM-DD'
const monthFormat = 'YYYY/MM'
const cx = classNames.bind(styles);
function CalendarPage() {
    const imgDetail = useRef(null);
    let totalComments;
    const navigate = useNavigate()
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [styleEvent, setStyleEvent] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [modalEvent, setModalEvent] = useState(null)
    const [startTimes, setStartTime] = useState('')
    const [endTimes, setEndTimes] = useState('')
    const [showEventModal, setShowEventModal] = useState(null)
    const [view, setView] = useState("month")
    const [calendar, setCalendar] = useState()
    const [rangeTimeText, setRangeTimeText] = useState()
    const [rangeTime, setRangeTime] = useState({})
    const [currentDate, setCurrentDate] = useState()
    // const [listEvents, setListEvents] = useState([]);
    const { data: listEvents, isError, isLoading } = useGetAllEventsByCurrentUserQuery(JSON.parse(localStorage.getItem("currentUser")).id);
    const [editTimeTodo] = useEditTimeTodoMutation();
    const [deleteEvent] = useDeleteEventMutation();

    const [filter, setFilter] = useState({
        ready: true,
        inProgress: true,
        done: true,
        coWork: true,
        onlyMe: true,
    })
    const [isShowSidebar, setIsShowSidebar] = useState();
    const [eventDetail, setEventDetail] = useState();
    const [isOpenDetail, setIsOpenDetail] = useState()

    const getRangeTimeOfQuarter = (timeStart, timeEnd) => {
        const quarterStart = Math.floor((timeStart.getMonth() / 3));
        const quarterEnd = Math.floor((timeEnd.getMonth() / 3));

        const startDate = new Date(timeStart.getFullYear(), quarterStart * 3, 1);

        const temp = new Date(timeEnd.getFullYear(), quarterEnd * 3, 1);
        const endDate = new Date(temp.getFullYear(), temp.getMonth() + 3, 0);
        return {
            start: moment(startDate).format(dateFormat),
            end: moment(endDate).format(dateFormat),
        }
    }

    function convertMonthToString(monthNumber) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        if (monthNumber >= 1 && monthNumber <= 12) {
            return months[monthNumber - 1];
        } else {
            return 'Invalid month number';
        }
    }

    // function updateArrayObjects(listEvents, id, calendarId, changes) {
    //     return listEvents.map(obj => {
    //         if (obj.id === id && obj.calendarId === calendarId) {
    //             return { ...obj, ...changes }
    //         }
    //         return obj;
    //     });
    // }

    const handleEventDetail = () => {
        setIsOpenDetail(true);
    }


    const dragDropOrResizeEventHandling = (calendar, objEvent) => {
        const { event, changes } = objEvent
        calendar.updateEvent(event.id, event.calendarId, changes)
        // const listEventsStorage = JSON.parse(localStorage.getItem("listEvents"))
        // const listEventsNew = updateArrayObjects(listEventsStorage, event.id, event.calendarId, changes)
        // // setListEvents(listEventsNew)
        // localStorage.setItem("listEvents", JSON.stringify(listEventsNew));

        let newEvent = event?.raw;
        if (changes.end) {
            newEvent.end = changes.end.d.d;
        }
        if (changes.start) {
            newEvent.start = changes.start.d.d;
        }

        editTimeTodo({ id: event?.raw?.eventId, data: newEvent })
            .then(function (response) {
                if (response.data.error !== undefined) {
                    message.error(response.data.error.message);
                } else if (response.data.errors !== undefined) {
                    message.error(response.data.errors[0].message);
                } else {
                    message.success('Edit todo successfully')
                };
            })
            .catch(function (error) {
                console.log(error);
                message.error('An error occurred while creating the event. Please try again.');
            });
    }
    const handleCalendarActions = calendar => {
        calendar.on('selectDateTime', eventObj => {
            setStartTime(eventObj.start)
            setEndTimes(eventObj.end)
            setModalEvent(eventObj)
            setShowEventModal("create")
            setIsOpenCreate(true);
            calendar.clearGridSelections()
        })
        calendar.on('beforeCreateEvent', eventObj => { })
        calendar.on('beforeUpdateEvent', eventObj => {
            const { event, changes } = eventObj
            // console.log(event);
            if (Object.keys(changes).length) {
                dragDropOrResizeEventHandling(calendar, eventObj)
            } else {
                setModalEvent(event?.raw)
                setShowEventModal("update")
                setIsOpenCreate(true);
                setIsEdit(true)
            }
        })
        calendar.on('beforeDeleteEvent', eventObj => {
            // console.log(eventObj);  // Ghi log toàn bộ eventObj để xem cấu trúc của nó
            const event = eventObj?.raw;  // Đảm bảo bạn truy cập đúng thuộc tính event
            // console.log(event);  // Ghi log toàn bộ eventObj để xem cấu trúc của nó


            if (!event) {
                console.error('Event is undefined');
                return;
            }

            Swal.fire({
                title: 'Bạn có chắc chắn?',
                text: "Bạn sẽ không thể hoàn tác hành động này!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Vâng, xóa nó!'
            }).then((result) => {
                if (result.isConfirmed) {
                    calendar.deleteEvent(eventObj.id, eventObj.calendarId);
                    deleteEvent(event?.eventId).then(
                        (response) => {
                            if (response.data.error !== undefined) {
                                message.error(response.data.error.message);
                            } else message.success('Deleted successfully');
                        },
                    );
                    Swal.fire(
                        'Đã xóa!',
                        'Tập tin của bạn đã bị xóa.',
                        'success'
                    );
                }
            });
        });

        calendar.on('afterRenderEvent', eventObj => { })

        calendar.on('clickEvent', eventObj => {
            setStyleEvent(eventObj)
        })
    }

    const handleUpdateDateRange = () => {
        const dateRangeEnd = new Date(calendar.getDateRangeEnd())
        const dateRangeStart = new Date(calendar.getDateRangeStart())
        const rangeTimeOfQuarter = getRangeTimeOfQuarter(dateRangeStart, dateRangeEnd);
        const currentDate = new Date(calendar.getDate())
        setCurrentDate(currentDate)
        setRangeTime(rangeTimeOfQuarter);
        setRangeTimeText(convertMonthToString(currentDate.getMonth() + 1) + " " + currentDate.getFullYear())
    }

    const formatTime = time => {
        const hours = `${time.getHours()}`.padStart(2, '0')
        const minutes = `${time.getMinutes()}`.padStart(2, '0')

        return `${hours}:${minutes}`
    }

    const calendarTemplate = {
        time(event) {
            const { start, end, title, raw } = event
            if (event.targetName)
                return `
            <div class = "${cx("event_layout")}">
                <div class = "${cx("EventObj")}">
                    <div class = "${cx("TimeEvent")}" style="background-color: ${event.borderColor}">${formatTime(start)} </div>&nbsp;&nbsp;
                    <div class = "${cx("TimeEvent")}" style="background-color: ${event.borderColor}"> ${formatTime(end)}</div>
                </div>
                <span class = "${cx("TitleEvent")}">${title}</span>
                <div class={cx('target_layout')}>
                    <img class="${cx("icon_folder")}" src="${icon_folder_popup}" alt="folder" />
                    ${event.targetName}
                </div>
                <div class = "${cx("SummaryText")}"></div>
            </div>
            `
            else return `
            <div class = "${cx("event_layout")}">
            <div class = "${cx("EventObj")}">
                <div class = "${cx("TimeEvent")}" style="background-color: ${event.borderColor}">${formatTime(start)} </div>&nbsp;&nbsp;
                <div class = "${cx("TimeEvent")}" style="background-color: ${event.borderColor}"> ${formatTime(end)}</div>
            </div>
            <span class = "${cx("TitleEvent")}">${title}</span>
            <div class = "${cx("SummaryText")}"></div>
        </div>
        `
        },
        allday(event) {
            return `<span style="color: Black;">${event.title}</span>`
        },
        monthDayName: function (dayName) {
            return '<span class="calendar-week-dayName-name">' + dayName.label + '</span>'
        },
        popupDetailTitle: function (event) {
            // console.log(event?.creatorId);
            let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
            const user = listAccounts.filter((account) => Number(event.creatorId) === Number(account.id))
            totalComments = 0;
            let listComments = localStorage.getItem("listComments") ? JSON.parse(localStorage.getItem("listComments")) : [];
            listComments.forEach(element => {
                if (element.eventId == event.id) {
                    totalComments++;
                }
            });
            setEventDetail(event?.raw)
            // <img class="${cx("avatar_status")}" src="${user[0].avatar}" alt="avatar" />
            //         <span class = "${cx("title_avatar")}">&nbsp;${user[0].userName}</span>
            return `
            <div class="${cx("event_layout")}">
            <div class="${cx("circle_status_event")}" style="background-color: ${event.borderColor}"></div>
            <div class="${cx("detailTitle_layout")}">
                <div class="${cx("detailTitle")}">${event.title}</div>
                <img class="${cx("icon_more")}" src="${icon_more}" />
            </div>
            </div>
            `
        },
        popupDetailDate({ start, end }) {
            const start_hours = String(start.getHours()).padStart(2, '0');
            const start_minutes = String(start.getMinutes()).padStart(2, '0');
            const start_day = String(start.getDate()).padStart(2, '0');
            const start_month = String(start.getMonth() + 1).padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
            const start_year = start.getFullYear();

            const end_hours = String(end.getHours()).padStart(2, '0');
            const end_minutes = String(end.getMinutes()).padStart(2, '0');
            const end_day = String(end.getDate()).padStart(2, '0');
            const end_month = String(end.getMonth() + 1).padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
            const end_year = end.getFullYear();

            return `
            <div class="${cx("detailTime_layout")}">
                <div class="${cx("time_start")}">
                    <div class="${cx("Text_Time")}">START DATE</div>
                    <div class="${cx("detail_time")}">${start_hours}:${start_minutes}</div>
                    <div class="${cx("detail_day")}">${start_day}/${start_month}/${start_year}</div>
                </div>
                <img class="${cx("icon_next")}" src="${icon_next}" alt="next" />
                <div class="${cx("time_end")}">
                    <div class="${cx("Text_Time")}">DUE DATE</div>
                    <div class="${cx("detail_time")}">${end_hours}:${end_minutes}</div>
                    <div class="${cx("detail_day")}">${end_day}/${end_month}/${end_year}</div>
                </div>
            </div>
            `
        },
        timeGridDisplayPrimaryTime({ time }) {
            return `${moment(new Date(time)).format('HH:mm')}`
        }
    }
    const calendarTheme = {
        week: {
            panelResizer: {
                border: '1px dotted #e5e5e5'
            },
            weekend: {
                backgroundColor: 'rgba(255, 64, 64, 0.05)'
            },
            dayGridLeft: {
                borderRight: 'none',
                backgroundColor: 'rgba(81, 92, 230, 0.05)',
                textAlign: 'center'
            }
        },
        month: {
            weekend: {
                backgroundColor: '#E8E8E8'
            },
            gridCell: {
                footerHeight: 31
            },
            dayName: {
                borderLeft: 'none',
                backgroundColor: '#DDDDDD',
                textAlign: 'center'
            },
            dayExceptThisMonth: {
                color: 'grey'
            }
        }
    }
    const calendarOption = {
        defaultView: 'month',
        taskView: true,
        week: {
            startDayOfWeek: 1,
            taskView: false,
            eventView: ['time'],
        },
        month: {
            startDayOfWeek: 1,
        },
        scheduleView: true,
        useDetailPopup: true,
        // useFormPopup: true,
        template: calendarTemplate,
        theme: calendarTheme,
        isAllDay: true,
    }

    const fetchData = (calendar) => {
        // const Events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
        // const Events = eventsPush ? eventsPush : [];
        // console.log(Events)
        // setListEvents(Events)
        calendar.clear();
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        // let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];

        // const user = listAccounts.filter((account) => Number(currentUserId) === Number(account.id))
        listEvents?.map((event) => {
            // kiểm tra xem event này có helper là currentUser không
            // const { data: helpers } = useGetAllHelperByEventIdQuery(event.eventId);
            // console.log(helpers)

            if (event?.eventType === "todo" && (Number(event.creatorId) === Number(currentUser.id))) {

                let backgroundColor = null;
                let borderColor = null;
                if (event.status === "Ready") {
                    backgroundColor = "rgba(238, 242, 9, 0.2)"
                    borderColor = "rgba(238, 242, 9)"
                } else if (event.status === "Done") {
                    backgroundColor = "rgba(66,219,41,0.2)"
                    borderColor = "rgba(66,219,41)"
                } else if (event.status === "In Progress") {
                    backgroundColor = "rgba(253, 11, 98, 0.2)"
                    borderColor = "#FF8C93"
                }
                // Kiểm tra chỉ lấy event todo không có helper
                // const checkMe = !event.helper || event.helper.length === 0;
                const conditionFilter = (filter.done && event.status === "Done") || (filter.ready && event.status === "Ready") || (filter.inProgress && event.status === "In Progress")
                // const checkMeCondition = (filter.onlyMe && checkMe) || (filter.coWork && !checkMe);
                if (conditionFilter) {
                    let targetName = "";

                    // if (Number(event.target)) {
                    //     console.log(event.eventId);
                    //     console.log(event.target);
                    //     const targetArray = Events.filter((e) => e.eventId === event.target)
                    //     console.log(targetArray);
                    //     targetName = targetArray[0].eventName
                    // }
                    calendar.createEvents([
                        {
                            id: event.id,
                            calendarId: "calendar1",
                            title: event.eventName,
                            start: typeof (event.start) === "string" ? event.start : event.start.d.d,
                            end: typeof (event.end) === "string" ? event.end : event.end.d.d,
                            raw: { ...event, targetName },
                            backgroundColor,
                            dragBackgroundColor: backgroundColor,
                            borderColor: borderColor,
                            customStyle: {
                                fontWeight: 500,
                                border: `1px solid ${borderColor}`,
                                borderRadius: "6px",
                                cursor: "pointer",
                                padding: "1px 0 0 7px",
                                fontSize: "12px",
                                boxShadow: "0px 3px #cfcfcf"
                            },
                            allDay: true
                        }
                    ])
                }
            }
        })
        calendar.render()
    }
    const onChange = (e) => {
        setView(e.target.value);
        calendar.changeView(e.target.value)
    };

    useEffect(() => {
        const container = document.getElementById("calendar")
        setCalendar(new Calendar(container, calendarOption))
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) navigate("/Login")
    }, [])

    useEffect(() => {
        if (calendar) handleUpdateDateRange()
    }, [calendar?.getDate().toString(), view])

    useEffect(() => {
        if (calendar) handleCalendarActions(calendar);
    }, [calendar])

    useEffect(() => {
        if (calendar) fetchData(calendar)
    }, [JSON.stringify(listEvents), view, calendar, filter])

    useEffect(() => {
        const iconDetail = document.querySelector("." + cx("icon_more"))
        if (iconDetail) iconDetail.addEventListener("click", handleEventDetail)
    }, [eventDetail])

    return (
        <div className={cx("layout")}>
            <div className={cx('header')}>
                <Sidebar
                    show={setIsShowSidebar}
                    isCalendar={true}
                    // setListEvents={setListEvents}
                    listEvents={listEvents}
                />
                <HeaderOptions calendar></HeaderOptions>
            </div>
            <div className={cx("row") + " calendarLibrary"} style={{ margin: "auto", minHeight: "700px" }}>
                {
                    isShowSidebar ?
                        <div className={cx("sidebar", "c-2")}>
                            <div className={cx("btn_layout", "btn_custom") + " btn_custom_2"}>
                                <div className={cx("plus_icon_layout")}>
                                    <div class={cx("icon-plus", "orange", "w25", "icon-plus-library")}></div>
                                </div>
                                <ButtonCreateEvent />
                            </div>
                            <div className={cx("filter_layout")}>
                                <div className={cx("label")}>Status</div>
                                <div className={cx("content_layout")}>
                                    <div className={cx("filter_item")}>
                                        <input
                                            type="checkbox"
                                            className={cx("checkbox")}
                                            id={cx("done")}
                                            checked={filter.done}
                                            onClick={() => { setFilter({ ...filter, done: !filter.done }) }}
                                        />
                                        <label htmlFor={cx("done")}><span style={{ borderColor: "#42db29" }}></span>Done</label>
                                    </div>
                                    <div className={cx("filter_item")}>
                                        <input
                                            type="checkbox"
                                            className={cx("checkbox")}
                                            id={cx("ready")}
                                            checked={filter.ready}
                                            onClick={() => { setFilter({ ...filter, ready: !filter.ready }) }}
                                        />
                                        <label htmlFor={cx("ready")}><span style={{ borderColor: "#eef209" }}></span>Ready</label>
                                    </div>
                                    <div className={cx("filter_item")}>
                                        <input
                                            type="checkbox"
                                            className={cx("checkbox")}
                                            id={cx("inProgress")}
                                            checked={filter.inProgress}
                                            onClick={() => { setFilter({ ...filter, inProgress: !filter.inProgress }) }}
                                        />
                                        <label htmlFor={cx("inProgress")}><span style={{ borderColor: "#ff8c93" }}></span>In progress</label>
                                    </div>
                                </div>
                                <div className={cx("label")}>Presenter</div>
                                <div className={cx("content_layout")}>
                                    <div className={cx("filter_item")}>
                                        <input type="checkbox"
                                            className={cx("checkbox")}
                                            id={cx("onlyMe")}
                                            checked={filter.onlyMe}
                                            onClick={() => { setFilter({ ...filter, onlyMe: !filter.onlyMe }) }}
                                        ></input>
                                        <label htmlFor={cx("onlyMe")}><span></span>Only me</label>
                                    </div>
                                    <div className={cx("filter_item")}>
                                        <input
                                            type="checkbox"
                                            className={cx("checkbox")}
                                            id={cx("co-work")}
                                            checked={filter.coWork}
                                            onClick={() => { setFilter({ ...filter, coWork: !filter.coWork }) }}
                                        ></input>
                                        <label htmlFor={cx("co-work")}><span></span>Co-work</label>
                                    </div>
                                </div>
                            </div>
                            <CustomCalendarAntd calendar={calendar} setCurrentDate={setCurrentDate} />
                        </div> : <div className={cx("sidebar", "c-2")}></div>
                }
                <div className={cx("calendar_layout", "c-9")}>
                    <div className={cx("row")} style={{ alignItems: "center", position: "relative" }}>
                        <div className={cx("rangeTimeText")}>{rangeTimeText}</div>
                        <div className={cx("radio_layout")} >
                            <Radio.Group value={view} onChange={onChange} style={{ marginBottom: 0 }}>
                                <Radio.Button value="week">Week</Radio.Button>
                                <Radio.Button value="month">Month</Radio.Button>
                                <Radio.Button value="day">Day</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>

                    <div id="calendar" style={{ height: 'calc(100vh - 185px)', border: "1px solid #e5e5e5", borderTop: "none", width: "100%", marginTop: "25px" }} className={view === "month" ? cx("ten-the") : null} />
                    {
                        view === "month" &&
                        <div id="calendar23" className={cx("calendar2")} >
                            {calendar ?
                                <CustomCalendarMonthView
                                    filter={filter}
                                    dateRangeStart={new Date(calendar.getDateRangeStart())}
                                    dateRangeEnd={new Date(calendar.getDateRangeEnd())}
                                    currentMonth={calendar.getDate().getMonth()}
                                /> : null
                            }
                        </div>
                    }
                </div>
            </div >
            {
                showEventModal == "update" &&
                <DialogEditTodo
                    isOpen={isOpenCreate}
                    setIsOpen={setIsOpenCreate}
                    start={startTimes}
                    end={endTimes}
                    // setListEvents={setListEvents}
                    type={showEventModal}
                    event={modalEvent}
                />
            }
            {
                showEventModal == "create" &&
                <DialogCreateEvent
                    isOpen={isOpenCreate}
                    setIsOpen={setIsOpenCreate}
                    start={startTimes}
                    end={endTimes}
                    // setListEvents={setListEvents}
                    type={showEventModal}
                    event={modalEvent}
                />
            }
            {
                isOpenDetail &&
                <DialogDetails
                    isOpen={isOpenDetail}
                    setIsOpen={setIsOpenDetail}
                    event={eventDetail}
                // setListEvents={setListEvents}
                />
            }
        </div >
    );
}

export default CalendarPage;