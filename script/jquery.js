	$(document).ready(function(){
	
	  //setting height of chats-list container
    $('#pills-chats').height(($(window).height()*.9) - $("#search-input").height());

    //on window resize
	  $(window).resize(function(){		
		$('#pills-chats').height(($(window).height()*.9) - $("#search-input").height());
    });
	
     //enabling tooltips only on large screens
    if(navPillsDisplay == "none"){
      $('[data-toggle="tooltip"]').tooltip();
    };

    $("#search-button").click(function(){
    	$("#search-input").slideDown(300);
      $(".hideOnSearch").slideUp(300);
      $("#header").slideUp(600);	
    });

    $("#search-back-button").click(function(){
    	 $("#search-input").hide();
      $(".hideOnSearch").slideDown(300);
      $("#header").slideDown(600);
    });

      $('#user-picture,#menu-profile').click(function(){
      	console.log("inside condition")
        $('#main-screen').hide();
      	$('#user-profile').show();
      });

       $('#profile-back').on('click', function (){
     	  $('#user-profile').hide();
        $('#main-screen').show();
      	
      });

     $('#status-button').on('click', function (e) {
  		e.preventDefault();
  		getAllStatus();
    	$('#search-input').removeClass("d-lg-block");
  		$('#pills-tab a[href="#pills-status"]').tab('show');
  		$('#header').css("background","rgba(0,0,0,0.9)");
  		//$('#pills-status').css({"background":"rgba(0,0,0,0.9)","color":"silver"});
      $('#status-screen').addClass("d-flex");
      $('#web-screen').removeClass("d-flex");
  		$('#status-button,#dropdownMenuButton,#user-chat,#web-screen').addClass("d-none");
  		$('.status-list p').css("color","darkgrey");
  		$('.status-list a').addClass("border-0");
  		$('#user-picture').removeClass("d-lg-block");
  		$('#status-back-button,#status-screen').removeClass("d-none");
	});
     $('#status-back-button').on('click', function(){
     	//$('#pills-status').css({"background":"initial","color":"initial"});
      $('#header').css("background","rgb(238,238,238)");
     	$('#pills-tab a[href="#pills-chats"]').tab('show');
     	$('#status-button,#user-chat,#web-screen').removeClass("d-none");
      $('#status-screen').removeClass("d-flex");
      $('#web-screen').addClass('d-flex');
     	$('#dropdownMenuButton').removeClass("d-none");
     	$('#search-input').addClass("d-lg-block");
     	$('#user-picture').addClass("d-lg-block");
  		$('#status-back-button,#user-status,#status-screen').addClass("d-none");
     });
     $('#chatInput input').change(function(){ 
     	console.log("sssssssssssssssssssssssssssssssssssssss");
     	$('#chatInput #send-button').removeClass("fas fa-microphone");
     	$('#chatInput #send-button').addClass("fab fa-telegram-plane");
     });
     $('#send-button').on('click', function(){
     	$('#user-chat-container').append('<div class="row sentMessage"><div class="col-auto rounded-left py-1">'+$("input[name=chatMessage]").val()+'</div></div>')
     	$("input[name=chatMessage]").val('');
     });
     $("input[name=chatMessage]").keypress(function(e) {
    	if(e.which == 13) {
    		$("#go").click();
    		$('#user-chat-container').append('<div class="row sentMessage"><div class="col-auto rounded-left py-1">'+$("input[name=chatMessage]").val()+' <small class="pl-2" style="font-size: 0.7rem;color: rgb(136, 155, 122);">01:30 PM</small><i class="fas fa-check pl-1" style="font-size: 0.7rem;color: rgba(0,0,0,0.3)"></i></div></div>')
     		$("input[name=chatMessage]").val('');
     		$("#user-chat-container").stop().animate({ scrollTop: $("#user-chat-container")[0].scrollHeight}, 1000);
    	}
	   });
});
