	$(document).ready(function(){
	
	  //setting height of chats-list container
    $('#pills-chats').height(($(window).height()*.9) - $("#search-input").height());

    //on window resize
	  $(window).resize(function(){		
		$('#pills-chats').height(($(window).height()*.9) - $("#search-input").height());
    if (navPillsDisplay == "none") {
      if ($('#pills-chats').hasClass('active')) {
        $('#main-screen').show();
        $('#status-screen').hide();
        $('#status-back-button').click();
        if ($('#user-chat').is(":visible")) {
          console.log("user chat opened")
          $('#web-screen').hide();
        }
      }
      if ($('#pills-status').hasClass('active')) {
         $('#main-screen').show();
        $('#status-button').click();
        if ($('#user-status').is(":visible")) {
          $('#status-screen').hide();
        }
      }
      if ($('#pills-calls').hasClass('active')) {
        $('#status-back-button').click();
      }
    }else{
      if ($('#pills-chats').hasClass('active')) {
        if ($('#user-chat').is(":visible")) {
          $('#main-screen').hide();
        }
      }
      if ($('#pills-status').hasClass('active')) {
        if ($('#user-status').is(":visible")) {
          $('#main-screen').hide();
        }
      }
    }
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

       $('#user-status i').on('click', function (){
        $('#user-status').hide();
        $('#main-screen').show(); 
      });

       $('#user-chat-back-buton').on('click', function(){
        $('#user-chat').hide();
        $('#main-screen').show(); 
       });

     $('#status-button').on('click', function (e) {
  		e.preventDefault();
  		getAllStatus();
    	$('#search-input').removeClass("d-lg-block");
  		$('#pills-tab a[href="#pills-status"]').tab('show');
  		$('#header').css("background","rgba(0,0,0,0.9)");
  		$('#status-button,#dropdownMenuButton,#user-chat,#web-screen').hide();
  		$('.status-list p').css("color","darkgrey");
  		$('.status-list a').addClass("border-0");
  		$('#user-picture').removeClass("d-lg-block");
      $('#status-screen').show();
  		$('#status-back-button').slideDown(800);
	});
     $('#status-back-button').on('click', function(){
      $('#header').css("background","rgb(238,238,238)");
     	$('#pills-tab a[href="#pills-chats"]').tab('show');
     	$('#web-screen').show();
     	$('#status-button,#dropdownMenuButton').slideDown(800);
     	$('#search-input,#user-picture').addClass("d-lg-block");
  		$('#status-back-button,#user-status,#status-screen').hide();
     });

      $('#chatInput input').keyup(function () {
        if($(this).val().length > 0){
          $('#chatInput #send-button').removeClass("fas fa-microphone");
          $('#chatInput #send-button').addClass("fab fa-telegram-plane");
        }else{
          $('#chatInput #send-button').toggleClass("fab fa-telegram-plane fas fa-microphone");
        }
      });

     $('#send-button').on('click', function(){
     	$('#user-chat-container').append('<div class="row sentMessage"><div class="col-auto rounded-left py-1">'+$("input[name=chatMessage]").val()+'</div></div>')
     	$("input[name=chatMessage]").val('');
     });

     $("input[name=chatMessage]").keypress(function(e) {
    	if(e.which == 13 && $("input[name=chatMessage]").val().length > 0) {
    		$("#go").click();
    		$('#user-chat-container').append('<div class="row sentMessage"><div class="col-auto rounded-left py-1">'+$("input[name=chatMessage]").val()+' <small class="pl-2" style="font-size: 0.7rem;color: rgb(136, 155, 122);">01:30 PM</small><i class="fas fa-check pl-1" style="font-size: 0.7rem;color: rgba(0,0,0,0.3)"></i></div></div>')
     		$("input[name=chatMessage]").val('');
     		$("#user-chat-container").stop().animate({ scrollTop: $("#user-chat-container")[0].scrollHeight}, 1000);
    	}
	   });
});
