function doGet() {
  var output = HtmlService.createHtmlOutput('<b>Hello, world!</b>');
  return HtmlService.createHtmlOutputFromFile("hello.html")
  
}
function userClicked(testObjArr) {
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1dB2bD7SlqiocqnxrPCxbrF0hyK40Yu-_hVwQ-S6yeEc/edit#gid=0");
  var ws = ss.getSheets();

  for (let i = 0; i < ws.length; i++)   {
      let obj = { 
          CODES: { 
            
          }, 
        }
      let rows = ws[i].getDataRange().getValues();
      if (rows[1][3]) {
        obj['HEADING'] = " (" + rows[1][3] + ")";
      }
      else {
        obj["HEADING"] = " ("  + ws[i].getName() + ")";
        
      }
      for (let j = 1; j < rows.length; j++) {
       if(rows[j][2]) {
         obj['CODES']['ISCLICKABLE'] = rows[j][2];
       }
       obj['CODES'][rows[j][0].toUpperCase()] = rows[j][1];
      }
      testObjArr.push(obj);
  }
  return testObjArr;
}