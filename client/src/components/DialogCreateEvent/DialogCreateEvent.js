import classNames from 'classnames/bind';
import styles from './DialogCreateEvent.module.scss';
import Modal from 'antd/es/modal/Modal';
import { Select } from 'antd';
import { DatePicker, TimePicker, Input, Form } from 'antd';
import dayjs from "dayjs"
import JoditEditor from "jodit-react";
import LabelForm from './LabelForm/LabelFrom';
import "./Library.scss"
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useCreateEventMutation, useGetAllEventsByCurrentUserQuery } from "../../app/api/eventService";
import { useGetAllNotificationsByToMailQuery } from "../../app/api/notiService";


const cx = classNames.bind(styles)

const DialogCreateEvent = ({ isOpen, setIsOpen, start, end, setListEvents, type, event, isTargetPage, targetId }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [eventType, setEventType] = useState()
    const [eventName, setEventName] = useState("");
    const [target, setTarget] = useState([]);
    const [startTime, setStartTime] = useState();
    const [startDate, setStartDate] = useState();
    const [endTime, setEndTime] = useState();
    const [endDate, setEndDate] = useState();
    const [description, setDescription] = useState("");
    const [viewer, setViewer] = useState([]);
    const [helper, setHelper] = useState([]);
    const [optionTarget, setOptionTarget] = useState([])

    const { data: eventsPush, isError, isLoading } = useGetAllEventsByCurrentUserQuery(JSON.parse(localStorage.getItem("currentUser")).id);
    const [createEvent] = useCreateEventMutation();

    function updateArrayObjects(listEvents, id, calendarId, changes) {
        return listEvents.map(obj => {
            if (obj.id === id && obj.calendarId === calendarId) {
                return { ...obj, ...changes }
            }
            return obj;
        });
    }

    const handleChangeEventType = (value) => {
        setEventType(value);
    }

    const handleChangeEventName = (e) => {
        setEventName(e.target.value);
    }

    const handleTarget = (value) => {
        setTarget(value);
    }

    const handleChangeDescription = (value) => {
        setDescription(value);
    }

    const handleChangesetHelper = (value) => {
        setHelper(value);
    }

    const handleChangeStartTime = (value) => {
        if (value) {
            setStartTime(value);
        }
    }

    const handleChangeStartDate = (value) => {
        if (value) {
            setStartDate(value);
        }
    }

    const handleChangeEndTime = (value) => {
        if (value) {
            setEndTime(value);
        }
    }

    const handleChangeEndDate = (value) => {
        if (value) {
            setEndDate(value);
        }
    }

    const handleCancel = () => {
        setEventType("todo")
        form.resetFields();
        setIsOpen(false)
    }

    const handleOK = () => {
        form.submit();
    }

    const handleSubmit = (values) => {
        const start = startDate.format("YYYY-MM-DD") + " " + startTime.format("HH:mm:ss");
        const end = endDate.format("YYYY-MM-DD") + " " + endTime.format("HH:mm:ss");
        const status = event?.raw?.status || "Ready"
        // const currentUserId = localStorage.getItem("currentUserId")
        const currentUserId = JSON.parse(localStorage.getItem("currentUser")).id
        const newEvent = {
            // id: event?.id || Date.now(),
            // id: event?.id,
            eventName,
            calendarId: event?.calendarId || "calendar1",
            start,
            end,
            eventType,
            description,
            status,
            creatorId: currentUserId,
            target,
            helper,
        }
        // let Events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
        let Events = eventsPush ? eventsPush : [];
        if (type === "create") {
            // Events.push(newEvent);
            createEvent(newEvent)
                .then(function (response) {
                    if (response.data.error !== undefined) {
                        message.error(response.data.error.message);
                    } else if (response.data.errors !== undefined) {
                        message.error(response.data.errors[0].message);
                    } else message.success('Created event successfully');
                    // console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            // messageApi.open({
            //     type: 'success',
            //     content: 'Tạo thành công',
            // });

            // const listInformation = localStorage.getItem("listInformations")[0] ? JSON.parse(localStorage.getItem("listInformations")) : [];
            // let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
            // const user = listAccounts.filter((account) => Number(currentUserId) === Number(account.id))
            // const user = JSON.parse(localStorage.getItem("currentUser")).mail

            // helper.map((helper) => {
            //     const createInformation = {
            //         toMail: helper,
            //         fromMail: user,
            //         text: eventType === "todo" ? "assigned you a task on target" : "assigned you join target",
            //         isResolve: false,
            //         eventId: newEvent,
            //         // id: Date.now()
            //     }
            //     // console.log(createInformation);
            //     // listInformation.push(createInformation)
            // })
            // console.log(helper);
            // localStorage.setItem("listInformations", JSON.stringify(listInformation));

        }
        else if (type === "update") {
            messageApi.open({
                type: 'success',
                content: 'Sửa thành công',
            });
            const eventUpdate = {
                ...newEvent,
                raw: {
                    ...newEvent.raw,
                    creatorId: event.raw.creatorId,
                    helper: event.raw.helper || []
                }
            }

            const listInformation = localStorage.getItem("listInformations")[0] ? JSON.parse(localStorage.getItem("listInformations")) : [];
            let listAccounts = localStorage.getItem("listAccounts")[0] ? JSON.parse(localStorage.getItem("listAccounts")) : [];
            const user = listAccounts.filter((account) => Number(currentUserId) === Number(account.id))
            helper.map((helper) => {
                if (!event.raw.helper.includes(helper)) {
                    const createInformation = {
                        toMail: helper,
                        fromMail: user[0].mail,
                        text: eventType === "todo" ? "assigned you a task on target" : "assigned you join target",
                        isResolve: false,
                        event: eventUpdate,
                        id: Date.now()
                    }
                    listInformation.push(createInformation)
                }
            })
            localStorage.setItem("listInformations", JSON.stringify(listInformation));

            Events = updateArrayObjects(Events, event.id, event.calendarId, eventUpdate)


        }
        setListEvents(Events)
        localStorage.setItem("listEvents", JSON.stringify(Events));
        setIsOpen(false)
        form.resetFields();
        setEventType("todo")
    }

    const updateValueFields = () => {
        const options = { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit", year: "numeric" };
        // const Events = localStorage.getItem("listEvents")[0] ? JSON.parse(localStorage.getItem("listEvents")) : [];
        const Events = eventsPush || [];
        const filterTarget = Events.filter((event) => event.eventType === "target")
        const optionTarget = filterTarget.map((event) => {
            return { value: event.id, label: event.eventName }
        })
        setOptionTarget(optionTarget)
        if (type === "create") {
            const startTimeNew = dayjs(new Date(start).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }), 'HH:mm:ss')
            const startDateNew = dayjs(new Date(start).toLocaleDateString("en-GB", options), 'DD/MM/YYYY')
            const endTimeNew = dayjs(new Date(end).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }), 'HH:mm:ss')
            const endDateNew = dayjs(new Date(end).toLocaleDateString("en-GB", options), 'DD/MM/YYYY')
            const eventTypeNew = isTargetPage ? "target" : "todo"
            setStartTime(startTimeNew)
            setStartDate(startDateNew)
            setEndTime(endTimeNew)
            setEndDate(endDateNew)
            setDescription("")
            setEventName("")
            setTarget(targetId)
            setEventType(eventTypeNew)
            setHelper([])
            form.setFieldsValue({
                event_name: "",
                startTime: startTimeNew,
                startDate: startDateNew,
                endTime: endTimeNew,
                endDate: endDateNew,
                target: targetId,
                event_type: eventTypeNew,
                helper: []
            })


        }
        else if (type === "update") {
            const startTimeNew = dayjs(new Date(event.start.toString()).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }), 'HH:mm:ss')
            const startDateNew = dayjs(new Date(event.start.toString()).toLocaleDateString("en-GB", options), 'DD/MM/YYYY')
            const endTimeNew = dayjs(new Date(event.end.toString()).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }), 'HH:mm:ss')
            const endDateNew = dayjs(new Date(event.end.toString()).toLocaleDateString("en-GB", options), 'DD/MM/YYYY')
            setStartTime(startTimeNew)
            setStartDate(startDateNew)
            setEndTime(endTimeNew)
            setEndDate(endDateNew)
            setDescription(event.raw.description)
            setEventType(event.raw.eventType)
            setTarget(event.raw.target)
            setEventName(event.title || event.eventName)
            setHelper(event.raw.helper)
            form.setFieldsValue({
                event_name: event.title || event.eventName,
                startTime: startTimeNew,
                startDate: startDateNew,
                endTime: endTimeNew,
                endDate: endDateNew,
                description: event.raw.description,
                event_type: event.raw.eventType,
                target: event.raw.target,
                helper: event.raw.helper,
            })

        }
    }

    useEffect(() => {
        updateValueFields();
    }, [isOpen])

    return (
        <div onClick={(e) => e.stopPropagation()}>
            {contextHolder}
            <Modal open={isOpen} title={type === "create" ? "CREATE EVENT" : "UPDATE EVENT"} wrapClassName='dialogCreateEvent_library' onOk={handleOK} onCancel={handleCancel}>
                <Form form={form} onFinish={handleSubmit}>
                    <LabelForm content={"Event name"} required={true} />
                    <div className={cx("content", "c-12")} >
                        <Form.Item name={"event_name"} rules={[{ required: true, message: 'Please enter your name' }]}>
                            <Input placeholder='Enter your name...' onChange={handleChangeEventName} />
                        </Form.Item>
                    </div>
                    <div className={cx("input_layout")}>
                        <LabelForm content={"Event type"} required={true} />
                        <div className={cx("content", "c-10")}>
                            <div className={cx("c-6")}>
                                <Form.Item name={"event_type"}>
                                    <Select
                                        options={[
                                            { value: "target", label: "Target" },
                                            { value: "todo", label: "To-do" }
                                        ]}
                                        value={eventType}
                                        style={{ width: "73%" }}
                                        onChange={handleChangeEventType}
                                    />
                                </Form.Item>
                            </div>
                            {
                                eventType === "todo" ?
                                    <div className={cx("c-6")}>
                                        <Form.Item name={"target"}>
                                            <Select
                                                placeholder={"Select target"}
                                                style={{ width: "80%" }}
                                                value={target}
                                                onChange={handleTarget}
                                                options={optionTarget}
                                            />
                                        </Form.Item>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>


                    <div className={cx("input_layout")}>
                        <LabelForm content={"Start"} required={true} />
                        <div className={cx("content", "c-10")}>
                            <div className={cx("datePicker", "c-6")}>
                                <Form.Item name={"startTime"} rules={[{ required: true, message: 'Please enter time start' }]}>
                                    <TimePicker
                                        onChange={handleChangeStartTime}

                                    />
                                </Form.Item>
                            </div>
                            <div className={cx("timePicker", "c-6")}>
                                <Form.Item name={"startDate"} rules={[{ required: true, message: 'Please enter date start' }]}>
                                    <DatePicker
                                        format={"DD/MM/YYYY"}
                                        onChange={handleChangeStartDate}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </div>

                    <div className={cx("input_layout")}>
                        <LabelForm content={"End"} required={true} />
                        <div className={cx("content", "c-10")}>
                            <div className={cx("datePicker", "c-6")}>
                                <Form.Item name={"endTime"} rules={[{ required: true, message: 'Please enter time end' }]}>
                                    <TimePicker
                                        onChange={handleChangeEndTime}
                                    />
                                </Form.Item>
                            </div>
                            <div className={cx("timePicker", "c-6")}>
                                <Form.Item name={"endDate"} rules={[{ required: true, message: 'Please enter date end' }]}>
                                    <DatePicker
                                        format={"DD/MM/YYYY"}
                                        onChange={handleChangeEndDate}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </div>

                    <Form.Item name={"description"}>
                        <LabelForm content={"Description"} />
                        <div className={cx("c-12")} >
                            <JoditEditor
                                config={{
                                    readonly: false,
                                    height: 200,
                                }}
                                value={description}
                                onBlur={handleChangeDescription}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item name={"helper"}>
                        <LabelForm content={"Share"} />
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Enter email user"
                            value={helper}
                            onChange={handleChangesetHelper}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default DialogCreateEvent