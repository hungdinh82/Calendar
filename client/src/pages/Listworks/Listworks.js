import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from './Listworks.module.scss';
import Sidebar from "../../components/Sidebar/Sidebar";
import WorkCard from "./WorkCard/WorkCard";
import HeaderOptions from "../../components/HeaderOptions/HeaderOptions";
import { useGetAllEventsTargetsByCurrentUserQuery } from "../../app/api/eventService";


const cx = classNames.bind(styles);

function Listworks() {
    const [isShowSideBar, setIsShowSideBar] = useState(true);
    // const [listEvents, setListEvents] = useState()
    // const [events, setEvents] = useState([])
    // console.log(localStorage.getItem("currentUser"));
    // const { data: events, isError, isLoading } = useGetAllEventsByCurrentUserQuery(JSON.parse(localStorage.getItem("currentUser")).id);
    const { data: events } = useGetAllEventsTargetsByCurrentUserQuery(JSON.parse(localStorage.getItem("currentUser")).id);
    const listEvents = events;
    // console.log(useGetAllEventsByCurrentUserQuery(JSON.parse(localStorage.getItem("currentUser")).id));
    // console.log(events);


    // if (isError) {
    //     return <h1>Something went wrong!</h1>;
    // } else if (isLoading) {
    //     return <h1>Loading ... </h1>;
    // }else {
    //     // console.log(events);
    // }

    // const [getAllEventsByCurrentUser] = useGetAllEventsByCurrentUserQuery();
    // const [Lists, setLists] = useState(taskLists)
    // const [width, setWidth] = useState((Lists[2]?.length / (Lists[0]?.length + Lists[1]?.length + Lists[2]?.length)) * 100 + '%');

    // useEffect(() => {
    //     setWidth((Lists[2]?.length / (Lists[0]?.length + Lists[1]?.length + Lists[2]?.length)) * 100 + '%');
    // }, [Lists])

    // getAllEventsByCurrentUser(localStorage.getItem("currentUser"))
    // .then((res) => {
    //     console.log(res);
    //     if (res.data) {
    //         // setEvents(res.data)
    //     }
    // })

    return (
        <div className={cx('listworks')}>
            <div className={cx('grid')} style={{ height: "100%" }}>
                <div className={cx('row')} style={{ height: "100%" }}>
                    <div className={cx(isShowSideBar ? 'col l-2-4' : 'col l-1')}>
                        <Sidebar
                            show={setIsShowSideBar}
                            // setListEvents={setListEvents}
                            isTargetPage={true}
                            listEvents={listEvents}
                        ></Sidebar>
                    </div>
                    <div className={cx(isShowSideBar ? 'col l-10' : 'col l-11')} style={{ flex: 1 }}>
                        <div className={cx('content')}>
                            <div className={cx('content-header')}>
                                <div className={cx('header-title')}>List of targets</div>
                                <HeaderOptions></HeaderOptions>
                            </div>

                            <div className={cx('content-body')}>
                                <div className={cx('grid')}>
                                    <div className={cx('row no-gutters')}>
                                        {events?.map((event) => {
                                            // console.log(events[0]);
                                            return <div key={event.id} className={cx(isShowSideBar ? 'col l-3' : 'col l-2-4')}>
                                                <WorkCard
                                                    event={event}
                                                    // setListEvents={setListEvents}
                                                    listEvents={events}
                                                    isCreator={event.creatorId === JSON.parse(localStorage.getItem("currentUser")).id}
                                                ></WorkCard>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Listworks;