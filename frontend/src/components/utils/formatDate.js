const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const dateString = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

export const getFormatDate = (date) => {
    var result = ['', '', ''];
    var datetime = new Date(date) 
    result[0] += dateString[datetime.getDay()]
    result[1] += months[datetime.getMonth()]
    result[1] += ' '
    result[1] += datetime.getDate()
    result[2] += datetime.getHours()
    result[2] += ':'
    result[2] += datetime.getMinutes()

    return result
}