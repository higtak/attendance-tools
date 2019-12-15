const moment = require('moment');
const DateTimeUtils = require('../utils/DateTimeUtils');

class AttendanceRecord {
    constructor(date, start, end, breakTime) {
        this.date = date;
        this.start = start;
        this.end = end;
        this.breakTime = breakTime;
    }

    toString() {
        return {
            date: this.date.format('YYYY-MM-DD'),
            start: DateTimeUtils.minutesToTime(this.start),
            end: DateTimeUtils.minutesToTime(this.end),
            breakTime: DateTimeUtils.minutesToTime(this.breakTime),
            workingTime: DateTimeUtils.minutesToTime(this.end - this.start - this.breakTime)
        };
    }

    static parse(date, start, end, breakTime) {
        const d = this._parseDate(date);
        const s = this._parseStart(start);
        const e = this._parseEnd(end);
        const br = this._parseBreakTime(breakTime);
        return new this(d, s, e, br);
    }

    static _parseDate(date) {
        return moment(date, ['YYYY-MM-DD', 'YYYY/MM/DD'])
    }

    static _parseStart(start) {
        return DateTimeUtils.timeToMinutes(start);
    }

    static _parseEnd(end) {
        return DateTimeUtils.timeToMinutes(end);
    }

    static _parseBreakTime(breakTime) {
        return DateTimeUtils.timeToMinutes(breakTime);
    }
}

module.exports = AttendanceRecord;