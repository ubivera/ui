/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';

interface CalendarBodyProps {
    currentDate: Date;
}

const CalendarBody: React.FC<CalendarBodyProps> = ({ currentDate }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDay = firstDayOfMonth.getDay();

    const daysInMonth = lastDayOfMonth.getDate();

    const calendarDays: (number | null)[] = Array.from({ length: startDay }, () => null);
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    return (
        <div className='calendar-body'>
            {calendarDays.map((day, index) => (
                <div key={index} className={`calendar-day ${day ? '' : 'empty'}`}>
                    {day}
                </div>
            ))}
        </div>
    );
};

export default CalendarBody;