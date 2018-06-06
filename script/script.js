	let navPills = document.querySelector("#nav-pills");
	let chatsContainer = document.querySelector(".chats-list");
	
	let navPillsStyle = window.getComputedStyle(navPills);
	let navPillsDisplay = navPillsStyle.getPropertyValue('display');

	let logoScreen = document.querySelector('#web-screen');

	window.onresize = () => {
    	navPillsStyle = window.getComputedStyle(navPills);
    	navPillsDisplay = navPillsStyle.getPropertyValue('display');
		
		if (navPillsDisplay == "none") {
			document.querySelector('#header').style.background = "rgb(238,238,238)";
			document.querySelector('#header').style.color = "rgba(0,0,0,0.5)";
		}else{
			document.querySelector('#header').style.background = "rgb(8,104,93)";
			document.querySelector('#header').style.color = "white";
		}
	};

	let loadChat = (id) => {
	
		//setting user-list items background color
		let userList = document.querySelectorAll('.list-group-item:not(.user-'+id+')');
		for(let user of userList){
			user.style.background = "initial"
		}

		//for mobile
		if (navPillsDisplay == "block") {
			document.querySelector('#main-screen').style.display = "none";
			document.querySelector('#user-chat').style.display = "block";
		}

		document.querySelector('#web-screen').style.display = "none";
		document.querySelector('#user-chat').style.display = "block";
		document.querySelector('#user-chat-container').style.display = "block";

		for(let user of users){
			if (user.id == id){
				document.querySelector("#userPic").src = user.pictureUrl;
				document.querySelector("#userName").innerHTML = user.name;
				if (user.unreadMessages > 0) {
					document.querySelector('.list-group-item.user-'+id+' span').style.cssText = "font-weight: normal";
					document.querySelector('.user-'+id+' .unreadMessagesCount').style.display = "none";
				}
				if (!user.online) {
					document.querySelector("#online").style.display = "none";
				}else{
					document.querySelector("#online").style.display = "block";
				}
			}
		}//end for loop
	};//end loadChat

	let loadStatus = (id) => {
		
		//setting active status-list-item image border color
		document.querySelector('#user-'+id+'-status').style.border = "1.5px solid grey";

		document.querySelector('#status-screen').style.display = "none";
		//document.querySelector('#user-status').className = "container";
		document.querySelector('#user-status').style.display = "block";
		
		//for mobile
		if (navPillsDisplay == "block") {
			document.querySelector('#main-screen').style.display = "none";
			//document.querySelector('#web-screen').className = "d-none align-items-center";
		} else{
			//document.querySelector('#user-chat').style.display = "none";
			//document.querySelector('#user-chat-container').style.display = "none";
		}

		for(let user of users){
			if(user.id == id){
				document.querySelector("#userPicStatus").src = user.pictureUrl;
				document.querySelector("#userNameStatus").innerHTML = user.name;
				document.querySelector("#statusDate").innerHTML = user.status.created;
				document.querySelector('#userStatusPic').src = user.status.url;		
				document.querySelector('#statusMessage').innerHTML = user.status.message;
			}
		}
	};

	for (let user of users){
		console.log("looping ")

	let listNode = document.createElement("a");
	listNode.className = "list-group-item list-group-item-action flex-column align-items-start px-3";
	
	let rowDiv = document.createElement("div");
	rowDiv.className = "row";
	listNode.appendChild(rowDiv);

	let	col2Div = document.createElement("div");
	col2Div.className = "col-2 col-lg-2 align-self-center";
	rowDiv.appendChild(col2Div);

	let image = document.createElement("img");
	image.className = "img-fluid rounded-circle";
	col2Div.appendChild(image);

	let col10Div = document.createElement("div");
	col10Div.className = "col-10 col-lg-10 pl-0 reduced-line-height";
	rowDiv.appendChild(col10Div);

	let flexDiv = document.createElement('div');
	flexDiv.className = "d-flex w-100 justify-content-between";
	col10Div.appendChild(flexDiv);

	let personName = document.createElement("h5");
	personName.className = "mb-1";
	flexDiv.appendChild(personName);

	let lastMessageDate = document.createElement("small");
	flexDiv.appendChild(lastMessageDate);

	let lastMessage = document.createElement("div");
	lastMessage.className = "d-flex w-100 justify-content-between";
	col10Div.appendChild(lastMessage);

		listNode.className += " user-"+user.id;
		personName.innerHTML = user.name;
		lastMessageDate.innerHTML = user.lastMessageDate;
		if (user.unreadMessages > 0) {
			//lastMessage.innerHTML = '<span class="unreadMessage">last message</span><span class="unreadMessagesCount rounded-circle">'+user.unreadMessages+"</span>";
			lastMessage.innerHTML = '<span class="unreadMessage">last message</span><span class="badge unreadMessagesCount badge-pill">'+user.unreadMessages+'</span>';
		}else{
			lastMessage.innerHTML = '<span class"lastMessage">last message</span>';
		}
		image.src = user.pictureUrl;
		chatsContainer.appendChild(listNode);
		// listNode.href = "chat.html?id="+user.id;
		listNode.addEventListener("click", function(){
    		listNode.style.background = "rgb(233,235,235)";
    		loadChat(user.id);
		});
	}

let statusTab = document.querySelector('#pills-status-tab');

statusTab.addEventListener("click",function(){
	getAllStatus();
});//end status click event

let getAllStatus = () => {
	let statusList = document.querySelector('.status-list');
	statusList.innerHTML = "";
	for(let user of users){
		if (user.status.present) {
			let listNode = document.createElement("a");
			listNode.className = "list-group-item list-group-item-action flex-column align-items-start px-3";
			
			let rowDiv = document.createElement("div");
			rowDiv.className = "row";
			listNode.appendChild(rowDiv);

			let	col2Div = document.createElement("div");
			col2Div.className = "col-2 align-self-center";
			rowDiv.appendChild(col2Div);

			let image = document.createElement("img");
			image.className = "img-fluid status-thumb";
			col2Div.appendChild(image);

			let col10Div = document.createElement("div");
			col10Div.className = "col-10 pl-0 reduced-line-height";
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

			image.id += "user-"+user.id+"-status";
			personName.innerHTML = user.name;
			time.innerHTML = user.status.created;
			image.src = user.status.url;
			statusList.appendChild(listNode);
			listNode.addEventListener("click", function(){
		    	loadStatus(user.id);
			});
		}//end if
	}//end for
};