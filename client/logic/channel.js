try{
	// if(!load("/logic/room.js")){
		// alert("Failed to load `room.js`");
	// }
	
	/**
	 * current channel info
	 */
	/**
	 * 选择进入频道
	 */
	curChalObj.enterChannel = function(channelId){
		local.curOperate = "channel";
		console.log(curUser + " channel !");
		this.remoteChalObj = Corba.GetObject("#test.my_context/delivery.Object#channel." + channelId);
		this.remoteChalObj.setInvoke("enter");
		var ret = this.remoteChalObj.enter(curUser);
		if(ret){
			// console.log("enter channel, channelId : " + channelId);
			var roomInfoList = this.getRoomList();
			console.log("get room current info list : " + JSON.stringify(roomInfoList));
			var curRoomInfoList = {};
			Event.Send({
				name : "ui.SetRoomListShow",
				channelId : channelId,
				roomInfoList : roomInfoList
			});
		}
	}
	
	/**
	 * get room list
	 */
	curChalObj.getRoomList = function(){
		this.remoteChalObj.setInvoke("getRoomList");
		var roomList = this.remoteChalObj.getRoomList();
		 console.log("roomList logic channel : " + JSON.stringify(roomList));
		return roomList;
	}
	/**
	 * quit channel
	 */
	curChalObj.quitChannel = function(userName){
		console.log(userName + " quit channel !");
		// var channelObj = Corba.GetObject("#test.my_context/delivery.Object#channel." + curChalID.channelId);
		if(JSON.stringify(this.remoteChalObj) != "null"){
			local.curOperate = "lobby";
			this.remoteChalObj.quit(userName);
		}
	}
	/**
	 * create room
	 */
	curChalObj.createRoom = function(roomConfig){
		local.curOperate = "room";
		//console.log(curUser + " create room !");
		// console.log("roomInfo logic : " + JSON.stringify(roomInfo));
		/**
		 * roomInfo = {
		 *    roomID : ,
		 *    userList : ,
		 * }
		 */
		curRoomObj.setRoomConfig(roomConfig);
		roomConfig.host = curUser; 
		// curRoomObj.mapName = roomConfig.map;
		curRoomObj.mapName = "meteor_crater";
		this.remoteChalObj.setInvoke("createRoom");
		var roomInfo = this.remoteChalObj.createRoom(roomConfig);
		curRoomObj.remoteRoomObj = Corba.GetObject("#test.my_context/delivery.Object#" + roomInfo.roomID);
		// console.log("client channel, roomInfo.userInfoList : " + JSON.stringify(roomInfo.userInfoList));
		Event.Send({
			name : "ui.userCreateRoom",
			userInfoList : roomInfo.userInfoList
		});
		//loadMap(roomConfig);
		//refreshChannel();
	}
	
	var half_wayJoinRoomID ;
	curChalObj.joinRoom = function(userName, roomID){
		local.curOperate = "room";
		this.remoteChalObj.setInvoke("joinRoom");
		var userInfoList = this.remoteChalObj.joinRoom(userName, roomID);
		// console.log("client channel, roomInfo.userInfoList : " + JSON.stringify(userInfoList));
		if(typeof userInfoList == "string")
		{
			//alert(userInfoList);
			return;
		}
		else
		{
			// store roomConfig
			this.remoteChalObj.setInvoke("getRoomInfo");
			var roomConfig = this.remoteChalObj.getRoomInfo(roomID);
			for(var i in roomConfig){
				console.log("roomConfig number : " + i + " : " + roomConfig[i]);
			}
			console.log("roomConfig number : " + roomConfig.number);
			
			curRoomObj.setRoomConfig(roomConfig);
			// set mapName,@todo mapName在roomConfig中获取
			curRoomObj.mapName = "meteor_crater";
			// switch interface
			curRoomObj.remoteRoomObj = Corba.GetObject("#test.my_context/delivery.Object#" + roomID);
			curRoomObj.remoteRoomObj.setInvoke("gameState");
			var ret = curRoomObj.remoteRoomObj.gameState();
			if(ret){
				Event.Send({
					name : "ui.half_wayJoinRoom",
					userInfoList : userInfoList,
					//isStart : true,
					isStart : true
				});
				half_wayJoinRoomID = roomID;
			}else{
				Event.Send({
					name : "ui.userJoinRoom",
					userInfoList : userInfoList
				});
				
			}
		}
		
	}
	/**
	 * destroy room
	 */
	curChalObj.deleteRoom = function(roomID){
		this.remoteChalObj.delRoom(roomID);
	}
	/**
	 * 刷新房间列表
	 */
	curChalObj.refreshChannel = function(){
		this.remoteChalObj.refreshRoomList();
	}
	
	/**
	 * 聊天功能
	 */
	
	curChalObj.channelchat = function(who, content){
		//获取频道服务
		// var channelObj = Corba.GetObject("#test.my_context/delivery.Object#channel." + curChalID.channelId);
		this.remoteChalObj.chatAll(who, content);
		
	}
	
} catch(e){
	alert("err : " + e);
}