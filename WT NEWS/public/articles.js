let table = document.querySelector("tbody");

function renderItem(article){
	let row = document.createElement('tr');
	var pid = document.createElement("th");
	var name = document.createElement("th");
	var dob = document.createElement("th");
	var doj = document.createElement("th");
	var team = document.createElement("th");

	pid.innerText = article.articleId;
	name.innerText = article.name;
	dob.innerText = article.description;
	doj.innerText = article.date.substring(0,10);
	team.innerText = article.topic;

	row.append(pid);
	row.append(name);
	row.append(dob);
	row.append(doj);
	row.append(team);
	table.append(row);
}

function init(){
	var request = new XMLHttpRequest();
	request.open('GET',"articles/all");
	request.setRequestHeader("Content-type", "application/json");
	request.onload = function() {
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
	    data.articles.forEach(article => {
	    	renderItem(article);
	    });
	  } else {
	    	console.log('error');
		}
	}
	request.send();
}
