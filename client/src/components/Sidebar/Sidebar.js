import classNames from "classnames/bind";
import { LogoutOutlined, CalendarOutlined, FolderOutlined, EditOutlined, PlusOutlined, DownOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import DialogCreateEvent from "../DialogCreateEvent/DialogCreateEvent";

import styles from './Sidebar.module.scss';
import Logo from '../../imgs/logo.png';
import avatar from '../../imgs/facebook.png';
import avatar_hung from '../../imgs/avatar/hung.png';
import avatar_linh from '../../imgs/avatar/linh.png';
import avatar_nguyet from '../../imgs/avatar/nguyet.jpg'
import avatar_quang from '../../imgs/avatar/quang.jpg'
import avatar_hieu from '../../imgs/avatar/hieu.jpg'
import { useGetImportantsByUserIdQuery } from "../../app/api/importantService";

const cx = classNames.bind(styles);

const emtpyFunction = (e) => {

};

const colors = ["#F4CD80", "#F48080", "#80D9F4", "#C180F4"]

function Sidebar({ show = emtpyFunction, isCalendar, setListEvents, isTargetPage, targetId, listEvents }) {
    const [visitable, setVisitable] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenImportant, setIsOpenImportant] = useState(false);
    const [currentAvatar, setCurrentAvatar] = useState();

    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    
    const { data: eventImportant } = useGetImportantsByUserIdQuery(currentUser.id);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser.userName?.includes("quang")) {
            setCurrentAvatar(avatar_quang);
        }
        else if (currentUser.userName?.includes("hung")) {
            setCurrentAvatar(avatar_hung);
        }
        else if (currentUser.userName?.includes("linh")) {
            setCurrentAvatar(avatar_linh);
        }
        else if (currentUser.userName?.includes("nguyet")) {
            setCurrentAvatar(avatar_nguyet);
        }
        else if (currentUser.userName?.includes("hieu")) {
            setCurrentAvatar(avatar_hieu);
        }
        else {
            setCurrentAvatar(avatar);
        }
    }, []);
    
    return (
        currentUser &&
        <div style={{ position: "relative" }}>
            <div className={visitable ? cx('sidebar', 'visitable') : cx('sidebar')}>
                <div className={cx('icon-menu')} onClick={() => { setVisitable(false); show(prev => !prev) }}>
                    <MenuFoldOutlined style={{ fontSize: "30px" }} />
                </div>
                <div className={cx('logo-wrapper')}>
                    <div className={cx('logo')}>
                        <img src={Logo} alt="" />
                    </div>
                    <div className={cx('user')}>
                        <div className={cx('user-avatar')}>
                            <div className={cx('avatar')}>
                                <img src={currentAvatar} alt="" />
                            </div>
                        </div>
                        <div className={cx('user-info')}>
                            <div className={cx('user-name')}>{currentUser.userName}</div>
                            <div className={cx('user-gmail')}>{currentUser.mail}</div>
                        </div>
                    </div>
                </div>
                <div className={cx('add-btn')}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined style={{ fontSize: 15 }} />}
                        size="large"
                        style={{ fontWeight: 600 }}
                        onClick={() => setIsOpen(true)}
                    >
                        ADD EVENT
                    </Button>
                    <DialogCreateEvent
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        start={Date.now()}
                        end={Date.now() + 1800000}
                        type={"create"}
                        setListEvents={setListEvents}
                        isTargetPage={isTargetPage}
                        targetId={targetId}
                    />
                </div>

                <div className={cx('nav')}>
                    <div className={cx('nav-item', isCalendar ? 'active' : null)} onClick={() => { navigate("/Calendar") }}>
                        <CalendarOutlined />
                        <span className={cx('item-title')}>Calendar</span>
                    </div>
                    <div className={cx('nav-item', !isCalendar ? 'active' : null)} onClick={() => navigate("/Listworks")}>
                        <FolderOutlined />
                        <span className={cx('item-title')}>Targets</span>
                    </div>
                </div>

                <div className={cx('important')} onClick={() => {
                    // console.log(importantTarget);
                    setIsOpenImportant(!isOpenImportant)
                }}>
                    <div className={cx('important-header')}>
                        <span>Important</span>
                        <span
                            className={isOpenImportant ? cx("icon-downOut") : cx("icon-downUp")}
                            onClick={() => setIsOpenImportant(!isOpenImportant)}
                        ><DownOutlined /></span>
                    </div>
                    <div className={cx('important-list')}>
                        {
                            isOpenImportant && eventImportant?.map((e, index) => (
                                <div className={cx('important-item')} onClick={() => navigate(`/overview?eventId=${e.id}`)}>
                                    <div className={cx('important-item-checkbox')} style={{ backgroundColor: colors[index % 4] }}></div>
                                    <Tooltip title={e.eventName}>
                                        {/* {console.log(e.eventName)} */}
                                        <div className={cx('important-item-title')}>{e.eventName}</div>
                                    </Tooltip>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className={cx('logout-btn')}>
                    <Button
                        type="default"
                        icon={<LogoutOutlined style={{ fontSize: 15 }} />}
                        size="large"
                        style={{ fontWeight: 600, width: "100%" }}
                        onClick={() => { localStorage.removeItem("currentUserId"); navigate('/Login') }}
                    >
                        LOG OUT
                    </Button>
                </div>
            </div>
            {!visitable && <div className={cx('icon-visiable')} onClick={() => { setVisitable(true); show(prev => !prev) }}>
                <MenuUnfoldOutlined style={{ fontSize: "30px" }} />
            </div>}
        </div>

    );
}

export default Sidebar;