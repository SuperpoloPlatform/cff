/**
 * 用户个人信息
 */
try{
	require("s3dcore.js");
	
	/**
	 *	个人空间
	 */
	function userAgent(userInfo, remoteServerAgentObj){
		// 获取个人信息
		/**
		 * param : userID 
		 */
		this.needSyn = true;
		this.synCount = 0;
		this.sumTime = 0;
		this.userInfo = userInfo;
		this.remoteServerAgentObj = remoteServerAgentObj
	}
	
	/**
	 * 开始同步时钟
	 */
	userAgent.prototype.startSynClock = function(){
		//和server校对时钟
		//this.remoteServerAgentObj.setInvoke("clockSyn");
		var myDate=new Date();
		var curTime = myDate.getTime();
		this.remoteServerAgentObj.clockSyn(curUser, curTime);
	}
	
	/**
	 * 聊天方法
	 */
	userAgent.prototype.Chat = function(who, content){
		Event.Send({
			name : "ui.channelChat",
			nickName : who,
			text : content
		})
	}
	/**
	 * 客户端刷新channel
	 */
	userAgent.prototype.refreshChanl = function(roomInfoList){
		// console.log("refreshChanl, roomList : " + JSON.stringify(roomList));
		Event.Send({
			name : "ui.SetRoomListShow",
			roomInfoList : roomInfoList
		});
	}
	/**
	 * 用户进入通知
	 */
	userAgent.prototype.noticeEnter = function(userInfo, isStart){
		// console.log("enter notice, userInfo:" + JSON.stringify(userInfo));
		Event.Send({
			name : "ui.userEnterRoom",
			userInfoList : userInfo,
			isStart : isStart
		});
		//rmUsersList(userName);
	}
	/**
	 * 用户准备通知
	 */
	userAgent.prototype.noticeReady = function(userInfoList){
		// console.log("ready notice, userInfoList:" + JSON.stringify(userInfoList));
		Event.Send({
			name : "ui.userReadyGame",
			userInfoList : userInfoList
		});
		//rmReadyList(userName);
	}
	/**
	 * 用户退出准备通知
	 */
	userAgent.prototype.noticeCancelReady = function(userCancelReady){
		//console.log(" cancel ready notice, userInfoList:" + JSON.stringify(userInfoList));
		Event.Send({
			name : "ui.userCancelReadyGame",
			userInfoList : userCancelReady
		});
	}
	/**
	 * 用户退出通知
	 */
	userAgent.prototype.noticeQuit = function(loc){
		console.log(" quit notice, user loc : " + loc);
		Event.Send({
			name : "ui.userQuitRoom",
			loc : loc
		});
	}
	/**
	 * 房主点击游戏开始时，房间中没有点击准备的用户跳转进入界面通知
	 */
	userAgent.prototype.noticeSwitch = function(userInfoList, isStart){
		console.log("start game noticeSwitch !\n");
		// console.log("userInfoList :" + JSON.stringify(userInfoList) + "\n");
		Event.Send({
			name : "ui.noticeSwitch",
			userInfoList : userInfoList,
			isStart : isStart
		});
	}
	/**
	 * 房主退出房间
	 */
	userAgent.prototype.updateHost = function(userInfoList){
		console.log("new host！");
		Event.Send({
			name : "ui.updateHost",
			userInfoList : userInfoList
		});
	}
	/**
	 * 房主退出房间
	 */
	userAgent.prototype.newHost = function(userInfoList){
		console.log("new host！!");
		Event.Send({
			name : "ui.newHost",
			userInfoList : userInfoList
		});
	}
	/**
	 * 更改房间名称
	 */
	 userAgent.prototype.roomName = function(roomInfoList){
		console.log("room  new name！");
		Event.Send({
			name : "ui.SetRoomListShow",
			roomInfoList :roomInfoList
		});
	}
	/**
	 * 检测用户是否异常退出通知
	 */
	userAgent.prototype.checkQuit = function(){
		console.log(" check quit !\n");
		return 1;
	}
	//加载地图
	userAgent.prototype.noticeLoadMap = function(roomConfig, playerInfoList, sceneName){
		//跳转到加载地图界面
		console.log(" jump load game notice !");
		Event.Send({
			name : "ui.LoadGame"
			//actor : selfObj.selfPlayer
		});
		//开始加载地图
		curRoomObj.loadMap(roomConfig, playerInfoList, sceneName);
	}
	/**
	 * 用户跳到加载游戏（进度条）通知
	 */
	// userAgent.prototype.jumpLoadGame = function(){
		// console.log(" jump load game notice !");
		// Event.Send({
			// name : "ui.LoadGame"
		// });
	// }
	
	
	userAgent.prototype.enterScene = function(){
		console.log("notice enter scene\n");
		local.curOperate = "ingame";
		local.needChangeFocus = true;
		//鼠标在屏幕中间显示
		if(local.focus)
		{
			selfObj.selfPlayer.pcarray['pcactormove'].mousemove = true;
		}
		/*Event.Send({
			name : "ui.userEnterScene",
			userInfoList : userInfoList
		});*/
		//跳转界面
		console.log("switch interface!\n");
		GUI.Windows.Get("module/root").SetProperty("Visible","False");
		GUI.Windows.Get("changjing/root").SetProperty("Visible","True");
		GUI.Windows.Get("changjing/zhunxin_putong/image").SetProperty("Visible","True");
		//GUI.Windows.Get("changjing/zhunxin_jixie/image").SetProperty("Visible","True");
		// console.log("********selfObj.selfPlayer : " + JSON.stringify(selfObj.selfPlayer));
		selfObj.selfPlayer.pcarray['pccommandinput'].PerformAction('Activate',['activate', true]);
		//显示鼠标指针
		//GUI.System.SetDefaultMouseCursor("ice", "MouseArrow");
		local.localWin = "inGamming";
	}
	
	// // 设置怪物刷新频率等信息,server向client发送刷出怪物的命令，该方法废弃 
	// userAgent.prototype.setMonsterConfig = function(monsterConfig, monsterSpawnPos){
		// console.log("setMonsterConfig called");
		// this.monsterConfig = monsterConfig;
		// this.monsterSpawnPos = monsterSpawnPos;
	// }
	
	userAgent.prototype.createSelfPlayer = function(playerInfo){
		// PLAYER.pc['pcmesh'].action[0].param[0][1] = "man_" + playerInfo.loc;
		// 判断mesh是否加载进来？
		selfObj.selfPlayer = Entities.CreateEntity(PLAYER);
		selfObj.selfPlayer.type = "player";
		// 在创建entity之后在添加mesh
		selfObj.selfPlayer.pcarray['pcmesh'].SetMesh("man_" + playerInfo.loc);
		console.log("selfObj.selfPlayer.pcarray['pcmesh'].meshname:" + selfObj.selfPlayer.pcarray['pcmesh'].meshname);
		if(!selfObj.selfPlayer.pcarray['pcmesh'].meshname)
		{
			alert("load self player mesh error!\n");
			selfObj.selfPlayer.pcarray['pcmesh'].SetMesh("man_" + playerInfo.loc);
			// return false;
		}
		var selfActor = selfObj.selfPlayer.pcarray['pcactormove'].QueryInterface("iPcActorMove");
		// 控制角色一直为站立状态
		C3D.engine.SubscribeFrame(function(){
			// alert(0)
			if(local.curOperate == "ingame")
			{
				if(selfActor.IsMoving())
				{
					selfObj.selfPlayer.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','run'], ['cycle', true], ['reset', false]);
				}
				else
				{
					selfObj.selfPlayer.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','stand'], ['cycle', true], ['reset', false]);
				}
			}
			// if(selfActor.IsRotating())
			// {
				// Event.Send({
					// name : "net.mouseMove",
					// type : "verifyRotation",
					// actor : selfObj.selfPlayer
				// });
			// }
		});
		//禁止键盘和鼠标事件
		selfObj.selfPlayer.pcarray['pccommandinput'].PerformAction('Activate',['activate', false]);
		selfObj.selfPlayer.pcarray['pcmesh'].PerformAction('SetVisible',['visible', true]);
		// 设置entity标记
		selfObj.selfPlayer.loc = playerInfo.loc;
		var rotation = [-playerInfo.orientation[0], -playerInfo.orientation[1], -playerInfo.orientation[2]];
		// 设置mouseMove速度
		selfObj.selfPlayer.pcarray['pccommandinput'].screenspace = false;
		selfObj.selfPlayer.pcarray['pcactormove'].SetProperty("mousemove_xfactor", 0.5);
		selfObj.selfPlayer.pcarray['pcactormove'].SetProperty("mousemove_yfactor", 0.25);
		//初始化位置及移动速度
		selfObj.selfPlayer.pcarray['pcmesh'].MoveMesh(playerInfo.position, rotation);
		selfObj.selfPlayer.pcarray['pcactormove'].SetSpeed(playerInfo.speed[0], //movement
														playerInfo.speed[1], //runing
														playerInfo.speed[2], //rotation
														playerInfo.speed[3]);//jumping	
		selfObj.selfPlayer.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','stand'], ['cycle', true], ['reset', true]);
		selfObj.selfPlayer.stability = playerInfo.stability; // 射击稳定 
		selfObj.selfPlayer.range = playerInfo.range;   // 有效射程
		selfObj.selfPlayer.accuracy = playerInfo.accuracy;   // 射击精度
		selfObj.selfPlayer.bulletPower = playerInfo.bulletPower;   // 子弹威力
		selfObj.selfPlayer.movement = playerInfo.speed[0];
		selfObj.selfPlayer.runing = playerInfo.speed[1];
		selfObj.selfPlayer.rotation = playerInfo.speed[2];
		selfObj.selfPlayer.jumping = playerInfo.speed[3];
		
		this.createBullet(playerInfo.bullet, playerInfo.magazine);
		//默认背包1里的武器： 主武器1：冲锋枪，主武器2：狙击枪，副武器：手枪，投掷武器：手雷。
		selfObj.selfPlayer.weaponList.priWeapons_1 = playerInfo.backpackList[1][0];
		selfObj.selfPlayer.weaponList.priWeapons_2 = playerInfo.backpackList[1][1];
		selfObj.selfPlayer.weaponList.secWeapans = playerInfo.backpackList[1][2];
		selfObj.selfPlayer.weaponList.throwingWeapon = playerInfo.backpackList[1][3];
		// // WeaponType: 1:主武器1，2：主武器2，3：副武器，4：投掷武器
		selfObj.selfPlayer.curWeaponType = 3;
		this.createGunEnt(playerInfo.loc, selfObj.selfPlayer.weaponList);
		return true;
	}
	
	userAgent.prototype.createOtherPlayer = function(playerInfo){
		var loc = playerInfo.loc;
		OTHER.pc['pcmesh'].action[0].param[0][1] = "man_" + loc;
		otherEntityList[loc] = Entities.CreateEntity(OTHER);
		/** 
			1、MeshWrapper;
			2、var monster = CreateEntity(SetMesh("Cube");)
			3、entity.pcarray['pcmesh'].SetMesh("MeshWrapper");
		*/
		// otherEntityList[loc].pcarray['pcmesh'].SetMesh("man_" + loc);

		console.log("otherEntityList[loc].pcarray['pcmesh'].meshname:" + otherEntityList[loc].pcarray['pcmesh'].meshname);
		if(!otherEntityList[loc].pcarray['pcmesh'].meshname)
		{
			alert("load other player mesh error!\n");
			otherEntityList[loc].pcarray['pcmesh'].SetMesh("man_" + loc);
			// otherEntityList[loc].pcarray['pcmesh']
			// alert("load other player mesh error!\n");
			// return false;
		}
		otherEntityList[loc].loc = playerInfo.loc;
		var rotation = [-playerInfo.orientation[0], -playerInfo.orientation[1], -playerInfo.orientation[2]];
		otherEntityList[loc].pcarray['pcmesh'].MoveMesh(playerInfo.position, rotation);
		otherEntityList[loc].pcarray['pcactormove'].SetSpeed(playerInfo.speed[0], //movement
														playerInfo.speed[1], //runing
														playerInfo.speed[2], //rotation
														playerInfo.speed[3]);//jumping
		var pos = [playerInfo.position[0], playerInfo.position[1], playerInfo.position[2]];
		otherEntityList[loc].pcarray['pctrigger'].SetProperty("enabled", true);
		otherEntityList[loc].pcarray['pctrigger'].PerformAction(
				"SetupTriggerSphere", 
				['sector', 'Scene'], 
				['position', pos], 
				['radius', 5]
			);
		otherEntityList[loc].movement = playerInfo.speed[0];
		otherEntityList[loc].runing = playerInfo.speed[1];
		otherEntityList[loc].rotation = playerInfo.speed[2];
		otherEntityList[loc].jumping = playerInfo.speed[3];
		//默认背包1里的武器： 主武器1：冲锋枪，主武器2：狙击枪，副武器：手枪，投掷武器：手雷。
		otherEntityList[loc].weaponList.priWeapons_1 = playerInfo.backpackList[1][0];
		otherEntityList[loc].weaponList.priWeapons_2 = playerInfo.backpackList[1][1];
		otherEntityList[loc].weaponList.secWeapans = playerInfo.backpackList[1][2];
		otherEntityList[loc].weaponList.throwingWeapon = playerInfo.backpackList[1][3];
		this.createGunEnt(playerInfo.loc, otherEntityList[loc].weaponList);
		return true;
	}
	userAgent.prototype.createGunEnt = function(loc, weaponList){
		var idx = 0;
		for(var i in gunEntList){
			idx++;
		}
		for(var i in weaponList){
			gunEntList[idx] = {};
			gunEntList[idx] = Entities.CreateEntity(GUN);
			if(!engine.FindMeshFactory("genCube.003")){
				Registry.Get('iLoader').LoadLibrary("/art/models/genCube/genCube.003");
			}
			var mf = engine.FindMeshFactory("genCube.003");
			if(mf){
				var sectorlist = engine.sectors;
				if(sectorlist.count){
					var sector = sectorlist.Get(0);
					var meshwrapper = engine.CreateMeshWrapper(mf, "gun_" + idx, sector, [0, -5, 0], true);
					var ipcmesh = gunEntList[idx].pcarray['pcmesh'].QueryInterface("iPcMesh");
					if(meshwrapper && ipcmesh){
						ipcmesh.SetMesh(meshwrapper, false);
						gunEntList[idx].pcarray['pcmesh'].MoveMesh([0, -5, 0]);
						gunEntList[idx].pcarray['pcmesh'].PerformAction('SetVisible',['visible', false]);
					}
				}
			}
			console.log("gunEntList[" + idx + "]" + gunEntList[idx].pcarray['pcmesh'].meshname);
			gunEntList[idx].curWeaponID = weaponList[i];
			if(typeof(loc) != "undefined")
				gunEntList[idx].ownerBy = loc;
			idx++;
		}
	}
	//用户中途进入游戏场景
	userAgent.prototype.half_wayEnterScene = function(playerInfo){
		console.log("half_way Enter Scene");
		console.log("notice other user playerInfo : " + JSON.stringify(playerInfo) + ".\n");
		if(typeof(playerInfo.userName) == "undefined")
		{
			alert("half enter scene player is null\n");
			return;
		}
		else if(playerInfo.userName == curUser)
		{
			
			// this.createSelfPlayer(playerInfo);
			this.enterScene();
			// bullet = Entities.CreateEntity(BULLET);
		}
		else
		{
			this.createOtherPlayer(playerInfo);
		}
		//selfObj.selfPlayer.pcarray['pccommandinput'].PerformAction('Activate',['activate', true]);
		//显示鼠标指针
		// GUI.System.SetDefaultMouseCursor("ice", "MouseArrow");
		// console.log("half_way Enter Scene end");
	}
	//通知房间的用户更新用户信息列表
	userAgent.prototype.updateUserInfo = function(playerInfo){
		// console.log("playerInfo: " + JSON.stringify(playerInfo));
		//userInfoList[playerInfo.loc] = {};
		//userInfoList[playerInfo.loc] = playerInfo;
		Event.Send({
			name : "ui.updateUserInfo",
			userInfoList : playerInfo,
			isStart : true
		});   
	}
	
	userAgent.prototype.clockSyn = function(serverTime, preTime, useTime){
		console.log("clockSyn start!");
		var flag = true;
		var preDiff = this.diffTime;
		this.synCount++;
		var myDate=new Date();
		var curTime = myDate.getTime();
		var delayTime = (curTime - preTime - useTime) / 2; // <10ms可以忽略
		console.log("delayTime:" + delayTime);
		this.diffTime = serverTime - preTime - delayTime; // 2次的差值 < 10 ms
														  // 如果计算了解10次，都不符合上面两种情况，就取平均值
		if((delayTime < 10)
		    ||((typeof preDiff != "undefined")
				&& (Math.abs(this.diffTime - preDiff) < 10))
		)
		{
			flag = false;
		}
		this.sumTime += this.diffTime;
		if(flag)
		{
			if(this.synCount  < 10)
			{
				var myDate=new Date();
				var curTime = myDate.getTime();
				this.remoteServerAgentObj.clockSyn(curUser, curTime);
			}
			else
			{
				this.diffTime = this.sumTime / 10;
				console.log("end diffTime:" + this.diffTime);
			}
		}
		console.log("diffTime:" + this.diffTime);
	}
	
	//游戏场景中的其他客户端
	userAgent.prototype.quitScene = function(loc){
	   // console.log("client half way userInfoList : " + JSON.stringify(userInfoList));
		//console.log("quitScene!!!");
		if(otherEntityList[loc]){
			//应该先隐藏mesh，再删除Entity
			console.log(loc + "remove entity !");
			otherEntityList[loc].pcarray['pcmesh'].PerformAction('SetVisible',['visible', false]);
			Entities.RemoveEntity(otherEntityList[loc]);//删除Entity
			//将player从数组中删除
			delete otherEntityList[loc];
		}
	}
	
	userAgent.prototype.selfQuitScene = function(){
	    console.log("self half way QuitScene !");
		//console.log("quitScene!!!");
		// 销毁场景
		local.curOperate = "room";
		var sectorObj = engine.sectors;
		if((sectorObj.count > 0)&&(sectorObj.Get(0)))
		{
			sectorObj.Remove(0);
		}
		//禁止键盘对人物的控制
		selfObj.selfPlayer.pcarray['pccommandinput'].PerformAction("Activate", ['activate', false]);
		//禁止鼠标移动对角色的控制
		selfObj.selfPlayer.pcarray['pcactormove'].mousemove = false;
		//显示鼠标指针
		GUI.System.SetDefaultMouseCursor("ice", "MouseArrow");
	}
	//鼠标光标显示
	userAgent.prototype.mouseDisplay = function(){
	   console.log("mouse display !");
		//显示鼠标指针
		GUI.System.SetDefaultMouseCursor("ice", "MouseArrow");
		//隐藏应鼠标
		C3D.g2d.SetMouseCursor(C3D.g2d.cursor.csmcNone);
	}
	
	userAgent.prototype.update = function(userInfoList){
	   console.log("update userInfoList");
	   Event.Send({
				name : "ui.half_wayQuit",
				userInfoList : userInfoList,
				isStart : true
			});
	}
	
	userAgent.prototype.getLocalPosition = function(pos, vect, speed, time){
		console.log("get local, vect:" + "[" +  vect[0] + "," + vect[1] + "," + vect[2] + "]");
		var distance = speed * time;
		var vector = new Math3.Vector3(vect[0], vect[1], vect[2]);
		vector.Normal();
		vector.Multiply(distance);
		var postion = vector.Add(pos);
		console.log("postion : " + ("[" + postion[0] + "," + postion[1] + "," + postion[2] + "]"));
		var ret = [postion[0], postion[1], postion[2]];
		return ret;
	}

	//计算移动后的位置
	userAgent.prototype.calculatePos = function(actionName, curPos, sTime, moveSpeed, curMoveDir){
		if((curMoveDir[0].toFixed(2) == 0)
		   &&(curMoveDir[1].toFixed(2) == 0)
		   &&(curMoveDir[2].toFixed(2) == 0)
		)
			return curPos;
		else
		{
			var curDate = new Date();
			var delayTime = curDate.getTime() + this.diffTime - sTime;
			console.log("delayTime:" + delayTime);
			if(delayTime < 0)
			{
				delayTime = 0;
			}
			else
				curPos = this.getLocalPosition(curPos, curMoveDir, moveSpeed, delayTime);
		}
		return curPos;
	}
	
	//mouse move
	userAgent.prototype.noticeMouseMove = function(loc, actionName, curRot, sTime, x, y){
		console.log("noticeMouseMove called!");
		//校对方向
		var rot = [otherEntityList[loc].pcarray['pcmesh'].rotation.x, 
					  otherEntityList[loc].pcarray['pcmesh'].rotation.y, 
					  otherEntityList[loc].pcarray['pcmesh'].rotation.z];
		var pos = [otherEntityList[loc].pcarray['pcmesh'].position.x, 
					  otherEntityList[loc].pcarray['pcmesh'].position.y, 
					  otherEntityList[loc].pcarray['pcmesh'].position.z];
		var tmpRot = [-curRot[0], -curRot[1], -curRot[2]];
		if(rot != tmpRot)
		{
			// console.log("before syn rotation:" + rot + "\n");
			// console.log("curRot:" + curRot + "\n");
			// console.log(actionName + ":syn rotation!\n");
			otherEntityList[loc].pcarray['pcmesh'].MoveMesh(pos, tmpRot);
			//otherEntityList[loc].pcarray['pcmesh'].PerformAction("MoveMesh", ["position", pos], ["rotation", tmpRot]);
			var tmp = [otherEntityList[loc].pcarray['pcmesh'].rotation.x, 
					  otherEntityList[loc].pcarray['pcmesh'].rotation.y, 
					  otherEntityList[loc].pcarray['pcmesh'].rotation.z];
			// console.log("tmp:" + tmp + "\n");
		}
		// 动作
		if((otherEntityList[loc])&&(actionName != "verifyRotation"))
		{
			Event.Send({
				name : actionName,
				actor : otherEntityList[loc],
				x : x,
				y : y
			});
		}
	}
	
	//player move
	userAgent.prototype.noticeMove = function(loc, actionName, curPos, sTime/*, curMoveDir*/){
		console.log("noticeMove called!");
		// 位置
		// 是否考虑根据延迟时间来更改移动速度来同步位置？
		var pos = [otherEntityList[loc].pcarray['pcmesh'].position.x, 
					  otherEntityList[loc].pcarray['pcmesh'].position.y, 
					  otherEntityList[loc].pcarray['pcmesh'].position.z];
		if(pos != curPos)
		{
			console.log("before syn pos:" + pos + "\n");
			console.log("curPos:" + curPos + "\n");
			console.log(actionName + ":syn position!\n");
			otherEntityList[loc].pcarray['pcmesh'].MoveMesh(curPos);
			otherEntityList[loc].pcarray['pctrigger'].PerformAction(
				"SetupTriggerSphere", 
				['sector', 'Scene'], 
				['position', pos], 
				['radius', 5]
			);
		}
		// 动作
		if((otherEntityList[loc])&&(actionName != "verifyPosition"))
		{
			Event.Send({
				name : "scene_model.action_dispatches",
				action_name : actionName,
				other_id : loc
			});
		}
		//同步状态
		//console.log("notice move user : " + loc);
		// if(otherEntityList[loc]){
			// Event.Send({
				// name : "scene_model.action_dispatches",
				// action_name : actionName,
				// other_id : loc
			// });
		// }
		// //同步位置
		// var pos = [otherEntityList[loc].pcarray['pcmesh'].position.x, 
					  // otherEntityList[loc].pcarray['pcmesh'].position.y, 
					  // otherEntityList[loc].pcarray['pcmesh'].position.z];
		// console.log("before syn position other player, action:" + actionName + " curPos:" + JSON.stringify(pos) + "\n");
		// var ipam = selfObj.selfPlayer.pcarray['pcactormove'].QueryInterface('iPcActorMove');
		// //console.log("other player movementSpeed:" + ipam.movementSpeed);
		// var curPosition = this.calculatePos(actionName, curPos, sTime, ipam.movementSpeed / 1000, curMoveDir);
		// console.log("after syn position other player, action:" + actionName + " " + JSON.stringify(curPosition) + "\n");
		// otherEntityList[loc].pcarray['pcmesh'].MoveMesh(curPosition);
		
	}
	
	// create bullet
	userAgent.prototype.createBullet = function(count, clip){
		selfObj.selfPlayer.bultCount = clip;
		selfObj.selfPlayer.bullet = count;
		bultNum = count;
		var pos = selfObj.selfPlayer.pcarray['pcmesh'].GetProperty('position');
		for(var i = 0; i < count; i++){
			bult[i] = {};
			// 创建子弹
			var bullet = Entities.CreateEntity(BULLET);
			if(!engine.FindMeshFactory("genCube.003")){
				Registry.Get('iLoader').LoadLibrary("/art/models/genCube/genCube.003");
			}
			var mf = engine.FindMeshFactory("genCube.003");
			if(mf){
				var sectorlist = engine.sectors;
				if(sectorlist.count){
					var sector = sectorlist.Get(0);
					var meshwrapper = engine.CreateMeshWrapper(mf, "bult_" + i, sector, [pos.x, -5, pos.z], true);
					var ipcmesh = bullet.pcarray['pcmesh'].QueryInterface("iPcMesh");
					if(meshwrapper && ipcmesh){
						ipcmesh.SetMesh(meshwrapper, false);
						bullet.pcarray['pcmesh'].MoveMesh([pos.x, -5, pos.z]);
						bullet.pcarray['pcmesh'].PerformAction('SetVisible',['visible', false]);
					}
				}
			}
			bult[i] = bullet;
		}
	}
	
	// player attack effect
	var isAttacker;
	userAgent.prototype.noticeAttack = function(attacker, targetPos){
		// console.log("attacker : " + attacker + " \n");
		// console.log("type : " + type + " \n");
		// console.log("hurt : " + hurt + " \n");
		isAttacker = attacker;
		curRoomObj.remoteRoomObj.setInvoke("getUserInfoList");
		var userInfoList = curRoomObj.remoteRoomObj.getUserInfoList();
		var attackerLoc = 0;
		for(var i in userInfoList){
			if(userInfoList[i].userName == attacker){
				attackerLoc = userInfoList[i].loc;
			}
		}
		console.log("attackerLoc : " + attackerLoc);
		console.log("attack effect !");
		
		if(attacker != curUser){
			var attackerMeshName = otherEntityList[attackerLoc].pcarray['pcmesh'].meshname;
			// var bullet = Entities.CreateEntity(BULLET);
			// console.log("attacker mesh name is : " + attackerMeshName);
			// Event.Send({
				// name : "effect.handgun.start",
				// actor : otherEntityList[attackerLoc],
				// targetPos : targetPos,
				// bullet : bullet
			// });
		}
	}
	/**
	 * 切换武器
	 */
	userAgent.prototype.switchWeapon = function(loc, weaponID){
		console.log("switch Weapon is " + weaponID + " ! \n");
		Event.Send({
			name : "effect.switchWeapon",
			actor : otherEntityList[loc],
			weaponID : weaponID
		});
	}
	/**
	 * 丢弃武器
	 */
	userAgent.prototype.giveUpWeapon = function(loc, cameraDirect, oldWeaponID, bullet, bultCount){
		console.log(loc + "giveUp Weapon" + oldWeaponID + "! \n");
		Event.Send({
			name : "effect.giveUpWeapon",
			actor : otherEntityList[loc],
			cameraDirect : cameraDirect,
			oldWeaponID : oldWeaponID,
			bullet : this.bullet,
			bltCount : this.bultCount
		});
	}
	/**
	 * 拾取武器
	 */
	userAgent.prototype.PickupWeapon = function(loc, pickUPwep){
		console.log(loc + "Pick up Weapon  ! \n");
		Event.Send({
			name : "effect.pickUpWepon",
			actor : otherEntityList[loc],
			pickUPwep : pickUPwep
		});
	}
	/**
	 * 隐藏武器
	 */
	userAgent.prototype.HideWepon = function(loc, pickUPwep){
		console.log(loc + "hide Weapon  ! \n");
		Event.Send({
			name : "effect.hideWepon",
			actor : otherEntityList[loc],
			pickUPwep : pickUPwep
		});
	}
	/**
	 * 切换背包
	 */
	userAgent.prototype.switchPack = function(loc, packType){
		console.log(loc + "switch Pack ! \n");
		Event.Send({
			name : "effect.switchBackpack",
			actor : otherEntityList[loc],
			packType : packType
		});
	}
	/**
	 * 抛出手雷
	 */
	userAgent.prototype.noticeGetOut = function(attacker, loc, targetPos){
		console.log("get out attacker is " + attacker + " ! \n");
		console.log("get out loc is " + loc + " ! \n");
		console.log("get out target Loc is [" + targetPos[0] + " ," + targetPos[1] + " ," + targetPos[2] + "] ! \n");
		Event.Send({
			name : "effect.grenade.start",
			actor : otherEntityList[loc],
			targetPos : targetPos
		});
	}
	// bomb damage
	userAgent.prototype.bombDamage = function(loc, hurt){
		console.log("bomb damage mesh name is " + meshname + " ! \n");
		console.log("bomb damage hurt is " + hurt + " ! \n");
		if(typeof(otherEntityList[loc]) != "undefined"){
			Event.Send({
				name : "effect.bombDamage",
				actor : otherEntityList[loc],
				hurt : hurt
			});
		}
	}
	// target revive
	// userAgent.prototype.targetRevive = function(attacker, targetLoc){
		// // console.log("attacker is " + attacker + " ! \n");
		// // console.log("target Loc is " + targetLoc + " ! \n");
		// if(typeof(otherEntityList[targetLoc]) != "undefined"){
			// console.log("reviver is other ! \n");
			// otherEntityList[targetLoc].pcarray['pcmesh'].MoveMesh([10, 0, 10]);
		// } else {
			// console.log("reviver is player ! \n");
			// selfObj.selfPlayer.pcarray['pcmesh'].MoveMesh([10, 0, 10]);
		// }
		
	// }
	// // 显示目标剩余生命值
	// userAgent.prototype.targetResidualLife = function(target, blood){
		// console.log("target residual life is " + blood);
		// Event.Send({
			// name : "ui.targetResidualLife",
			// blood : blood
		// });
	// }
	
	//self player location syn
	userAgent.prototype.noticeSelfMove = function(userName, actionName, curPos, sTime, curMoveDir){
		console.log("noticeSelfMove called!");
		if(userName != curUser)
		{
			console.log("noticeSelfMove:not self!\n");
			return;
		}
		var selfActor = selfObj.selfPlayer.pcarray['pcactormove'].QueryInterface('iPcActorMove');
		console.log("move speed:" + selfActor.movementSpeed + "\n");
		//如果位置偏差不大，就不同步位置？
		//同步位置
		var pos = [selfObj.selfPlayer.pcarray['pcmesh'].position.x, 
									  selfObj.selfPlayer.pcarray['pcmesh'].position.y, 
									  selfObj.selfPlayer.pcarray['pcmesh'].position.z];
		console.log("before syn position self player, action:" + actionName + " curPos:" + pos + "\n");
		var ipam = selfObj.selfPlayer.pcarray['pcactormove'].QueryInterface('iPcActorMove');
		//console.log("selfPlayer movementSpeed:" + ipam.movementSpeed);
		var curPosition = this.calculatePos(actionName, curPos, sTime, ipam.movementSpeed / 1000, curMoveDir);
		selfObj.selfPlayer.pcarray['pcmesh'].MoveMesh(curPosition);
		console.log("after syn position self player, action:" + actionName + " " + JSON.stringify(curPosition) + "\n");
	}
	
	// game over
	userAgent.prototype.noticeGameOver = function(userInfoList, rodTimes){
		console.log("player game over ! \n");
		var mousemove = selfObj.selfPlayer.pcarray['pcactormove'].mousemove = false;
		//隐藏硬鼠标
		C3D.g2d.SetMouseCursor(C3D.g2d.cursor.csmcNone);
		//显示鼠标指针
		GUI.System.SetDefaultMouseCursor("ice", "MouseArrow");
		for(var i in userInfoList){
			console.log("*********loc :" + userInfoList[i].loc);
			// if(userInfoList[i].isHost){
				// Event.Send({
						// name : "ui.gameOver",
						// actor : selfObj.selfPlayer,
						// userInfoList : userInfoList
					// });
			// }else{
				if(userInfoList[i].userName == curUser && userInfoList[i].started){
					// if(otherEntityList[userInfoList[i].loc]){
						// Event.Send({
							// name : "ui.gameOver",
							// actor : otherEntityList[userInfoList[i].loc],
							// userInfoList : userInfoList
						// });
					// } else {
					Event.Send({
						name : "ui.gameOver",
						actor : selfObj.selfPlayer,
						userInfoList : userInfoList
						// rodTimes : rodTimes
						
					});
					local.curOperate = "room";
					//}
				}
			//}
		}	
	}
	
	// show record
	userAgent.prototype.showRecord = function(userList, rodTimes, state){
		// console.log("userList : " + JSON.stringify(userList));
		console.log("rodTimes" + rodTimes);
		showRecord(userList, rodTimes, state);
		// Event.Send({
			// name : "ui.showRecord",
			// userInfoList : userList,
			// number : number,
			// rodTimes : rodTimes
			
		// });
	}
	// half way game Over
	userAgent.prototype.half_wayGameOver = function(sceneUserList){
		console.log("player half way game over ! \n");
		selfObj.selfPlayer.pcarray['pcactormove'].mousemove = false;
		for(var i in sceneUserList){
			// console.log("sceneUserList[" + i + "] =" + sceneUserList[i].userName + "\n");
			if(sceneUserList[i].userName == curUser){
				// console.log(sceneUserList[i].userName + " is scene User !");
				//禁止人物键盘控制
				selfObj.selfPlayer.pcarray['pccommandinput'].PerformAction("Activate", ['activate', false]);
				// console.log("test 1");
				// 销毁场景
				var sectorList = engine.sectors;
				// console.log("test 2, sectorList:" + sectorList);
				// console.log("sectorList.count:" + sectorList.count);
				if((sectorList.count > 0)&&(sectorList.Get(0)))
				{
					//alert(sectorList.Get(0));
					sectorList.Remove(0);
				}
				
				console.log("test 3");
				break;
			}
		}
		console.log("remove sectorObj end!\n");
		//获取房间列表，以便重新开始下一局游戏
		// console.log("***********curRoomObj.remoteRoomObj : " + curRoomObj.remoteRoomObj);
		curRoomObj.remoteRoomObj.setInvoke("getUserInfoList");
		var userInfoList = curRoomObj.remoteRoomObj.getUserInfoList();
		// console.log("half way game over player info : " + JSON.stringify(userInfoList) + " \n");
		Event.Send({
			name : "ui.nextGameStart",
			userInfoList : userInfoList
		});	
		console.log("half_wayGameOver end!\n");
	}
	
	userAgent.prototype.ContinueGame = function(UserInfoList){
		console.log("Continue Game ! \n");
		//获取房间列表，继续开始下一局游戏
		var userInfoList = UserInfoList;
		// console.log("next game start player info : " + JSON.stringify(userInfoList) + " \n");
		Event.Send({
			name : "ui.switchInterface",
			userInfoList : userInfoList,
			isStart : false
		});	
	}
	
	/**
	 * 切换武器
	 */
	userAgent.prototype.switchWeapon = function(loc, weaponID){
		console.log("weapon, userName loc is " + loc);
		console.log("weapon, userName weaponID is " + weaponID);
		Event.Send({
			name : "effect.switchWeapon",
			actor : otherEntityList[loc],
			weaponID : weaponID
		});	
	}
	
	/**
	 * 玩家进入濒死状态
	 */
	userAgent.prototype.playerMoribund = function(playerInfo){
		var loc = playerInfo.loc;
		console.log("moribund player : " + loc);
		var actor;
		if(playerInfo.userName == curUser){
			actor = selfObj.selfPlayer;
			actor.enabled = false;
		} else {
			actor = otherEntityList[loc];
		}
		Event.Send({
			name : "effect.playerMoribund",
			actor : actor
		});
	}
	/**
	 * 玩家死亡
	 */
	userAgent.prototype.targetDeath = function(type, id){
		console.log("death target id : " + id);
		if(type == "player"){
			console.log("type : " + type);
			if(otherEntityList[id] != "undefined"){
				Event.Send({
					name : "effect.playerDeath",
					actor : otherEntityList[id]
				});
			}
		} else if(type == "monster"){
			console.log("type : " + type);
			// console.log("*****monsterList : " + JSON.stringify(monsterList));
			var monsterObj = {};
			for(var i in monsterList){
				// console.log("*****monsterList[i].id : " + monsterList[i].id);
				// console.log("*****monsterList[i] : " + JSON.stringify(monsterList[i]));
				if(monsterList[i].id == id){
					monsterObj = monsterList[i];
					break;
				}
			}
			// console.log("monsterList[" + id + "] typeof : " + JSON.stringify(monsterObj));
			if(monsterList[id] != "undefined"){
				Event.Send({
					name : "effect.monster.monsterDeath",
					actor : monsterObj
				});
			}
		}
	}
	
	/**
	 * 玩家进入救治状态
	 */
	userAgent.prototype.playerTreatment = function(playerInfo){
		var loc = playerInfo.loc;
		console.log("moribund player : " + loc);
		var actor;
		if(playerInfo.userName == curUser){
			actor = selfObj.selfPlayer;
			actor.enabled = false;
		} else {
			actor = otherEntityList[loc];
		}
		Event.Send({
			name : "effect.playerMoribund",
			actor : actor
		});
	}
	
	/**
	 * 手雷伤害后，显示生命值
	 */
	userAgent.prototype.playerLife = function(updateLife){
		console.log("player life !");
		var username = updateLife.userName;
		var loc = updateLife.loc;
		if(username == curUser){
			console.log("updateLife : " + JSON.stringify(updateLife));
			console.log("updateLife.blood : " + updateLife.blood);
			Event.Send({
				name : "ui.targetResidualLife",
				blood : updateLife.blood
			});
		}
	}
	
	/**
	 * 手雷伤害后，生命值为0，玩家复活
	 */
	userAgent.prototype.playerRevive = function(reviveInfo){
		// console.log("reviveInfo : " + JSON.stringify(reviveInfo));
		var username = reviveInfo.userName;
		var loc = reviveInfo.loc;
		if(username == curUser){
			selfObj.selfPlayer.pcarray['pcmesh'].MoveMesh(reviveInfo.position);	
			selfObj.selfPlayer.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','stand'], ['cycle', true], ['reset', true]);
			selfObj.selfPlayer.stability = reviveInfo.stability; // 射击稳定 
			selfObj.selfPlayer.range = reviveInfo.range;   // 有效射程
			selfObj.selfPlayer.accuracy = reviveInfo.accuracy;   // 射击精度
			selfObj.selfPlayer.bulletPower = reviveInfo.bulletPower;   // 子弹威力
			
			//枪
			selfObj.selfPlayer.weaponList.priWeapons_1 = reviveInfo.backpackList[1][0];
			selfObj.selfPlayer.weaponList.priWeapons_2 = reviveInfo.backpackList[1][1];
			selfObj.selfPlayer.weaponList.secWeapans = reviveInfo.backpackList[1][2];
			selfObj.selfPlayer.weaponList.throwingWeapon = reviveInfo.backpackList[1][3];
			//WeaponType: 1:主武器，2：副武器，3：近战武器，4：投掷武器
			selfObj.selfPlayer.curWeaponType = 3;
			Event.Send({
				name : "ui.targetResidualLife",
				blood : reviveInfo.blood
			});
			selfObj.selfPlayer.bultCount = reviveInfo.magazine;
			selfObj.selfPlayer.bullet = reviveInfo.bullet;
			Event.Send({
				name : "ui.blutCount",
				actor : selfObj.selfPlayer
			});
		} else {
			otherEntityList[loc].pcarray['pcmesh'].MoveMesh(reviveInfo.position);
		}
	}
	
	/**
	 * 游戏时钟显示
	 */
	userAgent.prototype.clientClock = function(sTime, delayTime){
		this.startClock(0); // 将原来在UI上时间清除
		// 当前客户端时间
		var curDate = new Date();
		var curTime = curDate.getTime();
		// console.log("****sTime half : " + sTime);
		var curSTime = this.diffTime + curTime;
		// 服务端已过去时间
		var pastTime = curSTime - sTime - delayTime * 1000 - 3000;
		//console.log("pastTime : " + pastTime);
		//console.log("rodTime : " + rodTime);
		var clickTime = Math.round(pastTime / 1000);//将毫秒转换成秒,四舍五入取整。
		// console.log("********clickTime : " + clickTime);
		// this.seconds = clickTime;
		var _this = this;
		this.ctHalfClock = setInterval(function(){
			// console.log("clickTime1 : " + clickTime);
			_this.startClock(clickTime);
			clickTime++;
		}, 1000);
		//this.startClock(this);
		
		
	}
	

	/**
	 * 游戏时钟显示
	 */
	userAgent.prototype.startClock = function(time){
		// if(this.seconds < 0){
			// console.log("client clock end !");
			// clearTimeout(this.ctClock);
		// } else {
			// console.log("seconds : " + this.seconds);
			Event.Send({
				name : "ui.showClock",
				time : time
			});
			// this.seconds++;
		
			// this.ctClock = setTimeout(function(){
				// _this.startClock(_this);
			// }, 1000);
		//}
	}
	/**
	 * 终止游戏时钟
	 */
	userAgent.prototype.stopClock = function(){
		console.log("***stop game ctHalfClock !");
		clearInterval(this.ctHalfClock);
		console.log("***stop game ctClock !");
		clearInterval(this.ctClock);
	}
	
	//create monster
	userAgent.prototype.createMonster = function(startTime, delayTime, monsterInfo){
		console.log("createMonster called");
		var curDate = new Date();
		var curTime = curDate.getTime() + this.diffTime;
		var dTime = delayTime * 1000 -(curTime - startTime);
		setTimeout(function(){
			console.log("before create entity");
			// console.log("dTime:" + dTime + " monsterInfo:" + JSON.stringify(monsterInfo));
			for(var i in monsterInfo)
			{
				// @todo以后需要根据monster的名称来创建相应的怪物
				// @tod需要判定当前client是否为房主，若为房主，则需要创建有ai的怪物entity
				var id = monsterInfo[i].id;
				console.log("monsterInfo[i].pos:" + monsterInfo[i].pos);
				monsterList[id] = Entities.CreateEntity(YANG_TPL, monsterInfo[i].pos);
				monsterList[id].id = monsterInfo[i].id;
				monsterList[id].type = "monster";
				monsterList[id].blood = monsterInfo[i].blood;
				monsterList[id].pcarray['pcmesh'].meshname = monsterInfo[i].id;
				monsterList[id].pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','run'], ['cycle', true], ['reset', false]);
			}
		}, dTime);
	}
	
	// 回合开始
	userAgent.prototype.roundStart = function(startTime, delayTime, rodTimes, oldUserInfo){
		// 隐藏得分面板，todo
		GUI.GUISheet.Get("changjing/huihewancheng/window").SetProperty("Visible", "False");
		this.startClock(0); // 将原来在UI上时间清除
		var _this = this;
		//禁止键盘对人物的控制
		selfObj.isControlPlayer = false;
		selfObj.selfPlayer.pcarray['pccommandinput'].PerformAction("Activate", ['activate', false]);
		setTimeout(function(){
			// 战斗开启后，有3S的冻结时间
			_this.freezeTime(startTime, delayTime, rodTimes, this);
		}, delayTime);
		// @todo:重新设置位置、血量以及子弹数
		this.playerRevive(oldUserInfo);
		// @todo:设置怪物刷新时间
		// setTimeout(function(){
			// // 创建怪物
			// var bornConfig = _this.monsterConfig[rodTimes - 1].bornConfig;
			// // 需要判定当前client是否为房主，若为房主，则需要创建有ai的怪物entity
			// for(var i in bornConfig)
			// {
				// if(bornConfig[i].bornPos == "all")
				// {
					// for(var j in _this.monsterSpawnPos)
					// {
						// console.log("yang position:" + _this.monsterSpawnPos[j]);
						// var tmp = Entities.CreateEntity(YANG_TPL, _this.monsterSpawnPos[j]);
						// monsterList.push(tmp);
						// tmp.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','run'], ['cycle', true], ['reset', false]);
					// }
				// }
				// else if(typeof(bornConfig[i].bornPos) == "Object")
				// {
					// for(var k in bornConfig.bornPos)
					// {
						// var pos = _this.monsterSpawnPos[k];
					// }
				// }
			// }
			
		// }, 2);
	}
	// 冻结时间
	userAgent.prototype.freezeTime = function(startTime, delayTime, rodTimes, handle){
		clearTimeout(handle);
		var _this = this;
		console.log("3s freeze timer start !");
		setTimeout(function(){
			// console.log("before call freezeEnd!");
			_this.freezeEnd(startTime, delayTime, rodTimes, this);
		}, 3000);
	}
	// 3S冻结结束
	userAgent.prototype.freezeEnd = function(startTime, delayTime, rodTimes, handler){
		// 延时delayTime秒后，开始计时
		console.log("3s freeze timer end !");
		var curDate = new Date();
		var curTime = curDate.getTime();
		// console.log("roundStart curTime : " + curTime);
		var curSTime = this.diffTime + curTime;
		// 服务端已过去时间
		var pastTime = curSTime - startTime - delayTime * 1000 - 3000;
		var clickTime =  Math.round(pastTime / 1000);//将毫秒转换成秒,四舍五入取整。
		var _this = this;
		if(clickTime > delayTime){
			_this.setTimer(clickTime);
		} else {
			_this.setTimer(0);
			//开启键盘对人物的控制
			selfObj.isControlPlayer = true;
			selfObj.selfPlayer.pcarray['pccommandinput'].PerformAction("Activate", ['activate', true]);
		}
		// @todo:设置怪物刷新时间
		// setTimeout(function(){
			// // 创建怪物
			// var bornConfig = _this.monsterConfig[rodTimes - 1].bornConfig;
			// // 需要判定当前client是否为房主，若为房主，则需要创建有ai的怪物entity
			// for(var i in bornConfig)
			// {
				// if(bornConfig[i].bornPos == "all")
				// {
					// for(var j in _this.monsterSpawnPos)
					// {
						// console.log("yang position:" + _this.monsterSpawnPos[j]);
						// var tmp = Entities.CreateEntity(YANG_TPL, _this.monsterSpawnPos[j]);
						// monsterList.push(tmp);
						// tmp.pcarray['pcmesh'].PerformAction('SetAnimation', ['animation','run'], ['cycle', true], ['reset', false]);
					// }
				// }
				// else if(typeof(bornConfig[i].bornPos) == "Object")
				// {
					// for(var k in bornConfig.bornPos)
					// {
						// var pos = _this.monsterSpawnPos[k];
					// }
				// }
			// }
			
		// }, 2);
		clearTimeout(handler);
	}
	
	userAgent.prototype.setTimer = function(clickTime){
		var _this = this;
		this.ctClock = setInterval(function(){
			// console.log("clickTime : " + clickTime);
			_this.startClock(clickTime);
			clickTime++;
		}, 1000);
	}
	// 显示回合开始提示
	userAgent.prototype.showRound = function(rodTimes){
		//显示回合次数
		Event.Send({
			name : "ui.showRound",
			rodTimes : rodTimes
		});
	}
	userAgent.prototype.hideRoundPrompt = function(){
		//隐藏回合次数
		GUI.GUISheet.Get("changjing/huihetishi/window").SetProperty("Visible", "False");
	}
	// 显示回合结束提示
	userAgent.prototype.roundEnd = function(rodTimes, scores){
		// 显示得分面板，todo
		Event.Send({
			name : "ui.showroundEnd",
			rodTimes : rodTimes,
			scores : scores
		});
		//结束计时
		this.stopClock();
		this.startClock(0);
	}
	/**
	 *	技能
	 */
	function UserAbility(){
		
	}
	 /**
	 *	战队
	 */
	function UserTeam(){
		
	}

} catch(e){
	alert("err : " + e);
}