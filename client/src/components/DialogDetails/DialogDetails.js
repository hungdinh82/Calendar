import { Modal, Avatar, Tooltip, Select } from "antd"
import styles from "./DialogDetails.module.scss"
import classNames from "classnames/bind"
import { FolderOutlined, UserOutlined, EditOutlined } from "@ant-design/icons"
import avatar from '../../imgs/img6.png'
import avatar_hung from '../../imgs/avatar/hung.png';
import avatar_linh from '../../imgs/avatar/linh.png';
import avatar_nguyet from '../../imgs/avatar/nguyet.jpg'
import avatar_quang from '../../imgs/avatar/quang.jpg'
import avatar_hieu from '../../imgs/avatar/hieu.jpg'
// import Detail from "../../pages/Overview/Detail/Detail"
import Comment from "../Comment/Comment"
import { useEffect, useState } from "react"
import DialogCreateEvent from "../DialogCreateEvent/DialogCreateEvent"
import { useNavigate } from "react-router-dom"
import "./library.scss"
import { useGetAllHelperByEventIdQuery } from "../../app/api/helperService";
import { useEditEventMutation } from "../../app/api/eventService";


const cx = classNames.bind(styles)

const DialogDetails = ({ isOpen, setIsOpen, event, setListEvents, isOnlyView }) => {
    const navigate = useNavigate();
    const [filterType, setFilterType] = useState(event.status);
    const [colorSelect, setColorSelect] = useState()
    const [target, setTarget] = useState()
    const [startTime, setStartTime] = useState();
    const [startDate, setStartDate] = useState();
    const [endTime, setEndTime] = useState();
    const [endDate, setEndDate] = useState();
    const [creator, setCreator] = useState();
    const [creatorAvatar, setCreatorAvatar] = useState();
    // const [helper, setHelper] = useState([]);
    const [isPermission, setIsPermission] = useState([]);
    const [isCreatorTarget, setIsCreatorTarget] = useState(false)
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);

    const { data: helper } = useGetAllHelperByEventIdQuery(event.id);
    const [editEvent] = useEditEventMutation();

    const handleOnOk = () => {
        editEvent({
            id: event.eventId, data: {
                ...event, status: filterType
            }
        });
        setIsOpen(false)
    }

    const getHelper = () => {
        // let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
        const currentUserId = JSON.parse(localStorage.getItem("currentUser")).id
        // const listHelper = listAccounts.filter((account) => {
        //     return event.helper.includes(account.mail);
        // })
        // setHelper(listHelper)
        // const user = listAccounts.filter((account) => Number(currentUserId) === Number(account.id))
        setIsPermission(Number(event.creatorId) === Number(currentUserId))
        setIsCreatorTarget(Number(target?.creatorId) === Number(currentUserId))
    }


    useEffect(() => {
        if (filterType === "In Progress") setColorSelect("In-progress")
        else if (filterType === "Done") setColorSelect("Done")
        else if (filterType === "Ready") setColorSelect("Ready")
    }, [filterType])

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
            if (event.target) {
                const Events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
                const eventArray = Events.filter((e) => {
                    return Number(e.id) === Number(event.target)
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
            <div>
                <Modal
                    width={"1000px"}
                    open={isOpen}
                    title={<div style={{ fontSize: "26px" }}>{event.title || event.eventName}</div>}
                    onCancel={() => { setIsOpen(false) }}
                    wrapClassName={"DialogDetails"}
                    onOk={handleOnOk}
                    okButtonProps={{ disabled: isOnlyView }}
                >
                    {
                        event.target &&
                        <div className={cx('sub-header')} onClick={() => {
                            navigate(`/overview?eventId=${target.id}`)
                            setIsOpen(false)
                        }}>
                            <FolderOutlined style={{ fontSize: 18 }} />
                            <span>{target?.eventName}</span>
                        </div>
                    }
                    <div>
                        <Select
                            defaultValue={filterType}
                            style={{
                                width: "140px",
                                top: "45px",
                                right: "65px",
                                position: "absolute",
                            }}
                            disabled={!isPermission && !isCreatorTarget}
                            className={colorSelect}
                            onChange={(value) => setFilterType(value)}
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
                    </div>
                    <div className={cx("row")}>
                        <div className={cx("description-layout")}>
                            <div className={cx("description-label")} >Description</div>
                            <div className={cx("description-content")}>
                                <div dangerouslySetInnerHTML={{ __html: event.description }} />
                            </div>
                        </div>
                        <div className={cx("detail-comment-layout")}>
                            <div className={cx("detail-label")}>Details</div>
                            <div className={cx("detail-content")}>
                                <div className={cx("row", "detail-layout")}>
                                    <div className={cx('edit-icon')} onClick={() => setIsOpenUpdate(true)}>
                                        <EditOutlined style={{ "font-size": "2rem" }} />
                                    </div>
                                    <div className={cx("detail-content-label", "c-5")}>
                                        <div >Creator:</div>
                                        <div className={cx("detail-row-2")}>Contributors:</div>
                                    </div>
                                    <div className={cx("detail-content-value", "c-6")}>
                                        <div className={cx("detail-content-creator")}>
                                            <div className={cx("row")} style={{ alignItems: "center" }}>
                                                <div className={cx('user-avatar')}><Avatar src={creatorAvatar} /></div>
                                                <div className={cx('user-name')}>{creator?.userName}</div>
                                            </div>
                                        </div>
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
                                </div >
                                <div className={cx("line")}></div>
                                <div className={cx("row")} style={{ textAlign: "center", justifyContent: "center" }}>
                                    <div className={cx("start-layout", "c-5")}>
                                        <div className={cx("date-label")}>START DATE</div>
                                        <div className={cx("detail-content-hour")}>{startTime}</div>
                                        <div className={cx("detail-content-date")}>{startDate}</div>
                                    </div>
                                    <div className={cx('icon', "c-1")}>&gt;</div>
                                    <div className={cx("end-layout", "c-5")}>
                                        <div className={cx("date-label")}>END DATE</div>
                                        <div className={cx("detail-content-hour")}>{endTime}</div>
                                        <div className={cx("detail-content-date")}>{endDate}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("comment-layout")}>
                                <div className={cx("comment-label")}>Comment</div>
                                <div className={cx("comment-content")}>
                                    <Comment event={event} />
                                </div>
                            </div>

                        </div>
                    </div>
                </Modal>
            </div>
            {
                isOpenUpdate &&
                <DialogCreateEvent
                    isOpen={isOpenUpdate}
                    setIsOpen={setIsOpenUpdate}
                    start={event.start}
                    end={event.end}
                    setListEvents={setListEvents}
                    type={"update"}
                    event={event}
                />
            }
        </>
    )
}

export default DialogDetails