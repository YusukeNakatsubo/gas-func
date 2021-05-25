function getGoogleAnalyticsData() {
  // トラッキングIDを入力
  let viewId = 'ga:' + 'xxxxxxxxxxxxxxxxxxxx';

  // sheet
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let settingSheet = spreadsheet.getSheetByName('setting');
  let resultSheet = spreadsheet.getSheetByName('result');

  // get date
  // settingシートのA2セルに開始日／B2セルに終了日
  let startDate = settingSheet.getRange('A2').getValue();
  let start = Utilities.formatDate(startDate, 'Asia/Tokyo', 'yyyy-MM-dd');
  let endDate = settingSheet.getRange('B2').getValue();
  let end = Utilities.formatDate(endDate, 'Asia/Tokyo', 'yyyy-MM-dd');

  // get response
  let response = AnalyticsReporting.Reports.batchGet({
    reportRequests: [{
      viewId: viewId,
      dateRanges: [{
        startDate: start,
        endDate: end
      }],
      metrics: [{ expression: 'ga:uniqueEvents' }],
      dimensions: [
        { 'name': 'ga:eventCategory' },
        { 'name': 'ga:eventAction' },
        { 'name': 'ga:eventLabel' }
      ],
      orderBys: [{
        fieldName: 'ga:uniqueEvents',
        sortOrder: 'DESCENDING'
      }],
      // イベントカテゴリをフィルタリング
      filtersExpression: 'ga:eventCategory==xxxxxxxxxxxxxxxxxxxx',
      samplingLevel: 'LARGE',
      pageSize: '100000'
    }]
  });

  // touch data
  let json = JSON.parse(response)
  let data = json.reports[0].data
  // Logger.log(data);

  let dataset = [];
  let r = 2;
  data.rows.forEach((row) => {
    let url = row.dimensions[2].replace(/\&.*$/g, '');
    let value = row.metrics[0].values[0];

    if(r > 2) {
      var prevRow = dataset[dataset.length-1];
      var regUrl = url.replace(/\?.*$/g, '');
      var prevUrl = prevRow[0];
      if(prevUrl === regUrl) {
        r--;
        prevRow[1] = Number(prevRow[1]) + Number(value);
      } else {
        dataset.push([url, value]);
      }
    } else {
      dataset.push([url, value]);
    }
    r++;
  })

  // result
  resultSheet.getRange(2, 1, dataset.length, 2).setValues(dataset);
}
