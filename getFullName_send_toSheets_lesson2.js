function group(e, n){
	if(e != null){
		return e[n].toString();
	}else{
		return ''; //an empty string
	}
}

var fullname = document.getElementsByClassName("pv-top-card-section__name")[0].innerText;

var cleanFullName = fullname.replace(/\W*\b[A-Z]{2,5}\b.+?$|,.+$/g, ''); 

var firstName = 'fn=' + group(/^(\S+)/.exec(cleanFullName), 1);
var lastName = '&ln=' + group(/\s(\S+)$/.exec(cleanFullName), 1);


var workItemsContainer = document.getElementsByClassName("pv-profile-section__section-info section-info pv-profile-section__section-info--has-more")[0].getElementsByTagName("li");

var jobTitle = '&title=' + workItemsContainer[0].getElementsByTagName("h3")[0].innerText;

var jobCompany = '&co=' + workItemsContainer[0].getElementsByTagName("h4")[0].getElementsByTagName("span")[1].innerText;
//we start counts with 0, so the second span item will be 1

var jobTime = '&time=' + workItemsContainer[0].getElementsByClassName("pv-entity__date-range")[0].getElementsByTagName("span")[1].innerText;

var webappUrl = 'https://script.google.com/macros/s/AKfycbxlMM7ywyandPooTvP723CneZlrKDbpLcuvsI2YYbhQDasG/exec';

var output = webappUrl+'?'+firstName+lastName+jobTitle+jobCompany+jobTime;

window.open(output)
