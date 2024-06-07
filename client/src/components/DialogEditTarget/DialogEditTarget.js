import classNames from 'classnames/bind';
import styles from './DialogEditTarget.module.scss';
import Modal from 'antd/es/modal/Modal';
import { Select } from 'antd';
import { DatePicker, TimePicker, Input, Form } from 'antd';
import dayjs from "dayjs"
import JoditEditor from "jodit-react";
import LabelForm from './LabelForm/LabelFrom';
import Swal from "sweetalert2";
import "./Library.scss"
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useEditTargetMutation } from "../../app/api/eventService";
import { useGetAllNotificationsByToMailQuery } from "../../app/api/notiService";
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllHelperByEventIdQuery } from "../../app/api/helperService";
// import { socket } from '../../app/socket/socket';

const cx = classNames.bind(styles)

const DialogEditTarget = ({ isOpen, setIsOpen, type, event, isTargetPage, targetId }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState();
    const [startDate, setStartDate] = useState();
    const [endTime, setEndTime] = useState();
    const [endDate, setEndDate] = useState();
    const [description, setDescription] = useState("");
    const socket = useSelector((state) => state.socket.socket);
    const { data: helper } = useGetAllHelperByEventIdQuery(event.id);
    const [helperMoi, setHelperMoi] = useState(helper?.map((helper) => (
        helper.mail)));
    // console.log(helperMoi);
    
    const [editTarget] = useEditTargetMutation();

    const handleChangeEventName = (e) => {
        setEventName(e.target.value);
    }

    const handleChangeDescription = (value) => {
        setDescription(value);
    }

    const handleChangesetHelper = (value) => {
        setHelperMoi(value);
        // console.log(helperMoi);
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

        // console.log("Submitting new event:", newEvent);

        if (type === "update") {
            console.log("Updating event:", newEvent);
            console.log("Event ID:", event.id);
            editTarget({id: event.id, data: newEvent})
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
            // messageApi.open({
            //     type: 'success',
            //     content: 'Sửa thành công',
            // });


        }
        setIsOpen(false)
        form.resetFields();
    }

    const updateValueFields = () => {
        const options = { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit", year: "numeric" };
        if (type === "update") {
            const startTimeNew = dayjs(new Date(event.start.toString()).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }), 'HH:mm:ss')
            const startDateNew = dayjs(new Date(event.start.toString()).toLocaleDateString("en-GB", options), 'DD/MM/YYYY')
            const endTimeNew = dayjs(new Date(event.end.toString()).toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }), 'HH:mm:ss')
            const endDateNew = dayjs(new Date(event.end.toString()).toLocaleDateString("en-GB", options), 'DD/MM/YYYY')
            setStartTime(startTimeNew)
            setStartDate(startDateNew)
            setEndTime(endTimeNew)
            setEndDate(endDateNew)
            setDescription(event.description)
            // setEventType(event.eventType)
            // setTarget(event.target)
            setEventName(event.eventName)
            setHelperMoi(helperMoi)
            form.setFieldsValue({
                event_name: event.eventName,
                startTime: startTimeNew,
                startDate: startDateNew,
                endTime: endTimeNew,
                endDate: endDateNew,
                description: event.description,
                event_type: event.eventType,
                target: event.target,
                helper: helperMoi,
            })

        }
    }

    useEffect(() => {
        updateValueFields();
    }, [isOpen])

    const handleCancel = () => {
        form.resetFields();
        setIsOpen(false)
    }

    return (
        <div onClick={(e) => e.stopPropagation()}>
            {contextHolder}
            <Modal open={isOpen} title={type === "UPDATE TARGET"} wrapClassName='dialogEditTarget_library' onOk={handleOK} onCancel={handleCancel}>
                <Form form={form} onFinish={handleSubmit}>
                    <LabelForm content={"Event name"} required={true} />
                    <div className={cx("content", "c-12")} >
                        <Form.Item name={"event_name"} rules={[{ required: true, message: 'Please enter your name' }]}>
                            <Input placeholder='Enter your name...'
                                onChange={handleChangeEventName}
                            />
                        </Form.Item>
                    </div>
                    <div className={cx("input_layout")}>
                        <LabelForm content={"Event type"} />
                        <div className={cx("content", "c-10")}>
                            <div className={cx("c-6")}>
                                <Form.Item name={"event_type"}>
                                    <Select
                                        value={event.eventType}
                                        style={{ width: "73%" }}
                                        disabled
                                    // onChange={handleChangeEventType}
                                    />
                                </Form.Item>
                            </div>
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
                                value={event?.description}
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

export default DialogEditTarget