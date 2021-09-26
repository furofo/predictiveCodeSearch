// this function gets the current url of google app sheet, this changes sometimes so is used to navigate webpages 
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
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

//not sure about this yet
function notLinked() {
  return "Google sheet not linked please check format of google sheet url";
  
}

//meet and bones of program, loops through google sheets one by one and does different things depending on name of sheet ultimately returns an object of all sheets
function userClicked(url) {
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheets();
  let testObjArr = [];
   for (let i = 0; i < ws.length; i++)   {
      let rows = ws[i].getDataRange().getValues();
      if(ws[i].getName().toUpperCase() == "BUTTONSETUP") {

         let obj1 = {
              HEADING: "BUTTONSETUP",
          }
      Logger.log("this is rows length");
      Logger.log(rows.length);
      for(let i = 0; i < rows.length && i < 4; i++) {
        if(i == 1) {
             obj1["KONAMI"] =  {
                                TEXT: rows[1][0].toUpperCase(),
                                VALUE: rows[1][1],
                                }
                    }
        
        if(i == 2) {
              obj1["FIXIT"] =  {
                                TEXT: rows[2][0].toUpperCase(),
                                VALUE: rows[2][1],
                                }

                  }
        if(i == 3) {
              obj1["BREAKIT"] =  {
                                  TEXT: rows[3][0].toUpperCase(),
                                  VALUE: rows[3][1],
                                 }

            }
       
      }
      Logger.log(obj1);
      testObjArr.push(obj1);

      }
      else {
            let obj = { 
          CODES: { 
            
          }, 
        }
      
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
  }
      
  return testObjArr;
}