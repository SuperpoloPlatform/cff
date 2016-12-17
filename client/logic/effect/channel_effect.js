try{
	if(!load("/logic/channel.js")){
		alert("Failed to load `channel.js`");
	}
	
	Event.Subscribe(function(e){
	
		curChalObj.enterChannel(e.channelID);
		
	}, "logic.enterChannel");
	
	Event.Subscribe(function(e){
	
		curChalObj.quitChannel(e.userName);
		
	}, "logic.quitChannel");
	
	
	Event.Subscribe(function(e){
	
		curChalObj.createRoom(e.roomInfo);
		
	}, "logic.createRoom");
	
	Event.Subscribe(function(e){
	
		curChalObj.channelchat(e.self, e.text);
		
	}, "logic.chatAll");
	

} catch(e){
	alert("err : " + e);
}