// GoogleDriveに保管されているファイルを、スプレッドシートに書き込む
function createFileList() {
  // sheet
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let sheetId = SpreadsheetApp.getActiveSpreadsheet().getId();
  let sheetName = sheet.getName();

  // folder
  let folderUrl = sheet.getRange('A2').getValue();
  let ary = folderUrl.split('/');
  let folderId = ary[ary.length - 1];
  let folder = DriveApp.getFolderById(folderId);

  appendLog(['種類', '名前', 'URL', '最終更新日時'], sheetId, sheetName);

  // get folders
  function getAllFolders(f) {
    let folders = f.getFolders();
    while (folders.hasNext()) {
      let subFolder = folders.next();
      let lastUpdatedDate = Utilities.formatDate(subFolder.getLastUpdated(), 'JST', 'yyyy年MM月dd日 HH:mm:ss');
      appendLog(['フォルダ', subFolder.getName(), subFolder.getUrl(), lastUpdatedDate], sheetId, sheetName);

      // get subfolder & flies
      try {
        getAllFiles(subFolder);
        getAllFolders(subFolder);
      } catch (e) {
        let msg = 'エラーが発生しました'
        Browser.msgBox(msg);
      }
    }
  }

  // get files
  function getAllFiles(f) {
    let files = f.getFiles();
    while (files.hasNext()) {
      let file = files.next();
      let lastUpdatedDate = Utilities.formatDate(file.getLastUpdated(), 'JST', 'yyyy年MM月dd日 HH:mm:ss');
      appendLog(['└ ファイル', file.getName(), file.getUrl(), lastUpdatedDate], sheetId, sheetName)
    }
  }

  try {
    getAllFiles(folder);
    getAllFolders(folder);
    let msg = 'ファイルを自動取得しました'
    Browser.msgBox(msg);
  } catch (e) {
    let msg = 'エラーが発生しました'
    Browser.msgBox(msg);
  }

}

// add row
function appendLog(log, id, name) {
  if (name === void 0) { name = sheetName; }
  let spreadSheet = SpreadsheetApp.openById(id);
  spreadSheet.getSheetByName(name).appendRow([log[0], log[1], log[2], log[3]]);
}
