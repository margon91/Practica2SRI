$(document).ready(function(){

   var socket=io.connect('localhost:3000');//Establezco un socket con el servidor en este caso como es la misma máquina localhost

	socket.on('connect',function(){
		 var saludo="hola";
		 socket.emit('saludo',saludo); // A modo de ejemplo emito un saludo
		 
		});

	$("#numero").keyup(function(e) {
		var code = e.which || e.keyCode;

		if(code == 13) {
			$("#respuestas").append("<li>"+$("#numero").val()+"</li>")
		}
	});

});