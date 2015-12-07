module.exports=function(io){ 
	var usernames = [];
	var numeroDecimal = (Math.random() * (1 - 21) + 21);
	var random = Math.floor(numeroDecimal);

	io.sockets.on ('connection',function(socket){
		console.log("Cliente conectado");
		console.log(random);

		socket.on('set_username', function(username, callback) {
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
		});

		socket.on('numero', function(numero) {
			if(numero == random) {
				var msg = socket.username + " ha acertado el numero " + numero;
				io.sockets.emit('ganador', msg);
			}
			io.sockets.emit('numero', socket.username, numero);
		});
	});
}