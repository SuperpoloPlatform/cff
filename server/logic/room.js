if(!load("/logic/scene.js"))
{
	alert("Failed to load `scene.js`");
}
/**
 * 房间信息
 * userList ： 在房间中，用户列表
 * roomConfig ： 房间设置信息
 * userLoc ： 在房间中，用户位置
 */
function Room(chl){
	this.channel = chl;
	this.scene = {};
	this.roomConfig = {};
	this.isStart = false;
	/**
	 * userList = {
	 *  agent : userObj,
	 *  nickName : "", 
	 *	isReady : false, 
	 *	isHost : true, 
	 * }
	 **/
	this.userList = {};
	this.userCount = 0;
}

Room.prototype.create = function(roomConfig)
{
	//房间内最多玩家个数可以设置？
	this.roomConfig = roomConfig;
	var userName = roomConfig.host;
	var agentObj =  Corba.GetObject("#test.my_context/delivery.Object#" + userName);
	var userInfo = this.getUserInfo(userName);
	this.userList[++this.userCount] = {
		agent : agentObj,
		userName : userName,
		nickName : userInfo.nickName, 
		isReady : true, 
		isHost : true, 
		loadMapOk : false,
		loc : 1
	};
	// 根据选择的模式创建相应的模式对象
	this.modeObj = null;
	var mode = this.roomConfig.model;
	switch(mode)
	{
		case "守护模式" :
			console.log("game model pve !");
			this.modeObj = new GuardianMode();
			break;
		case "团队复生" :
			console.log("game model pvp !");
			this.modeObj = new VsMode();
			break;
		default :
			alert("error : no model !");
	}
}

// Room.prototype.getRoomInfo = function()
// {
	// var info = {};
	// info.id = this.roomConfig.id;
	// info.userInfoList = this.getUserInfoList();
	// return info;
// }
/**
 * 房间名称
 */
Room.prototype.isRoomName = function(){
	if(this.roomConfig.name == ""){
		console.log("room name is " + this.userList[1].nickName);
		this.roomConfig.name = this.userList[1].nickName;
	}
}

Room.prototype.isFull = function(){
	var count = this.getCount();
	if(count >= this.roomConfig.number)
		return true;
	else
		return false;
}
/**
 * 玩家进入房间预判条件
 */
Room.prototype.join = function(userName){
	console.log(userName + " join room\n");
	//需要考虑玩家退出的情况
	for(var i = 1; i <= this.roomConfig.number; i ++)
	{
		if(typeof this.userList[i] == "undefined")
			break;
	}
	console.log("send notice end");
	var agentObj = Corba.GetObject("#test.my_context/delivery.Object#" + userName);
	var userInfo = this.getUserInfo(userName);
	this.userList[i] = {
		agent : agentObj,
		userName : userName,
		nickName : userInfo.nickName, 
		isReady : false, 
		isHost : false, 
		loadMapOk : false,
		loc : i
	};
	this.userCount ++;
	//房间内玩家列表
	var tmpList = this.getUserInfoList();
	//向房间内其他玩家发送玩家进入房间的通知
	// var userInOwnner = {};
	// userInOwnner[i] = this.userList[i];
	// console.log("!!!!!!!!!!!!!!\n");
	// for(var i in this.userList){
		// if(this.userList[i].userName == userName){
			// // console.log("server, i : " + i);
			// userInOwnner[i] = this.userList[i];
			// //this.userList[i].isReady = false;
		// }
	// }
	//console.log("this.isStart :" + this.isStart + "\n");
	if(this.isStart){//游戏已经开始
		console.log("game is start! \n");
		/**
		* 将在游戏场景中的用户信息显示：“游戏进行中”
		*/
		var sceneUserList = this.scene.userList;
		for(var j in this.userList){
			this.userList[j].agent.noticeEnter(sceneUserList, this.isStart);
		}
		console.log("sceneUserList : " + JSON.stringify(sceneUserList));
		/**
		* 将不在游戏场景中但在房间中的用户信息显示：“准备就绪”
		*/
		var index = false;
		var noGameList = {};
		for(var i in this.userList){
			console.log("this.userList[i].userName : " + this.userList[i].userName);
			index = false;
			for(var j in this.scene.userList){
				if(this.userList[i].userName == this.scene.userList[j].userName){
					index = true;
					break;
				}
			}
			if(!index){
				noGameList[i] = {};
				noGameList[i] = this.userList[i];
				// for(var j in this.userList){
					// this.userList[j].agent.noticeEnter(noGameList, this.isStart);
				// }
			}
			// this.userList[j].agent.noticeEnter(noGameList, this.isStart);
		}
		console.log("noGameList : " + JSON.stringify(noGameList));
		for(var j in this.userList){
			this.userList[j].agent.noticeEnter(noGameList, this.isStart);
		}
		
	} else {//游戏没有开始的情况,将房间中的用户信息显示出来
		console.log("game is not start! \n");
		for(var i in this.userList){
			this.userList[i].agent.noticeEnter(this.userList, this.isStart);
		}
	}
    //中途进入房间中的用户通知房间其他用户更新用户信息列表。
	// for(var j in this.userList){
		// //if(this.userList[j].userName != userName){
			// // console.log("server join, userList : " + JSON.stringify(this.userList[j]));
			// console.log("server join, userInOwnner : " + JSON.stringify(userInOwnner) + "\n");
			// this.userList[j].agent.noticeEnter(userInOwnner, this.isStart); 
		// //}
	// }
	// 根据选择的模式创建相应的模式对象
	this.modeObj = null;
	var mode = this.roomConfig.model;
	switch(mode)
	{
		case "守护模式" :
			console.log("game model pve !");
			this.modeObj = new GuardianMode();
			break;
		case "团队复生" :
			console.log("game model pvp !");
			this.modeObj = new VsMode();
			break;
		default :
			alert("error : no model !");
	}
	console.log("join room end");
	//console.log("server join, tmpList : " + JSON.stringify(tmpList));
	return tmpList;
}

/**
 * get user list
 */
// Room.prototype.getUserInfoList = function(){
	// return this.userList;
// }

Room.prototype.getSceneMsg = function(userName){
	console.log("room getSceneMsg start");
	var sceneMsg = {};
	for(var i in this.userList)
	{
		if(this.userList[i].userName == userName)
		{
			console.log("init cutin userMsg");
			this.scene.userList[i] = this.scene.getInitUserMsg(this.userList[i]);
			break;
		}
	}
	sceneMsg.roomConfig = this.roomConfig;
	sceneMsg.playerInfoList = this.scene.getPlayerInfoList();
	sceneMsg.sceneID = this.scene.sceneID;
	console.log("room getSceneMsg end");
	return sceneMsg;
}

Room.prototype.getUserInfoList = function(){
	var tmpList = {};
	// console.log("server room, getuserList : " + JSON.stringify(this.userList));
	for(var i in this.userList)
	{
		tmpList[i] = {};
		tmpList[i].agent = this.userList[i].agent;
		tmpList[i].nickName = this.userList[i].nickName;
		tmpList[i].userName = this.userList[i].userName;
		tmpList[i].isReady = this.userList[i].isReady;
		tmpList[i].isHost = this.userList[i].isHost;
		tmpList[i].loc = this.userList[i].loc;
	}
	return tmpList;
}

/**
 * get ready member list
 */
Room.prototype.getReadyList = function(){
	var readyList = {};
	for(var i in this.userList){
		if(this.userList[i].isReady == true){
			readyList[i] = this.userList[i];
		}
	}
	return readyList;
}

/**
 * get room id
 */
Room.prototype.roomID = function(){
	return this.roomConfig.id;
}

Room.prototype.loadMapOk = function(user){
	console.log("Room.prototype.loadMapOk start !");
	var flag = true;
	//console.log("temporaryUserlist ***" + JSON.stringify(temporaryUserlist));
	for(var i in temporaryUserlist)
	{
		//console.log("temporaryUserlist :::" + JSON.stringify(temporaryUserlist));
		if(temporaryUserlist[i].userName == user)
		{
			flag = false;
			temporaryUserlist[i].loadMapOk = true;
			break;
		}
	}
	if(flag)
	{
		console.log("play is not in this room!");
	}
	else
	{
		if(this.isStart)
		{
			//console.log("this.isStart :" + this.isStart);
			//检查是否所有玩家都已经加载地图成功
			console.log("this.allLoadMapOk() =" + this.allLoadMapOk());
			if(this.allLoadMapOk())
			{
				//console.log("this.allLoadMapOk() ::" + this.allLoadMapOk());
				//初始化场景
				//this.initScene();
				this.switchScene();
			}
			
		}
	}
}

// 向client发送进入场景界面的消息
Room.prototype.switchScene = function(){
	this.scene.switchScene(this.roomConfig);
}

/**
 * 取消准备
 */
Room.prototype.CancelReady = function(curUser){
	//向房间内其他玩家发送玩家取消准备游戏的通知
	var userCancelReady = {};
	for(var i in this.userList){
		if(this.userList[i].userName == curUser){
			userCancelReady[i] = this.userList[i];
			this.userList[i].isReady = false;
		}
	}
	for(var i in this.userList){
		console.log("notice Cancel Ready !");
		this.userList[i].agent.noticeCancelReady(userCancelReady);
	}
}
/**
 * 准备
 */
Room.prototype.ready = function(curUser){
	//向房间内其他玩家发送玩家准备游戏的通知
	var userInOwnner = {};
	for(var i in this.userList){
		if(this.userList[i].userName == curUser){
			userInOwnner[i] = this.userList[i];
			this.userList[i].isReady = true;
		}
	}
	for(var i in this.userList){
		if(this.userList[i].userName != curUser){
			this.userList[i].agent.noticeReady(userInOwnner);
		}
	}
	// console.log("server ready, this.userList : " + JSON.stringify(this.userList));
	//console.log(curUser + " ready room , server !");
	return userInOwnner;
}
/**
 * 玩家退出房间
 */
Room.prototype.quit = function(curUser){
	console.log(curUser + " quit room , server !");
	var flag = false;
	var loc;
	for(var i in this.userList)
	{
		if(this.userList[i].userName == curUser)
		{
			loc = this.userList[i].loc;
			flag = true;
			break;
		}
	}
	if(flag)
	{
		/**
		 * 房主退出房间
		 */
		var newHost = 0; 
		var ishost = false;
		if(this.userList[i].isHost)
		{
			ishost = true;
			//选择房间用户列表中的第一个人作为房主。
			//delete this.userList[i];
			var roomName = "";
			for(var i in this.userList){
				if(this.userList[i].userName == curUser){
					roomName = this.userList[i].nickName;
				}
			}
			//房主退出房间后，更改房间名称
			if(this.roomConfig.name == roomName){
				var slogan = "战斗吧！少年！";
				this.roomConfig.name = slogan;
				for(var i in this.channel.userList){
					this.channel.userList[i].agent.refreshChanl(this.channel.getRoomList());
				}
			}
			for(var j in this.userList){
				if(this.userList[j].userName != curUser){ 
					//console.log("@@@@this.userList : " + JSON.stringify(this.userList) + "\n");
					console.log(this.userList[j].userName + " is new host !");
					this.userList[j].isHost = true;
					this.userList[j].isReady = true;
					newHost = this.userList[j].loc;
					break;
				}
			}		
		}
		//var loc = this.userList[i].loc;
		// console.log("server quit, host : " + this.userList[i].isHost);
		// console.log("server quit, host : " + this.userList[i].isReady);
		//delete this.userList[i];
		// console.log("server quit, userList : " + this.userList[i]);
		console.log("this.userList[i].userName =" + this.userList[loc].userName );
		delete this.userList[loc];
	
		//向房间内其他玩家发送玩家退出房间的通知
		var isEmpty = true;
		// var tmpList = this.getUserInfoList();
		for(var j in this.userList)
		{
			console.log("this.userList : " + JSON.stringify(this.userList) + "\n");
			isEmpty = false;
			this.userList[j].agent.noticeQuit(/*lastHost*/loc);
			if(ishost)
			{
				console.log("ishost :" + ishost + "\n");
				 var userInOwnner = {};
				 userInOwnner[newHost] = this.userList[newHost];
				// this.userList[j].agent.updateHost(userInOwnner);
				
				//游戏已经开始，判断新房主是在游戏场景中还是房间界面中
				if(this.gameState()){
					for(var i in this.scene.userList){
						if(this.scene.userList[i].userName == this.userList[newHost].userName){
							// 在游戏场景中
							console.log("game start ,new host in scene!");
							this.scene.userList[i].isHost = true;
						}else{
							console.log("game start ,new host in room!");
							// 在房间界面中
							this.userList[i].agent.newHost(userInOwnner)
						}
					}	
				}else{
					// 游戏没有开始，则新房主一定在房间等候界面。
					console.log("new host in room!");
					//var userInOwnner = {};
					//userInOwnner[newHost] = this.userList[newHost];
					this.userList[j].agent.updateHost(userInOwnner);
				}
			}
		}
		if(isEmpty)
		{
			//向当前频道内所有玩家发送该房间销毁的通知
			this.channel.destroyRoom(this.roomConfig.id);
		}
		return loc;
	}
	else
	{
		console.log(curUser + "is not in room");
		return;
	}
	return true;
}
/**
 * 更换房主，前题是房间内还有玩家。
 */
function updateHost(){
	if(this.getCount()){
		console.log("update host !");
		for(var i in this.userList){
			this.userList[i].status = "host";
			break;
		}
	}
}

Room.prototype.allLoadMapOk = function(curUser){
	console.log("Room.prototype.allLoadMapOk start \n");
	var flag = true;
	for(var i in temporaryUserlist)
	{
		if(!temporaryUserlist[i].loadMapOk)
		{
			//console.log("temporaryUserlist[i].userName :" + temporaryUserlist[i].userName);
			flag = false;
			console.log("allLoadMapOk false, i:" + i + " . \n");
			break;
		}
	}
	console.log("Room.prototype.allLoadMapOk end");
	return flag;
}
var temporaryUserlist = {};
Room.prototype.isAllowStart = function(){
	//人数:不能只有房主
	//除房主外，其它人都已经准备就绪
	//如果符合条件返回0，否则返回不允许开始游戏的信息
	for(var i in this.userList){
		temporaryUserlist[i] = {};
		temporaryUserlist[i].agent = this.userList[i].agent;
		temporaryUserlist[i].userName = this.userList[i].userName;
		temporaryUserlist[i].nickName = this.userList[i].nickName;
		temporaryUserlist[i].isReady = this.userList[i].isReady;
		temporaryUserlist[i].isHost = this.userList[i].isHost;
		temporaryUserlist[i].loadMapOk = this.userList[i].loadMapOk;
		temporaryUserlist[i].loc = this.userList[i].loc;
	}
	//console.log("temporaryUserlist :" + JSON.stringify(temporaryUserlist));
	// var ret = true;
	
	var models = this.modeObj.isAllowStart(temporaryUserlist); // 返回值0不允许开始，反之允许开始。
	// if(this.getCount() > 1){
		// for(var i in temporaryUserlist){
			// if(!(temporaryUserlist[i].isReady)){
				// ret = false;
				// break;
			// }
		// }
		// return ret ; 
	// }
	return models;
	// 一个人也可以开始游戏
	// return ret;
}
/**
 * 开始
 */
Room.prototype.start = function(curUser, playerSpawnPos, bornConfig, monsterSpawnPos){
	console.log("room.prottype.start!\n");
	//房主已经点击开始按钮
	this.isStart = true;
	// this.setPlayerSpawnPos(playerSpawnPos);
	this.initScene(playerSpawnPos, bornConfig, monsterSpawnPos);
	console.log("room.prottype.end!\n");
	//更新房间列表中的空间状态
	for(var i in this.channel.userList){
		this.channel.userList[i].agent.refreshChanl(this.channel.getRoomList());
	
	}
	// if(this.allLoadMapOk()){
		// //初始化场景
		// this.initScene();
	// }
}

// Room.prototype.setPlayerSpawnPos = function(playerSpawnPos){
	// for(var i in this.userList)
	// {
		// this.userList[i].spawnPos = playerSpawnPos[i];
	// }
// }

Room.prototype.gameState = function(){
	console.log("get game state!!\n");
	console.log("this.isStart : " + this.isStart + "\n");
	return this.isStart;
}

Room.prototype.roomState = function(){
	console.log("get room state!!\n");
	console.log("this.isStart : " + this.isStart + "\n");
	var State = "";
	if(this.isStart){
		State = "进行中";
		console.log("State :" + State + "\n");
	} else {
		State = "等待中";
		console.log("State ::" + State + "\n");
	}
	return State;
}

Room.prototype.quitGamming = function(curUser){
	this.scene.quitGamming(curUser);
}

Room.prototype.initScene = function(playerSpawnPos, bornConfig, monsterSpawnPos){
	console.log("room initScene start\n");
	var sceneID = "scene." + this.roomConfig.id;
	this.scene = new Scene(sceneID, this, playerSpawnPos, bornConfig, monsterSpawnPos);
	Corba.RegisterObject("#test.my_context/delivery.Object#" + sceneID, this.scene);
	this.scene.loadMap();
	console.log("room initScene end\n");
}

//已废弃
// Room.prototype.half_wayEnter = function(curUser){
	// console.log("half_wayEnterUser start!\n");
	// var sceneID = "scene." + this.roomConfig.id;
	// var playerInfo = {};
	// for(var i in this.userList){
		// if(this.userList[i].userName == curUser){
			// playerInfo.userName = this.userList[i].userName;
			// playerInfo.nickName = this.userList[i].nickName;
			// playerInfo.isHost = this.userList[i].isHost;
			// this.userList[i].isReady = true;
			// playerInfo.isReady = this.userList[i].isReady;
			// playerInfo.loc = this.userList[i].loc;
			// playerInfo.position = [-704 + this.userList[i].loc, 500, -370];
			// this.scene.cutInScene(this.userList[i]);
			// this.userList[i].agent.enterScene(this.scene.getPlayerInfoList(), sceneID);
		// } 
	// }
	// for(var i in this.userList){
		// if(this.userList[i].userName != curUser){
			// this.userList[i].agent.half_wayEnterScene(playerInfo);
		// }
	// }
	// console.log("half_wayEnterUser end!\n");
// } 

/**
 * 通知所有用户进入，准备，开始，退出
 */
Room.prototype.userNotice = function(type, userName){
	console.log("user notice type : " + type);
	noticeUser(type, this.userList, userName);
}
/**
 * room user count.
 */
Room.prototype.getCount = function(){
	var count = 0;
	for(var i in this.userList){
		count++;
	}
	// console.log("get user list count : " + count + " \n");
	return count;
}
/**
 * room user ready count.
 */
Room.prototype.getReadyCount = function(){
	var count = 0;
	for(var i in this.userList){
		if(this.userList[i].state == "ready"){
			count++;
		}
	}
	return count;
}
/**
 * get user info
 * curUser : userName
 */
Room.prototype.getUserInfo = function(curUser){
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
	if(JSON.stringify(ret) == "{}"){
		return 0;
	} else {
		return ret;
	}
}
/**
 * 获取某一玩家信息
 */
Room.prototype.getUserInfoSer = function(curUser){
	// console.log("server, curUser : " + curUser);
	// console.log("server, userList : " + JSON.stringify(this.userList));
	// console.log("server, userList curUser : " + JSON.stringify(this.userList[curUser]));
	return this.userList[curUser];
}
/**
 * 通知不在游戏中但在房间中的用户跳转界面
 */
 Room.prototype.SwitchInterface = function(sceneUList){
	console.log("Switch Interface start ! \n");
	for(var i in this.userList){
		console.log("this.userList[" + i + "] = " + JSON.stringify(this.userList[i]));
		if(typeof(sceneUList[i]) != "undefined" ){
			//console.log("this.userList[" + i + "].userName = " + this.userList[i].userName);
			console.log("sceneUList[" + i + "].userName = " + sceneUList[i].userName);
		}else {
			console.log("user in = " + this.userList[i].userName);
			this.userList[i].agent.ContinueGame(this.getUserInfoList());
		}
		
	}
	console.log("Switch Interface end ! \n");
 }
/*Room.prototype.SwitchInterface = function(sceneUList){
	console.log("Switch Interface start !");
	for(var i in this.userList){
		var index = false;
		// console.log("this.userList[" + i + "] = " + JSON.stringify(this.userList[i]));
		for(var j in sceneUList){
			// console.log("sceneUList[" + j + "] = " + JSON.stringify(sceneUList[j]));
			if(this.userList[i].userName == sceneUList[j].userName){
				index = true;
				break;
			}
		}
		if(!index){
			// console.log("this.userList[i] = " + this.userList[i].userName);
			this.userList[i].agent.ContinueGame(this.getUserInfoList());
		}
	}
}*/

/**
 * 遍历userList，向频道内所有人发送消息
 */
Room.prototype.chatAll = function(msg){
	
}
/**
 * 暂不实现
 */
Room.prototype.chatArmy = function(){
	
}