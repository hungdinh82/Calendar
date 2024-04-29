import classNames from 'classnames/bind';
import styles from '../Details/Details.module.scss';
import SubTask from '../../components/SubTask/SubTask';


const cx = classNames.bind(styles);

function Details() {
    const listTodo = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5',];
    const listTodoComponent = listTodo.map((todo) => {
        return <SubTask content={todo} />;
    });
    return (
        <div className={cx('detailsPage')}>
            <div className={cx('header')}>
                <div>
                    <h1>Tên công việc</h1>
                    <div className={cx('Aim')}>Mục tiêu/Công việc lớn </div>
                </div>
            </div>
            <div className={cx('detailsSec')}>
                <div className={cx('subTask')}>
                    {listTodoComponent}
                </div>
                <div className={cx('info')}>
                    <div className={cx('dropdownStatus')}>
                        <select name="status" id="status">
                            <option value="toDo"> To-do </option>
                            <option value="inProgress">In progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <div className={cx('info_row')}>
                        <div className={cx('info_col info_list--title')}> Người tạo :</div>
                        <div className={cx('info_col info_list--content')}> Nguyễn Văn An</div>
                    </div>
                    <div className={cx('info_row')}>
                        <div className={cx('info_col info_list--title')}> Bắt đầu :</div>
                        <div className={cx('info_col info_list--content')}> 14:00   13/4/2023</div>
                    </div>
                    <div className={cx('info_row')}>
                        <div className={cx('info_col info_list--title')}> Kết thúc :</div>
                        <div className={cx('info_col info_list--content')}> 14:00   14/4/2000</div>
                    </div>
                    <div className={cx('info_row')}>
                        <div className={cx('info_col info_list--title')}> Người đóng góp :</div>
                        <div className={cx('info_col info_list--content')}> </div>
                    </div>
                    <div className={cx('info_row')}>
                        <div className={cx('info_col info_list--title')}> Người quan sát :</div>
                        <div className={cx('info_col info_list--content')}> </div>
                    </div>
                </div>
                <div className={cx('comment')}>
                    <div className={cx('title')}>
                        Bình luận
                    </div>
                    <div className={cx('comment-sec')}>
                        <div className={cx('user')} >
                            <div className={cx('user_avt')}></div>
                            <div>
                                <div className={cx('user_name')}>Nguyễn Văn A</div>
                                <div className={cx('user_comment')}>Đã hoàn thành Task 5 chưa?</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Details;
