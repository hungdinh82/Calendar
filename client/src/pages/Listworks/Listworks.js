import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import styles from './Listworks.module.scss';
import Sidebar from "../../components/Sidebar/Sidebar";
import WorkCard from "./WorkCard/WorkCard";
import HeaderOptions from "../../components/HeaderOptions/HeaderOptions";

const cx = classNames.bind(styles);



function Listworks() {
    const [isShowSideBar, setIsShowSideBar] = useState(true);
    const [listEvents, setListEvents] = useState()
    const [events, setEvents] = useState([])
    // const [Lists, setLists] = useState(taskLists)
    // const [width, setWidth] = useState((Lists[2]?.length / (Lists[0]?.length + Lists[1]?.length + Lists[2]?.length)) * 100 + '%')

    const fetchData = () => {
        const Events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
        setEvents(Events)
    }

    useEffect(() => {
        fetchData();
    }, [listEvents])

    // useEffect(() => {
    //     setWidth((Lists[2]?.length / (Lists[0]?.length + Lists[1]?.length + Lists[2]?.length)) * 100 + '%');
    // }, [Lists])

    useEffect(() => {
        const Events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
        setListEvents(Events)

    }, [])
    return (
        <div className={cx('listworks')}>
            <div className={cx('grid')} style={{ height: "100%" }}>
                <div className={cx('row')} style={{ height: "100%" }}>
                    <div className={cx(isShowSideBar ? 'col l-2-4' : 'col l-1')}>
                        <Sidebar
                            show={setIsShowSideBar}
                            setListEvents={setListEvents}
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
                                        {events.map((event) => {
                                            const currentUserId = localStorage.getItem("currentUserId")
                                            let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
                                            const user = listAccounts.filter((account) => Number(currentUserId) === Number(account.id))
                                            const condition = event.raw.eventType === "target" && (Number(event.raw.creatorId) === Number(currentUserId) || event.raw.helper.includes(user[0].mail))
                                            if (condition)
                                                return <div key={event.id} className={cx(isShowSideBar ? 'col l-3' : 'col l-2-4')}>
                                                    <WorkCard
                                                        event={event}
                                                        setListEvents={setListEvents}
                                                        listEvents={listEvents}
                                                        isCreator={Number(event.raw.creatorId) === Number(currentUserId)}
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