// スプレッドシートの初期化
function deleteAllSheets() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet();
  let allSheet = sheet.getSheets();
  sheet.insertSheet();
  for (let i = 0; i < allSheet.length; i++) {
    sheet.deleteSheet(allSheet[i]);
  }
}
