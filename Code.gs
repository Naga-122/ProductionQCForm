const SHEET_NAME = 'ProductionData';

function doGet(e) {
  const serial = e.parameter.serial;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  let headers = data[0];
  let row = data.find((r, idx) => idx !== 0 && r[0] === serial);

  if (row) {
    let result = {};
    headers.forEach((h, i) => result[h] = row[i]);
    return ContentService.createTextOutput(JSON.stringify({ found: true, data: result }))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ found: false }))
                       .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const values = JSON.parse(e.postData.contents);
  const data = sheet.getDataRange().getValues();

  const serial = values["Serial Number"];
  let headers = data[0];
  let rowIndex = data.findIndex((r, i) => i !== 0 && r[0] === serial);

  let rowData = headers.map(h => values[h] || "");

  if (rowIndex === -1) {
    sheet.appendRow(rowData); // New row
  } else {
    sheet.getRange(rowIndex + 1, 1, 1, headers.length).setValues([rowData]); // Update row
  }

  return ContentService.createTextOutput(JSON.stringify({ success: true }))
                       .setMimeType(ContentService.MimeType.JSON);
}
