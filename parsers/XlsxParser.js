const xlsx = require('xlsx');

const log4js = require('log4js');
log4js.configure('config/log4js.config.json');
const logger = log4js.getLogger();

const AttendanceRecord = require('../domain/AttendanceRecord');

class XlsxParser {
    constructor(options) {
        this.options = options;
    }

    parse(filePath) {
        logger.debug('XLSXファイルを読み込みます。');

        const xlsxData = {
            results: []
        };

        const workbook = xlsx.readFile(filePath);
        const sheetName = this.options.xlsxSheet || workbook.SheetNames[0];
        const skipRows = this.options.xlsxSkipRows;

        const sheet = workbook.Sheets[sheetName];

        const range = xlsx.utils.decode_range(sheet['!ref']);
        logger.debug(sheet['!ref'], range);

        for (let row = range.s.r + skipRows, rowEnd = range.e.r; row <= rowEnd; ++row) {
            const rec = {};
            const col = range.s.c;

            rec.date = this._getCellValue(sheet, row, col);
            rec.start = this._getCellValue(sheet, row, col + 1);
            rec.end = this._getCellValue(sheet, row, col + 2);
            rec.break = this._getCellValue(sheet, row, col + 3);

            xlsxData.results.push(rec);
        }

        logger.debug(xlsxData);

        return this._normalize(xlsxData);
    }

    _normalize(xlsxData) {
        const data = {
            results: []
        };

        if (!xlsxData.results || !Array.isArray(xlsxData.results)) {
            return data;
        }

        for (const result of xlsxData.results) {
            if (!result.date || !result.start || !result.end || !result.break) {
                continue;
            }

            data.results.push(AttendanceRecord.parse(
                result.date.length <= 2 ? '2020-01-' + result.date : result.date,
                result.start,
                result.end,
                result.break
            ));
        }

        return data;
    }

    _getCellValue(sheet, row, col) {
        const cell = sheet[xlsx.utils.encode_cell({ r: row, c: col })];
        if (!cell) {
            return null;
        }
        return cell.w;
    }
}

module.exports = XlsxParser;
