import formatDuration from 'format-duration';

export const formatTime = (timeInSeconds = 0) => {
    return formatDuration(timeInSeconds * 100);
};

export const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
