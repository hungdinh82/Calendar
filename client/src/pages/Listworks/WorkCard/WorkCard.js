import classNames from "classnames/bind";
import { ArrowUpOutlined, StarFilled, AntDesignOutlined, UserOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Dropdown, Space, Tooltip, message } from "antd"
import Swal from "sweetalert2";
import DialogEditTarget from "../../../components/DialogEditTarget/DialogEditTarget";

import styles from './WorkCard.module.scss';
import './library.scss'
// import { useGetUserByMailsQuery } from "../../../app/api/authService";
import { useGetAllTodoByTargetIdQuery, useDeleteEventMutation } from "../../../app/api/eventService";
import { useGetAllHelperByEventIdQuery } from "../../../app/api/helperService";
import { useGetCreatorByIdQuery } from "../../../app/api/authService";
import { useGetImportantByEventIdUserIdQuery, useUpdateImportantMutation } from "../../../app/api/importantService";

const cx = classNames.bind(styles);

function WorkCard({ event, listEvents, isCreator }) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams()
    const [isOpen, setIsOpen] = useState(false);

    const [deleteEvent] = useDeleteEventMutation();
    const [updateImportant] = useUpdateImportantMutation();
    const { data: helpers } = useGetAllHelperByEventIdQuery(event.id);
    // console.log(helpers);
    const { data: creator } = useGetCreatorByIdQuery(event.creatorId);
    const { data: todos } = useGetAllTodoByTargetIdQuery(event.id);
    const userId = JSON.parse(localStorage.getItem("currentUser")).id;
    // console.log(event.id);
    // console.log(userId);
    const { data } = useGetImportantByEventIdUserIdQuery({ eventId: event.id, userId });
    const isImportant = data ? data.isImportant : null;
    // console.log(isImportant);
    // const [width, setWidth] = useState((todos?.filter((event) => event.status === "Done").length / 
    // (todos?.filter((event) => event.status === "Ready").length + 
    // todos?.filter((event) => event.status === "In Progress").length + 
    // todos?.filter((event) => event.status === "Done").length)) * 100 + '%');

    const calculateWidth = (todos) => {
        const doneCount = todos?.filter((event) => event.status === "Done").length || 0;
        const readyCount = todos?.filter((event) => event.status === "Ready").length || 0;
        const inProgressCount = todos?.filter((event) => event.status === "In Progress").length || 0;
        const totalCount = doneCount + readyCount + inProgressCount;

        if (totalCount > 0) {
            return (doneCount / totalCount) * 100 + '%';
        } else {
            return '0%'; // Default to 0% if there are no todos
        }
    };

    const [width, setWidth] = useState(calculateWidth(todos));

    // If todos change and you want to recalculate the width
    useEffect(() => {
        setWidth(calculateWidth(todos));
    }, [todos]);

    useEffect(() => {
        setWidth((todos?.filter((event) => event.status === "Done").length /
            (todos?.filter((event) => event.status === "Ready").length +
                todos?.filter((event) => event.status === "In Progress").length +
                todos?.filter((event) => event.status === "Done").length)) * 100 + '%');
    }, [todos])

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

                deleteEvent(event.id).then(
                    (response) => {
                        if (response.data.error !== undefined) {
                            message.error(response.data.error.message);
                        } else message.success('Deleted successfully');
                        console.log(response);
                    },
                );
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
    // const [isImportant, setIsImportant] = useState(event.isImportant || false)


    const handleClickStar = (e) => {
        console.log(e);
        e.stopPropagation();
        // const Events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
        // const newEvents = updateArrayObjects(Events, event.id, event.calendarId, { raw: { ...event, isimportant: !isimportant } })
        // setListEvents(newEvents)
        // setIsimportant(!isimportant)
        // localStorage.setItem("listEvents", JSON.stringify(newEvents))
        console.log(event.id);
        console.log(userId);
        updateImportant({ eventId: event.id, userId }).then((result) => {
            Swal.fire(
                'Important!',
                'Your event has been updated',
                'success'
            )
        })
    }

    return (
        <div className={cx('card') + " card"} onClick={() => { navigate(`/overview?eventId=${event.id}`) }}>
            <div className={cx('card-header')}>
                <div className={cx('header-title')}>{event.eventName}</div>
                <div className={cx('header-icons')}>
                    {
                        isImportant === 1 ?
                            <StarFilled onClick={handleClickStar} style={{ color: "#f48080" }} />
                            : <StarOutlined onClick={handleClickStar} />
                    }
                    <ArrowUpOutlined onClick={() => { navigate(`/overview?eventId=${event.id}`) }} />
                </div>
            </div>

            <div className={cx('card-body')}>
                <p className={cx('description')} dangerouslySetInnerHTML={{ __html: event.description }}></p>
                <div className={cx('process')}>
                    <div className={cx('process-title')}>
                        <span>Completion</span>
                        <span className={cx('text-content')}>{todos?.filter((event) => event.status === "Done").length + '/' + (todos?.filter((event) => event.status === "Ready").length + todos?.filter((event) => event.status === "In Progress").length + todos?.filter((event) => event.status === "Done").length)}</span>
                    </div>
                    <div className={cx('process-bar')}>
                        <div className={cx('process-value')} style={{ width: width }}></div>
                    </div>
                </div>
                <div className={cx('members')} onClick={(e) => e.stopPropagation()}>
                    <Avatar.Group size="small" maxCount={4} maxStyle={{ color: 'white', backgroundColor: '#413E54' }}>
                        <Tooltip title={creator?.userName} placement="bottom">
                            <Avatar size="small" style={{ backgroundColor: '#87d068' }} src={creator?.avatar} />
                        </Tooltip>
                        {
                            helpers?.map((helper) => (
                                <Tooltip title={helper?.userName} key={helper?.id} placement="bottom">
                                    <Avatar size="small" key={helper?.id} style={{ backgroundColor: '#87d068' }} src={helper?.avatar} />
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
                <DialogEditTarget
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    // start={event.start}
                    // end={event.end}
                    event={event}
                    type={"update"}
                    // setListEvents={setListEvents}
                    isTargetPage={true}
                />
            }
        </div>
    );
}

export default WorkCard;