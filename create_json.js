// スプレッドシートから値を取得し、JSONフォーマットでダウンロードする
function convertToJson() {
  let dialog_html = HtmlService.createTemplateFromFile('dialog').evaluate();

  SpreadsheetApp.getUi().showModalDialog(dialog_html, 'JSONファイルをダウンロード');
}

// getData
function getData() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let maxRow = sheet.getLastRow();
  let maxColumn = sheet.getLastColumn();

  let keys = [];
  let data = [];

  for (let x = 1; x <= maxColumn; x++) {
    keys.push(sheet.getRange(1, x).getValue());
  }

  for (let y = 2; y <= maxRow; y++) {
    let json = {};
    for (let x = 1; x <= maxColumn; x++) {
      json[keys[x-1]] = sheet.getRange(y, x).getValue();
    }

    data.push(json);
  }

  return JSON.stringify(data, null, '\t');
}

// add menu
// function onOpen() {
//   let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // let entries = [{
    // name : 'JSONで出力',
    // functionName : 'convertToJson'
  // }];
  // spreadsheet.addMenu('JSON', entries);
// };

