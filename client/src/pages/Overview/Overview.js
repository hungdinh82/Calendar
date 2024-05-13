import classNames from 'classnames/bind';
import { Select } from 'antd';
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";


import styles from './Overview.module.scss';
import './library.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import TaskBar from './TaskBar/Taskbar';
import Detail from './Detail/Detail';
import Comment from '../../components/Comment/Comment';
import HeaderOptions from '../../components/HeaderOptions/HeaderOptions';
import { useGetAllTodoByTargetIdQuery, useGetEventByIdQuery } from "../../app/api/eventService";

const cx = classNames.bind(styles);

let taskLists = [
    [],
    [],
    [],
]

function Overview() {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    // const [Lists, setLists] = useState(taskLists)
    
    const [filterType, setFilterType] = useState("All");
    const [isShowSideBar, setIsShowSideBar] = useState(true);
    const [listEvents, setListEvents] = useState([]);
    // const [target, setTarget] = useState()
    const [isCreatorTarget, setIsCreatorTarget] = useState(false)
    // console.log(Number(searchParams.get("eventId")));
    const { data: todos } = useGetAllTodoByTargetIdQuery(Number(searchParams.get("eventId")));
    const { data: target } = useGetEventByIdQuery(Number(searchParams.get("eventId")));
    const [width, setWidth] = useState((todos?.filter((event) => event.status === "Done").length / 
    (todos?.filter((event) => event.status === "Ready").length + 
    todos?.filter((event) => event.status === "In Progress").length + 
    todos?.filter((event) => event.status === "Done").length)) * 100 + '%');


    // const onChangeLists = (event, newprocess, coloumnId, userNumber) => {
    //     const temp = JSON.parse(JSON.stringify(Lists))
    //     const newLists = temp.reduce((result, currentValue, index) => {

    //         if (newprocess === "Ready" && index === 0) {
    //             return [...result, [...currentValue, { ...event, raw: { ...event.raw, status: newprocess } }]]
    //         }
    //         if (newprocess === "In Progress" && index === 1) {
    //             return [...result, [...currentValue, { ...event, raw: { ...event.raw, status: newprocess } }]]
    //         }
    //         if (newprocess === "Done" && index === 2)
    //             return [...result, [...currentValue, { ...event, raw: { ...event.raw, status: newprocess } }]]

    //         if (index === coloumnId) {
    //             const newArr = currentValue.reduce((res, element, index) => {
    //                 if (element.id === event.id)
    //                     return res;
    //                 return [...res, element];
    //             }, []);
    //             return [...result, newArr];
    //         }
    //         return [...result, currentValue]
    //     }, []);


    //     setLists(newLists);
    //     newLists.map((status) => {
    //         status.map((event) => {
    //             const Events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
    //             const eventsNew = updateArrayObjects(Events, event.id, event.calendarId, { raw: { ...event.raw, status: event.raw.status } })
    //             localStorage.setItem("listEvents", JSON.stringify(eventsNew));
    //         })
    //     })

    // }

    useEffect(() => {
        setWidth((todos?.filter((event) => event.status === "Done").length / 
        (todos?.filter((event) => event.status === "Ready").length + 
        todos?.filter((event) => event.status === "In Progress").length + 
        todos?.filter((event) => event.status === "Done").length)) * 100 + '%');
    }, [todos])


    useEffect(() => {
        const currentUserId = JSON.parse(localStorage.getItem("currentUser")).id
        setIsCreatorTarget(Number(target?.creatorId) == Number(currentUserId))
    }, [target])


    return (
        <div className={cx('overview') + " overviewLibrary"} >

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
                                <HeaderOptions></HeaderOptions>
                            </div>

                            <div className={cx('content-body')}>
                                <div className={cx('grid')} style={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
                                    <div className={cx('row no-gutters')} >
                                        <div className={cx('col l-12')}>
                                            <div className={cx('process-bar')}>
                                                <div className={cx('left-bar')} onClick={() => navigate(`/WorkProgress?eventId=${searchParams.get("eventId")}`)}>
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

                                    <div className={cx('row')} style={{ flex: 1 }}>
                                        <div className={cx('col l-7')} style={{ padding: 0 }}>
                                            <div className={cx('content-wrapper')}>
                                                <div className={cx('selection')}>
                                                    <div className={cx('select-wrapper')}>
                                                        <div className={cx('content-title')}>Tasks</div>
                                                        <Select
                                                            defaultValue={filterType}
                                                            style={{ width: 200 }}
                                                            className={(filterType === "In Progress" ? "In-progress" : filterType) + " big"}
                                                            onChange={(value) => setFilterType(value)}
                                                            options={[
                                                                {
                                                                    options: [
                                                                        { label: 'All', value: 'All' },
                                                                        { label: 'Done', value: 'Done' },
                                                                        { label: 'In Progress', value: 'In Progress' },
                                                                        { label: 'Ready', value: 'Ready' },
                                                                    ],
                                                                },
                                                            ]}
                                                        />
                                                    </div>
                                                    <div className={cx('task-list')}>
                                                        {(filterType === "In Progress" || filterType === "All") && todos?.filter((event) => event.status === "In Progress").map((value, index) => {
                                                            return <TaskBar
                                                                // setLists={onChangeLists}
                                                                key={value.id}
                                                                event={value}
                                                                userNumber={2}
                                                                coloumnId={1}
                                                                // setListEvents={setListEvents}
                                                                isCreatorTarget={isCreatorTarget}
                                                            ></TaskBar>
                                                        })}
                                                        {(filterType === "Ready" || filterType === "All") && todos?.filter((event) => event.status === "Ready").map((value, index) => {
                                                            return <TaskBar
                                                                // setLists={onChangeLists}
                                                                key={value.id}
                                                                event={value}
                                                                userNumber={2}
                                                                coloumnId={0}
                                                                // setListEvents={setListEvents}
                                                                isCreatorTarget={isCreatorTarget}
                                                            ></TaskBar>

                                                        })}
                                                        {(filterType === "Done" || filterType === "All") && todos?.filter((event) => event.status === "Done").map((value, index) => {
                                                            return <TaskBar
                                                                // setLists={onChangeLists}
                                                                key={value.id}
                                                                event={value}
                                                                userNumber={2}
                                                                coloumnId={2}
                                                                // setListEvents={setListEvents}
                                                                isCreatorTarget={isCreatorTarget}
                                                            ></TaskBar>

                                                        })}
                                                    </div>
                                                </div>

                                                <div className={cx('description-wrapper')}>
                                                    <div className={cx('content-title')}>Description</div>
                                                    <div className={cx('description')}>
                                                        <div className={cx('wrapper')} dangerouslySetInnerHTML={{ __html: target?.raw?.description }}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('col l-5')}>
                                            <div className={cx('content-wrapper')}>
                                                <div className={cx('detail')}>
                                                    <div className={cx('content-title')}>Detail</div>
                                                    {/* {console.log(target)}   */}
                                                    <Detail event={target}
                                                    // setListEvents={setListEvents}
                                                    ></Detail>
                                                </div>

                                                <div className={cx('comment')}>
                                                    <div className={cx('content-title')}>Comment</div>
                                                    <Comment event={target}></Comment>
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
        </div >
    );
}

export default Overview;
