import classNames from "classnames/bind";
import { Avatar, Tooltip } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from './Detail.module.scss';
import DialogDetails from "../../../components/DialogDetails/DialogDetails";
import avatar from '../../../imgs/img6.png';
import avatar_hung from '../../../imgs/avatar/hung.png';
import avatar_linh from '../../../imgs/avatar/linh.png';
import avatar_nguyet from '../../../imgs/avatar/nguyet.jpg'
import avatar_quang from '../../../imgs/avatar/quang.jpg'
import avatar_hieu from '../../../imgs/avatar/hieu.jpg'
import DialogCreateEvent from "../../../components/DialogCreateEvent/DialogCreateEvent";
import { useGetAllHelperByEventIdQuery } from "../../../app/api/helperService";
import { useGetEventByIdQuery } from "../../../app/api/eventService";
import { useGetCreatorByIdQuery } from "../../../app/api/authService";
import DialogEditTarget from "../../../components/DialogEditTarget/DialogEditTarget";


const cx = classNames.bind(styles);

function Detail({ event, setListEvents, isCreatorTarget }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [startTime, setStartTime] = useState();
    const [startDate, setStartDate] = useState();
    const [endTime, setEndTime] = useState();
    const [endDate, setEndDate] = useState();

    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const { data: creator } = useGetCreatorByIdQuery(event?.creatorId);
    const { data: target } = useGetEventByIdQuery(Number(searchParams.get("eventId")));
    const { data: helpers } = useGetAllHelperByEventIdQuery(target?.id);

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
        }
    }, [event])

    return (
        <>
            <div className={cx('detail')}>
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <div className={cx('header-titles')}>
                            <div className={cx('title')}>Creator :</div>
                            <div className={cx('title')}>Contributors :</div>
                        </div>
                        <div className={cx('header-content')}>
                            <div className={cx('user')}>
                                <div className={cx('user-avatar')}><Avatar src={creator?.avatar} /></div>
                                <div className={cx('user-name')}>{creator?.userName}</div>
                            </div>
                            <Avatar.Group size="small" maxCount={4} maxStyle={{ color: '#FFFFFF', backgroundColor: '#413E54' }}>
                                {
                                    helpers?.map((helper) => (
                                        <Tooltip title={helper?.userName} placement="bottom">
                                            <Avatar size="small" style={{ backgroundColor: '#87d068' }} src={helper?.avatar} />
                                        </Tooltip>
                                    ))
                                }
                            </Avatar.Group>
                        </div>
                        <div className={cx('edit-icon')} onClick={() => setIsOpenUpdate(true)}>
                            <EditOutlined style={{ "font-size": "2rem" }} />
                        </div>
                    </div>
                    <div className={cx('body')}>
                        <div className={cx('time-item')}>
                            <div className={cx('item-title')}>START DATE</div>
                            <div className={cx('item-hours')}>{startTime}</div>
                            <div className={cx('item-date')}>{startDate}</div>
                        </div>

                        <div className={cx('icon')}>&gt;</div>

                        <div className={cx('time-item')}>
                            <div className={cx('item-title')}>END DATE</div>
                            <div className={cx('item-hours')}>{endTime}</div>
                            <div className={cx('item-date')}>{endDate}</div>
                        </div>
                    </div>
                </div>
                {/* <DialogDetails isOpen={isOpenDetail} setIsOpenDetail={setIsOpenDetail} /> */}
            </div>
            {
                isOpenUpdate &&  isCreatorTarget &&
                <DialogEditTarget
                    isOpen={isOpenUpdate}
                    setIsOpen={setIsOpenUpdate}
                    // start={event.start}
                    // end={event.end}
                    // setListEvents={setListEvents}
                    type={"update"}
                    event={event}
                />
            }
        </>
    );
}

export default Detail;