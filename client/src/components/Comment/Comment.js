import classNames from "classnames/bind";
import { Input } from 'antd';
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SendOutlined } from '@ant-design/icons';

import styles from './Comment.module.scss';
import CommentItem from "./CommentItem/CommentItem";

const cx = classNames.bind(styles);

function Comment({ event }) {
    const [searchParams] = useSearchParams();
    const [listAccounts, setListAccounts] = useState(JSON.parse(localStorage.getItem("listAccounts")));
    const [listComments, setListComments] = useState(JSON.parse(localStorage.getItem("listComments")));
    const [eventComments, setEventComments] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef();

    const eventId = event ? event.id : searchParams.get("eventId");
    const onSubmit = (e) => {
        if (e.keyCode === 13 || e.type === "click") {
            const userId = localStorage.getItem("currentUserId");
            const newComment = {
                userId: userId,
                eventId: eventId,
                comment: inputRef.current.input.value
            }
            const newList = [...listComments, newComment];
            setListComments(newList);
            setInputValue("");
            localStorage.setItem("listComments", JSON.stringify(newList))
        }

    }

    useEffect(() => {
        const list = listComments.filter((e, index) => {
            return eventId === e.eventId;
        })
        setEventComments(list);

    }, [JSON.stringify(listComments), event])
    return (
        <div className={cx('comment')}>
            <div className={cx('wrapper')}>
                <div className={cx('user-comment')}>
                    <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} ref={inputRef} placeholder="Write comment ..." suffix={<SendOutlined style={{ transform: 'rotateZ(-45deg)' }} onClick={onSubmit} />} onKeyUp={onSubmit} />
                </div>

                {eventComments.length > 0 && <div className={cx('list-comment')}>
                    {eventComments.map((item, index) => {
                        var user = {};
                        for (var x of listAccounts) {
                            if (Number(x.id) === Number(item.userId))
                                user = x;
                        }
                        return <CommentItem key={index} userName={user.userName} userAvatar={user.avatar} comment={item.comment}></CommentItem>
                    })}
                </div>}
            </div>
        </div>
    );
}

export default Comment;