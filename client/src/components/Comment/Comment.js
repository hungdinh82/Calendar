import classNames from "classnames/bind";
import { Input, message } from 'antd';
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SendOutlined } from '@ant-design/icons';

import styles from './Comment.module.scss';
import CommentItem from "./CommentItem/CommentItem";
import { useAddCommentMutation, useGetCommentByEventIdQuery } from "../../Services/api/commentService";


const cx = classNames.bind(styles);

function Comment({ event }) {
    const [searchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef();
    // const eventId = event ? event.id : searchParams.get("eventId");
    const eventId = event?.id || event?.eventId || searchParams.get("eventId");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const [addComment] = useAddCommentMutation();
    const { data: comments } = useGetCommentByEventIdQuery(eventId);
    const eventComments = comments;

    const onSubmit = (e) => {
        if (e.keyCode === 13 || e.type === "click") {
            const userId = currentUser.id;
            const newComment = {
                userId: userId,
                eventId: eventId,
                comment: inputRef.current.input.value
            }
            setInputValue("");

            addComment(newComment)
                .then(function (response) {
                    if (response.data.error !== undefined) {
                        message.error(response.data.error.message);
                    } else if (response.data.errors !== undefined) {
                        message.error(response.data.errors[0].message);
                    } else {
                        message.success('Add comment successfully')
                    };
                })
                .catch(function (error) {
                    console.log(error);
                    message.error('An error occurred while creating the event. Please try again.');
                });
        }
    }

    return (
        <div className={cx('comment')}>
            <div className={cx('wrapper')}>
                <div className={cx('user-comment')}>
                    <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} ref={inputRef} placeholder="Write comment ..." suffix={<SendOutlined style={{ transform: 'rotateZ(-45deg)' }} onClick={onSubmit} />} onKeyUp={onSubmit} />
                </div>

                {eventComments?.length > 0 && <div className={cx('list-comment')}>
                    {eventComments?.map((item, index) => {
                        return <CommentItem key={index} userName={item?.userName} userAvatar={item?.avatar} comment={item?.comment}></CommentItem>
                    })}
                </div>}
            </div>
        </div>
    );
}

export default Comment;