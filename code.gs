function doGet() {
  var output = HtmlService.createHtmlOutput('<b>Hello, world!</b>');
  return HtmlService.createHtmlOutputFromFile("hello.html")
  
}

function userClicked(url) {
  ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheets();
  let rows = ws[0].getDataRange().getValues();
  return rows[0,0];
}