function getScriptUrl() {
 var url = ScriptApp.getService().getUrl();
 return url;
}
// this function is used so can seapare javascript and css and include it in other files without having to reuse
function include(File) {
  return HtmlService.createHtmlOutputFromFile(File).getContent();
};

function doGet(e) {
  Logger.log( Utilities.jsonStringify(e) );
  if (!e.parameter.page) {
    // When no specific page requested, return "home page"
    return HtmlService.createTemplateFromFile('index').evaluate();
  }
  // else, use page parameter to pick an html file from the script
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate();
}
function userClicked(url) {
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheets();
  let testObjArr = [];
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
      
       obj['CODES'][rows[j][0].toUpperCase()] = 
              {
                DEF: rows[j][1],
              
              }
        if(rows[j][2]) {
         obj['CODES'][rows[j][0].toUpperCase()]["ISCLICKABLE"] = rows[j][2];
       }
      }
      testObjArr.push(obj);
  }
  return testObjArr;
}