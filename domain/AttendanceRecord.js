const moment = require('moment');

class AttendanceRecord {
    constructor(date, start, end, breakTime) {
        this.setDate(date);
        this.setStart(start);
        this.setEnd(end);
        this.setBreakTime(breakTime);
    }

    setDate(date) {
        this.date = moment(date, ['YYYY-MM-DD', 'YYYY/MM/DD'])
    }

    setStart(start) {
        this.start = this._parseMinutes(start);
    }

    setEnd(end) {
        this.end = this._parseMinutes(end);
    }

    setBreakTime(breakTime) {
        this.breakTime = this._parseMinutes(breakTime);
    }

    _parseMinutes(str) {
        const splitted = str.split(':');
        let minutes = parseInt(splitted[0], 10) * 60;
        minutes += parseInt(splitted[1], 10);
        return minutes;
    }
}

module.exports = AttendanceRecord;