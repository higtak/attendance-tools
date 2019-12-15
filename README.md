# attendance-tool

## 環境構築

1. node.jsをインストールする。  
  https://nodejs.org/ja/
2. プロジェクトのルートで以下のコマンドを実行する。  
  `npm install`
  
### Docker

```shell script
docker-compose up -d
docker-compose exec node bash

npm install
exit
```

## 使い方

### 1. 勤怠実績ファイルを配置する

勤怠実績ファイルを`data/`に配置する。
ファイルフォーマットは`data/sample.xlsx`、または`data/sample.yml`を参考にしてください。

### 2. コマンドを実行する

```shell script
npm run start -- -f [勤怠実績ファイルパス]
```

その他のオプション等は以下のコマンドで確認してください。
```shell script
npm run start -- --help
```

#### Dockerのnode.jsを使う場合

```shell script
docker-compose exec node bash
npm run start -- -f ./data/sample.xlsx
```

または

```shell script
docker-compose exec node npm run start -- -f ./data/sample.xlsx
```

### 3. 実行結果

勤怠実績ファイルのデータから勤怠入力スクリプト(JavaScript)を生成します。  
勤怠入力スクリプトは以下に出力されます。
* コンソール
* `data/output/attendance_input.js` (出力先は-oオプションで指定可能)
* クリップボード (Dockerからの実行時はクリップボードは利用できません)

### 4. スクリプト実行

1. 勤怠管理画面を表示する。
2. F12からデベロッパーツールを表示する。
3. デベロッパーツールのコンソールに勤怠入力スクリプトを貼り付けて実行する。
4. 実績の開始時間、終了時間が自動的に入力されます(自動入力した部分は背景が黄色になります)。

## ライセンス

MIT
https://github.com/higtak/attendance-tools/blob/master/LICENSE
