		/*metodos y funciones de la red de Virtual Fest 2017
		author: Harley Espinoza Barrias*/
		
		connection();
		const auth = firebase.auth();//constante de autentificacion
		$(document).ready(function(){ session();});			
		/*conexion a firebase*/
		function connection(){
			var config = {
			    apiKey: "AIzaSyCkn784i7T2ae03jUmDf0JiY7An3kUK6yA",
			    authDomain: "virtualfest-fcc77.firebaseapp.com",
			    databaseURL: "https://virtualfest-fcc77.firebaseio.com",
			    projectId: "virtualfest-fcc77",
			    storageBucket: "",
			    messagingSenderId: "1036715053449"
			  };
			  firebase.initializeApp(config);			 
		}	
		/*escribe un objeto en firebase*/
		function objPush(obj,url,type) {
			ref = firebase.database().ref(url);	
			ref.push(obj).then(function() {
				login(obj.email,obj.password);
			}).catch(function(error) {
				console.log(error.message);
				
			});
		}
		/*agrega usuarios a firebase*/
		function addUser(username,pass,email,photo){
			var user={
			 	username:username,
			 	password:pass,
				email 	:email,
				photoUrl:photo		
			};
			objPush(user,'FEST/user/',"auth");		
		}
		/*valida registro de cuenta de usuario*/
		function singin(username,pass,passRepeat,email,photo){
			if (passCheck(pass,passRepeat)==true && 
				emailCheck(email) == true) {					
				firebase.auth().createUserWithEmailAndPassword(email, pass).then(function() {		
					addUser(username,pass,email,photo);	
				}, function(error) {
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  console.log(error.code);
				  	if (errorCode=="auth/email-already-in-use") {
						$("#error").text("El email ya esta registrado en otra cuenta");
						$("#email").css("background-color","rgba(253, 0, 0, 0.1)");//red
					}
				});

			}	
		}
		/*acceso*/
		function login(email,pass){
			auth.signInWithEmailAndPassword(email, pass).then(function() {
  				window.location.href = "./default.html";
			}, function(error) {
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log(error.message);
			  $("#error1").text("Correo o clave incorrecto.");
			});
		}
		/*valida formato de email*/
		function emailCheck(email){
			var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
		    // funcion test() nativa de JavaScript
		    if (regex.test(email.trim())) {
		    	$("#email").css("background-color","#8a8c6a");
		    	$("#error").text("");
		        return true;
		    } else {
		    	$("#email").css("background-color","rgba(253, 0, 0, 0.1)");//red
		    	$("#error").text("Formato no valido");
		        return false;
		    }
		}
		/*valida email unico*/
		function isEmail(emails){
			/*for (var i = 0; i < emails.length; i++) {
				if($("#email").val() == emails[i].val().email){
				  	//$("#email").css("background-color","rgba(253, 0, 0, 0.1)");//red
				  //	$("#error").text("El email "+emails[i].val().email+ " ya está registrado.");
				  	
					setValue("FEST/user/"+emails[i].key+"/username",emails[i].val().username);
					setValue("FEST/user/"+emails[i].key+"/password",emails[i].val().password);
					setValue("FEST/user/"+emails[i].key+"/email",emails[i].val().email);
				}			
			};
				//$("#email").css("background-color","#8a8c6a");
				//$("#error").text("");	*/
		}
		/*valida vacios*/
		function isEmpty(id){
			if($("#"+id).val() == ""){
				$("#"+id).css("background-color","rgba(253, 0, 0, 0.1)");//red
				$("#error").text("complete los campos en rojo");
				return true;
			}else{
				$("#error").text("");
				$("#"+id).css("background-color","#8a8c6a");
				return false;
			}
		}
		/*valida clave*/
		function passCheck(key1,key2){
			if (key1==key2 && key1.length > 5) {
				$("#passRepeat").css("background-color","#8a8c6a");
				$("#error").text(".");
				return true;
			}else{
				$("#passRepeat").css("background-color","rgba(253, 0, 0, 0.1)");
				$("#error").text("Las claves deben tener al menos 6 digitos y coincidir.");
				return false;
			}
		}
		/*sesion y cuentas*/
		function session(){
			$("#go").click(function(){
				if(isEmpty("user") != true && isEmpty("pass")!= true){
			 		login($("#user").val(),$("#pass").val());
			 	}
			 	
			});
			$("#ready").click(function(){
			 	if(isEmpty("usernew") != true && isEmpty("passnew")!= true && isEmpty("passRepeat")!= true){
			 		singin($("#usernew").val(),$("#passnew").val(),$("#passRepeat").val(),$("#email").val(),"null");	
			 	}	
			});
			$("#signout").click(function(){
			 	singnout();
			});
		}	
		/* evento_key*/
		function keylistener(id){
			$("#"+id).keypress(function(){
			 
			});
		}