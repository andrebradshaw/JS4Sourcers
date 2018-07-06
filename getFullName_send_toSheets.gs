var ss = SpreadsheetApp.openById("1Vs834e8bhehL1reEOBUcb4lzwliGLBW-C_wwPzf0_-g");
var sheet1 = ss.getSheetByName("Sheet1");

function doGet(e) {
  var firstname = e.parameter.fn; //this is coming from the clientside scrape. The "fn" will be assigned as a JSONP object
  var lastname = e.parameter.ln;
  
  var lastrow = sheet1.getLastRow();

  sheet1.getRange((lastrow+1), 1).setValue(firstname);
  sheet1.getRange((lastrow+1), 2).setValue(lastname); 

}
