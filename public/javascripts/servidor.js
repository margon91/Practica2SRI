module.exports=function(io){ 
	var usernames = [];
	var numeroDecimal = (Math.random() * (1 - 51) + 51);
	var random = Math.floor(numeroDecimal);
	
	io.sockets.on ('connection',function(socket){
		console.log("Cliente conectado");

		socket.on('set_username', function(username, callback) {
			if(username != "") {
				var esta_disponible = true;

				for(i=0; i<usernames.length; i++) {
					if(usernames[i] == username)
						esta_disponible = false;
				}

				if(esta_disponible) {
					usernames.push(username);
					socket.username = username;
				}
			
				callback(esta_disponible);
			}
		});

		socket.on('numero', function(numero) {
			if(numero != "") {
				if(!isNaN(numero)) {
					if(numero > 0 && numero < 51) {
						if(numero > random) {
							var msg = numero + " es mayor";
							socket.emit('mayor', msg);
						} else if(numero < random) {
							var msg = numero + " es menor";
							socket.emit('menor', msg);
						}else if(numero == random) {
							var msg = socket.username + " ha acertado el numero " + numero;
							io.sockets.emit('ganador', msg);
							usernames = [];
							numeroDecimal = (Math.random() * (1 - 51) + 51);
							random = Math.floor(numeroDecimal);
						}
						io.sockets.emit('numero', socket.username, numero);
					} else
						socket.emit('numero_no_valido', numero);
				} else
					socket.emit('no_numero', numero);
			} else
				socket.emit('vacio');
		});
	});
}