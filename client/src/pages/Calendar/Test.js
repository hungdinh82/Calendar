import React from 'react'

const Test = () => {
    return (
        <>
            <div className={cx(" event_layout")} >
                <div className={cx("circle_status_event")} style={{ backgroundColor: event.borderColor }} ></div >
                <div className={cx("detailTitle_layout")}>
                    <div className={cx(" detailTitle")} > {event.title}</div >
                    <img className={cx(" icon_more")} src={icon_more} onClick={() => handleEventDetail(event)} />
                </div >
                <div className={cx(" target_layout")} >
                    <img className={cx(" icon_folder_popup")} src={icon_folder_popup} alt={"folder"} />
                    <span className={cx(" title_folder")} > {event.targetName || ""}</span >
                    <div className={cx(" avatar_layout")} >
                        <img className={cx(" avatar_status")} src={user[0].avatar} alt={"avatar"} />
                        <span className={cx(" title_avatar")} >& nbsp;${user[0].userName}</span >
                    </div >
                </div >

                <div className={cx(" layout_2")} >
                    <div className={cx(" contributors_layout")} >
                        <span className={cx(" title_contributors")} > Contributors</span >
                        <img className={cx(" contributors_status")} src={Contributors} alt={"contributors"} />
                    </div >
                    <div className={cx(" comment_layout")} >
                        <img className={cx(" icon_comment")} src={icon_comment} alt={"comment"} />
                        <span className={cx(" comment_total")} >& nbsp; 2 Comments</span >
                    </div >
                </div >
            </div >
        </>
    )
}

export default Test