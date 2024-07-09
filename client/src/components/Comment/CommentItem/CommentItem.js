import classNames from "classnames/bind";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

function CommentItem({ userName, userAvatar, comment, createdAt }) {
    return (
        <div className={cx('comment-item')}>
            <div className={cx('user-avatar')}>
                {userAvatar ? <Avatar src={userAvatar} />
                    : <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} />}
            </div>
            <div className={cx('user-comment')}>
                <div className={cx('user-name')}>
                    {userName}
                </div>
                <div className={cx('user-content')}>
                    {comment}
                </div>
                <div className={cx('comment-time')}>
                    {createdAt}
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
