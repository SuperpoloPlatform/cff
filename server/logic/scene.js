if(!load("/logic/battlemode.js")){
	alert("Failed to load `/logic/battlemode.js`");
}

//userList = {userName :, nickName :, agent :, blood :, postion :,}
function Scene(sceneID, roomObj, playerSpawnPos, bornConfig, monsterSpawnPos){
	var userAgentList = {};
	var px;
	this.playerSpawnPos = playerSpawnPos;
	for(var i in roomObj.userList){
		userAgentList[i] = this.getInitUserMsg(roomObj.userList[i]);
		// userAgentList[i].userName = roomObj.userList[i].userName;
		// userAgentList[i].nickName = roomObj.userList[i].nickName;
		// userAgentList[i].isHost = roomObj.userList[i].isHost;
		// userAgentList[i].isReady = roomObj.userList[i].isReady;
		// userAgentList[i].loc = roomObj.userList[i].loc;
		// userAgentList[i].agent = roomObj.userList[i].agent;
		// userAgentList[i].blood = 100;
		// userAgentList[i].magazine = 90;
		// userAgentList[i].bullet = 30;
		// userAgentList[i].stability = 80; // 射击稳定 
		// userAgentList[i].range = 200; // 有效射程
		// userAgentList[i].accuracy = 80; // 射击精度
		// userAgentList[i].bulletPower = 50; // 子弹威力
		// userAgentList[i].position = [px, 500, -370];
		// userAgentList[i].orientation = [0, 3.14, 0];
		// userAgentList[i].speed = [5, 5, 2, 5];
		// userAgentList[i].curMoveDir = new Math3.Vector3(0, 0, 0);
		// userAgentList[i].weaponList = [2, 1, 7, [5, 6]];// 主武器，副武器，近战武器，投掷武器
	}
	this.userList = userAgentList;
	// console.log("**scene user list : " + JSON.stringify(this.userList));
	// for(var i in userAgentList){
		// var pos = userAgentList[i].position;
		// userAgentList[i].position = [pos[0], 75, pos[2]];
	// }
	// this.oldUserList = userAgentList;
	// console.log("*****oldUserList : " + JSON.stringify(this.oldUserList));
	this.sceneID = sceneID;
	this.roomObj = roomObj;	
	
	// 根据选择的模式创建相应的模式对象
	this.modeObj = this.roomObj.modeObj;
	this.modeObj.setMonsterBornConfig(bornConfig, monsterSpawnPos);
	// var mode = roomObj.roomConfig.model;
	// switch(mode)
	// {
		// case "守护模式" :
			// this.modeObj = new GuardianMode();
			// break;
		// case "团队复生" :
			// this.modeObj = new VsMode();
			// break;
		// default :
			// alert("error : no model !");
	// }
}

Scene.prototype.getInitUserMsg = function(userInfo)
{
	var userMsg = {};
	var px = -704 + userInfo.loc;
	userMsg.userName = userInfo.userName;
	userMsg.nickName = userInfo.nickName;
	userMsg.isHost = userInfo.isHost;
	userMsg.isReady = userInfo.isReady;
	userMsg.loc = userInfo.loc;
	userMsg.agent = userInfo.agent;
	userMsg.death = 0;
	userMsg.blood = 100;
	userMsg.magazine = 90;
	userMsg.bullet = 30;
	userMsg.stability = 80; // 射击稳定 
	userMsg.range = 200; // 有效射程
	userMsg.accuracy = 80; // 射击精度
	userMsg.bulletPower = 50; // 子弹威力
	userMsg.position = this.playerSpawnPos[userInfo.loc];  /*[px, 500, -370];*/
	// userMsg.position = userInfo.position;  /*[px, 500, -370];*/
	userMsg.orientation = [0, 3.14, 0];
	userMsg.speed = [5, 5, 2, 5];
	userMsg.curMoveDir = new Math3.Vector3(0, 0, 0);
	userMsg.curWeaponID = 1;
	userMsg.targetKillCount = 0; // 杀敌人数量
	//userMsg.weaponList = [2, 1, 7, [5, 6]];// 主武器，副武器，近战武器，投掷武器
	// 主武器1:冲锋枪，主武器2:狙击枪，副武器:手枪，投掷武器:手雷
	userMsg.backpackList = {
		"1" : [3, 2, 1, 5],
		"2" : [4, 8, 1, 5]
	}
	return userMsg;
}

Scene.prototype.loadMap = function()
{
	console.log("scene loadmap start!\n");
	//向所有在房间内的玩家发送加载地图的消息
	for(var i in this.userList){
		if(this.userList[i].isReady){
			//通知房间中已经准备就绪的玩家加载地图
			this.userList[i].agent.noticeLoadMap(this.roomObj.roomConfig, this.getPlayerInfoList(), this.sceneID);
		} else {
			//通知房间中未准备的玩家跳转界面，并将玩家的准备状态设置为true
			//this.userList[i].isReady = true;
			//console.log("isStart : " + this.roomObj.isStart + "\n");
			this.userList[i].agent.noticeSwitch(this.userList, this.roomObj.isStart);
		}
	}
	////向所有在房间内的玩家发送加载地图的消息
	// for(var i in this.userList)
	// {
		// this.userList[i].agent.noticeLoadMap(this.roomObj.roomConfig, this.getPlayerInfoList(), this.sceneID);
	// }
	console.log("scene loadMap end!\n");
}

Scene.prototype.halfLoadMapOk = function(curUser)
{
	console.log("scene halfLoadMapok start\n");
	var playerInfo = {};
	var playerInfoList = {};
	for(var j in this.roomObj.userList)
	{
		if(this.roomObj.userList[j].userName == curUser)
		{
			console.log("init msg:" + curUser);
			// this.cutInScene(this.roomObj.userList[j]);
			// playerInfo = this.getInitUserMsg(this.roomObj.userList[j]);
			// this.userList[j] = playerInfo;
			this.userList[j].isReady = true;
			playerInfo = this.userList[j];
			playerInfoList[j] = this.userList[j];
			//console.log("this.userList[j]: " + JSON.stringify(this.userList[j]));
			console.log("playerInfo: " + JSON.stringify(playerInfo));
			break;
		}
	}
	for(var i in this.roomObj.userList){
		//通知房间中的用户更新信息列表
		this.roomObj.userList[i].agent.updateUserInfo(playerInfoList);
	}
	for(var i in this.userList){
		this.sethalfwayInfo(playerInfo);
		this.userList[i].agent.half_wayEnterScene(playerInfo);
	}
	this.fightingRecord("continue");
	this.modeObj.getSTimer(playerInfo);
	console.log("scene halfLoadMapok end\n");
}

//test code
Scene.prototype.test = function()
{
	console.log("scene test!\n");
}

// 计算延迟时间
Scene.prototype.getDelayTime = function(userName, clientTime)
{
	var curTime;
	for(var i in this.userList)
	{
		if(this.userList[i].userName == userName)
		{
			var myDate=new Date();
			curTime = myDate.getTime();
			break;
		}
	}
	return curTime - clientTime;
}

Scene.prototype.setDelayTime = function(curUser, delayTime)
{
	for(var i in this.userList)
	{
		if(this.userList[i].userName == curUser)
		{
			this.userList[i].delayTime = delayTime;
			break;
		}
	}
}

Scene.prototype.switchScene = function(roomConfig)
{
	console.log("scene switchScene start");
	
	//向玩家发送进入场景通知
	for(var j in this.userList)
	{
		this.userList[j].agent.enterScene();
	}
	// 开启游戏定时器
	// this.gameTime(roomConfig);
	console.log("scene switchScene ends");
	// 开启模式
	var _this = this;
	// 定时无敌状态
	setTimeout(function(){
		_this.modeObj.isStartMode(roomConfig, _this);
	}, 3000);
	
}

Scene.prototype.getPlayerInfoList = function()
{
	var userInfoList = {};
	for(var i in this.userList)
	{
		userInfoList[i] = {};
		userInfoList[i].userName = this.userList[i].userName;
		userInfoList[i].nickName = this.userList[i].nickName;
		userInfoList[i].loc = this.userList[i].loc;
		userInfoList[i].blood = this.userList[i].blood;
		userInfoList[i].magazine = this.userList[i].magazine;
		userInfoList[i].bullet = this.userList[i].bullet;
		userInfoList[i].stability = this.userList[i].stability; // 射击稳定 
		userInfoList[i].range = this.userList[i].range; // 有效射程
		userInfoList[i].accuracy = this.userList[i].accuracy; // 射击精度
		userInfoList[i].bulletPower = this.userList[i].bulletPower; // 子弹威力
		userInfoList[i].position = this.userList[i].position;
		userInfoList[i].orientation = this.userList[i].orientation;
		userInfoList[i].speed = this.userList[i].speed;
		userInfoList[i].curMoveDir = this.userList[i].curMoveDir;
		//userInfoList[i].weaponList = this.userList[i].weaponList;// 主武器，副武器，近战武器，投掷武器
		userInfoList[i].backpackList = this.userList[i].backpackList;
	}
	return userInfoList;
}

// 废弃
// Scene.prototype.cutInScene = function(userInfo)
// {
	// console.log()
	// var loc = userInfo.loc;
	// this.userList[loc] = {};
	// this.userList[loc].agent = userInfo.agent;
	// this.userList[loc].userName = userInfo.userName;
	// this.userList[loc].nickName = userInfo.nickName;
	// this.userList[loc].isHost = userInfo.isHost;
	// this.userList[loc].isReady = userInfo.isReady;
	// this.userList[loc].loc = userInfo.loc;
	// this.userList[loc].blood = 100;
	// this.userList[loc].magazine = 90;
	// this.userList[loc].bullet = 30;
	// this.userList[loc].stability = 80; // 射击稳定 
	// this.userList[loc].range = 200; // 有效射程
	// this.userList[loc].accuracy = 80; // 射击精度
	// this.userList[loc].bulletPower = 50; // 子弹威力
	// this.userList[loc].position = [-704 + loc, 500, -370];
	// this.userList[loc].orientation = [0, 3.14, 0];
	// this.userList[loc].speed = [5, 5, 2, 5];
	// this.userList[loc].curMoveDir = new Math3.Vector3(0, 0, 0);
	// this.userList[loc].weaponList = [2, 1, 7, [5, 6]];// 主武器，副武器，近战武器，投掷武器
// }

//loc?使用userName作为userList的id更好一些，以后修改。
Scene.prototype.mouseMove = function(actionName, userName, cTime, curRot, x, y)
{
	// console.log("mousemove start! \n");
	var curDate = new Date();
	var curTime = curDate.getTime();
	var loc = 0;
	for(var i in this.userList){
		if(this.userList[i].userName == userName){
			loc = i;
			break;
		}
	}	
	// console.log("move user :" + loc + " ! \n");
	if(loc){
		//向场景内其他玩家发送玩家移动的通知
		for(var i in this.userList){
			if(loc != i){
				// console.log("notice other userAgent move player :  " + loc + " ! \n");
				this.userList[i].agent.noticeMouseMove(loc, 
												  actionName, 
												  curRot, 
												  cTime,
												  x,
												  y
												  );
			}
			else
			{
				//server中保存角色朝向信息
				this.userList[i].orientation = curRot;
			}
		}
	}
	else
	{
		console.log("error : player is not in scene!!\n");
	}
}

//loc?使用userName作为userList的id更好一些，以后修改。
Scene.prototype.playMove = function(actionName, userName, cTime, curPos)
{
	console.log("playMove start! \n");
	var curDate = new Date();
	var curTime = curDate.getTime();
	var loc = 0;
	for(var i in this.userList){
		if(this.userList[i].userName == userName){
			loc = i;
			break;
		}
	}	
	// console.log("move user :" + loc + " ! \n");
	if(loc){
		// 位置不在server中计算，而由client计算
		// var curPosition = this.calculatePos(loc, actionName, cTime, curTime, this.userList[loc].speed[0] / 1000);
		// if(typeof(curPosition) == "undefined")
		// {
			// console.log("unrealized action!\n");
			// return;
		// }
		var curMoveDir = [this.userList[loc].curMoveDir[0], this.userList[loc].curMoveDir[1], this.userList[loc].curMoveDir[2]];
		//向场景内其他玩家发送玩家移动的通知
		for(var i in this.userList){
			if(loc != i){
				// console.log("notice other userAgent move player :  " + loc + " ! \n");
				this.userList[i].agent.noticeMove(loc, 
												  actionName, 
												  curPos, 
												  cTime
												  );
			}
			else
			{
				//server中保存角色位置信息
				this.userList[i].position = curPos;
			}
			// 是否需要校验自己的位置？位置信息以谁为准？
			// else
			// {
				// if(typeof curPosition != "undefined")
				// {
					// this.userList[i].position = curPosition;
				// }
				// this.userList[i].agent.noticeSelfMove(this.userList[i].userName, 
													  // actionName, 
													  // cTime, 
													  // cTime
													  // );
			// }
		}
	}
	else
	{
		console.log("error : player is not in scene!!\n");
	}
}
/**
 * 枪类攻击
 */
Scene.prototype.playerAttack = function(attacker, curTime, targetPos){
	console.log("playerAttack start! \n");
	// console.log("target pos scene : [" + targetPos[0] + "," + targetPos[1] + "," + targetPos[2] + "] \n");
	
	for(var i in this.userList){
		if(attacker != this.userList[i].userName){
			this.userList[i].agent.noticeAttack(attacker, targetPos);
		}
	}
	console.log("playerAttack effect notice end! \n");
}

/**
 * 玩家因枪械战斗生命值受损
 */
Scene.prototype.gunDamage = function(updateInfo){
	console.log("Player update info : " + JSON.stringify(updateInfo) + " .\n");
	var myDate=new Date();
	this.sTime = myDate.getTime();
	if(updateInfo.type == "player"){
		console.log("player info : " + JSON.stringify(updateInfo));
		var loc = updateInfo.targetLoc;
		var blood = this.userList[loc].blood;
		var hurt = updateInfo.hurt;
		if(blood >= hurt){
			this.userList[loc].blood = blood - hurt;
		}
		if(blood >= 0 && blood < hurt){
			this.userList[loc].blood = 0;
		}
		console.log("Player Info blood is " + this.userList[loc].blood + " .\n");
		// 通知目标剩余生命值
		this.playerLife(this.userList[loc]);
		// 判断濒死状态
		if(this.userList[loc].blood > 0 && this.userList[loc].blood <= 10){
			this.playerMoribund(this.userList[loc]);
		}
		// 判断死亡状态
		if(!this.userList[loc].blood){
			var cTime = updateInfo.curTime;
			var reviveList = {};
			console.log("Player Info loc is " + loc + " .\n");
			// this.userList[loc].blood = 100;
			console.log("Player Info revive is " + this.userList[loc].blood + " .\n");
			reviveList[loc] = {};
			if(typeof(this.userList[loc]) != "undefined"){
				var oldUser = this.getInitUserMsg(this.userList[loc]);
				// var pos = oldUser.position;
				// oldUser.position = [pos[0], 74.5, pos[2]];
				reviveList[loc] = oldUser;
				// console.log("oldUserList : " + JSON.stringify(oldUser));
			}
			this.modeObj.gameOver(this.userList, this);
			// console.log("revive list 1 : " + JSON.stringify(reviveList));
			// var model = this.roomObj.roomConfig.model;
			// var userName = reviveList[loc].userName;
			// this.reviveModel(userName, model, reviveList, cTime);
		}
	} else if(updateInfo.type == "monster"){
		console.log("monster info : " + JSON.stringify(updateInfo));
		var targetId = updateInfo.targetId;
		var hurt = updateInfo.hurt;
		var monsterList = this.modeObj.monsterList;
		// console.log("monsterList : " + JSON.stringify(monsterList));
		var flag = false;
		for(var i in monsterList){
			// console.log("monsterList[" + i + "] : " + JSON.stringify(monsterList[i]));
			// for(var j in monsterList[i]){
				// console.log("monsterList[" + j + "] : " + monsterList[i][j]);
				// console.log("monsterList[" + i + "] : " + monsterList[i].id);
				if(monsterList[i].id == targetId){
					var blood = monsterList[i].blood;
					console.log("monster blood : " + blood);
					if(blood - hurt > 0){
						this.modeObj.monsterList[i].blood = blood - hurt;
					}
					if(blood - hurt <= 0){
						this.modeObj.monsterList[i].blood = 0;
					}
					console.log("monster blood :" + this.modeObj.monsterList[i].blood);
					if(!this.modeObj.monsterList[i].blood){
						// console.log("monster death id :" + this.modeObj.monsterList[i].id);
						for(var i in this.userList){
							if(this.userList[i].userName == updateInfo.attacker){
								this.userList[i].targetKillCount++;
								console.log("kill target count : " + this.userList[i].targetKillCount);
							}
						}
						this.modeObj.targetDeath(updateInfo.type, updateInfo.targetId, updateInfo.attacker);
						flag = true;
					}
					// 计算分数
					var scores = 0;
					if(!flag){
						scores = this.modeObj.scoreObj.harmScore(hurt, 100/*生命值正常是从文件中读取*/);
					} else {
						scores = this.modeObj.scoreObj.deathScore(hurt, 100/*生命值正常是从文件中读取*/);
					}
					for(var i in this.userList){
						if(this.userList[i].userName == updateInfo.attacker){
							if(typeof(this.modeObj.rodTimes) != "undefined"){
								this.userList[i].scores[this.modeObj.rodTimes] += scores;
								console.log("rodTimes scores : " + this.userList[i].scores[this.modeObj.rodTimes]);
							}
						}
					}
					// console.log("********flag : " + flag);
					if(flag){
						var isRoundEnd = this.modeObj.isRoundEnd(this.userList);
						// console.log("isRoundEnd : " + isRoundEnd);
						if(isRoundEnd){
							var isGameOver = this.modeObj.isGameOver();
							// console.log("isGameOver : " + isGameOver);
							this.modeObj.repRodStart(isGameOver);
							// console.log("*******isGameOver !");
							if(isGameOver){
								// console.log("***game over !");
								this.gameOver();
							}
						}
					}
					break;
				}
			// }
		}
		if(flag){
			this.fightingRecord("continue");
		}
	}
}
/**
 * 设置中途加入玩家分数
 */
Scene.prototype.sethalfwayInfo = function(playerInfo){
	for(var i in this.userList){
		if(this.userList[i].userName == playerInfo.userName){
			this.userList[i].scores = {};
			for(var j = this.modeObj.rounds; j > 0; j--){
				this.userList[i].scores[j] = 0;
				console.log("init scores : " + JSON.stringify(this.userList[i].scores));
			}
		}
	}
}

// 显示战绩信息
Scene.prototype.fightingRecord = function(state){
	// var count = 0;
	// for(var i in this.userList){
		// count++;
	// }
	var rodTimes = this.modeObj.rodTimes;
	console.log("show record userList : " + JSON.stringify(this.userList));
	for(var i in this.userList){
		this.userList[i].agent.showRecord(this.userList, rodTimes, state);
	}
}

/**
 * 抛出手雷
 */
Scene.prototype.getOutGrenade = function(attacker, targetPos){
	console.log("get out grenade start! \n");
	console.log("get out grenade forward pos : [" + targetPos[0] + " ," + targetPos[1] + " ," + targetPos[2] + "]");
	var loc = 0;
	for(var i in this.userList){
		if(attacker == this.userList[i].userName){
			loc = this.userList[i].loc;
		}
	}
	for(var i in this.userList){
		if(attacker != this.userList[i].userName){
			this.userList[i].agent.noticeGetOut(attacker, loc, targetPos);
		}
	}
	console.log("get out grenade end! \n");
}

/**
 * 手雷伤害计算
 */
Scene.prototype.bombDamage = function(curUser, damage, cTime){
	var myDate=new Date();
	this.sTime = myDate.getTime();
	console.log("bomb damage start! \n");
	// console.log("bomb damage player : " + curUser + "\n");
	console.log("bomb damage loc : " + JSON.stringify(damage) + "\n");
	for(var i in damage){
		if(typeof(this.userList[damage[i].loc].blood) != "undefined"){
			if(this.userList[damage[i].loc].blood - damage[i].hurt > 0){
				this.userList[damage[i].loc].blood -= damage[i].hurt;
			} else {
				this.userList[damage[i].loc].blood = 0;
			}
			console.log("damage[i].loc 1 username : " + this.userList[damage[i].loc].userName + "\n");
			// updateLifeList[damage[i].loc] = {};
			// updateLifeList[damage[i].loc] = this.userList[damage[i].loc];
			this.playerLife(this.userList[damage[i].loc]);
			// 判断濒死状态
			if(this.userList[damage[i]].blood > 0 && this.userList[damage[i].loc].blood <= 10){
				this.playerMoribund(this.userList[damage[i]].loc);
			}
		}
	}
	// var updateLifeList = {};
	var reviveList = {};
	var flag = false;
	for(var i in damage){
		// 玩家是否死亡状态
		if(this.userList[damage[i].loc].blood == 0){
			console.log("damage[i].loc 0 username : " + this.userList[damage[i].loc].userName + "\n");
			// this.userList[damage[i].loc].blood = 100;
			reviveList[damage[i].loc] = {};
			var oldUser = this.getInitUserMsg(this.userList[damage[i].loc]);
			// var pos = oldUser.position;
			// oldUser.position = [pos[0], 74.5, pos[2]];
			reviveList[damage[i].loc] = oldUser;
			flag = true;
			this.modeObj.gameOver(this.userList, this);
		} 
	}
	// if(flag){
		// var model = this.roomObj.roomConfig.model;
		// var userName = reviveList[damage[i].loc].userName;
		// this.reviveModel(userName, model, reviveList, cTime);
		
	// }
	console.log("bomb damage end! \n");
}

/**
 * 玩家进入濒死状态
 */
Scene.prototype.playerMoribund = function(playerInfo){
	for(var i in this.userList){
		this.userList[i].agent.playerMoribund(playerInfo);
	}
}
/**
 * 玩家死亡
 */
Scene.prototype.playerDeath = function(userName){
	var loc = 0;
	for(var i in this.userList){
		if(this.userList[i].userName == userName){
			loc = this.userList[i].loc;
			this.userList[i].blood = 0;
			this.playerLife(this.userList[i]);
			this.modeObj.gameOver(this.userList, this);
			break;
		}
	}
	for(var i in this.userList){
		if(this.userList[i].userName != userName){
			this.userList[i].agent.playerDeath(loc);
		}
	}
}

/**
 * 玩家生命值显示实现
 */
Scene.prototype.playerLife = function(lifeInfo){
	console.log("player life start ! \n");
	// console.log("player life is " + JSON.stringify(lifeInfo) + " ! \n");
	lifeInfo.agent.playerLife(lifeInfo);
	
	console.log("life end! \n");
}

/**
 * 玩家复活实现
 * param : timer -- 死亡多久后复活
 * param : reviveULst -- 复活玩家列表
 */
Scene.prototype.playerRevive = function(reviveULst){
	console.log("player revive start ! \n");
	// console.log("player revive list is " + JSON.stringify(reviveULst) + " ! \n");
	
	for(var i in reviveULst){
		this.userList[reviveULst[i].loc].blood = 100;
		this.playerLife(reviveULst[i]);
		reviveULst[i].agent.playerRevive(reviveULst[i]);
		
		for(var j in this.userList){
			if(reviveULst[i].loc != this.userList[j].loc){
				this.userList[j].agent.playerRevive(reviveULst[i]);
			}
		}
	}
	
	console.log("revive end! \n");
}

/**
 * param -- pos : 当前位置
 * param -- vector ： 方向
 * param -- speed ： 速度
 * param -- time ： 时间
 */
Scene.prototype.getLocalPosition = function(pos, vect, speed, time){
    console.log("get local ! \n");
	var distance = speed * time;
	var vector = new Math3.Vector3(vect);
	vector.Normal();
	vector.Multiply(distance);
	var postion = vector.Add(pos);
	console.log("postion : " + ("[" + postion[0] + "," + postion[1] + "," + postion[2] + "]"));
	var ret = [postion[0], postion[1], postion[2]];
	return ret;
}

Scene.prototype.calculatePos = function(loc, actionName, cTime, curTime, moveSpeed)
{
	//var moveSpeed = 0.01;
	var curPos;
	console.log("calculatePos start!\n");
	this.userList[loc].delayTime = curTime - cTime;
	if(this.userList[loc].delayTime < 0)
	{
		this.userList[loc].delayTime = 0;
	}
	console.log("calculatePos delayTime:" + this.userList[loc].delayTime + " actionName:" + actionName + " .\n");
	//根据当前朝向以及移动动作，确定移动方向
	var px = this.userList[loc].orientation[0];
	var py = this.userList[loc].orientation[1];
	var pz = this.userList[loc].orientation[2];
	
	var tmpVect;
	var time = this.userList[loc].delayTime;
	if((this.userList[loc].curMoveDir[0].toFixed(2) != 0)
	   ||(this.userList[loc].curMoveDir[1].toFixed(2) != 0)
	   ||(this.userList[loc].curMoveDir[2].toFixed(2) != 0)
	)
	{
		var tmpTime = cTime - this.userList[loc].forwardStartTime;
		this.userList[loc].position = this.getLocalPosition(this.userList[loc].position, this.userList[loc].curMoveDir, moveSpeed, tmpTime);
	}
	
	var isRealized = true;
	switch(actionName)
	{
		case "forward.start":
			{
				//当前朝向的向量
				//重力因素，向量的y值为0
				var x = Math.sin(py);
				var z = Math.cos(py);
				var tmpVect = new Math3.Vector3(0 - x, 0, 0 - z);
				this.userList[loc].curMoveDir.Add(tmpVect);
				curPos = this.getLocalPosition(this.userList[loc].position, this.userList[loc].curMoveDir, moveSpeed, time);
				console.log("new way forward.start end!\n");
			}
			break;
		case "forward.stop":
			{
				//当前朝向的向量
				//重力因素，向量的y值为0
				var x = Math.sin(py);
				var z = Math.cos(py);
				curPos = this.getLocalPosition(this.userList[loc].position, this.userList[loc].curMoveDir, moveSpeed, time);
				var tmpVect = new Math3.Vector3(x, 0, z);
				this.userList[loc].curMoveDir.Add(tmpVect);
				console.log("new way forward.stop end!\n");
			}
			break;
		case "backward.start":
			{
				//当前朝向的向量
				//重力因素，向量的y值为0
				var x = Math.sin(py);
				var z = Math.cos(py);
				var tmpVect = new Math3.Vector3(x, 0, z);
				this.userList[loc].curMoveDir.Add(tmpVect);
				curPos = this.getLocalPosition(this.userList[loc].position, this.userList[loc].curMoveDir, moveSpeed, time);
				console.log("new way backward.start end!\n");
			}
			break;
		case "backward.stop":
			{
				//当前朝向的向量
				//重力因素，向量的y值为0
				var x = Math.sin(py);
				var z = Math.cos(py);
				curPos = this.getLocalPosition(this.userList[loc].position, this.userList[loc].curMoveDir, moveSpeed, time);
				var tmpVect = new Math3.Vector3(0 - x, 0, 0 - z);
				this.userList[loc].curMoveDir.Add(tmpVect);
				console.log("new way backward.stop end!\n");
			}
			break;
		case "strafeleft.start":
			{
				//当前朝向的向量
				//重力因素，向量的y值为0
				var x = Math.sin(py - 1.57);
				var z = Math.cos(py - 1.57);
				var tmpVect = new Math3.Vector3(0 - x, 0, 0 - z);
				this.userList[loc].curMoveDir.Add(tmpVect);
				curPos = this.getLocalPosition(this.userList[loc].position, this.userList[loc].curMoveDir, moveSpeed, time);
				console.log("new way strafeleft.start end!\n");
			}
			break;
		case "strafeleft.stop":
			{
				//当前朝向的向量
				//重力因素，向量的y值为0
				var x = Math.sin(py - 1.57);
				var z = Math.cos(py - 1.57);
				curPos = this.getLocalPosition(this.userList[loc].position, this.userList[loc].curMoveDir, moveSpeed, time);
				var tmpVect = new Math3.Vector3(x, 0, z);
				this.userList[loc].curMoveDir.Add(tmpVect);
				console.log("new way strafeleft.stop end!\n");
			}
			break;
		case "straferight.start":
			{
				//当前朝向的向量
				//重力因素，向量的y值为0
				var x = Math.sin(py - 1.57);
				var z = Math.cos(py - 1.57);
				var tmpVect = new Math3.Vector3(x, 0, z);
				this.userList[loc].curMoveDir.Add(tmpVect);
				curPos = this.getLocalPosition(this.userList[loc].position, this.userList[loc].curMoveDir, moveSpeed, time);
				console.log("new way straferight.start end!\n");
			}
			break;
		case "straferight.stop":
			{
				//当前朝向的向量
				//重力因素，向量的y值为0
				var x = Math.sin(py - 1.57);
				var z = Math.cos(py - 1.57);
				curPos = this.getLocalPosition(this.userList[loc].position, this.userList[loc].curMoveDir, moveSpeed, time);
				var tmpVect = new Math3.Vector3(0 - x, 0, 0 - z);
				this.userList[loc].curMoveDir.Add(tmpVect);
				console.log("new way straferight.stop end!");
			}
			break;
		default:
			{
				isRealized = false;
				console.log("calculatePos:" + actionName + " unrealized!" + " .\n");
			}
			break;
	}
	if(isRealized)
	{
		this.userList[loc].forwardStartTime = cTime;
	}
	console.log("calculatePos, curPos:" + curPos + " .\n");
	return curPos;
}
/**
 * 游戏玩家个数
 */
Scene.prototype.getCount = function(){
	var count = 0;
	for(var i in this.userList){
		count++;
	}
	return count;
}

/**
 * 中途退出游戏
 */
Scene.prototype.quitGamming = function(curUser){
	console.log("server room, quit game user name : " + curUser + " .\n");
	// 在这里通知其它人这个用户退出游戏，并且通知其它人在场景中删除这个人物。
	var loc = "";
	//var userInfoQuitGame = {};
	for(var i in this.userList){
		// console.log("***");
		if(this.userList[i].userName == curUser){
			loc = this.userList[i].loc;
			this.userList[i].agent.stopClock();
			//userInfoQuitGame[i] = this.userList[i];
			// console.log("loc ::" + loc);
		}
	}
	var userInfoList = this.roomObj.userList;
	// console.log("server half way userInfoList : " + JSON.stringify(userInfoList));
	// console.log("loc :" + loc);
	for(var i in this.userList){
		//向当前退出的客户
		if(this.userList[i].userName == curUser){
			this.userList[i].agent.selfQuitScene();
			if(!this.userList[i].isHost){
				this.roomObj.userList[this.userList[i].loc].isReady = false;
				this.roomObj.userList[this.userList[i].loc].loadMapOk = false;
			}
			//this.userList[i].agent.update();
			// console.log("server room del, userList : " + JSON.stringify(this.userList[i]) + " .\n");
			delete this.userList[i];
		}
		else
		{ //游戏场景中的其他客户端
			this.userList[i].agent.quitScene(loc);
		}
	}
	//在房间中但不在游戏场景中的人
	for(var i in userInfoList){
		// console.log("***** update !!!");
		// console.log("server half way userInfoList : " + JSON.stringify(userInfoList));
		// console.log("server half way this.userListfoList : " + JSON.stringify(this.userList));
		
		if(typeof(this.userList[i]) != "undefined"){
			//场景中的玩家
			console.log("user list no per !");
			// console.log("userInfoList[" + i + "].userName = " + userInfoList[i].userName);
			// console.log("userList[" + i + "].userName = " + this.userList[i].userName);
		}
		else
		{
			//房间界面的玩家
			// console.log("userInfoList[i].userName == " + userInfoList[i].userName);
			userInfoList[i].agent.update(userInfoList);
		}
		
	
	
	}
	var ret = this.modeObj.isGameOver(this.userList, this.roomObj);
	// console.log("server room del, this.userList : " + JSON.stringify(this.userList) + " .\n");
	// var count = this.getCount();
	// // console.log("server room getCount, count : " + count + " .\n");
	if(ret){
		for(var i in this.userList){
			//鼠标光标显示
			this.userList[i].agent.mouseDisplay();
			if(!this.userList[i].isHost){
				// console.log("!this.userList[i].isHost :" + this.userList[i].userName );
				this.roomObj.userList[this.userList[i].loc].isReady = false;
				this.roomObj.userList[this.userList[i].loc].loadMapOk = false;
			}
		}
		// console.log("***** count ******* .\n");
		for(var i in this.userList){
			if(this.userList[i].userName != curUser){
				// console.log("server half way userInfoList[" + i + "] : " + JSON.stringify(userInfoList[i]));
				userInfoList[i].agent.half_wayGameOver(this.userList);
			}
		}
		this.roomObj.SwitchInterface(this.userList);
		this.roomObj.isStart = false;
	}
}
// 设置游戏模式	
// Scene.prototype.setGameModel = function(){
	// var roomConfig = this.roomObj.roomConfig;
	// var model = roomConfig.model;
	// var rounds = 2;
	// console.log("game model : " + model + " !");
	// switch(model){
		// case "守护模式" :
			// console.log("game model pve !");
			// // 启动定时，以及设置回合次数
			// this.rodTimes = 0;
			// this.setRoundTimes(rounds);
			// // 通知客户端启动定时
			// break;
		// case "团队复生" :
			// console.log("game model pvp !");
			// // 开启游戏定时器
			// this.gameTime(roomConfig);
			// break;
		// default :
			// alert("error : no model !");
	// }	
// }

// /**
 // * 设置回合次数
 // */
// Scene.prototype.setRoundTimes = function(rounds){
	// if(this.rodTimes < rounds){
		// console.log("round times " + this.rodTimes + " !");
		// this.rodTimes++;
		// this.roundTimers = 0;
		// this.roundTimer(this, 300, rounds);
	// } else {
		// this.gameOver();
	// }
// }
 
// /**
 // * 设置回合定时
 // */
// Scene.prototype.roundTimer = function(_this, timer, rounds){
	// if(this.roundTimers >= timer){
		// //console.log("set time !");
		// clearTimeout(this.roundTimEnd);
		// this.playerRevive(this.oldUserList);
		// this.setRoundTimes(rounds);
	// } else {
		// console.log("roundTimers : " + this.roundTimers + " !");
		// this.roundTimers++;
		// this.roundTimEnd = setTimeout(function(){
			// _this.roundTimer(_this, timer, rounds);
		// }, 1000);
	// }
// }

// 设置游戏结束时间，可以加很多类似这样条件，用来结束游戏，比如：杀敌数。
// Scene.prototype.gameTime = function(roomConfig){
	// console.log("set time out start ! \n");
	// var overTime = parseInt(roomConfig.time);  // min
	// _this = this;
	// this.timeOver = "";
	// this.timer = 0;
	// // 游戏结束时间
	// this.setTime(_this, overTime);
	// //this.setTime(_this, 1);
	// console.log("set time : " + overTime + "m . \n");
// }
// // 设置定时器，单位为分钟。
// Scene.prototype.setTime = function(_this, overTime){
	// console.log("setTime is :" + this.timer + "ms .\n");
	// if(this.timer >= overTime){
		// //console.log("set time !");
		// clearTimeout(this.timeOver);
		// this.gameOver();
	// } else {
		// this.timer++;
		// this.timeOver = setTimeout(function(){
			// _this.setTime(_this, overTime);
		// }, 60000);
	// }
// }

// 游戏结束
Scene.prototype.gameOver = function(){
	console.log("set time over end ! \n");
	// 更新战绩信息
	this.fightingRecord("over");
	var userInfoList = this.roomObj.getUserInfoList();
	for(var i in this.userList){
		userInfoList[this.userList[i].loc].started = this.userList[i].isReady;
		if(!this.userList[i].isHost){
			this.userList[i].isReady = false;
			userInfoList[this.userList[i].loc].isReady = false;
			this.roomObj.userList[this.userList[i].loc].isReady = false;
			this.roomObj.userList[this.userList[i].loc].loadMapOk = false;
		}
	}
	//console.log("**&&this.userList : " + JSON.stringify(this.userList) + " !\n");
	var rodTimes = this.modeObj.rounds;
	// 通知相应玩家游戏结束
	for(var i in this.userList){
		//var userList = this.roomObj.getUserInfoList();
		//console.log("this.userList[i].agent.gameOver() start!!!!");
		// console.log("server gameOver, userList : " + JSON.stringify(this.userList[i].userName) + " .\n");
		this.userList[i].agent.noticeGameOver(userInfoList, rodTimes);
		this.userList[i].agent.stopClock();
		// console.log("this.userList[i].agent.gameOver() start!!!!");
	}
	//console.log("!!!!!!!");
	this.roomObj.SwitchInterface(this.userList);
	//console.log("*******");
	this.userList = {}; 
	this.roomObj.isStart = false;
}

/**
 * 切换武器
 */
Scene.prototype.switchWeapon = function(curUser, weaponID){
	console.log(curUser + "switch Weapon is " + weaponID);
	var loc = 0;
	for(var i in this.userList){
		if(curUser == this.userList[i].userName){
			loc = this.userList[i].loc;
			this.userList[i].curWeaponID = weaponID;
			break;
	    }
	}
	if(loc){
		console.log("loc :" + loc);
		for(var i in this.userList){
			if(this.userList[i].userName != curUser){
				this.userList[i].agent.switchWeapon(loc, weaponID);
			}
		}
	}
}

/**
 * 丢弃武器
 */
Scene.prototype.giveUpWeapon = function(curUser, cameraDirect, oldWeaponID, bullet, bultCount){
	console.log(curUser + "giveUp Weapon is" + oldWeaponID + ".\n");
	var loc = 0;
	var oldWeaponID = oldWeaponID;
	for(var i in this.userList){
		if(curUser == this.userList[i].userName){
			loc = this.userList[i].loc;
			break;
	    }
	}
	if(loc){
		console.log("loc :" + loc);
		for(var i in this.userList){
			if(this.userList[i].userName != curUser){
				this.userList[i].agent.giveUpWeapon(loc, cameraDirect, oldWeaponID);
			}
		}
	}
}
/**
 * 拾起武器
 */
Scene.prototype.PickupWeapon = function(curUser, pickUPwep){
	console.log(curUser + "Pick up Weapon is" + pickUPwep + " .\n");
	var loc = 0;
	for(var i in this.userList){
		if(curUser == this.userList[i].userName){
			loc = this.userList[i].loc;
			break;
	    }
	}
	if(loc){
		for(var i in this.userList){
			if(this.userList[i].userName != curUser){
				this.userList[i].agent.PickupWeapon(loc, pickUPwep);
			}
		}
	
	}
}
/**
 * 隐藏武器
 */
Scene.prototype.HideWepon = function(curUser, pickUPwep){
	console.log(curUser + "hide Weapon is" + pickUPwep + " .\n");
	var loc = 0;
	for(var i in this.userList){
		if(curUser == this.userList[i].userName){
			loc = this.userList[i].loc;
			break;
	    }
	}
	if(loc){
		for(var i in this.userList){
			if(this.userList[i].userName != curUser){
				this.userList[i].agent.HideWepon(loc, pickUPwep);
			}
		}
	
	}
}
/**
 * 
 */
Scene.prototype.getWeaponInfoList = function(curUser){
	for(var i in this.userList){
		if(this.userList[i].userName == curUser){
			// console.log("backpack list" + JSON.stringify(this.userList[i].backpackList) + " .\n");
			return this.userList[i].backpackList;
			break;
		}
	}
	return 0;
	
}
/**
 * 切换背包
 */
Scene.prototype.switchPack = function(curUser, packType){
	console.log(curUser + "switch Pack ：" + packType + ".\n");
	var loc = 0;
	for(var i in this.userList){
		if(curUser == this.userList[i].userName){
			loc = this.userList[i].loc;
			break;
	    }
	}
	if(loc){
		console.log("loc :" + loc);
		for(var i in this.userList){
			if(this.userList[i].userName != curUser){
				this.userList[i].agent.switchPack(loc, packType);
			}
		}
	}
	
}