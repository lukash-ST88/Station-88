
// interface Ioptions {
//     year: string,
//     month: string
//     day: string
// }

const dateTime = (timestamp)=> {
    const date = new Date(timestamp)
    let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      }
    const local_date = date.toLocaleDateString('ru-RU', options )
    return local_date

}

export default dateTime;