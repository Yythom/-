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
    return time2;
}

export {
    funDate,
};