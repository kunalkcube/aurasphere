export const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return '';
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

export const formatDay = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return '';
    return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const getShortDayAndMonth = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return { day: '', month: '', weekday: '' };
    return {
        day: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        weekday: date.toLocaleDateString('en-US', { weekday: 'long' })
    };
};