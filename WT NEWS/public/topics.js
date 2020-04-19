var container = document.querySelector(".container");
function renderTopics(topicArr){
	var i = 0;
	while(i < topicArr.length){
		let row = document.createElement('div');
		row.setAttribute('class',"row");
		for (var j = 0; j <= 1; j++) {
			let col = document.createElement('div');
			col.setAttribute('class',"col");
			let div = document.createElement('div');
			if (typeof topicArr[i+j] != "undefined"){
				let btn = document.createElement('button');
				btn.setAttribute('class','btn btn-outline-success');
				btn.setAttribute('id',topicArr[i+j].name);
				btn.innerText=topicArr[i+j].name;
				btn.setAttribute('onclick','getArticlesByTopic(this.id)');
				div.append(btn);
			}
			col.append(div);
			row.append(col);
		}
		container.append(row);
		i=i+2;
	}
}

function init(){
	container.innerHTML="<h3>Select A Topic:</h3>";
	var request = new XMLHttpRequest();
	request.open('GET',"topics/topics");
	request.setRequestHeader("Content-type", "application/json");
	request.onload = function() {
	var data = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
		console.log(data.topics);
		renderTopics(data.topics);
	  } else {
	    	console.log('error');
		}
	}
	request.send();
}


function renderItem(article){
	let table = document.querySelector("tbody");
	let row = document.createElement('tr');
	var pid = document.createElement("th");
	var name = document.createElement("th");
	var dob = document.createElement("th");
	var doj = document.createElement("th");
	var topic = document.createElement("th");

	pid.innerText = article.articleId;
	name.innerText = article.name;
	dob.innerText = article.description;
	doj.innerText = article.date.substring(0,10);
	topic.innerText = article.topic;

	row.append(pid);
	row.append(name);
	row.append(dob);
	row.append(doj);
	row.append(topic);
	table.append(row);
}

function getArticlesByTopic(topicName){
	container.innerHTML = `<h2>Articles</h2><table class="table table-hover"><thead><tr><th>Article #</th><th>Name</th><th>Description</th><th>Event Date</th><th>Topic</th></tr></thead><tbody></tbody></table><button class="btn btn-info" onclick="init()">Back</button>`;
	var request = new XMLHttpRequest();
	var topic ={
		topic:topicName
	}
	request.open('POST',"articles/article");
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
	request.send(JSON.stringify(topic));
}