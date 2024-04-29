import classNames from "classnames/bind";
import styles from "./SubTask.module.scss";

const cx = classNames.bind(styles);
const SubTask = ({ content }) => {
    return (

        <div className={cx("content_layout")} >
            {content}
            <div className={cx('dropdownStatus')}>
                <select name="status" id="status">
                    <option value="toDo"> To-do </option>
                    <option value="inProgress">In progress</option>
                    <option value="done">Done</option>
                </select>
            </div>
        </div>
    )
}
export default SubTask