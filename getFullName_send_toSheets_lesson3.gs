var ss = SpreadsheetApp.openById("1Vs834e8bhatJS35jOBUcb4lzwliGLBW-C_wwPzf0_-g");
var sheet1 = ss.getSheetByName("Sheet1");

function doGet(e) {
  var firstname = e.parameter.fn; //this is coming from the clientside scrape. The "fn" will be assigned as a JSONP object
  var lastname = e.parameter.ln;
  var title = e.parameter.title;
  var company = e.parameter.co;
  var startTime = e.parameter.stime;
  var endTime = e.parameter.etime;
  var skills = e.parameter.sklz;
  var path = e.parameter.path;
  
  var lastrow = sheet1.getLastRow();

  sheet1.getRange((lastrow+1), 1).setValue(firstname);
  sheet1.getRange((lastrow+1), 2).setValue(lastname); 
  sheet1.getRange((lastrow+1), 3).setValue(title); 
  sheet1.getRange((lastrow+1), 4).setValue(company); 
  sheet1.getRange((lastrow+1), 5).setValue(startTime); 
  sheet1.getRange((lastrow+1), 6).setValue(endTime); 
  sheet1.getRange((lastrow+1), 7).setValue(skills); 
  sheet1.getRange((lastrow+1), 8).setValue(path); 

 return ContentService.createTextOutput(firstname+' '+lastname+' was sent to your sheet: '+title+' '+company+' '+startTime+' '+endTime+' '+skills+' '+path);//this will return some text so you know what was sent to your sheet
}
