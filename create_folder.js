// リストからGoogleDriveにフォルダを自動生成する
function createFolders() {
  // sheet
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // folder
  let folderUrl = sheet.getRange('A2').getValue();
  let ary = folderUrl.split('/');
  let folderId = ary[ary.length - 1];
  let lastRow = sheet.getLastRow();
  let folder = DriveApp.getFolderById(folderId);

  // create folders
  try {
    let fileRange = sheet.getRange(4, 1, lastRow - 3).getValues();
    Logger.log(fileRange);
    for (let i = 0; i <= ary.length; i++) {
      if (fileRange[i][0] !== "") {
        folder.createFolder(fileRange[i][0])
        Logger.log(fileRange[i]);
      }
    }
    let msg = "フォルダを作成しました"
    Browser.msgBox(msg);
  } catch(e) {
    let msg = "フォルダ名をシートに入力してください"
    Browser.msgBox(msg);
  }
}
