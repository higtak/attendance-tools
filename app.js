const fs = require('fs');
const moment = require('moment');
const clipboardy = require('clipboardy');
const YamlParser = require('./parsers/YamlPerser');
const XlsxParser = require('./parsers/XlsxParser');

const log4js = require('log4js');
log4js.configure('config/log4js.config.json');
const logger = log4js.getLogger();

const GenerateScriptService = require('./domain/GenerateScriptService');

class Main {
    async main() {
        logger.debug('START');

        const argv = require('yargs')
            .usage('Usage: $0 -f filePath [-o filePath]')
            .describe('f', '入力ファイルパス')
            .alias('f', 'file')
            .demandOption('f')
            .describe('o', '出力ファイルパス')
            .alias('o', 'output-path')
            .default('o', './data/output/attendance_input.js')
            .describe('xlsx-sheet', '')
            .describe('xlsx-skip-rows', '')
            .default('xlsx-skip-rows', 1)
            .argv;

        const filePath = argv.f;
        const outputPath = argv.o;

        let parser;
        if (filePath.endsWith('.xlsx')) {
            parser = new XlsxParser(argv);
        } else {
            parser = new YamlParser();
        }

        const data = parser.parse(filePath);
        const script = new GenerateScriptService().generate(data);
        logger.info('勤怠入力用のスクリプトを生成しました。');
        logger.info('\n' + script);

        try {
            const dateTime = moment().format('YYYY/MM/DD HH:mm:ss');
            fs.writeFileSync(outputPath, `/* generated at ${dateTime} */\n` + script);
            logger.info('スクリプトファイルへ出力しました。', outputPath);
        } catch (err) {
            logger.warn('スクリプトファイルへの出力に失敗しました。', outputPath);
        }

        try {
            await clipboardy.write(script);
            logger.info('スクリプトをクリップボードにコピーしました。');
        } catch (err) {
            logger.warn('スクリプトのクリップボードへのコピーに失敗しました。');
        }

        logger.debug('END');
    }
}

const app = new Main();
app.main()
    .catch(function (err) {
        logger.error(err);
        process.exit(1);
    });
