export function ellipsis(str: string, maxLength = 13): string {
  if (str.length <= maxLength) {
    return str;
  }

  const ellipsisLength = 3;
  const truncatedLength = maxLength - ellipsisLength;
  const truncatedStr = str.substring(0, truncatedLength);

  return `${truncatedStr}...${str.substring(str.length - ellipsisLength)}`;
}

export function convertUnixTimestampToDateString(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toString();
}
export function convertUnixTimestampToTimeAgo(timestamp: number): string {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeDifference = currentTime - timestamp;

    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInMonth = 30 * secondsInDay;
    const secondsInYear = 365 * secondsInDay;

    if (timeDifference < secondsInMinute) {
        return `${timeDifference} seconds ago`;
    } else if (timeDifference < secondsInHour) {
        const minutes = Math.floor(timeDifference / secondsInMinute);
        return `${minutes} minutes ago`;
    } else if (timeDifference < secondsInDay) {
        const hours = Math.floor(timeDifference / secondsInHour);
        return `${hours} hours ago`;
    } else if (timeDifference < secondsInMonth) {
        const days = Math.floor(timeDifference / secondsInDay);
        return `${days} days ago`;
    } else if (timeDifference < secondsInYear) {
        const months = Math.floor(timeDifference / secondsInMonth);
        return `${months} months ago`;
    } else {
        const years = Math.floor(timeDifference / secondsInYear);
        return `${years} years ago`;
    }
}