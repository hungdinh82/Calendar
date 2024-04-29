import classNames from "classnames/bind";
import styles from "./ListTaskColumn.module.scss"
import "./ListTaskColumn.module.scss"
import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import TaskBox from '../../components/TaskBox/TaskBox';

const cx = classNames.bind(styles);

// Component DropZone(ListTaskColumn) để tạo ra vùng thả
const ListTaskColumn = ({ content, columnId, setLists, Lists }) => {
    // const [list, setList] = useState(Lists[columnId])
    const onDragOver = (event) => {
        event.preventDefault();
    }

    const handleOnDrop = (e) => {
        const [fromColumnId, content] = JSON.parse(e.dataTransfer.getData('text/plain'));
        if (fromColumnId !== columnId) {
            const newLists = Lists.reduce((result, currentValue, index) => {
                if (index === fromColumnId) {
                    const newArr = [];
                    currentValue.forEach(element => {
                        if (element !== content) newArr.push(element);
                    });
                    return [...result, newArr];
                }

                if (index === columnId) {

                    return [...result, [...currentValue, content]];
                }

                return [...result, currentValue];
            }, [])
            setLists(newLists);
        }
    }

    return (
        <div className={`drop-zone`} onDragOver={onDragOver} onDrop={handleOnDrop} >
            <div className={cx("layout")} >
                <div className={cx("content_layout")}>
                    <div className={cx("title_content")}>
                        {content}
                    </div>
                    {Lists[columnId].map((todo, index) => (
                        <TaskBox key={index} id={index} columnId={columnId} content={todo} />))}

                    <div className={cx('create_task')}>
                        <button className={cx('create_button')}>
                            <div className={cx('plus_icon')}>
                                &nbsp;&nbsp;<PlusOutlined />
                            </div>
                            <div className={cx('content_button')}>
                                &nbsp;&nbsp;&nbsp;&nbsp;Create issue
                            </div>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListTaskColumn