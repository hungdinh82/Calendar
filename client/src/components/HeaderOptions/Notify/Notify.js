import classNames from "classnames/bind";

import styles from './Notify.module.scss';
import NotifyItem from "./NotifyItem/NotifyItem";

const cx = classNames.bind(styles);

function Notify() {
    const listInformation = localStorage.getItem("listInformations")[0] ? JSON.parse(localStorage.getItem("listInformations")) : [];
    listInformation.reverse();
    return (
        <div className={cx("notify")}>
            {listInformation.map((item) => {
                const listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
                const currentUserId = localStorage.getItem("currentUserId")
                const user = listAccounts.filter((account) => Number(account.id) === Number(currentUserId))
                if (item.toMail === user[0].mail) return <NotifyItem notify={item} ></NotifyItem>
            })}
        </div>
    );
}

export default Notify;