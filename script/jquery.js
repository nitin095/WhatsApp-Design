$(document).ready(function() {

  //setting height of chats-list container
  $("#pills-chats").height(
    $(window).height() * 0.9 - $("#search-input").height()
  );

  //on window resize
  $(window).resize(function() {
    $("#pills-chats").height(
      $(window).height() * 0.9 - $("#search-input").height()
    );
    // on large screens
    if (navPillsDisplay == "none") {
      if ($("#pills-chats").hasClass("active")) {
        $("#main-screen").show();
        $("#status-screen").hide();
        $("#status-back-button").click();
        if ($("#user-chat").is(":visible")) {
          $("#web-screen").hide();
        }
      }
      if ($("#pills-status").hasClass("active")) {
        $("#main-screen").show();
        $("#status-button").click();
        if ($("#user-status").is(":visible")) {
          $("#status-screen").hide();
        }
      }
      if ($("#pills-calls").hasClass("active")) {
        $("#status-back-button").click();
      }
    } else {
      // on small screens
      if ($("#pills-chats").hasClass("active")) {
        if ($("#user-chat").is(":visible")) {
          $("#main-screen").hide();
        }
      }
      if ($("#pills-status").hasClass("active")) {
        if ($("#user-status").is(":visible")) {
          $("#main-screen").hide();
        }
      }
    }
  });

  //enabling tooltips only on large screens
  if (navPillsDisplay == "none") {
    $('[data-toggle="tooltip"]').tooltip();
  }

  $("#search-button").click(function() {
    $("#search-input").slideDown(300);
    $(".hideOnSearch").slideUp(300);
    $("#header").slideUp(600);
  });

  $("#search-back-button").click(function() {
    $("#search-input").hide();
    $(".hideOnSearch").slideDown(300);
    $("#header").slideDown(600);
  });

  //displaying user profile
  $("#user-picture,#menu-profile").click(function() {
    $("#main-screen").hide();
    $("#user-profile").show();
  });

  //to hide user profile
  $("#profile-back").on("click", function() {
    $("#user-profile").hide();
    $("#main-screen").show();
  });

  //to display uset status
  $("#user-status i").on("click", function() {
    $("#user-status").hide();
    $("#main-screen").show();
  });

  //to hide user status
  $("#user-chat-back-buton").on("click", function() {
    $("#user-chat").hide();
    $("#main-screen").show();
  });

  //displaying status screen on status-button press
  $("#status-button").on("click", function(e) {
    e.preventDefault();
    getAllStatus();
    $("#search-input").removeClass("d-lg-block");
    $('#pills-tab a[href="#pills-status"]').tab("show");
    $("#header").css("background", "rgba(0,0,0,0.9)");
    $("#status-button,#dropdownMenuButton,#user-chat,#web-screen").hide();
    $(".status-list p").css("color", "darkgrey");
    $(".status-list a").addClass("border-0");
    $("#user-picture").removeClass("d-lg-block");
    $("#status-screen").show();
    $("#status-back-button").slideDown(800);
  });

  //hiding status screen on status-back-button press
  $("#status-back-button").on("click", function() {
    $("#header").css("background", "rgb(238,238,238)");
    $('#pills-tab a[href="#pills-chats"]').tab("show");
    $("#web-screen").show();
    $("#status-button,#dropdownMenuButton").slideDown(800);
    $("#search-input,#user-picture").addClass("d-lg-block");
    $("#status-back-button,#user-status,#status-screen").hide();
  });

  //toggling "mic" and "send" button based on user chat input
  $("#chatInput input").keyup(function() {
    if ($(this).val().length > 0) {
      $("#chatInput #send-button").removeClass("fas fa-microphone");
      $("#chatInput #send-button").addClass("fab fa-telegram-plane");
    } else {
      $("#chatInput #send-button").toggleClass(
        "fab fa-telegram-plane fas fa-microphone"
      );
    }
  });

  //Adding typed chat message to user-chat conatiner 
  $("#send-button").on("click", function() {
    if ($("input[name=chatMessage]").val().length > 0) {
      appendChatMessage();
    }
  });

  //Adding typed chat message to chat-container on preesing "return" key
  $("input[name=chatMessage]").keypress(function(e) {
    if (e.which == 13 && $("input[name=chatMessage]").val().length > 0) {
      appendChatMessage();
    }
  });

  //function to append types message in user chat container.
let appendChatMessage = () =>{
  //getting current time in 12-hr format
  let dt = new Date();
  let currentTime = dt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

   $("#user-chat-container").append(
        '<div class="row sentMessage"><div class="col-auto rounded-left py-1">' +
          $("input[name=chatMessage]").val() +
          ' <small class="pl-2" style="font-size: 0.7rem;color: rgb(136, 155, 122);">'+currentTime+'</small><i class="fas fa-check pl-1" style="font-size: 0.7rem;color: rgba(0,0,0,0.3)"></i></div></div>'
        );
      $("input[name=chatMessage]").val("");
      $("#user-chat-container")
        .stop()
        .animate(
          { scrollTop: $("#user-chat-container")[0].scrollHeight },
          1000
        );
 };

});
