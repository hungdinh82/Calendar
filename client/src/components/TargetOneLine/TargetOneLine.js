import classNames from "classnames/bind";
import styles from "./TargetOneLine.module.scss"
import { DownOutlined } from "@ant-design/icons"
import { useState } from "react";
import "./Library.scss";

const cx = classNames.bind(styles);
const TargetOneLine = ({ listTodoComponent, content }) => {
    const [isClick, setIsClick] = useState(false)
    return (
        <div className={cx("layout") + " targetOneLine_library"} onClick={() => setIsClick(!isClick)}>
            <div className={cx("content_layout")}>
                <div>
                    {content}
                </div>
                <div className={!isClick ? cx("icon_layout") : cx("icon_layout", "rotate_180")} onClick={() => setIsClick(!isClick)}>
                    <DownOutlined />
                </div>
            </div>
            {isClick ? listTodoComponent.map((todo) => { return todo }) : null}
        </div>
    )
}
export default TargetOneLine