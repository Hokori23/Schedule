import Vue from "vue";

const formatTimeStamp = timeStamp => {
    let time = null;
    // timeStamp = timeStamp || null;
    if (timeStamp) {
        time = new Date(Number(timeStamp));
    } else {
        time = new Date();
    }
    const arrCN = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
    ];
    const arrEN = ["Sun", "Mon", "Feb", "Wed", "Thu", "Fri", "Sat"];
    let date = time.getDay();
    let lang = localStorage.getItem("language");
    let dateFormatted = "";
    if (lang === "zh-hans") {
        dateFormatted = arrCN[date];
    } else if (lang === "en-us") {
        dateFormatted = arrEN[date];
    }
    let tempMonth = time.getMonth() + 1;
    let tempDate = time.getDate();
    if (tempMonth < 10) {
        tempMonth = "0" + tempMonth;
    }
    if (tempDate < 10) {
        tempDate = "0" + tempDate;
    }

    return {
        year: time.getFullYear(),
        month: tempMonth,
        date: tempDate,
        day: dateFormatted,
        hour: time.getHours(),
        minute: time.getMinutes(),
        toString: function() {
            return `${this.year}/${this.month}/${this.date} ${this.hour}:${this.minute}`;
        },
        format1: function() {
            return `${this.year}/${this.month}/${this.date}`;
        }
    };
};

const timeStampFloor = timeStamp => {
    let time = null;
    // timeStamp = timeStamp || null;
    if (timeStamp) {
        time = new Date(timeStamp);
    } else {
        time = new Date();
    }
    let floorTime = new Date(time.getFullYear(), time.getMonth(), time.getDate());
    return floorTime.getTime();
};
const day = 1000 * 60 * 60 * 24;
Vue.prototype.$formatTimeStamp = formatTimeStamp;
Vue.prototype.$timeStampFloor = timeStampFloor;
Vue.prototype.$day = day;