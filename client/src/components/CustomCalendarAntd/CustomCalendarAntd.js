import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import { Calendar, Col, Radio, Row, Select, theme } from 'antd';
import "./library.scss"
import CalendarMini from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

dayjs.extend(dayLocaleData);

const CustomCalendarAntd = ({ calendar, setCurrentDate }) => {
    const { token } = theme.useToken();
    const handleSelectCalendar = (day) => {
        calendar.setDate(new Date(day))
        setCurrentDate(new Date(day))
        calendar.render();
    }
    const wrapperStyle = {
        width: "100%",
        border: `1px solid #e5e5e5`,
        borderRadius: token.borderRadiusLG,
        marginTop: "20px",
        position: "absolute",
        bottom: "0",
    };
    return (
        <div style={wrapperStyle} className='customCalendarLibrary'>
            {/* <Calendar
                fullscreen={false}
                headerRender={({ value, type, onChange, onTypeChange }) => {
                    const start = 0;
                    const end = 12;
                    const monthOptions = [];

                    let current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    for (let i = 0; i < 12; i++) {
                        current = current.month(i);
                        months.push(localeData.monthsShort(current));
                    }

                    for (let i = start; i < end; i++) {
                        monthOptions.push(
                            <Select.Option key={i} value={i} className="month-item">
                                {months[i]}
                            </Select.Option>,
                        );
                    }

                    const year = value.year();
                    const month = value.month();
                    const options = [];
                    for (let i = year - 10; i < year + 10; i += 1) {
                        options.push(
                            <Select.Option key={i} value={i} className="year-item">
                                {i}
                            </Select.Option>,
                        );
                    }
                    return (
                        <div style={{ padding: 8 }}>
                            <Row gutter={8}>
                                <Col>
                                    <Select
                                        size="small"
                                        dropdownMatchSelectWidth={false}
                                        className="my-year-select"
                                        value={year}
                                        onChange={(newYear) => {
                                            const now = value.clone().year(newYear);
                                            onChange(now);
                                        }}
                                    >
                                        {options}
                                    </Select>
                                </Col>
                                <Col>
                                    <Select
                                        size="small"
                                        dropdownMatchSelectWidth={false}
                                        value={month}
                                        onChange={(newMonth) => {
                                            const now = value.clone().month(newMonth);
                                            onChange(now);
                                        }}
                                    >
                                        {monthOptions}
                                    </Select>
                                </Col>
                            </Row>
                        </div>
                    );
                }}
                onPanelChange={onPanelChange}
                onSelect={handleSelectCalendar}
            /> */}
            <CalendarMini onChange={handleSelectCalendar} />
        </div>
    );
};

export default CustomCalendarAntd;