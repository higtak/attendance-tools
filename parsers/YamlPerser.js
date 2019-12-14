const fs = require('fs');
const yaml = require('js-yaml');

const log4js = require('log4js');
log4js.configure('config/log4js.config.json');
const logger = log4js.getLogger();

const AttendanceRecord = require('../domain/AttendanceRecord');

class YamlPerser {
    parse(filePath) {
        logger.debug('YAMLファイルを読み込みます。');
        const content = fs.readFileSync(filePath, 'utf-8');
        const yamlData = yaml.safeLoad(content, {
            schema: yaml.FAILSAFE_SCHEMA
        });
        logger.debug(yamlData);
        return this._normalize(yamlData);
    }

    _normalize(yamlData) {
        const data = {
            results: []
        };

        if (yamlData.results && Array.isArray(yamlData.results)) {
            for (const result of yamlData.results) {
                const rec = this._normalizeResult(result);
                if (rec !== null) {
                    data.results.push(rec);
                }
            }
        }

        return data;
    }

    _normalizeResult(result) {
        if (!result.date) {
            return null;
        }

        return new AttendanceRecord(result.date, result.start, result.end, result.break);
    }
}

module.exports = YamlPerser;