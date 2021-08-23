import dayjs from 'dayjs';

function funDate(aa) {
    var date1 = new Date();
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + aa);
    let month = '';
    let day = '';
    if ((date2.getMonth() + 1) < 10) month = '0' + (date2.getMonth() + 1);
    else month = (date2.getMonth() + 1);

    if (date2.getDate() < 10) day = '0' + date2.getDate();
    else day = date2.getDate();

    var time2 = date2.getFullYear() + "-" + month + "-" + day;

    let today = dayjs(time2).format('dddd') == dayjs(date1).format('dddd') ? `今天 (${dayjs(time2).format('dddd').replace('星期', '周')})` : '';
    let tomorrow = dayjs(time2).format('dddd') == dayjs(date1.valueOf() + 86400000).format('dddd') ? `明天 (${dayjs(time2).format('dddd').replace('星期', '周')})` : '';
    return {
        str: `${(today || tomorrow) || dayjs(time2).format('MM月DD号') + ' (' + dayjs(time2).format('dddd').replace('星期', '周') + ')'}`,
        time: time2
    }
}

export {
    funDate,
};