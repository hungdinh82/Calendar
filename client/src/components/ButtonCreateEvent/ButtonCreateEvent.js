// import classNames from "classnames/bind"
// import styles from "./ButtonCreateEvent.module.scss"
// import { Button } from "antd";
// import { Radio } from "antd";
// import DialogCreateEvent from "../DialogCreateEvent/DialogCreateEvent"
// import { useState } from "react";

// const cx = classNames.bind(styles);
// const ButtonCreateEvent = ({ setListEvents }) => {
//     const [isOpen, setIsOpen] = useState(false)
//     return <>
//         <Button
//             onClick={
//                 () => setIsOpen(true)
//             }
//         >
//             New Event
//         </Button>
//         <DialogCreateEvent
//             isOpen={isOpen}
//             setIsOpen={setIsOpen}
//             start={Date.now()}
//             end={Date.now() + 1800000}
//             setListEvents={setListEvents}
//             type={"create"}
//         />
//     </>
// }
// export default ButtonCreateEvent