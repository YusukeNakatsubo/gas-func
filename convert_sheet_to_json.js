function doGet(e) {
  // sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // get title row
  const lastColumn = sheet.getLastColumn();
  const firstRange = sheet.getRange(1, 1, 1, lastColumn);
  const firstRowValues = firstRange.getValues();
  const titleColumns = firstRowValues[0];

  // date
  const date = new Date();
  const today = date.toLocaleDateString('ja');

  const dateset = sheet.getRange('A2:A').getValues();
  // 一次元配列に変換
  const datesetList = dateset.reduce((result, current) => {
    result.push(...current);
    return result
  }, []);

  // index for文の書き方が汚い
  let index = [];
  for (let i = 0; i < datesetList.length; i++) {
    let judgeDate = datesetList[i].toLocaleString('ja');
    if (judgeDate.includes(today)) {
      index.push(i);
    }
  }

  // data for文の書き方が汚い
  let dataset = [];
  for (let i = 0; i < index.length; i++) {
    let range = sheet.getRange(index[i], 2, 1, lastColumn);
    let value = range.getValues();
    dataset.push(value[0]);
  }

  // json for文の書き方が汚い
  let jsonAry = [];
  for(var i = 0; i < dataset.length; i++) {
    let line = dataset[i];
    let json = new Object();
    for(let j = 1; j <= titleColumns.length; j++) {
      json[titleColumns[j]] = line[j];
    }
    jsonAry.push(json);
  }
  // Logger.log(jsonAry);

  //create json
  let json = jsonAry;
  let params =  ContentService.createTextOutput(JSON.stringify(json))
    .setMimeType(ContentService.MimeType.JSON);
  // Logger.log(params);
  return params

}
