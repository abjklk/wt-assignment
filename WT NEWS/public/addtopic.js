let form = document.querySelector(".colony-form");
let status = document.querySelector("#status");

document.querySelector("#submitBtn").addEventListener("click",(e)=>{
	e.preventDefault();
	var name = form["name"].value;
	var id = form["id"].value;
	var anchor = form["anchor"].value;
	var ratings = form["ratings"].value;
	var newTopic = {
		name:name,
		id:id,
		anchor:anchor,
		ratings:ratings
	}
	var request = new XMLHttpRequest();
	request.open('POST',"topics/add/new");
	request.setRequestHeader("Content-type", "application/json");
	request.onload = function() {
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
	    status.innerText=data.msg;
	  } else {
	    	console.log('error');
		}
	}
	request.send(JSON.stringify(newTopic));
	form.reset();
});