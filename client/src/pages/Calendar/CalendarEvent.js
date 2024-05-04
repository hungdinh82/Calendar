import { Radio } from "antd";
import { useEffect, useRef, useState } from "react";
import styles from './CalendarEvent.module.scss';
import classNames from 'classnames/bind';
import Calendar from "@toast-ui/calendar";
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import moment from "moment"
import "./library.scss"
import { MenuUnfoldOutlined } from "@ant-design/icons";
import ButtonCreateEvent from "../../components/ButtonCreateEvent/ButtonCreateEvent";
import CustomCalendarAntd from "../../components/CustomCalendarAntd/CustomCalendarAntd";
import DialogCreateEvent from "../../components/DialogCreateEvent/DialogCreateEvent";
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
import { useGetAllEventsByCurrentUserQuery } from "../../app/api/eventService";
import { useGetAllHelperByEventIdQuery } from "../../app/api/helperService";


const dateFormat = 'YYYY-MM-DD'
const monthFormat = 'YYYY/MM'
const cx = classNames.bind(styles);
function CalendarEvent() {

    const fetchData = (calendar) => {
        // const Events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
        const Events = eventsPush ? eventsPush : [];
        // console.log(Events)
        setListEvents(Events)
        calendar.clear();
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        // let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];

        // const user = listAccounts.filter((account) => Number(currentUserId) === Number(account.id))
        Events?.map((event) => {
            // kiểm tra xem event này có helper là currentUser không
            console.log(event);
            const { data: helpers } = useGetAllHelperByEventIdQuery(event.eventId);
            console.log(helpers)

            if (event?.eventType === "todo" && (Number(event.creatorId) === Number(currentUser.id) || event.helper.includes(currentUser.id))) {
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
                const checkMe = !event.helper || event.helper.length === 0;
                const conditionFilter = (filter.done && event.status === "Done") || (filter.ready && event.status === "Ready") || (filter.inProgress && event.status === "In Progress")
                const checkMeCondition = (filter.onlyMe && checkMe) || (filter.coWork && !checkMe);
                if (conditionFilter && checkMeCondition) {
                    let targetName = "";
                    if (Number(event.target)) {
                        const targetArray = Events.filter((e) => e.id === event.target)
                        targetName = targetArray[0].eventName
                    }
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
    
}

export default CalendarEvent;