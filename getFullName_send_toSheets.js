function group(e, n){
	if(e != null){
		return e[n].toString();
	}else{
		return ''; 
	}

}

var fullname = document.getElementsByClassName("pv-top-card-section__name")[0].innerText; 

var cleanFullName = fullname.replace(/\W*\b[A-Z]{2,5}\b.+?$|,.+$/g, ''); //replaces the matched string with nothing.

var firstName = 'fn=' + group(/^(\S+)/.exec(cleanFullName), 1);
var lastName = '&ln=' + group(/\s(\S+)$/.exec(cleanFullName), 1);

var webappUrl = 'https://script.google.com/macros/s/AKfed2xlMM7DemT5FXhmQGfbTvP723CneZlrKDbpLcu33I2YsbhQDasG/exec';//your webapp link goes here

var output = webappUrl+'?'+firstName+lastName;

window.open(output);
