/*metodos y funciones de la red de Virtual Fest 2017
		author: Harley Espinoza Barrias*/
		
		$(document).ready(function(){
			connection();
		    listenChange("FEST/event/");
			clicklistener();		
		});	
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
			  auth = firebase.auth();
			  currentUser(auth);
			  isAuthListener(auth);
		//addEvent("Avicci en New York","New York ","26/06/2017 20:00","Electro nigth","img","images/pic05.jpg","Avicci");	  	
		}
		/*escribe un objeto en firebase*/
		function objPush(obj,url,type) {
			ref = firebase.database().ref(url);	
			ref.push(obj).then(function() {
				result(type);
			}).catch(function(error) {
				        alert("error");
			});
		}
		/*cambia un valor en firebase*/
		function setValue(value,url){
			ref = firebase.database().ref(url);
			ref.set(value).then(function() {
				 alert("exito");
			}).catch(function(error) {
				 alert("error");
			});
		}
		/*hala los datos de firebase*/
		function listenChange(url,search="") {
			var dataTemp = [];
			ref = firebase.database().ref(url).on("child_added", function(data){
			   switch(url){
			   		case "FEST/event/":
			   			drawEvent(data);
			   			break;
			   		case "FEST/user/": 
			   			if (data.val().email==search) {
			   			$("#name").text(data.val().username.toUpperCase());
			   			};
			   			break ;  			
			   }
			 
			});					 
		}
		/*borra un objeto en firebase*/
		function objRemove(value,url) {
			ref = firebase.database().ref(url);	
			ref.remove().then(function() {
				    alert("exito");
			}).catch(function(error) {
				        alert("error");
			});
		}
		/*actualiza un objeto en firebase*/
		function objUpdate(key,obj,url,type) {
			ref = firebase.database().ref(url+key);
			ref.update(obj).then(function() {
				result(type);
			}).catch(function(error) {
				        alert("error");
			});
		}
		/*agrega publicaciones a firebase*/
		function addPost(key,place,DateTime,userName,contenttype,content){
			var post={
				place : place,
				DateTime : DateTime,
			 	username : userName,
			 	contenttype:contenttype,
				content : content,
				
			};
			objPush(post,'FEST/event/'+key+'/posts/',"post");
		}
		/*agrega eventos a firebase*/
		function addEvent(title,place,DateTime,description,srcMediaType,srcMedia,user){
			var event_={
				title:title,
				place:place,
				DateTime:DateTime,
				description:description,
				srcMediaType:srcMediaType,
				srcMedia:srcMedia,
				username:user
				};
			objPush(event_,'FEST/event/');
		}
		/*dibuja eventos en el muro*/		
		function drawEvent(data){		
	  		var $article0 = $("<article>", {id: "article_"+data.key, "class": "post"});
			var $header0 = $("<header>", {id: "header0"+data.key, "class": ""});
		    var $div0 = $("<div>", {id: "div0"+data.key, "class": "title"});
		    var $h20 = $("<h2>", {id: "h20"+data.key, "class":"","text":data.val().title});
		    var $p0 = $("<p>", {id: "p0"+data.key, "class": "","text":data.val().place});
		    var $div1 = $("<div>", {id: "div1"+data.key, "class": "meta"});	
		    var $time =	$("<time>", {id: "time"+data.key, "class": "published","text":data.val().Datetime});
		    var $a0 = $("<a>", {id: "a0"+data.key,"href":"#","class": "author"});	
		    var $span0 =  $("<span>", {id: "span0"+data.key,"class": "name","text":data.val().username});
		    var $profile = $("<img>", {id: "profile"+data.key,"src":"images/"+data.val().username+".jpg"});
		   
		   
		    if(data.val().srcMediaType!="img"){
		    	var $span1 =  $("<span>", {id: "span1"+data.key,"class": "video featured"});
		    	var $media0 = $("<video>", {id: "media0"+data.key,"src":data.val().srcMedia, "controls":"true", "type":"video/mp4"});

		    }else{
		    	 var $span1 =  $("<span>", {id: "span1"+data.key,"class": "image featured"});
		    	 var $media0 = $("<img>", {id: "media0"+data.key,"src":data.val().srcMedia});
		    }
		   
		    var $p1 = $("<p>", {id: "p1"+data.key, "class": "","text":data.val().description});
		    var $footer0 = $("<footer>", {id: "footer0"+data.key, "class": ""});
		    var $ul0 =  $("<ul>", {id: "ul0"+data.key,"class": "stats"});
		    var $li0 = $("<li>", {id: "li0"+data.key});
		    var $a1 = $("<a>", {id: data.key,"href":"#","class": "","text":"UNIRSE"});
		    var $li1 = $("<li>", {id: "li1"+data.key});
		    var $a2 = $("<a>", {id: "a2"+data.key,"href":"#","class": "icon fa-heart","text":"28"});
		    

		    $("#wall").append($article0);
		    $("#article_"+data.key).append($header0);
		    $("#header0"+data.key).append($div0);
 			$("#header0"+data.key).append($div1);
 			$("#div0"+data.key).append($h20)
		    $("#div0"+data.key).append($p0)
		    $("#div1"+data.key).append($time);
		    $("#div1"+data.key).append($a0);
		    $("#a0"+data.key).append($span0);
 			$("#a0"+data.key).append($profile); 
 			$("#article_"+data.key).append($span1);
 			$("#span1"+data.key).append($media0); 
		    $("#article_"+data.key).append($p1);
		    $("#article_"+data.key).append($footer0);
		    $("#footer0"+data.key).append($ul0); 
		    $("#ul0"+data.key).append($li0);
		    $("#ul0"+data.key).append($li1); 
			$("#li0"+data.key).append($a1);
		    $("#li1"+data.key).append($a2);
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
		/*deslogin*/
		function singnout(){
			firebase.auth().signOut().then(function() {
  				window.location.href = "../index.html";
			}, function(error) {
			  window.location.href = "../index.html";
			});
		}
		/*escucha el estado del usuario*/
		function isAuthListener(auth){
			auth.onAuthStateChanged(function(user) {
			  if (user) {
			    // User is signed in.
			   	console.log(user);
			   	listenChange("FEST/user/",user.email);
			   //	$("#name").text(user.email);
			  } else {
			    // No user is signed in.
			     
			     window.location.href = "../index.html";
			  }
			});
		}
		/*comprueba usuario activo*/
		function currentUser(auth){
			var user = auth.currentUser;
			if (user) {
			 	console.log(user);
			 	listenChange("FEST/user/");
				

			  result("auth");
			} else {
			  // No user is signed in.
			  //result("noauth");
			}
		}

		/*evento_click*/
		function clicklistener(){
			
			display("go_events","wall","news","profile");
			display("main_wall","wall","news","profile");
			display("go_news","news","wall","profile");
			display("go_profile","profile","news","wall");
			tabbed();
			$("#signout").click(function(){
			 	singnout();
			});
		}
		/*motrar y ocultar paneles*/
		function display(id,show,hide1,hide2){
			$("#"+id).click(function(){
				$("#"+show).fadeIn(500);
				$("#"+hide1).fadeOut(500);
				$("#"+hide2).fadeOut(500);
			});	
		}
		/*tabbed del perfil*/
		function tabbed(){
			$(".btn-pref .btn").click(function () {
            $(".btn-pref .btn").removeClass("btn-default").addClass("btn-default");
            $(this).removeClass("btn-default").addClass("btn-default");   
        	});
		}