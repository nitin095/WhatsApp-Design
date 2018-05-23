	$(document).ready(function(){
    $("#search-button").click(function(){
    	console.log("entered function")
    	$(".hideOnSearch").css("display", "none");
    	$("#header").css("background", "white");
    	$("#search-input").css("display", "block");
    });
    $("#search-back-button").click(function(){
    	$(".hideOnSearch").css("display", "block");
    	$("#header").css("background", "darkgreen");
    	$("#search-input").css("display", "none	");
    });
});

	let chatsContainer = document.querySelector(".chats-list");

	let loadChat = (id) => {
		document.querySelector('#main-screen').style.display = "none";
		document.querySelector('#user-chat').style.display = "block";
		document.body.style.background = "url(images/chatBg.png)";
		for(let user of users){
			if (user.id == id){
				document.querySelector("#userPic").src = user.pictureUrl;
				document.querySelector("#userName").innerHTML = user.name;
				if (!user.online) {
					document.querySelector("#online").style.display = "none";
				}
			}
		}//end for loop
	};

	let loadStatus = (id) => {
		document.querySelector('#main-screen').style.display = "none";
		document.querySelector('#user-status').style.display = "block";
		document.body.style.background = "black";
		for(let user of users){
			if(user.id == id){
				document.querySelector("#userPicStatus").src = user.pictureUrl;
				document.querySelector("#userNameStatus").innerHTML = user.name;
				document.querySelector("#statusDate").innerHTML = user.status.created;
				document.querySelector('#userStatus').src = user.pictureUrl;		
				document.querySelector('#statusMessage').innerHTML = user.status.message;
			}
		}
	};

	for (let user of users){
		console.log("looping")

	let listNode = document.createElement("a");
	listNode.className = "list-group-item list-group-item-action flex-column align-items-start";
	
	let rowDiv = document.createElement("div");
	rowDiv.className = "row";
	listNode.appendChild(rowDiv);

	let	col2Div = document.createElement("div");
	col2Div.className = "col-2 align-self-center";
	rowDiv.appendChild(col2Div);

	let image = document.createElement("img");
	image.className = "img-fluid rounded-circle";
	col2Div.appendChild(image);

	let col10Div = document.createElement("div");
	col10Div.className = "col-10 no-left-padding";
	rowDiv.appendChild(col10Div);

	let flexDiv = document.createElement('div');
	flexDiv.className = "d-flex w-100 justify-content-between";
	col10Div.appendChild(flexDiv);

	let personName = document.createElement("h5");
	personName.className = "mb-1";
	flexDiv.appendChild(personName);

	let lastMessageDate = document.createElement("small");
	flexDiv.appendChild(lastMessageDate);

	let lastMessage = document.createElement("p");
	lastMessage.className = "mb-1";
	col10Div.appendChild(lastMessage);

		personName.innerHTML = user.name;
		lastMessageDate.innerHTML = user.lastMessageDate;
		lastMessage.innerHTML = "last message";
		image.src = user.pictureUrl;
		chatsContainer.appendChild(listNode);
		// listNode.href = "chat.html?id="+user.id;
		listNode.addEventListener("click", function(){
    		loadChat(user.id);
		});
	}

let statusTab = document.querySelector('#pills-status-tab');

statusTab.addEventListener("click",function(){
	let statusList = document.querySelector('.status-list');
	statusList.innerHTML = "";
	for(let user of users){
		if (user.status.present) {
			let listNode = document.createElement("a");
			listNode.className = "list-group-item list-group-item-action flex-column align-items-start";
			
			let rowDiv = document.createElement("div");
			rowDiv.className = "row";
			listNode.appendChild(rowDiv);

			let	col2Div = document.createElement("div");
			col2Div.className = "col-2 align-self-center";
			rowDiv.appendChild(col2Div);

			let image = document.createElement("img");
			image.className = "img-fluid rounded-circle";
			col2Div.appendChild(image);

			let col10Div = document.createElement("div");
			col10Div.className = "col-10 no-left-padding";
			col10Div.style.cssText = 'line-height: 0.8rem';
			rowDiv.appendChild(col10Div);

			let flexDiv = document.createElement('div');
			flexDiv.className = "d-flex w-100 justify-content-between";
			col10Div.appendChild(flexDiv);

			let personName = document.createElement("h5");
			personName.className = "mb-1";
			flexDiv.appendChild(personName);

			let time = document.createElement("p");
			time.className = "mb-1";
			col10Div.appendChild(time);

			personName.innerHTML = user.name;
			time.innerHTML = user.status.created;
			image.src = user.pictureUrl;
			statusList.appendChild(listNode);
			listNode.addEventListener("click", function(){
		    	loadStatus(user.id);
			});
		}//end if
	}//end for

});//end status click event