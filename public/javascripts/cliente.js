$(document).ready(function(){

   	var socket=io.connect();

	socket.on('connect', function() {
		console.log("Cliente conectado con socket");
		init();	 
	});

	var init = function() {
		$("#pideNum").hide();
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
				$("#numero").val("");
			}
		});

		socket.on('numero', function(username, numero) {
			listaNumero(username, numero);
		});


		socket.on('mayor', function(msg) {
			$("#info").html(msg);
		});

		socket.on('menor', function(msg) {
			$("#info").html(msg);
		});

		socket.on('ganador', function(msg) {
			alert(msg);
			window.location.reload();
		});

		socket.on('no_numero', function(numero) {
			$("#error").html("Has introducido " + numero + ". No es un numero.");
		});

		socket.on('vacio', function() {
			$("#error").html("Debes introducir un numero.");
		});

		socket.on('numero_no_valido', function(numero) {
			$("#error").html("Tu numero (" + numero + ") debe ser mayor que 0 y menor que 50.");
		});
	}

	var enviaNumero = function(numero) {
		socket.emit('numero', numero);
	}

	var listaNumero = function(username, numero) {
		$("#respuestas").append("<li>" + username + ": " + numero + "</li>");
	}

});