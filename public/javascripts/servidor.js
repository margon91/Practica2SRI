module.exports=function(io){ 
	var usernames = [];

	io.sockets.on ('connection',function(socket){
		console.log("Cliente conectado");

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
			io.sockets.emit('numero', socket.username, numero);
		});
	});
}