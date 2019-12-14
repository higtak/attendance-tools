const fs = require('fs');
const YamlParser = require('./parsers/YamlPerser');
const clipboardy = require('clipboardy');

const log4js = require('log4js');
log4js.configure('config/log4js.config.json');
const logger = log4js.getLogger();

const GenerateScriptService = require('./domain/GenerateScriptService');

class Main {
    async main() {
        logger.debug('START');

        if (process.argv.length === 2) {
            logger.error('引数ファイルパスを指定してください。');
            process.exitCode = 1;
            return;
        }

        const filePath = process.argv[2];

        const data = new YamlParser().parse(filePath);
        const script = new GenerateScriptService().generate(data);
        logger.info('勤怠入力用のスクリプトを生成しました。');
        logger.info('\n' + script);

        const outputPath = './data/output_script.js';
        try {
            fs.writeFileSync(outputPath, script);
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
