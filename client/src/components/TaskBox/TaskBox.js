import classNames from "classnames/bind";
import styles from "./TaskBox.module.scss"
import checkSquare_icon from '../../imgs/checksquare.svg';
import avatar_hung from '../../imgs/avatar/hung.png';
import "./TaskBox.module.scss"

const cx = classNames.bind(styles);

// Component DragItem(TaskBox) để tạo ra các thành phần có thể kéo và thả
const TaskBox = ({ id, content, columnId }) => {
    const handleOnDrag = (event) => {

        const fromColumnId = columnId;
        const data = [fromColumnId, content]
        event.dataTransfer.setData('text/plain', JSON.stringify(data));

    }

    return (
        <div className={cx("drag-item")} draggable onDragStart={handleOnDrag}>
            <div className={cx("layout")} >
                <div className={cx("content_layout")} >
                    <div className={cx("content_inside")} >
                        {content}
                    </div>
                    <div className={cx("status")}>
                        <div className={cx("progress")}>
                            <div className={cx('checkSquare_icon')}>
                                <img src={checkSquare_icon} alt="icon" />
                            </div>
                            <div className={cx('branch_name')}>
                                PW-138
                            </div>
                        </div>
                        <img className={cx("circle_status")} src={avatar_hung} alt="avatar" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskBox           