import classNames from 'classnames/bind';
import styles from './DialogEditTodo.module.scss';
import Modal from 'antd/es/modal/Modal';
import { Select } from 'antd';
import { DatePicker, TimePicker, Input, Form } from 'antd';
import dayjs from "dayjs"
import JoditEditor from "jodit-react";
import LabelForm from './LabelForm/LabelFrom';
import "./Library.scss"
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useCreateEventMutation, useGetAllEventsByCurrentUserQuery, useGetEventByIdQuery, useEditToDoMutation } from "../../app/api/eventService";
import { useGetAllNotificationsByToMailQuery } from "../../app/api/notiService";
import { useGetAllHelperByEventIdQuery } from "../../app/api/helperService";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const cx = classNames.bind(styles)
const DialogEditTodo = ({ isOpen, setIsOpen, start, end, type, event, isTargetPage, targetId }) => {
    const [searchParams, setSearchParams] = useSearchParams()
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
    // const [helper, setHelper] = useState([]);
    const [optionTarget, setOptionTarget] = useState([])
    const socket = useSelector((state) => state.socket.socket);
    const { data: eventsPush } = useGetAllEventsByCurrentUserQuery(JSON.parse(localStorage.getItem("currentUser")).id);
    const [createEvent] = useCreateEventMutation();
    const { data: eventTarget } = useGetEventByIdQuery(event.target);
    const { data: helpersCuaTargetNay } = useGetAllHelperByEventIdQuery(event.target);
    const [editToDo] = useEditToDoMutation();
    const { data: helper } = useGetAllHelperByEventIdQuery(event?.eventId);
    const [helperMoi, setHelperMoi] = useState(helper?.map((helper) => (
        helper.mail)));

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
        setHelperMoi(value);
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
        const status = event?.status || "Ready"
        const currentUserId = JSON.parse(localStorage.getItem("currentUser")).id

        const newEvent = {
            eventName,
            start,
            end,
            status,
            description,
            creatorId: currentUserId,
            helper: helperMoi,
        }

        if (eventType === "todo") {
            // console.log(event.target);
            if ( !event.target && helperMoi) {
                message.error('Nếu Todo bạn không thuộc Target nào thì không thể chọn helper');
                return;
            }
            // Get helper emails from helpersCuaTargetNay
            const helpersEmails = helpersCuaTargetNay ? helpersCuaTargetNay.map(helper => helper.mail) : [];
        
            // Check if all helpers in the new event are in helpersCuaTargetNay
            const allHelpersExist = helperMoi.every(h => helpersEmails.includes(h));
            // console.log(allHelpersExist);

            if (!allHelpersExist) {
                message.error('Some helpers do not have permission.');
                return;
            }
        }

        if (type === "update") {
            // console.log("Updating event:", newEvent);
            // console.log("Event ID:", event?.eventId);
            editToDo({id: event?.eventId, data: newEvent})
                .then(function (response) {
                    if (response.data.error !== undefined) {
                        message.error(response.data.error.message);
                    } else if (response.data.errors !== undefined) {
                        message.error(response.data.errors[0].message);
                    } else {
                        socket?.emit("new-notification", {
                        });
                        message.success('Edit event successfully')
                        Swal.fire(
                            'Important!',
                            'Your event has been updated',
                            'success'
                        )
                    };
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        setIsOpen(false)
        form.resetFields();
        setEventType("todo")
    }
    const updateValueFields = () => {
        const options = { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit", year: "numeric" };
        const Events = eventsPush || [];
        const filterTarget = Events.filter((event) => event?.eventType === "target")
        const optionTarget = filterTarget.map((e) => {
            // console.log(eventTarget?.eventName);
            return { value: e?.id, label: e?.eventName, disabled: eventTarget?.eventName !== e?.eventName }
        })
        setOptionTarget(optionTarget)
        // if (type === "create") {
        //     const startTimeNew = dayjs(new Date(start).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }), 'HH:mm:ss')
        //     const startDateNew = dayjs(new Date(start).toLocaleDateString("en-GB", options), 'DD/MM/YYYY')
        //     const endTimeNew = dayjs(new Date(end).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }), 'HH:mm:ss')
        //     const endDateNew = dayjs(new Date(end).toLocaleDateString("en-GB", options), 'DD/MM/YYYY')
        //     const eventTypeNew = isTargetPage ? "target" : "todo"
        //     setStartTime(startTimeNew)
        //     setStartDate(startDateNew)
        //     setEndTime(endTimeNew)
        //     setEndDate(endDateNew)
        //     setDescription("")
        //     setEventName("")
        //     setTarget(targetId)
        //     setEventType(eventTypeNew)
        //     setHelper([])
        //     form.setFieldsValue({
        //         event_name: "",
        //         startTime: startTimeNew,
        //         startDate: startDateNew,
        //         endTime: endTimeNew,
        //         endDate: endDateNew,
        //         target: eventTarget?.eventName,
        //         event_type: eventTypeNew,
        //         helper: []
        //     })
        // }
        // else 
        if (type === "update") {
            // console.log("event?.eventName", eventTarget?.eventName);
            const startTimeNew = dayjs(new Date(event?.start.toString()).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }), 'HH:mm:ss')
            const startDateNew = dayjs(new Date(event?.start.toString()).toLocaleDateString("en-GB", options), 'DD/MM/YYYY')
            const endTimeNew = dayjs(new Date(event?.end.toString()).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }), 'HH:mm:ss')
            const endDateNew = dayjs(new Date(event?.end.toString()).toLocaleDateString("en-GB", options), 'DD/MM/YYYY')
            setStartTime(startTimeNew)
            setStartDate(startDateNew)
            setEndTime(endTimeNew)
            setEndDate(endDateNew)
            setDescription(event?.description)
            setEventType(event?.eventType)
            setTarget(event?.target)
            setEventName(event?.eventName)
            setHelperMoi(helperMoi)
            form.setFieldsValue({
                event_name: event?.eventName,
                startTime: startTimeNew,
                startDate: startDateNew,
                endTime: endTimeNew,
                endDate: endDateNew,
                description: event?.description,
                event_type: event?.eventType,
                target: event?.target,
                helper: helperMoi,
            })
        }
    }
    useEffect(() => {
        updateValueFields();
    }, [isOpen])

    return (
        <div onClick={(e) => e.stopPropagation()}>
            {contextHolder}
            <Modal open={isOpen} title={type === "create" ? "CREATE EVENT" : "UPDATE EVENT"} wrapClassName='dialogEditTodo_library' onOk={handleOK} onCancel={handleCancel}>
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
                            {
                                <div className={cx("c-6")}>
                                    <Form.Item name={"event_type"}>
                                        <Select
                                            // options={[
                                            //     { value: "target", label: "Target", disabled: eventTarget ? true : false },
                                            //     { value: "todo", label: "To-do" }
                                            // ]}

                                            value={eventType}
                                            style={{ width: "73%" }}
                                            onChange={handleChangeEventType}
                                        />
                                    </Form.Item>
                                </div>
                            }
                            {
                                eventType === "todo" && eventTarget ?
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
                            // value={helper?.map((helper) => (
                            //     helper.mail
                            // ))}
                            // value={helperMoi?.map((helperMoi) => (
                            //     helperMoi.mail
                            // ))}
                            value={helperMoi}
                            onChange={handleChangesetHelper}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default DialogEditTodo