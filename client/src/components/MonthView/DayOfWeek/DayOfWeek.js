import React from 'react'
import styles from "./DayOfWeek.module.scss"
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const DayOfWeek = ({ day }) => {
    return (
        <div className={cx("layout")}>{day}</div>
    )
}

export default DayOfWeek