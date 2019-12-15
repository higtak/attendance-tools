class DateTimeUtils {
    static timeToMinutes(time) {
        const splitted = time.split(':');
        let minutes = parseInt(splitted[0], 10) * 60;
        minutes += parseInt(splitted[1], 10);
        return minutes;
    }

    static minutesToTime(minutes) {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return ('00' + h).slice(-2) + ('00' + m).slice(-2);
    }
}

module.exports = DateTimeUtils;
