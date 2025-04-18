// export default dateTime;
const dateTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();

  // Helper function to format date
  const formatDate = (dateObj: Date) => {
    return dateObj.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Helper function to format time
  const formatTime = (dateObj: Date) => {
    return dateObj.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate difference in days
  const isSameDay = (date1: Date, date2: Date) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const differenceInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  console.log(differenceInDays)

  let result: string[] = [formatTime(date)];

  if (isSameDay(date, now)) {
    result.push('Сегодня')
  } else if (isSameDay(date, yesterday)) {
    result.push('Вчера')
  } else if (differenceInDays > 30) {
    result = [formatDate(date)]
  } else {
    result.push(formatDate(date))
  }

  return result;
};

export default dateTime;