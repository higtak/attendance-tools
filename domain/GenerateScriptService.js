const log4js = require('log4js');
log4js.configure('config/log4js.config.json');
const logger = log4js.getLogger();

class GenerateScriptService {
    generate(data) {
        let script = '';
        for (const result of data.results) {
            script += this._generateDay(result);
        }

        return script;
    }

    _generateDay(record) {
        const dayIndex = record.date.date() - 1;
        const orderIndex = 0;
        const start = this._minutesToTime(record.start);
        const end = this._minutesToTime(record.end - record.breakTime + 105); // TODO: 標準休憩時間を細かく設定

        let script = '';
        // 開始時間のスクリプト
        script += `const start${dayIndex}${orderIndex} = document.getElementById('dailyList[${dayIndex}].orderList[${orderIndex}].resultEnterTime');\n`;
        script += `start${dayIndex}${orderIndex}.parentElement.style.color = 'transparent';\n`;
        script += `start${dayIndex}${orderIndex}.setAttribute('type', 'text'); start${dayIndex}${orderIndex}.style.backgroundColor = 'yellow';\n`;
        script += `start${dayIndex}${orderIndex}.value = '${start}';\n`;

        script += `const end${dayIndex}${orderIndex} = document.getElementById('dailyList[${dayIndex}].orderList[${orderIndex}].resultLeavingTime');\n`;
        script += `end${dayIndex}${orderIndex}.parentElement.style.color = 'transparent';\n`;
        script += `end${dayIndex}${orderIndex}.setAttribute('type', 'text'); end${dayIndex}${orderIndex}.style.backgroundColor = 'yellow';\n`;
        script += `end${dayIndex}${orderIndex}.value = '${end}';\n`;

        return script;
    }

    _minutesToTime(value) {
        const hour = Math.floor(value / 60);
        const minutes = value % 60;
        return ('00' + hour).slice(-2) + ('00' + minutes).slice(-2);
    }
}

module.exports = GenerateScriptService;
