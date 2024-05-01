import React, { useEffect, useState } from 'react'
import styles from "./EventCard.module.scss"
import classNames from 'classnames/bind'
import { Popover } from 'antd'
import PopUp from '../../PopUp/PopUp'
const cx = classNames.bind(styles)

const EventCard = ({ event, key, setOpenParent, setListEvents }) => {
    const [bg, setBg] = useState()
    const [borderColor, setBorderColor] = useState()
    const [open, setOpen] = useState(false)

    const setColor = () => {
        const status = event.status
        if (status === "Done") {
            setBg("rgba(66,219,41,0.2)")
            setBorderColor("rgb(66,219,41)")
        }
        else if (status === "In Progress") {
            setBg("rgba(253, 11, 98, 0.2)")
            setBorderColor("rgb(253, 11, 98)")
        }
        else if (status === "Ready") {
            setBg("rgba(238, 242, 9, 0.2)")
            setBorderColor("rgb(238, 242, 9)")
        }
    }


    useEffect(() => setColor(), [event])
    return (
        <Popover content={<PopUp event={event} callBack={[setOpen, setOpenParent]} setListEvents={setListEvents}></PopUp>} trigger="click" open={open} onOpenChange={() => setOpen(prev => !prev)}>
            <div className={cx("layout")} style={{ background: bg, borderColor: borderColor, cursor: "pointer" }} key={key}>{event.eventName}</div>
        </Popover>
    )
}

export default EventCard