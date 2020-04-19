let form = document.querySelector(".colony-form");
let status = document.querySelector("#status");

document.querySelector("#submitBtn").addEventListener("click",(e)=>{
	e.preventDefault();
	var jno = form["jno"].value;
	var name = form["name"].value;
	var desc = form["desc"].value;
	var date = form["date"].value;
	var topic = form["topic"].value;
	var newArticle = {
		articleId: jno,
		name: name,
		description: desc,
		date: date,
		topic: topic
	}
	var request = new XMLHttpRequest();
	request.open('POST',"articles/add/new");
	request.setRequestHeader("Content-type", "application/json");
	request.onload = function() {
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
	    status.innerText=data.msg;
	  } else {
	    	console.log('error');
		}
	}
	request.send(JSON.stringify(newArticle));
	form.reset();
});