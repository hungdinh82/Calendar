import classNames from "classnames/bind";
import { Input } from 'antd';
import { useEffect, useState } from "react";

import styles from './Search.module.scss';
import '../library.scss';
import TaskBar from '../../../pages/Overview/TaskBar/Taskbar'

const cx = classNames.bind(styles);

function Search({ workList, setOpen }) {
    const [searchValue, setSearchValue] = useState("");
    const [targetList, setTargetList] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [targetFilter, setTargetFilter] = useState([]);
    const [taskFilter, setTaskFilter] = useState([]);

    const handleChangeSearchValue = (e) => {
        const value = e.target.value;
        if (value !== "") {

            const target_Filter = targetList.filter((item, index) => {
                return item.eventName.includes(value);
            })

            const task_Filter = taskList.filter((item, index) => {
                return item.eventName.includes(value);
            })
            setTargetFilter(target_Filter);
            setTaskFilter(task_Filter);
        } else {
            setTargetFilter([]);
            setTaskFilter([]);
        }

        setSearchValue(value);
    }


    useEffect(() => {
        console.log(workList);
        const target_List = workList.filter((item, index) => {
            return item.raw.eventType === "target";
        })
        const task_List = workList.filter((item, index) => {
            return item.raw.eventType === "todo";
        })

        setTargetList(target_List);
        setTaskList(task_List);
    }, [])

    return (
        <div className={cx("search") + " Search"}>
            <div className={cx('search-input')} >
                <Input placeholder="Search..." allowClear size="large" value={searchValue} onChange={handleChangeSearchValue} />
            </div>

            <div className={cx('search-result')}>
                <div className={cx('target-result')}>
                    <div className={cx('search-title')}>
                        Target:
                    </div>
                    {targetFilter.length < 1 && searchValue !== "" ? <p className={cx('empty-result')}>Don’t find any target with “{searchValue}”.</p> :
                        <div className={cx('search-list')}>
                            {targetFilter.map((item, index) => {
                                return <TaskBar callback={setOpen} key={index} event={item} process={item.process} disabled userNumber={item.member} border></TaskBar>
                            })}
                        </div>
                    }
                </div>
                <div className={cx('task-result')}>
                    <div className={cx('search-title')}>
                        Task:
                    </div>
                    {taskFilter.length < 1 && searchValue !== "" ? <p className={cx('empty-result')}>Don’t find any task with “{searchValue}”.</p> :
                        <div className={cx('search-list')}>
                            {taskFilter.map((item, index) => {
                                return <TaskBar callback={setOpen} key={index} event={item} userNumber={item.member} border disabled></TaskBar>
                            })}
                        </div>
                    }
                </div>
            </div>
        </div >
    );
}

export default Search;