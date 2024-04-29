import classNames from "classnames/bind";
import styles from "./TodoOneLine.module.scss"
import { MoreOutlined } from "@ant-design/icons";
import "./TodoOneLine.module.scss"

const cx = classNames.bind(styles);
const TodoOneLine = ({ content }) => {
    return (
        <>
            <div className={cx("content_layout")} onClick={(e) => { e.stopPropagation() }}>``
                {content}
                <div className={cx("icon_layout")}>
                    <MoreOutlined />
                </div>
            </div>
        </>
    )
}
export default TodoOneLine