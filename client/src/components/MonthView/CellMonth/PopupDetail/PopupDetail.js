import classNames from "classnames/bind";

import styles from './PopupDetail.scss';
import EventCard from "../../EventCard/EventCard";

const cx = classNames.bind(styles);


function PopupDetail({ events, setOpen, setListEvents }) {
    return (
        <div className={cx('popup-detail')}>
            {events.map((event, index) => {
                return <EventCard setListEvents={setListEvents} event={event} key={index} setOpenParent={setOpen} />
            })}
        </div>
    );
}

export default PopupDetail;