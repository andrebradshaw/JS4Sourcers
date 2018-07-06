var ss = SpreadsheetApp.openById("1Vs834e8b29rjw7hgFUcb4lzwliGLBW-C_wwPzf0_eg");
var sheet1 = ss.getSheetByName("Sheet1");
function group(e, n){
	if(e != null){
		return e[n].toString();
	}else{
		return ''; //an empty string
	}
}

function doGet(e) {
  var firstname = e.parameter.fn; //this is coming from the clientside scrape. The "fn" will be assigned as a JSONP object
  var lastname = e.parameter.ln;
  var title = e.parameter.title;
  var company = e.parameter.co;
  var time = e.parameter.time;

var startDate = group(/^(.+?\d+)/.exec(time), 1);
var endDate = group(/–\s*(.+?)$/.exec(time), 1);
  
  var lastrow = sheet1.getLastRow();

  sheet1.getRange((lastrow+1), 1).setValue(firstname);
  sheet1.getRange((lastrow+1), 2).setValue(lastname); 
  sheet1.getRange((lastrow+1), 3).setValue(title); 
  sheet1.getRange((lastrow+1), 4).setValue(company); 
  sheet1.getRange((lastrow+1), 5).setValue(startDate); 
  sheet1.getRange((lastrow+1), 6).setValue(endDate); 

 return ContentService.createTextOutput(firstname+' '+lastname+' was sent to your sheet: '+title+' '+company+' '+time);//this will return some text so you know what was sent to your sheet
}
