$(document).ready(function(){

   	var socket=io.connect('192.168.1.189:3000');

	socket.on('connect', function(){
		console.log("Cliente conectado con socket");
		init();	 
	});

	var init = function() {
		$("#username").keyup(function(e) {
			var code = e.which || e.keyCode;

			if(code == 13) {
				setUsername($(this).val());
			}
		});

		$("#pideNum").hide();
		$("#respuesta").hide();

	}

	var setUsername = function(username) {
		socket.emit('set_username', username, function(esta_disponible) {
			if(esta_disponible) {
				console.log("username " + username);
				$("#login").hide();
				$("#pideNum").show();
			} else {
				alert("El username " + username + " no esta disponible");
			}
		});
	}

	$("#numero").keyup(function(e) {
		var code = e.which || e.keyCode;

		if(code == 13) {
			$("#respuestas").append("<li>"+$("#numero").val()+"</li>");
			$("#numero").val("");
		}
	});

});