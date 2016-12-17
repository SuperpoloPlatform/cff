try{

	if(!load("/logic/room.js")){
		alert("Failed to load `room.js`");
	}
	Event.Subscribe(function(e){
	
		curChalObj.joinRoom(e.customer, e.roomID);
		
	}, "logic.directRoom");
	
	Event.Subscribe(function(e){
	
		curRoomObj.readyGame(e.userName);
		
	}, "logic.readyGame");
	
	Event.Subscribe(function(e){
	
		curRoomObj.cancelReady(e.userName);
		
	}, "logic.cancelReady") ;
	
	Event.Subscribe(function(e){
		console.log("userName quit ui : " + e.userName);
		curRoomObj.quitRoom(e.userName);
		
	}, "logic.quitRoom");
	
	// Event.Subscribe(function(e){
	
		// RoomListShow();
		
	// }, "logic.SetRoomListShow");
	
	Event.Subscribe(function(e){
	
		curRoomObj.startGame(e.userName);
		
	}, "logic.startGame");
	
	Event.Subscribe(function(e){
	
		curRoomObj.half_wayEnterGame(e.userName);
		
	}, "logic.half_wayEnterGame");
	
	Event.Subscribe(function(e){
	
		curRoomObj.gameQuit(e.userName);
		
	}, "logic.quitGame");
	
	Event.Subscribe(function(e){
	
		curRoomObj.winQuit(e.userName);
		
	}, "logic.winQuit");
	
	Event.Subscribe(function(e){
	
		curRoomObj.returnRoomWait(e.curUser);
		
	}, "logic.returnRoomWait");
	

} catch(e){
	alert("err : " + e);
}