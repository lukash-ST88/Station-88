// const dateTime = (timestamp)=> {
//     const date = new Date(timestamp)
//     let options = {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric"
//       }
//     const local_date = date.toLocaleDateString('ru-RU', options )
//     return local_date

// };

// export default dateTime;
const dateTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();

  // Helper function to format date
  const formatDate = (dateObj) => {
    return dateObj.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Helper function to format time
  const formatTime = (dateObj) => {
    return dateObj.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate difference in days
  const isSameDay = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  let result = [formatTime(date)];
  if (isSameDay(date, now)) {
    result.push('Сегодня')
  } else if (isSameDay(date, yesterday)) {
    result.push('Вчера')
  } else {
    result.push(formatDate(date))
  }

  return result;
};

export default dateTime;