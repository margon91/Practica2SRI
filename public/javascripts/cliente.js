$(document).ready(function(){

   	var socket=io.connect('192.168.1.189:3000');

	socket.on('connect', function() {
		console.log("Cliente conectado con socket");
		init();	 
	});

	var init = function() {
		$("#pideNum").hide();
		$("#respuesta").hide();
		$("#login").show();
		$("#username").keyup(function(e) {
			var code = e.which || e.keyCode;

			if(code == 13) {
				setUsername($(this).val());
			}
		});
	}

	var setUsername = function(username) {
		socket.emit('set_username', username, function(esta_disponible) {
			if(esta_disponible) {
				console.log("username " + username);
				pantallaJuego(username);
			} else
				alert("El username " + username + " no esta disponible");
		});
	}

	var pantallaJuego = function(username) {
		$("#login").hide();
		$("#pideNum").show();

		$("#numero").keyup(function(e) {
			var code = e.which || e.keyCode;

			if(code == 13) {
				var numero = $("#numero").val();
				enviaNumero(numero);
				//$("#respuestas").append("<li>" + numero + "</li>");
				$("#numero").val("");
			}
		});

		socket.on('numero', function(username, numero) {
			listaNumero(username, numero);
		});

		socket.on('ganador', function(msg) {
			alert(msg);
			init();
		});

	}

	var enviaNumero = function(numero) {
		socket.emit('numero', numero);
	}

	var listaNumero = function(username, numero) {
		$("#respuestas").append("<li>" + username + ": " + numero + "</li>");
	}

});