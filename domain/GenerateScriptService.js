const log4js = require('log4js');
log4js.configure('config/log4js.config.json');
const logger = log4js.getLogger();

const DateTimeUtils = require('../utils/DateTimeUtils');
const AttendanceCalculator = require('./AttendanceCalculator');

class GenerateScriptService {
    constructor() {
        this.calculator = new AttendanceCalculator();
    }

    generate(data) {
        let script = '';
        for (const result of data.results) {
            script += this._generateDay(result);
        }

        return script;
    }

    _generateDay(inputResult) {
        const result = this.calculator.calculate(inputResult);
        if (logger.isDebugEnabled()) {
            logger.debug(result.toString());
        }

        const dayIndex = inputResult.date.date() - 1;
        const orderIndex = 0;
        const start = DateTimeUtils.minutesToTime(result.start);
        const end = DateTimeUtils.minutesToTime(result.end);

        let script = '';
        // 開始時間のスクリプト
        const startId = `dailyList[${dayIndex}].orderList[${orderIndex}].resultEnterTime`;
        const startVar = `start${dayIndex}${orderIndex}`;
        script += `const ${startVar} = document.getElementById('${startId}');\n`;
        script += `${startVar}.parentElement.style.color = 'transparent';\n`;
        script += `${startVar}.setAttribute('type', 'text'); ${startVar}.style.backgroundColor = 'yellow';\n`;
        script += `${startVar}.value = '${start}';\n`;
        // 終了時間のスクリプト
        const endId = `dailyList[${dayIndex}].orderList[${orderIndex}].resultLeavingTime`;
        const endVar = `end${dayIndex}${orderIndex}`;
        script += `const ${endVar} = document.getElementById('${endId}');\n`;
        script += `${endVar}.parentElement.style.color = 'transparent';\n`;
        script += `${endVar}.setAttribute('type', 'text'); ${endVar}.style.backgroundColor = 'yellow';\n`;
        script += `${endVar}.value = '${end}';\n`;

        return script;
    }
}

module.exports = GenerateScriptService;
