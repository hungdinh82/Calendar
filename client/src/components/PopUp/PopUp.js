import classNames from "classnames/bind";
import { Modal, Avatar, Tooltip, Select } from "antd"
import icon_folder_popup from '../../imgs/icon_folder.png';
import icon_comment from '../../imgs/icon_comment.png';
import Contributors from '../../imgs/avatar/Participants.png';
import icon_more from "../../imgs/Vector.png"
import image_60 from '../../imgs/avatar/Image-60.png';
import styles from './PopUp.module.scss';
import icon_next from "../../imgs/icon_next.png"
import DialogCreateEvent from "../DialogCreateEvent/DialogCreateEvent";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DialogDetails from "../DialogDetails/DialogDetails";

import avatar from '../../imgs/img6.png'
import avatar_hung from '../../imgs/avatar/hung.png';
import avatar_linh from '../../imgs/avatar/linh.png';
import avatar_nguyet from '../../imgs/avatar/nguyet.jpg'
import avatar_quang from '../../imgs/avatar/quang.jpg'
import avatar_hieu from '../../imgs/avatar/hieu.jpg'

const cx = classNames.bind(styles);



function PopUp({ event, callBack, setListEvents }) {

    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const options = { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit", year: "numeric" };
    const start = typeof (event.start) === "string" ? event.start : event.start.d.d;
    const end = typeof (event.end) === "string" ? event.end : event.end.d.d;
    const startTimeNew = new Date(start).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
    const startDateNew = new Date(start).toLocaleDateString("en-GB", options)
    const endTimeNew = new Date(end).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
    const endDateNew = new Date(end).toLocaleDateString("en-GB", options)
    const [isOpenDetail, setIsOpenDetail] = useState(false);

    let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
    const user = listAccounts.filter((account) => Number(event.creatorId) === Number(account.id))
    const [target, setTarget] = useState()
    const [startTime, setStartTime] = useState();
    const [startDate, setStartDate] = useState();
    const [endTime, setEndTime] = useState();
    const [endDate, setEndDate] = useState();
    const [isPermission, setIsPermission] = useState([]);
    const [creator, setCreator] = useState();
    const [creatorAvatar, setCreatorAvatar] = useState();
    const [isCreatorTarget, setIsCreatorTarget] = useState(false)
    const [helper, setHelper] = useState([]);

    const handleEventDetail = () => {
        setIsOpenDetail(true);
    }

    function removeObjectFromArray(listEvents, id, calendarid) {
        return listEvents.filter(obj => (obj.id !== id && obj.calendarid !== calendarid));
    }

    const getHelper = () => {
        let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
        const currentUserId = localStorage.getItem("currentUserId")
        const listHelper = listAccounts.filter((account) => {
            return event.raw.helper?.includes(account.mail);
        })
        setHelper(listHelper)
        const user = listAccounts.filter((account) => Number(currentUserId) === Number(account.id))
        setIsPermission(Number(event.raw.creatorId) === Number(currentUserId) || event.raw.helper.includes(user[0].mail))
        setIsCreatorTarget(Number(target?.raw?.creatorId) === Number(currentUserId))
    }

    const onClickDelete = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const listEventsStorage = JSON.parse(localStorage.getItem("listEvents"))
                const listEventsNew = removeObjectFromArray(listEventsStorage, event.id, event.calendarId)
                localStorage.setItem("listEvents", JSON.stringify(listEventsNew));
                setListEvents(listEventsNew)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
        callBack[0](prev => !prev);
        if (callBack[1]) callBack[1](prev => !prev);
    }

    let totalComments = 0;
    let listComments = localStorage.getItem("listComments") ? JSON.parse(localStorage.getItem("listComments")) : [];
    listComments.forEach(element => {
        if (element.eventId == event.id) {
            totalComments++;
        }
    });

    useEffect(() => {
        if (event) {
            const options = { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit", year: "numeric" };
            const start = typeof (event.start) === "string" ? event.start : event.start.d.d;
            const end = typeof (event.end) === "string" ? event.end : event.end.d.d;
            const startTimeNew = new Date(start).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
            const startDateNew = new Date(start).toLocaleDateString("en-GB", options)
            const endTimeNew = new Date(end).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
            const endDateNew = new Date(end).toLocaleDateString("en-GB", options)
            setStartTime(startTimeNew)
            setStartDate(startDateNew)
            setEndTime(endTimeNew)
            setEndDate(endDateNew)
            if (event.raw.target) {
                const Events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
                const eventArray = Events.filter((e) => {
                    return Number(e.id) === Number(event.raw.target)
                })
                setTarget(eventArray[0])
            }

            let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
            const user = listAccounts.filter((account) => Number(event.creatorId) === Number(account.id))
            setCreator(user[0])
            if (user[0].userName.includes("quang")) {
                setCreatorAvatar(avatar_quang);
            }
            else if (user[0].userName.includes("hung")) {
                setCreatorAvatar(avatar_hung)
            }
            else if (user[0].userName.includes("linh")) {
                setCreatorAvatar(avatar_linh)
            }
            else if (user[0].userName.includes("nguyet")) {
                setCreatorAvatar(avatar_nguyet)
            }
            else if (user[0].userName.includes("hieu")) {
                setCreatorAvatar(avatar_hieu)
            }
            else setCreatorAvatar(avatar)


        }

    }, [event])

    useEffect(() => {
        getHelper();
    }, [event, target])

    return (
        <>
            <div className={cx("popup", { "hidden": isOpenDetail })}>
                {
                    <div className={cx("popup")}>
                        <div className={cx('header')}>
                            {event.raw.status === "Ready" && <div className={cx('dot')} style={{ backgroundColor: "#EEF209" }}></div>}
                            {event.raw.status === "In Progress" && <div className={cx('dot')} style={{ backgroundColor: "#FF8C93" }}></div>}
                            {event.raw.status === "Done" && <div className={cx('dot')} style={{ backgroundColor: "#42DB29" }}></div>}
                            <span>{event.eventName}</span>
                            <img className={cx("icon_more")} src={icon_more} onClick={() => { setIsOpenDetail(true) }} />

                        </div>
                        <div className={cx("event_layout")}>
                            <div className={cx("circle_status_event")} style={{ "background-color": event.borderColor }}></div>
                            <div className={cx("detailTitle_layout")}>
                                <div className={cx("detailTitle")}>{event.title}</div>
                            </div>
                            <div className={cx("target_layout")}>
                                <img className={cx("icon_folder_popup")} src={icon_folder_popup} alt="folder" />
                                <span className={cx("title_folder")}>{target?.eventName}</span>
                                <div className={cx("avatar_layout")}>
                                    <img className={cx("avatar_status")} src={user[0].avatar} alt="avatar" />
                                    <span className={cx("title_avatar")}>&nbsp;{user[0].userName}</span>
                                </div>
                            </div>

                            <div className={cx("layout_2")}>
                                <div className={cx("contributors_layout")}>
                                    <span className={cx("title_contributors")}>Contributors</span>
                                    <div className={cx("detail-content-contributors", "detail-row-2")}>
                                        <Avatar.Group size="small" maxCount={4} maxStyle={{ color: '#FFFFFF', backgroundColor: '#413E54' }}>
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
                                <div className={cx("comment_layout")} >
                                    <img className={cx("icon_comment")} src={icon_comment} alt="comment" />
                                    <span className={cx("comment_total")} >&nbsp; {totalComments} Comment</span>
                                </div>
                            </div>
                        </div>

                        <div className={cx("detailTime_layout")}>
                            <div className={cx("time_start")}>
                                <div className={cx("Text_Time")}>START DATE</div>
                                <div className={cx("detail_time")}>{startTimeNew}</div>
                                <div className={cx("detail_day")}>{startDateNew}</div>
                            </div>
                            <img className={cx("icon_next")} src={icon_next} alt="next" />
                            <div className={cx("time_end")}>
                                <div className={cx("Text_Time")}>DUE DATE</div>
                                <div className={cx("detail_time")}>{endTimeNew}</div>
                                <div className={cx("detail_day")}>{endDateNew}</div>
                            </div>
                        </div>

                        <div className={cx('options')}>
                            <div className={cx('edit')} >
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAMdJREFUKBVjYCARMOJTb2xsLMfIyBjLysq64Pjx409BapnwaQDKzf7//3/L79+/D1tbW0uB1LJg02BmZqYIVPgdKBf/79+//UC2xs+fP8OB/H4MG0CK//79ewCkEGQYExOTI5DawMnJuQTER/EDTDFQXA4kCQQ3QBpOnz79AsJF8gMWxTA1KDTYBhyKMUwH6WSysrKSB7kZyIY5AySOVTFIggno+5VAmijFYA1AwhzEgAKcJsMUwIMVGKPH2NnZ7ZFDBKYImQYAuO5YIMgk39gAAAAASUVORK5CYII=" alt="" />
                                <span className={cx('option-title')} onClick={() => { setIsOpenCreate((prev) => !prev); callBack[0](prev => !prev); if (callBack[1]) callBack[1](prev => !prev) }}>Edit</span>
                            </div>
                            <div className={cx('delete')}>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAFhJREFUKBVjYCARMKKrNzEx2fr//38vkDgjI+O2M2fOeCOrAWtAVoQsicyGaWZCFsTHBtr6H588Tjm4H4yNjfGacPbsWbBaop0Es3JYaQBFDMxjWOitMDEA3EEZfFEISwUAAAAASUVORK5CYII=" alt="" />
                                <span className={cx('option-title')} onClick={onClickDelete}>Delete</span>
                            </div>
                        </div>
                        {
                            isOpenCreate &&
                            <DialogCreateEvent
                                isOpen={isOpenCreate}
                                setIsOpen={setIsOpenCreate}
                                start={event.start}
                                end={event.end}
                                setListEvents={setListEvents}
                                type={"update"}
                                event={event}
                            />
                        },
                    </div >}
            </div>
            {
                isOpenDetail && <DialogDetails

                    isOpen={isOpenDetail}
                    setIsOpen={setIsOpenDetail}
                    event={event}
                    setListEvents={setListEvents}
                />
            }
        </>
    );
}

export default PopUp;
