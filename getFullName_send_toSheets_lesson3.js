
function group(e, n){
	if(e != null){
		return e[n].toString();
	}else{
		return ''; //an empty string
	}
}

function elmHasData(elm, n){
	if(elm.length > 0){
		return elm[n].innerText;
	}else{
		return '';
	}

}

function skillSudoArr(){
var skillscontainer = document.getElementsByClassName("pv-profile-section pv-skill-categories-section")[0].getElementsByTagName("ol");

var skillsElements = skillscontainer[0].getElementsByClassName("pv-skill-category-entity__name pv-skill-category-entity__name--has-action");

var skillArr = [];

for(s=0; s<skillsElements.length; s++){ //s++ is the same as s = s+1
	var skillItem= skillsElements[s].innerText; //the [s] is a number. it changes by +1 for eachiteration .	
	skillArr.push(skillItem);

}

var sudoSkillArr = '["'+skillArr.toString().replace(/\b,\b/g, '","')+'"]';

return '&sklz='+sudoSkillArr;
}


var urlhref = window.location.href;
var urlPath = '&path='+group(/\/in\/(.+?)\/$/.exec(urlhref), 1);

var fullname = document.getElementsByClassName("pv-top-card-section__name")[0].innerText;

var cleanFullName = fullname.replace(/\W*\b[A-Z]{2,5}\b.+?$|,.+$/g, ''); 

var firstName = 'fn=' + group(/^(\S+)/.exec(cleanFullName), 1);
var lastName = '&ln=' + group(/\s(\S+)$/.exec(cleanFullName), 1);


var workItemsContainer = document.getElementsByClassName("pv-profile-section__section-info section-info pv-profile-section__section-info--has-more")[0].getElementsByTagName("li");

var jobTitle = '&title=' + workItemsContainer[0].getElementsByTagName("h3")[0].innerText;

var jobCompany = '&co=' + workItemsContainer[0].getElementsByTagName("h4")[0].getElementsByTagName("span")[1].innerText;

var jobTime = workItemsContainer[0].getElementsByClassName("pv-entity__date-range")[0].getElementsByTagName("span")[1].innerText;

var startDate = '&stime=' + group(/^(.+?\d+)/.exec(jobTime), 1);
var endDate = '&etime=' + group(/–\s*(.+?)$/.exec(jobTime), 1);


var webappUrl = 'https://script.google.com/macros/s/AKfycbxDerpI4349XTMQG8BTvP723CneZlrKDbpLcuvsI2YYbhQDasG/exec';

var output = webappUrl+'?'+firstName+lastName+jobTitle+jobCompany+jobTime+startDate+endDate+skillSudoArr()+urlPath;

console.log(output);

//window.open(output)

