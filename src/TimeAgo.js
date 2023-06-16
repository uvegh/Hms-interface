import React from 'react'

const TimeAgo = ({ timestamp }) => {
    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (seconds < 60) {
            return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
        } else if (minutes < 60) {
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        } else if (days < 7) {
            return `${days} day${days === 1 ? '' : 's'} ago`;
        } else {
            return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
        }
    };

    const formattedTimeAgo = getTimeAgo(new Date(timestamp));

    return <span>{formattedTimeAgo}</span>;
};

export default TimeAgo;