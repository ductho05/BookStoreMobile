
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

export const generateVoucherCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let voucherCode = '';
    for (let i = 0; i < 8; i++) {
        voucherCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return voucherCode;
}

export const get7DaysLater = () => {
    const today = new Date();
    const sevenDaysLater = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000));

    const year = sevenDaysLater.getFullYear();
    const month = String(sevenDaysLater.getMonth() + 1).padStart(2, '0');
    const day = String(sevenDaysLater.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
