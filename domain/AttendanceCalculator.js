const DateTimeUtils = require('../utils/DateTimeUtils');
const AttendanceRecord = require('./AttendanceRecord');

const LUNCH_BREAK_START = DateTimeUtils.timeToMinutes('12:00');
const LUNCH_BREAK_TIME = DateTimeUtils.timeToMinutes('1:00');
const EVENING_BREAK_START = DateTimeUtils.timeToMinutes('17:30');
const EVENING_BREAK_TIME = DateTimeUtils.timeToMinutes('0:45');
const NIGHT_BREAK_START = DateTimeUtils.timeToMinutes('21:30');
const NIGHT_BREAK_TIME = DateTimeUtils.timeToMinutes('0:30');

class AttendanceCalculator {
    calculate(record) {
        // 勤務時間
        const workingTime = record.end - record.start  - record.breakTime;
        // 開始時間
        const startTime = record.start;
        // 終了時間
        let endTime = record.start + workingTime;
        // 休憩時間
        let breakTime = 0;

        if (startTime <= LUNCH_BREAK_START && LUNCH_BREAK_START < endTime) {
            // 12:00を跨いでいる場合、昼休憩時間を加算する
            // startTime=09:00, endTime=16:30, workingTime=7:30
            // -> endTime=17:30
            breakTime += LUNCH_BREAK_TIME;
            endTime += LUNCH_BREAK_TIME;
        }
        if (startTime <= EVENING_BREAK_START && EVENING_BREAK_START < endTime) {
            // 17:30を跨いでいる場合、夕方休憩時間を加算する
            // startTime=09:00, endTime=18:00, workingTime=8:00, LUNCH_BREAK_TIME=1:00
            // -> endTime=18:45
            breakTime += EVENING_BREAK_TIME;
            endTime += EVENING_BREAK_TIME;
        }
        if (startTime <= NIGHT_BREAK_START && NIGHT_BREAK_START < endTime) {
            // 21:30を跨いでいる場合、夜休憩時間を加算する
            // startTime=09:00, endTime=21:45, workingTime=11:00, LUNCH_BREAK_TIME=1:00, EVENING_BREAK_TIME=0:45
            // -> endTime=22:15
            breakTime += NIGHT_BREAK_TIME;
            endTime += NIGHT_BREAK_TIME;
        }

        return new AttendanceRecord(record.date, startTime, endTime, breakTime);
    }
}

module.exports = AttendanceCalculator;
