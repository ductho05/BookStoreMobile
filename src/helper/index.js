export const formatDate = (date) => {

    const currentDate = new Date(date)
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    let hour = currentDate.getHours()
    let minus = currentDate.getMinutes()

    if (day < 10) day = `0${day}`
    if (month < 10) month = `0${month}`
    if (hour < 10) hour = `0${hour}`
    if (minus < 10) minus = `0${minus}`

    return `${hour}:${minus} ${day}-${month}-${year}`
}

export const formatToVND = number => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(number);
}

export const checkExpried = (date) => {

    const currentDate = new Date()
    const dateValue = new Date(date)

    return currentDate <= dateValue
}

export const checkValueInArray = (array, value) => {
    return array.includes(value)
}