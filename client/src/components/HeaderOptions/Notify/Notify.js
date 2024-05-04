import classNames from "classnames/bind";

import styles from './Notify.module.scss';
import NotifyItem from "./NotifyItem/NotifyItem";
import { useGetAllNotificationsByToMailQuery } from "../../../app/api/notiService";

const cx = classNames.bind(styles);

function Notify() {
    // const listInformation = localStorage.getItem("listInformations")[0] ? JSON.parse(localStorage.getItem("listInformations")) : [];
    const { data: listInformation }  = useGetAllNotificationsByToMailQuery(JSON.parse(localStorage.getItem("currentUser")).mail);
    // console.log(JSON.parse(localStorage.getItem("currentUser")).mail);
    // console.log(listInformation);
    // listInformation.reverse();
    return (
        <div className={cx("notify")}>
            {listInformation?.map((item) => {
                // const listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
                // const currentUserId = localStorage.getItem("currentUserId")
                // const user = listAccounts.filter((account) => Number(account.id) === Number(currentUserId))
                // const user = JSON.parse(localStorage.getItem("currentUser"))
                // if (item.toMail === user[0].mail) return <NotifyItem notify={item} ></NotifyItem>
                return <NotifyItem notify={item} ></NotifyItem>
            })}
        </div>
    );
}

export default Notify;