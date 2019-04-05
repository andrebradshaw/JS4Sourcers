/*
Walk through video: https://youtu.be/Cckbxb15Idc
*/

var reg = (el, n) => el ? el[n] : '';
var cn = (ob, nm) => ob.getElementsByClassName(nm);
var tn = (ob, nm) => ob.getElementsByTagName(nm);
var gi = (ob, nm) => ob.getElementById(nm);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var rando = (n) => Math.round(Math.random() + n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);

var currentPage = window.location.href;

function getNextPageUrl(doc){
  var pageNate = Array.from(tn(cn(doc, 'paginate-container')[0],'a')).filter(a => a.innerText === 'Next');
  var link = pageNate[0] ? pageNate[0].href : null;
  return link;
}

async function getDoc(url){
  var res = await fetch(url);
  var text = await res.text();
  return new DOMParser().parseFromString(text, 'text/html');
}

async function getNumOfStarGazers(url){
  var doc = await getDoc(url);
  var repositoryCont = cn(doc, 'repository-content')[0];
  var numGazers = cn(repositoryCont,'Counter')[0] ? parseInt(cn(repositoryCont,'Counter')[0].innerText.replace(/\D+/g, '')) : 0;
  return numGazers;
}

async function getHoverCard(id,geoSearch){
  var res = await fetch("https://github.com/hovercards?user_id="+id, {"credentials":"include","headers":{"accept":"*/*","accept-language":"en-US,en;q=0.9","x-requested-with":"XMLHttpRequest"},"referrer":"https://github.com/","referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"});
  var text = await res.text();
  return geoSearch.test(text);
}

async function checkStarGazers(ids,geoSearch){
  var filtered = [];
  for(var i=0; i<ids.length; i++){
    var isMatch = await getHoverCard(ids[i][0],geoSearch);
    if(isMatch) filtered.push(ids[i][1]);
  }
  return filtered; 
}

async function getStarGazers(url,geoSearch){
  var doc = await getDoc(url);
  var repositoryCont = cn(doc, 'repository-content')[0];
  var followers = Array.from(cn(repositoryCont, 'follow-list-item')).map(itm => {
      var atag = tn(itm, 'a')[0];
	  var id = atag.getAttribute('data-hovercard-url').replace(/\D+/g, '');
	  var href = atag.href;
	  return [id,href];
    });
   var nextPageLink = getNextPageUrl(doc);
   var filtered = await checkStarGazers(followers,geoSearch);
   var outObj = {next: nextPageLink, matchedUrls: filtered};
   return outObj;

}

async function loopThroughAllHoverCards(url,geoSearch){
  var profileLinks = [];
  var numGazers = await getNumOfStarGazers(url);
  var pagesToLoop = Math.ceil(numGazers/30);
  var currentRes = await getStarGazers(url,geoSearch);
  var resLink = currentRes.next;
  if(currentRes.matchedUrls.length > 0) currentRes.matchedUrls.forEach(itm=> profileLinks.push(itm));
  for(var i=1; i<pagesToLoop; i++){
    if(resLink){
      var nextRes = await getStarGazers(resLink,geoSearch);
      await delay(111);
      resLink = nextRes.next;
      var resArr = nextRes.matchedUrls;
      if(resArr.length > 0) resArr.forEach(itm=> profileLinks.push(itm));
    }
  }
  return profileLinks;
}

async function getProfileLinks(url,geoSearch){
  var links = await loopThroughAllHoverCards(url,geoSearch);
  console.log(links);
  console.log(JSON.stringify(links));
}

getProfileLinks(currentPage,/Atlanta|Boston/i);

