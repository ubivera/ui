/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import './Calendar.scss';

interface CalendarProps {
    date?: Date;
    showDaysOfWeek?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ date, showDaysOfWeek = true }) => {
    const [currentDate, setCurrentDate] = useState<Date>(date || new Date());

    useEffect(() => {
        if (date) {
            setCurrentDate(date);
        }
    }, [date]);

    return (
        <div className='calendar' data-date={currentDate.toISOString()}>
            {showDaysOfWeek && <CalendarHeader />}
            <CalendarBody currentDate={currentDate} />
        </div>
    );
};

export default Calendar;