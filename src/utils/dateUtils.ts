export function getDaysInMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    const days = [];

    const startDayOfWeek = startOfMonth.getDay();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        const day = new Date(year, month, -i);
        days.push({ date: day, isCurrentMonth: false });
    }

    for (let i = 1; i <= endOfMonth.getDate(); i++) {
        const day = new Date(year, month, i);
        days.push({ date: day, isCurrentMonth: true });
    }

    const endDayOfWeek = endOfMonth.getDay();
    for (let i = 1; i < 7 - endDayOfWeek; i++) {
        const day = new Date(year, month + 1, i);
        days.push({ date: day, isCurrentMonth: false });
    }

    return days;
}

export function getDayLabels() {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}  