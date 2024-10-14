/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Ubivera. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { DaysOfWeekShort } from '../../utils/daysOfWeek';

const CalendarHeader: React.FC = () => {
    return (
        <div className='calendar-header'>
            {DaysOfWeekShort.map(day => (
                <div key={day} className='calendar-header-day'>
                    {day}
                </div>
            ))}
        </div>
    );
};

export default CalendarHeader;