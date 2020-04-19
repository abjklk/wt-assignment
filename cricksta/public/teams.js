var container = document.querySelector(".container");


function renderCard(doc){

    let card = document.createElement('div');
    card.setAttribute('class','card');

    let content = document.createElement('div');
    content.setAttribute('id','content');

    let left = document.createElement('div');
    left.setAttribute('id','left');

    let title = document.createElement('div');
    title.setAttribute('id','title');
    

    let txt = document.createElement('h1');
    txt.innerText = doc.name;
    title.append(txt);

    left.append(title);

    sb=document.createElement('button');
    sb.setAttribute('class','btn btn-danger');
    sb.setAttribute('id',doc.name);
    sb.setAttribute('onclick',"getPlayersbyTeam(this.id)");
    sb.innerText="Show Players";
    
    let btn = document.createElement('div');
    btn.setAttribute("id","btns");
    btn.append(sb);
    left.append(btn);
	
	let right = document.createElement('div');
    right.setAttribute('id','right');
    
    let dist = document.createElement('h3');
    dist.innerText = "ICC Rank: "+doc.rank;

    let col = document.createElement('h3');
    col.innerText = "Jersey Color: "+doc.color;

    let cap = document.createElement('h3');
    cap.innerText = "Captain: "+doc.captain;
    
    let wc = document.createElement('h3');
	wc.innerText = "World Cups Won: "+doc.worldCups;

    right.append(dist);
    right.append(col);
    right.append(cap);
    right.append(wc);
 
    card.append(content);
    content.append(left);
    content.append(right);
   	container.append(card);
}



function renderTeams(teamArr){
	teamArr.forEach((team)=>{
		renderCard(team);
	});
}

function init(){
	container.innerHTML="<h2>Select Team:</h2>";
	var request = new XMLHttpRequest();
	request.open('GET',"teams/teams");
	request.setRequestHeader("Content-type", "application/json");
	request.onload = function() {
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
	    renderTeams(data.teams);
	  } else {
	    	console.log('error');
		}
	}
	request.send();
}



function renderItem(player){
	let table = document.querySelector("tbody");
	let row = document.createElement('tr');
	var pid = document.createElement("th");
	var name = document.createElement("th");
	var dob = document.createElement("th");
	var doj = document.createElement("th");
	var team = document.createElement("th");

	pid.innerText = player.jerseyId;
	name.innerText = player.name;
	dob.innerText = player.dob.substring(0,10);
	doj.innerText = player.doj.substring(0,10);
	team.innerText = player.team;

	row.append(pid);
	row.append(name);
	row.append(dob);
	row.append(doj);
	row.append(team);
	table.append(row);
}

function getPlayersbyTeam(teamName){
	container.innerHTML = `<h2>Players</h2><table class="table table-hover"><thead><tr><th>Player #</th><th>Name</th><th>DOB</th><th>Joining Date</th><th>Team</th></tr></thead><tbody></tbody></table><br><div style="text-align:center;"><button class="btn btn-danger" onclick="init()">Back</button></div>`;
	var request = new XMLHttpRequest();
	var team ={
		team:teamName
	}
	request.open('POST',"players/player");
	request.setRequestHeader("Content-type", "application/json");
	request.onload = function() {
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
	    data.players.forEach(player => {
	    	renderItem(player);
	    });
	  } else {
	    	console.log('error');
		}
	}
	request.send(JSON.stringify(team));
}