(function(){
	if(!load("/logic/lobby.js")){
		alert("Failed to load `lobby.js`");
	}
	
	Event.Subscribe(function(e){
	
		lobbyManager.enterLobby(e.userName);
		
	}, "logic.enterLobby");
	
	Event.Subscribe(function(e){
		
		lobbyManager.quitLobby(e.userName);
		
	}, "logic.quitLobby");
	
})();