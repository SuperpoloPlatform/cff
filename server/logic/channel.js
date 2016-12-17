if(!load("/logic/room.js")){
	alert("Failed to load `room.js`");
}

/**
 * 频道信息
 */
function channel(userList, chlInfo){
	this.userList = [];
	this.userList = userList;
	this.chlInfo = chlInfo;
	this.roomID = 1;   // 临时ID
	/** 
	 * 频道列表，这个应该是动态的，存储在数据库中，暂时先写成固定的，以后再改。
	 */
	 this.roomList = {};
	// this.roomList = {
		// "1" : {"id" : "001", "name" : "room1", "number" : "16", "model" : "baopo", "map" : "yinshi", "target" : "", "time" : "", "harmFriend" : "", "party" : "", "cutin" : "", "watch" : ""}, 
		// "2" : {"id" : "002", "name" : "room1", "number" : "16", "model" : "tuandui", "map" : "", "target" : "", "time" : "", "harmFriend" : "", "party" : "", "cutin" : "", "watch" : ""},
		// "3" : {"id" : "003", "name" : "room2", "number" : "16", "model" : "tuandui", "map" : "", "target" : "", "time" : "", "harmFriend" : "", "party" : "", "cutin" : "", "watch" : ""},
		// "4" : {"id" : "004", "name" : "room2", "number" : "16", "model" : "baopo", "map" : "", "target" : "", "time" : "", "harmFriend" : "", "party" : "", "cutin" : "", "watch" : ""},
		// "5" : {"id" : "005", "name" : "room3", "number" : "16", "model" : "tuandui", "map" : "", "target" : "", "time" : "", "harmFriend" : "", "party" : "", "cutin" : "", "watch" : ""},
	// };
	//this.initRoom();
}

channel.prototype.getChlInfo = function(){
	var tmp = {
		"id" : this.chlInfo.id, 
		"name" : this.chlInfo.name,
		"net" : this.chlInfo.net,
		"level" : this.chlInfo.level
	};
	var count = this.userCount();
	var state;
	if(count < 100)
	{
		state = "空闲";
	}
	else if(count < 900)
	{
		state = "拥挤";
	}
	else
		state = "爆满";
	tmp.state = state;
	return tmp;
}

channel.prototype.userCount = function(){
	var count = 0;
	for(var i in this.userList){
		count++;	
	}
	return count;
}
channel.prototype.enter = function(curUser){
	console.log(curUser + " enter channel start!");
	this.userList[curUser] = this.getUserInfo(curUser);
	this.userList[curUser].agent = Corba.GetObject("#test.my_context/delivery.Object#" + curUser);
	// console.log("chanl server, userInfo : " + JSON.stringify(this.userList));
	console.log(curUser + " enter channel end!");
	return true;
}
channel.prototype.getUserInfo = function(curUser){
	// console.log("get " + curUser + " info !");
	var where = "userName = '" + curUser + "'";
	var rs = userTable.Select(where);  
	var ret = {};
	while(rs.next()){                      
		ret["id"] = curUser;   // userId 是登陆后服务器分配的。
		ret["userName"] = rs.getValue("userName");      
		ret["nickName"] = rs.getValue("nickName");  
	}  
	// console.log("userInfo : " + JSON.stringify(ret));
	return ret;
}
channel.prototype.quit = function(curUser){
	console.log(curUser + " quit channel !");
	delete this.userList[curUser];
}
channel.prototype.getRoomList = function(){
	var tmpRoomList = {};
	for(var i in this.roomList)
	{
		if(this.roomList[i])
		{
			tmpRoomList[i] = {};
			tmpRoomList[i] = this.roomList[i].roomConfig;
			tmpRoomList[i].count = this.roomList[i].getCount(); // 当前人数
			tmpRoomList[i].state = this.roomList[i].roomState(); // 空间状态
			tmpRoomList[i].roomId = this.roomID - 1; // 空间状态
			console.log("tmpRoomList[i].state ： " +　tmpRoomList[i].state + ".\n");
		}
	}
	return tmpRoomList;
}
channel.prototype.getRoomInfo = function(roomID){
	// console.log("room info, room ID : " + JSON.stringify(this.roomList[roomID].roomConfig));
	return this.roomList[roomID].roomConfig;
}
channel.prototype.createRoom = function(roomConfig){
	var chlIDPre = this.chlInfo.id + "_";
	roomConfig.id = chlIDPre + this.roomID;
	// for(var i in this.roomList)
		// console.log("roomList : " + JSON.stringify(this.roomList[i]));
	var type = "room";
	//应该分配roomID，若使用roomName作为对象标识，必须不允许房间名重复
	var roomName = type + "." +  roomConfig.id;
	var room = new Room(this);
	room.create(roomConfig);
	// console.log("CreateRoom, roomID:" + roomName);
	Corba.RegisterObject("#test.my_context/delivery.Object#" + roomName, room);
	this.roomList[roomName] = room;    // uuid
	this.roomID++;
	//返回房间信息，包括房间id，以及房间内玩家列表
	var ret = {};
	console.log("before room.getUserInfoList!");
	ret.userInfoList = room.getUserInfoList();
	ret.roomID = roomName;
	console.log("before loop");
	room.isRoomName();
	//向频道内的其他玩家发送创建房间的通知 
	for(var i in this.userList)
	{
		var target = this.userList[i].userName;
		this.userList[target].agent.refreshChanl(this.getRoomList());
	};
	return ret;
}

channel.prototype.joinRoom = function(userName, roomID){
	// console.log("server joinRoom, roomID:" + roomID);
	// console.log("server joinRoom, typeof:" + typeof this.roomList[roomID]);
	if(typeof this.roomList[roomID] == "undefined"){
		return "房间不存在";
	//暂不考虑人满
	// else if(this.roomList[roomID].isFull())
	// {
		// return "房间人数已满";
	// }
	} else {
		//可以进入房间
		// console.log("server channel join room, this.roomList[roomID] : " + JSON.stringify(this.roomList[roomID]));
		var userInfoList = this.roomList[roomID].join(userName);
		return userInfoList;
	}
}
/**
 * 房间详细信息列表
 */
// channel.prototype.getRoomInfoList = function(){
	// console.log("getRoomInfoList :" + JSON.stringify(this.roomList);
	// var roomInfoList = {};
	// for(var i in this.roomList){
		// roomInfoList[i] = {};
		// roomInfoList[i].roomId = this.roomList[i].roomConfig.id; // room id
		// roomInfoList[i].count = this.roomList[i].getCount(); // 人数
		// roomInfoList[i].state = this.roomList[i].gameState(); // 空间状态
		// roomInfoList[i].number = this.roomList[i].roomConfig.number; // 空间原始人数
		// roomInfoList[i].name = this.roomList[i].roomConfig.name; // 空间名称
	// }
	// return roomInfoList;
// }

channel.prototype.destroyRoom = function(roomID){
	var id = "room." + roomID;
	if(this.roomList[id])
	{
		delete this.roomList[id];
		//向频道内所有玩家发送更新房间列表的消息
		for(var i in this.userList)
		{
			var target = this.userList[i].userName;
			var list = this.getRoomList();
			this.userList[target].agent.refreshChanl(list);
		};
	}
}

/**
 * 刷新房间列表
 */
channel.prototype.refreshRoomList = function(){
	for(var i in this.userList){
		console.log("notice refresh channel user list : " + i + " :: " + JSON.stringify(this.userList[i]));
		var userObj = Corba.GetObject("#test.my_context/delivery.Object#" + this.userList[i].userName);
		// console.log("notice refresh channel room list : " + i + " :: " + JSON.stringify(this.roomList));
		
		userObj.refreshChanl(this.getRoomList()); 
	}
}
channel.prototype.chatAll = function(who, msg){
	//console.log("chatAll....")
	//遍历userList，向频道内所有人发送消息
	for(var i in this.userList){
		if(this.userList[i].userName != who){  //排除发送者自己
			var target = this.userList[i].userName;
			//获取用户注册信息服务
			var targetobj = Corba.GetObject("#test.my_context/delivery.Object#" + target);
			targetobj.Chat(who, msg); //向所有人发送消息
		}
	}
	
	
}
channel.prototype.chatArmy = function(){
	//暂不实现
}