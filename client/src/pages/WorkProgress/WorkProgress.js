import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { message } from 'antd';

import styles from './WorkProgress.module.scss';
import Sidebar from "../../components/Sidebar/Sidebar";
import trashIcon from '../../imgs/trash-2-outline.png'
import Task from "./Task/Task";
import HeaderOptions from "../../components/HeaderOptions/HeaderOptions";
import { useGetAllTodoByTargetIdQuery, useGetEventByIdQuery, useEditEventMutation, useDeleteEventMutation } from "../../Services/api/eventService";

const cx = classNames.bind(styles);

function WorkProgress() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isShowSideBar, setIsShowSideBar] = useState(true);
    const [listEvents, setListEvents] = useState([])
    const [isCreatorTarget, setIsCreatorTarget] = useState(false)
    const [editEvent] = useEditEventMutation();
    const [deleteEvent] = useDeleteEventMutation();
    const { data: todos } = useGetAllTodoByTargetIdQuery(Number(searchParams.get("eventId")));
    const { data: target } = useGetEventByIdQuery(Number(searchParams.get("eventId")));
    const [width, setWidth] = useState((todos?.filter((event) => event.status === "Done").length /
        (todos?.filter((event) => event.status === "Ready").length +
            todos?.filter((event) => event.status === "In Progress").length +
            todos?.filter((event) => event.status === "Done").length)) * 100 + '%');

    function removeObjectFromArray(listEvents, id, calendarid) {
        return listEvents.filter(obj => (obj.id !== id && obj.calendarid !== calendarid));
    }

    const onDragOver = (event) => {
        event.preventDefault();
    }

    const handleOnDrop = (e) => {
        const prevMovedElement = document.getElementsByClassName("move")[0];

        let currentNode = e.target;
        const [fromColumnId, event, useNumber] = JSON.parse(e.dataTransfer.getData('text/plain'));

        while (!currentNode.className.includes("drop-zone")) {
            if (currentNode.className.includes("trash")) {
                deleteEvent(
                    event.id,
                ).then(
                    (response) => {
                        if (response.data.error !== undefined) {
                            message.error(response.data.error.message);
                        } else message.success('Deleted successfully');
                    });
                break;
            }
            currentNode = currentNode.parentNode;
            if (currentNode.id === "root") return;
        }

        const columnId = parseInt(currentNode.id) - 1;
        const status = ["Ready", "In Progress", "Done"]
        editEvent({
            id: event.id, data: {
                ...event, status: status[columnId]
            }
        });

        if (prevMovedElement) {
            prevMovedElement.classList.remove("move");
        }

    }

    const handleOnDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const prevMovedElement = document.getElementsByClassName("move");
        if (prevMovedElement[0]) {
            prevMovedElement[0].classList.remove("move");
        }

    }

    useEffect(() => {
        setWidth((todos?.filter((event) => event.status === "Done").length /
            (todos?.filter((event) => event.status === "Ready").length +
                todos?.filter((event) => event.status === "In Progress").length +
                todos?.filter((event) => event.status === "Done").length)) * 100 + '%');
    }, [todos])

    useEffect(() => {
        const currentUserId = JSON.parse(localStorage.getItem("currentUser")).id
        setIsCreatorTarget(Number(target?.creatorId) === Number(currentUserId))
    }, [target])

    return (
        <div className={cx('work-progress')}>

            <div className={cx('grid')} style={{ height: "100%" }}>
                <div className={cx('row')} style={{ height: "100%" }}>
                    <div className={cx(isShowSideBar ? 'col l-2-4' : 'col l-1')}>
                        <Sidebar
                            show={setIsShowSideBar}
                            // setListEvents={setListEvents}
                            targetId={target?.id}
                            listEvents={listEvents}
                        ></Sidebar>
                    </div>

                    <div className={cx(isShowSideBar ? 'col l-10' : 'col l-11')} style={{ flex: 1 }}>
                        <div className={cx('content')}>
                            <div className={cx('content-header')}>
                                <div className={cx('header-title')}>{target?.eventName}</div>
                                <div className={cx('trash')} onDragOver={onDragOver} onDrop={handleOnDrop}>
                                    <img src={trashIcon} alt="" />
                                </div>
                                <HeaderOptions></HeaderOptions>
                            </div>

                            <div className={cx('content-body')}>
                                <div className={cx('grid')} style={{ height: "100%" }}>
                                    <div className={cx('row no-gutters')}>
                                        <div className={cx('col l-12')}>
                                            <div className={cx('process-bar')}>
                                                <div className={cx('left-bar')}>
                                                    <div className={cx('left-bar-header')}>
                                                        Project statistics
                                                    </div>
                                                    <div className={cx('left-bar-body')}>
                                                        <div className={cx('left-bar-body_text')}>
                                                            <span className={cx('text-title')}>Completed :</span>
                                                            <span className={cx('text-content')}>{todos?.filter((event) => event.status === "Done").length + '/' + (todos?.filter((event) => event.status === "Ready").length + todos?.filter((event) => event.status === "In Progress").length + todos?.filter((event) => event.status === "Done").length)}</span>
                                                        </div>
                                                        <div className={cx('left-bar-body_process')}>
                                                            <div className={cx('process-bar')}>
                                                                <div className={cx('process-value')} style={{ width: width }}></div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('right-bar')}>
                                                    <div className={cx('right-bar-lists')}>
                                                        <div className={cx('right-bar-item')} >
                                                            <div className={cx('item-title')}>Total :</div>
                                                            <div className={cx('item-content')} style={{ 'border-left': "2px solid #0F75DC" }}>{(todos?.filter((event) => event.status === "Ready").length + todos?.filter((event) => event.status === "In Progress").length + todos?.filter((event) => event.status === "Done").length)}</div>
                                                        </div>
                                                        <div className={cx('right-bar-item')} >
                                                            <div className={cx('item-title')}>Ready :</div>
                                                            <div className={cx('item-content')} style={{ 'border-left': "2px solid #FAAE83" }}>{todos?.filter((event) => event.status === "Ready").length}</div>
                                                        </div>
                                                        <div className={cx('right-bar-item')} >
                                                            <div className={cx('item-title')}>In progress :</div>
                                                            <div className={cx('item-content')} style={{ 'border-left': "2px solid #FAAE83" }}>{todos?.filter((event) => event.status === "In Progress").length}</div>
                                                        </div>
                                                        <div className={cx('right-bar-item')} >
                                                            <div className={cx('item-title')}>Done :</div>
                                                            <div className={cx('item-content')} style={{ 'border-left': "2px solid #95E2A6" }}>{todos?.filter((event) => event.status === "Done").length}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('row')} style={{ height: "100%" }}>
                                        <div className={cx('col l-4')}>
                                            <div className={cx('content-title')}>Ready</div>
                                            <div className={cx('drop-zone')} onDragLeave={handleOnDragLeave} onDragOver={onDragOver} onDrop={handleOnDrop} id="1">
                                                {todos?.filter((event) => event.status === "Ready")?.map((val, index) => (
                                                    <Task
                                                        key={index}
                                                        event={val}
                                                        useNumber={2}
                                                        columnId={0}
                                                        // setListEvents={setListEvents}
                                                        isCreatorTarget={isCreatorTarget}
                                                    ></Task>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={cx('col l-4')}>
                                            <div className={cx('content-title')}>In Progress</div>
                                            <div className={cx('drop-zone')} onDragLeave={handleOnDragLeave} onDragOver={onDragOver} onDrop={handleOnDrop} id="2">
                                                {todos?.filter((event) => event.status === "In Progress")?.map((val, index) => (
                                                    <Task
                                                        key={index}
                                                        event={val}
                                                        useNumber={2}
                                                        columnId={1}
                                                        // setListEvents={setListEvents}
                                                        isCreatorTarget={isCreatorTarget}
                                                    ></Task>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={cx('col l-4')}>
                                            <div className={cx('content-title')}>Done</div>
                                            <div className={cx('drop-zone')} onDragLeave={handleOnDragLeave} onDragOver={onDragOver} onDrop={handleOnDrop} id="3">
                                                {todos?.filter((event) => event.status === "Done")?.map((val, index) => (
                                                    <Task
                                                        key={index}
                                                        event={val}
                                                        useNumber={2}
                                                        columnId={2}
                                                        handleOnDrop={handleOnDrop}
                                                        // setListEvents={setListEvents}
                                                        isCreatorTarget={isCreatorTarget}
                                                    ></Task>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default WorkProgress;