let form = document.querySelector(".colony-form");
let status = document.querySelector("#status");

document.querySelector("#submitBtn").addEventListener("click",(e)=>{
	e.preventDefault();
	var jno = form["jno"].value;
	var name = form["name"].value;
	var dob = form["dob"].value;
	var doj = form["doj"].value;
	var team = form["team"].value;
	if(jno == "" || name == "" || dob=="" || doj == "" || team == ""){
		status.innerText="Fill all Fields.";
	}
	else if(isNaN(jno)){
		status.innerText="Invalid Jersey Number.";
	}
	else{
		var newPlayer = {
			jerseyId: jno,
			name: name,
			dob: dob,
			doj: doj,
			team: team
		}
		var request = new XMLHttpRequest();
		request.open('POST',"players/add/new");
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
		request.send(JSON.stringify(newPlayer));
		form.reset();
	}	
});