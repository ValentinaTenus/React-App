import { useCallback } from 'react';

enum DateFormatType {
    DEFAULT = 'default',
    CUSTOM = 'custom'
};

const useFormattedDate = (
        date: string | null | undefined,
        dateFormat: DateFormatType = DateFormatType.DEFAULT
    ) => {
    const formatDate = useCallback((dateString: string, dateFormat: DateFormatType) => {
        if (!dateString) {
            return '';
        }

        const dateObj = new Date(dateString);
        if (isNaN(dateObj.getTime())) {
            return '';
        }

        if (dateFormat === DateFormatType.DEFAULT) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const hours = dateObj.getHours();
            const minutes = dateObj.getMinutes();
            const ampm = hours >= 12 ? 'pm' : 'am';
            const formattedHours = hours % 12 || 12;

            return `${months[dateObj.getMonth()]} ${dateObj.getDate()} at ${formattedHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
        } else if (dateFormat === DateFormatType.CUSTOM) {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            return `${days[dateObj.getDay()]}, ${dateObj.getDate()} ${months[dateObj.getMonth()]}`;
        }

        return '';
    }, []);

    return formatDate(date || '', dateFormat);
};

export { useFormattedDate, DateFormatType };
