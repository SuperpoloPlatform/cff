/**
 * 房间
 */
try{
	// if(!load('/logic/player_entity.js'))
	// {
		// alert("Failed to load `player_entity.js`");
	// }
	// if(!load("../art/logic/camera.js")){
		// alert("Failed to load `camera.js`");
	// }
	if(!load("/logic/object/player.js")){
		alert("Failed to load `player.js`");
	}
	if(!load("/logic/object/other_player.js")){
		alert("Failed to load `/logic/object/other_player.js`");
	}
	if(!load("/logic/effect/player_effect.js")){
		alert("Failed to load `/logic/effect/player_effect.js`");
	}
	if(!load("/logic/effect/monster_effect.js")){
		alert("Failed to load `/logic/effect/monster_effect.js`");
	}
	if(!load("/logic/object/yang.tpl.js")){
		alert("Failed to load `yang.tpl.js`");
	}
	
	// set roomConfig
	curRoomObj.setRoomConfig = function(config)
	{
		this.roomConfig = config;
	}
	/**
	 * 游戏准备
	 */
	curRoomObj.readyGame = function(userName){
		this.remoteRoomObj.setInvoke("ready");
		var ret = this.remoteRoomObj.ready(userName);
		if(ret){
			//local.curOperate = "ingame";
			Event.Send({
				name : "ui.userReadyGame",
				userInfoList : ret
			});
			// console.log(userName + " ready !");
		}
	}
	/**
	 * 取消游戏准备
	 */
	curRoomObj.cancelReady = function(userName){
		this.remoteRoomObj.setInvoke("CancelReady");
		this.remoteRoomObj.CancelReady(userName);
	}
	/**
	 * 游戏开始
	 */
	curRoomObj.startGame = function(userName){
		// this.remoteRoomObj.setInvoke("getReadyCount");
		// var count = this.remoteRoomObj.getReadyCount();
		// if(count == 8){
			// console.log(userName + " all start !");
			// this.remoteRoomObj.start(userName);
		// }
		//如果需要验证是否是房主发出的开始游戏命令，则需要发送userName
		console.log("click start game button!");
		this.remoteRoomObj.setInvoke("isAllowStart");
		var ret = this.remoteRoomObj.isAllowStart();
		if(ret){
			//local.curOperate = "ingame";
			var mapPath = "/art/world/" + this.mapName;
			var dataPath = mapPath + "/mapdata.js";
			if(!load(dataPath))
			{
				alert("Failed to load " + dataPath);
			}
			// 根据选择的难度将刷怪的信息传给server
			// if(this.roomConfig.difficulty == "simple")
			var bornConfig = MapData.simple.round;
			var playerSpawnPos = MapData.playerSpawnPos;
			var monsterSpawnPos = MapData.monsterSpawnPos;
			this.remoteRoomObj.start(userName, playerSpawnPos, bornConfig, monsterSpawnPos);
			// var isGameOver = this.remoteRoomObj.Timmig();
			// console.log("game over!")
			// if(isGameOver == "game over"){
				// Event.Send({
					// name : "ui.gameOver"
				// });
			// }
		}else{
			alert("MSG: 稍等");
		}
	}
	
	/**
	 * 中途进入游戏
	 */
	curRoomObj.half_wayEnterGame = function(userName){
		console.log("half_way Enter Game ：" + userName + " .\n");
		//this.setInvoke("getRoomInfo");
		//this.remoteRoomObj = Corba.GetObject("#test.my_context/delivery.Object#" + half_wayJoinRoomID);
		//console.log("half_wayJoinRoomID:" + half_wayJoinRoomID + " .\n");
		//var roomConfig = curChalObj.getRoomInfo(half_wayJoinRoomID);
		this.remoteRoomObj.setInvoke("getSceneMsg");
		var sceneMsg = this.remoteRoomObj.getSceneMsg(userName);
		if(typeof(sceneMsg) == "undefined")
		{
			alert("get Scene Msg error!");
			return;
		}
		this.half_loadMap(sceneMsg.roomConfig, sceneMsg.playerInfoList, sceneMsg.sceneID);
		
	}
	
	/**
	 * 退出房间
	 */
	curRoomObj.quitRoom = function(userName){
		/**
		 * 销毁退出房间的用户在房间中的信息
		 */
		this.remoteRoomObj.setInvoke("quit");
		//this.remoteRoomObj.quit(userName);
		var ret = this.remoteRoomObj.quit(userName);
		if(ret){
			if(typeof this.remoteRoomObj != "null")
				this.remoteRoomObj = null;
			local.curOperate = "channel";
			Event.Send({
				name : "ui.userQuitRoom",
				loc : 0
			});   // 清除用户自己房间信息
			curChalObj.refreshChannel();
		}
	}
	
	curRoomObj.half_loadMap = function(roomConfig, playerInfoList, sceneName){
		console.log("half_loadMap map !\n");
		// var number = roomConfig.number;
		// var meshNameObj = {};
		// for(var i = 1; i <= number; i++){
			// meshNameObj[i] = "man_" + i;
		// }
		// /**
		 // * mapName -- 正常是从roomConfig房间信息中取得的。暂时假设为固定值。
		 // */
		// var mapName = "/art/world.xml";
		// // console.log("mesh obj : " + JSON.stringify(meshNameObj) + "\n");
		// var worldNode = this.addMeshObj(meshNameObj, mapName);
		
		// var ret = loadWorld(worldNode, playerInfoList, sceneName);
		// if(ret)
		// {
			// curScene.halfLoadMapOk(curUser);
		// }
		var number = roomConfig.number;
		var meshNameObj = {};
		for(var i = 1; i <= number; i++){
			meshNameObj[i] = "man_" + i;
		}
		/**
		 * mapName -- 正常是从roomConfig房间信息中取得的。暂时假设为固定值。
		 */
		// var mapName = roomConfig.map;
		// var mapName = "meteor_crater";
		var mapPath = "/art/world/" + this.mapName;
		var worldPath = mapPath + "/world.xml"
		// var dataPath = mapPath + "/mapdata.js";
		// if(!load(dataPath))
		// {
			// alert("Failed to load " + dataPath);
		// }
		var models = "/art/models/world_man.xml";
		// console.log("mesh obj : " + JSON.stringify(meshNameObj) + "\n");
		var worldNode = this.addMeshObj(meshNameObj, worldPath, models);
		
		var iThreadedLoader = Registry.Get('iThreadedLoader');
		iThreadedLoader.flags = 1;
		iThreadReturn = iThreadedLoader.LoadMapFile('/art/', worldNode);
		iThreadReturn.onfinish = function(){
			//向server发送中途进入场景的消息
			curRoomObj.loadWorld(playerInfoList, sceneName);
			console.log(curUser + ":load map end\n");
			curScene.halfLoadMapOk(curUser);
		}
	}
	
	curRoomObj.loadMap = function(roomConfig, playerInfoList, sceneName){
		console.log(" load map !\n");
		var number = roomConfig.number;
		var meshNameObj = {};
		for(var i = 1; i <= number; i++){
			meshNameObj[i] = "man_" + i;
		}
		/**
		 * mapName -- 正常是从roomConfig房间信息中取得的。暂时假设为固定值。
		 */
		// var mapName = roomConfig.map;
		// var mapName = "meteor_crater";
		var mapPath = "/art/world/" + this.mapName;
		var worldPath = mapPath + "/world.xml"
		// var dataPath = mapPath + "/mapdata.js";
		// if(!load(dataPath))
		// {
			// alert("Failed to load " + dataPath);
		// }
		var models = "/art/models/world_man.xml";
		// console.log("mesh obj : " + JSON.stringify(meshNameObj) + "\n");
		var worldNode = this.addMeshObj(meshNameObj, worldPath, models);
		
		var iThreadedLoader = Registry.Get('iThreadedLoader');
		iThreadedLoader.flags = 1;
		iThreadReturn = iThreadedLoader.LoadMapFile('/art/', worldNode);
		if(iThreadReturn.WasSuccessful)
		{
			iThreadReturn.onfinish = function(){
				curRoomObj.loadWorld(playerInfoList, sceneName);
				console.log(curUser + ":load map end\n");
				curRoomObj.remoteRoomObj.loadMapOk(curUser);
			}
		}
		else
			alert("load map failed!");
	}
	
	
	curRoomObj.loadWorld = function(playerInfoList, sceneName){
		//alert("loadWorld");
		var ret;
		var startTime = new Date().getTime();
		var loader = C3D.loader;
		curScene = Corba.GetObject("#test.my_context/delivery.Object#" + sceneName);
		engine.setVFSCache("/cache");
		engine.Prepare();	
		// Entities.CreateEntity(CAMERA);
		//alert("before create entity!");
		for(var i in playerInfoList)
		{
			if(curUser == playerInfoList[i].userName)
			{
				ret = selfObj.createSelfPlayer(playerInfoList[i]);
			}
			else
			{
				ret = selfObj.createOtherPlayer(playerInfoList[i]);	
			}
			if(!ret)
			{
				// 弹出悬浮框，让用户选择是重新加载地图还是跳转到频道界面
				break;// or return?
			}
		}
		//alert("create entity end!");
		console.log("create player entity end");
		// 创建怪物 
		// 简单难度，由于现在没有难度选项，所以暂时都默认简单难度，暂时在开始游戏时就创建怪物
		
		// var monsterConfig = MapData.simple.round;
		// var monsterSpawnPos = MapData.monsterSpawnPos;
		// selfObj.setMonsterConfig(monsterConfig, monsterSpawnPos);
		var sectorList = engine.sectors;
		if(sectorList.count > 0)
		{
			var sec = sectorList.Get(0);
			if(sec){
				// 规避删除sector时，发现sector已经被删除掉的问题
				if(refFlag)
				{
					refFlag = false;
					sec.IncRef();
				}
				var max = sec.meshes.count;
				// console.log("max:" + max);
				for(var i = 0; i < max;i++){
					var meshwrapper = sec.meshes.Get(i);
					if(meshwrapper){
						//alert('begin mesh ',meshwrapper.object.name);
						var ok = C3D.colsys.InitializeCollision(meshwrapper);
						//alert('end ',ok);
					}
					else
					{
						alert("meshwrapper is null, i = " + i);
					}
				}
			}
			else
			{
				alert("error : sector is null!\n");
			}
		}
		
		// iThreadedLoader = Registry.Get('iThreadedLoader');
		// iThreadedLoader.flags = 1;
		// console.log("iThreadedLoader.LoadMapFile : " + iThreadedLoader.LoadMapFile);
		// iThreadReturn = iThreadedLoader.LoadMapFile('/art/', node_world);
		// iThreadReturn.onfinish = function(){
			// //向server发送加载地图成功的消息
			// curRoomObj.loadMapOk(curUser);
			// CONSOLE.WriteLine("LoadMapFile---waiwei---- over");
		// }
	}
	
	curRoomObj.addMeshObj = function(meshNameObj, mapName, models){	
		var rootdir = CmdLine.GetOption("rootdir");
		if(rootdir)
		{
			VFS.Mount("/",this.AppendSeperator(this.GetFullPath(rootdir)));
		}else
		{//否则以当前路径为root路径。
			VFS.Mount("/",this.AppendSeperator(System.StartupPath()));
		}
		
		// 动态创建场景文件，从命令行获取
		var scenefile = mapName;
		if(CmdLine.GetOption("scene"))
		{
			scenefile = CmdLine.GetOption("scene");
		}
		
		
		do{
			//场景文件不存在。
			if(!VFS.Exists(scenefile))
			{
				System.exitcode = 10;
				System.exitmsg = "world not found!!";
				break;
			}
			
			var xml_mainworld = new xmlDocument();
			var worldfile = VFS.Open(scenefile);
			if(!worldfile)
			{
				System.exitcode = 11;
				System.exitmsg = "cant open world!!";
				break;
			}
			
			if(!xml_mainworld.Parse(worldfile))
			{//分析错误
				System.exitcode = 12;
				System.exitmsg = "world parse error!!";
				break;
			}
			
			var node_world = xml_mainworld.root.GetChild("world");
			
			if(!node_world)
			{
				alert('world file no world tag');
				break;
			}
			
			// 在加载world之前，添加导游woman，camera等mesh
			var worldNode = node_world;
			for(var i in meshNameObj){
				// console.log("name " + i + " : " + meshNameObj[i]);
				worldNode = this.addMesh(worldNode, meshNameObj[i], models);
				console.log(meshNameObj[i] + " create finished !");
			}
			
			return worldNode;
			// 加载场景文件。
			// if(!C3D.loader.LoadMap(node_world))
			// {
				// System.exitcode = 16;
				// System.exitmsg = "failed to load world node!!";
				// break;
			// }
			
		}while(false);
	}
	curRoomObj.getMeshobj = function(node_world){
		var sector_world = node_world.GetChild("sector");
		if(!sector_world)
		{
			System.exitcode = 14;
			System.exitmsg = "no sectors in world!!";
			return false;
		}
		
		
		var meshobjSet = sector_world.GetChildren("meshobj");
		if(!meshobjSet)
		{//没有任何meshObjs需要显示，报错退出！
			System.exitcode = 15;
			System.exitmsg = "no meshobjs in world!!";
			return false;
		}
		
		
		return meshobjSet;
	}
	
	//为路径末尾添加一个路径分割符——如果不是以分隔符结尾。
	curRoomObj.AppendSeperator = function(path){
		if(path.length == 0)
			return ((System.osName == "win32") ? "\\" : "/");

		var lastchar = path.charAt(path.length-1);
		if(lastchar != '/' && lastchar != '\\'){
			return path + ((System.osName == "win32") ? "\\" : "/");
		}
		return path;
	}
	
	curRoomObj.GetFullPath = function(path){
		var fullpath;
		if(System.osName == "win32"){
			if(path.length > 2 && path[1] == ':'){
				fullpath = path;
			}else{
				fullpath = System.StartupPath()　+ "\\";
				fullpath += path;
			}
		}else{
			if(path[0] == '/'){
				fullpath = path;
			}else{
				fullpath = System.StartupPath() + "/";
				fullpath += path;
			}
		}
		return fullpath;
	}
	curRoomObj.addMesh = function(world_node, meshName, models){	
		var x = 7.4811;
		var y = 10.3437;
		var z = -6.5076;
		var sector = world_node.GetChild("sector");
		
		var library = world_node.CreateChild( xmlDocument.NODE_ELEMENT, sector);
		library.value = "library";
		var libraryText = library.CreateChild( xmlDocument.NODE_TEXT);
		libraryText.value = models;
		
		var meshobj = sector.CreateChild(xmlDocument.NODE_ELEMENT);
		meshobj.value = "meshobj";
		meshobj.SetAttribute("name", meshName);
		var priority = meshobj.CreateChild(xmlDocument.NODE_ELEMENT);
		priority.value = "priority";
		var portal = priority.CreateChild(xmlDocument.NODE_TEXT);
		portal.value = "portal";
		var plugin = meshobj.CreateChild(xmlDocument.NODE_ELEMENT);
		plugin.value = "plugin";
		var tplg = plugin.CreateChild(xmlDocument.NODE_TEXT);
		tplg.value = "crystalspace.mesh.loader.sprite.cal3d";
		var paramsw = meshobj.CreateChild(xmlDocument.NODE_ELEMENT);
		paramsw.value = "params";
		var factory = paramsw.CreateChild(xmlDocument.NODE_ELEMENT);
		factory.value = "factory";
		var tfan = factory.CreateChild(xmlDocument.NODE_TEXT);
		tfan.value = "man";
		var movew = meshobj.CreateChild(xmlDocument.NODE_ELEMENT);
		movew.value = "move";
		var movecv = movew.CreateChild(xmlDocument.NODE_ELEMENT);
		movecv.value = "v";
		movecv.SetAttribute("x", x);
		movecv.SetAttribute("y", y);
		movecv.SetAttribute("z", z);
		var IsVisible = meshobj.CreateChild(xmlDocument.NODE_ELEMENT);
		IsVisible.value = "invisible";
		return world_node;
	}
	
	/**
	 * 退出游戏
	 */
	curRoomObj.gameQuit = function(curUser){
		console.log("client logic, quit game user name : " + curUser + " .\n");
		// 通知在房间其它人，这个人退出游戏。
		// 从游戏中退出
		this.remoteRoomObj.setInvoke("quitGamming");
		this.remoteRoomObj.quitGamming(curUser);
		selfObj.selfPlayer.pcarray['pcactormove'].mousemove = false;
		//禁止人物键盘控制
		selfObj.selfPlayer.pcarray['pccommandinput'].PerformAction("Activate", ['activate', false]);
		// 销毁场景
		var sectorList = engine.sectors;
		if((sectorList.count > 0)&&(sectorList.Get(0))){
			sectorList.Remove(0);
		}
		console.log("half way quit game !");
		curRoomObj.remoteRoomObj.setInvoke("getUserInfoList");
		var userInfoList = curRoomObj.remoteRoomObj.getUserInfoList();
		curRoomObj.remoteRoomObj.setInvoke("gameState");
		var isStart = curRoomObj.remoteRoomObj.gameState();
		
		if(!isStart){
			Event.Send({
				name : "ui.nextGameStart",
				userInfoList : userInfoList
			});	
		}
		console.log("end!!!\n");
	}
	
	/**
	 * 通过窗口退出游戏
	 */
	curRoomObj.winQuit = function(curUser){
		console.log("client logic, quit game user name : " + curUser + " .\n");
		// 通知在房间其它人，这个人退出游戏。
		// 从游戏中退出
		this.remoteRoomObj.setInvoke("quitGamming");
		this.remoteRoomObj.quitGamming(curUser);
		selfObj.selfPlayer.pcarray['pcactormove'].mousemove = false;
		//禁止人物键盘控制
		selfObj.selfPlayer.pcarray['pccommandinput'].PerformAction("Activate", ['activate', false]);
		// 销毁场景
		var sectorList = engine.sectors;
		if((sectorList.count > 0)&&(sectorList.Get(0))){
			sectorList.Remove(0);
		}
		console.log("end!!!\n");
	}

} catch(e){
	alert("err : " + e);
}