import { useCallback } from 'react';

const useFormattedDate = (date: string | null | undefined) => {
    const formatDate = useCallback((dateString: string) => {
        if (!dateString) {
            return '';
        }

        const dateObj = new Date(dateString)
        if (isNaN(dateObj.getTime())) {
            return '';
        }

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12;

        const formattedDate = `${months[dateObj.getMonth()]} ${dateObj.getDate()} at ${formattedHours}:${String(minutes).padStart(2, '0')} ${ampm}`;

        return formattedDate;
    }, []);

    return formatDate(date || '');
};

export { useFormattedDate };
