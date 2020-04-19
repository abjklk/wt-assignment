let form = document.querySelector(".colony-form");
let status = document.querySelector("#status");

document.querySelector("#submitBtn").addEventListener("click",(e)=>{
	e.preventDefault();
	var name = form["name"].value;
	var rank = form["rank"].value;
	var color = form["color"].value;
	var captain = form["captain"].value;
	var cups = form["cups"].value;
	if(name == "" || rank == "" || color == "" || captain == "" || cups ==""){
		status.innerText="Fill all Fields.";
	} 
	else if(isNaN(rank) || isNaN(cups)){
		status.innerText = "Invalid Number input.";
	}
	else{
		var newTeam = {
			name:name,
			rank:rank,
			color:color,
			captain:captain,
			worldCups:cups
		}
		var request = new XMLHttpRequest();
		request.open('POST',"teams/add/new");
		request.setRequestHeader("Content-type", "application/json");
		request.onload = function() {
		var data = JSON.parse(this.response);
		if (request.status >= 200 && request.status < 400) {
			status.setAttribute('class','approve');
		    status.innerText=data.msg;
		  } else {
		    	console.log('error');
			}
		}
		request.send(JSON.stringify(newTeam));
		form.reset();
	}
});