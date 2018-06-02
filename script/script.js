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
       $('[data-toggle="tooltip"]').tooltip();
      
      $('#user-picture,#menu-profile').click(function(){
      	$('#main-screen').css("display", "none");
      	$('#user-profile').css("display", "block");
      });
       $('#profile-back').on('click', function (){
     	$('#main-screen').css("display", "block");
      	$('#user-profile').css("display", "none");
     })
     $('#status-button').on('click', function (e) {
  		e.preventDefault();
  		getAllStatus();
  		$('#pills-tab a[href="#pills-status"]').tab('show')
	});
});

	let navPills = document.querySelector("#nav-pills");
	let chatsContainer = document.querySelector(".chats-list");
	
	let navPillsStyle = window.getComputedStyle(navPills);
	let navPillsDisplay = navPillsStyle.getPropertyValue('display');

	let logoScreen = document.querySelector('#web-screen');

	if (navPillsDisplay == "none") {
			document.querySelector('#header').style.background = "rgb(238,238,238)";
			document.querySelector('#header').style.color = "rgba(0,0,0,0.5)";
		}
	window.onresize = () => {
    	navPillsStyle = window.getComputedStyle(navPills);
    	navPillsDisplay = navPillsStyle.getPropertyValue('display');
		if (navPillsDisplay == "none") {
			document.querySelector('#header').style.background = "rgb(238,238,238)";
			document.querySelector('#header').style.color = "rgba(0,0,0,0.5)";
		}else{
			document.querySelector('#header').style.background = "darkgreen";
			document.querySelector('#header').style.color = "white";
		}
	};

	let loadChat = (id) => {
		if (logoScreen.className !== "d-none") {
			console.log("inside logo if")
			logoScreen.className = "d-none";
		}
		let userList = document.querySelectorAll('.list-group-item:not(.user-'+id+')');
		for(let user of userList){
			user.style.background = "initial"
		}
		//for mobile
		if (navPillsDisplay == "block") {
			document.querySelector('#main-screen').style.display = "none";
			document.querySelector('#user-chat').style.display = "block";
			//document.body.style.background = "url(images/chatBg.png)";
		} else{
			console.log("INSIDE WEB CONDITION")
			document.querySelector('.chatHeader').style.background = "rgb(238,238,238)";
			document.querySelector('.chatHeader').style.color = "rgba(0,0,0,0.5)";
		}
		document.querySelector('#user-chat').style.display = "block";
		document.querySelector('#user-chat-container').style.display = "block";
		document.querySelector('#user-status').style.display = "block";
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
		//document.querySelector('#main-screen').style.display = "none";
		if (logoScreen.className !== "d-none") {
			console.log("inside logo if")
			logoScreen.className = "d-none";
		}
		document.querySelector('#user-status').style.background = "black";
		document.querySelector('#user-status').style.display = "block";
		//for mobile
		if (navPillsDisplay == "block") {
			document.querySelector('#main-screen').style.display = "none";
		} else{
			console.log("INSIDE WEB CONDITION FOR STATUS")
			document.querySelector('#user-chat').style.display = "none";
			document.querySelector('#user-chat-container').style.display = "none";
		}
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
	col10Div.className = "col-10 col-lg-10 no-left-padding";
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

		listNode.className += " user-"+user.id;
		personName.innerHTML = user.name;
		lastMessageDate.innerHTML = user.lastMessageDate;
		lastMessage.innerHTML = "last message";
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
};