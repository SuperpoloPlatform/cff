// 所有模式都由该基础模式派生，该模式中的所有属性(包括成员变量和成员函数)都需要由prtotype来定义
function BaseBattleMode()
{
}

// 基础模式的属性
BaseBattleMode.prototype.userList = {};
// 伤害计算
BaseBattleMode.prototype.damageCal = function()
{
	var damage = 0;
	return damage;
}

// set monster bornConfig
BaseBattleMode.prototype.setMonsterBornConfig = function(bornConfig, monsterSpawnPos)
{
	this.monsterBornConfig = bornConfig;
	this.monsterSpawnPos = monsterSpawnPos;
}

// 目标死亡
BaseBattleMode.prototype.targetDeath = function(type, target, attacker){
	console.log("target id : " + target);
	console.log("attacker : " + attacker);
	for(var i in this.sceneObj.userList){
		this.sceneObj.userList[i].agent.targetDeath(type, target);
	}
}
// 计算分数
function Score(){

}

// 伤害值计算分数
Score.prototype.harmScore = function(harm, blood){
	return blood * (harm / blood);
}

// 目标死亡计算分数
Score.prototype.deathScore = function(harm, blood){
	return blood * (harm / blood) + 60;
}

Score.prototype.headShotScore = function(harm, blood){
	return blood * (harm / blood) + 100;
}

// 守护模式
function GuardianMode()
{
	this.killMonsterCount = 0; // 所有人杀死怪物的总数
	this.roundMonsterCount = 10;
	this.scoreObj = new Score();
}

// 继承基础模式的属性
GuardianMode.prototype = new BaseBattleMode();

// 是否允许开始
GuardianMode.prototype.isAllowStart = function(userList){
	var count = 0;
	for(var i in userList){
		count++;
	}
	console.log("player count : " + count);
	if(count){
		return 1;
	}
	return 0;
}
// 定义守护模式自己的属性
GuardianMode.prototype.monsterList = [];
GuardianMode.prototype.isStartMode = function(roomConfig, sceneObj){
	console.log("game model pve !");
	this.setModeConfig(roomConfig, sceneObj);
	this.roundStart();
}

/**
 * 设置模式信息
 */
GuardianMode.prototype.setModeConfig = function(roomConfig, sceneObj){
	this.sceneObj = sceneObj;
	// this.rounds = roomConfig. ;
	this.rounds = 2; // 暂时设置为常量
	// 启动定时，以及设置回合次数
	this.rodTimes = 1;
	for(var i in this.sceneObj.userList){
		this.sceneObj.userList[i].scores = {};
		for(var j = this.rounds; j > 0; j--){
			this.sceneObj.userList[i].scores[j] = 0;
			console.log("init scores : " + JSON.stringify(this.sceneObj.userList[i].scores));
		}
	}
	// 初始化战绩信息
	this.sceneObj.fightingRecord("continue");
	this.isFinish = false;
}

/**
 * 通知游戏场景中的玩家显示回合提示
 */
GuardianMode.prototype.showRound = function(handle){
	clearTimeout(handle);
	for(var i in this.sceneObj.userList){
		// console.log("this.sceneObj.userList :" + JSON.stringify(this.sceneObj.userList));
		this.sceneObj.userList[i].agent.showRound(this.rodTimes);
	}
	var _this = this;
	setTimeout(function(){
		_this.hideRoundPrompt(this);
	}, 5000);
}
/**
 * 隐藏回合提示
 */
GuardianMode.prototype.hideRoundPrompt = function(handle){
	clearTimeout(handle);
	for(var i in this.sceneObj.userList){
		this.sceneObj.userList[i].agent.hideRoundPrompt();
	}
}

/**
 * 设置回合开始
 */
GuardianMode.prototype.roundStart = function(handle){
	if(typeof(handle) != "undefined"){
		clearTimeout(handle);
	}
	console.log("round times " + this.rodTimes + " !");
	this.rodKillMonsterNum = 0;
	this.roundKillCount = this.monsterBornConfig[this.rodTimes - 1].monsterCount; // 规定杀死亡敌人数量
	// console.log("round kill monster count : " + this.roundKillCount);
	// this.rodTimes++;
	// 当前服务端时间
	var curDate = new Date();
	this.curTime = curDate.getTime(this.rodTimes);
	var _this = this;
	setTimeout(function(){
		_this.showRound(this);
	}, 5000);
	// this.roundTimer(this, rounds);
	// 通知客户端回合开始,参数：当前时间、延时2s开始下一局游戏、当前为第几回合 
	this.delayTime = 2;
	for(var i in this.sceneObj.userList){
		// @todo:重新设置角色位置、血量、子弹数等
		console.log("this.sceneObj.userList[" + i + "]: " + this.sceneObj.userList[i]);
		var oldUserInfo = this.sceneObj.getInitUserMsg(this.sceneObj.userList[i]);
		// console.log("oldUserInfo: " + JSON.stringify(oldUserInfo));
		// @todo:需要将重设后的角色位置、血量、子弹数发送给client
		this.sceneObj.userList[i].agent.roundStart(this.curTime, this.delayTime, this.rodTimes, oldUserInfo);
	}
		
	var roundObj = this.monsterBornConfig[this.rodTimes - 1];
	for(var group in roundObj.bornConfig)
	{
		var length = roundObj.bornConfig[group].bornPosList.length;
		// 随机该波怪物的出生点
		var id;
		for(var j in roundObj.bornConfig[group].monsterSet)
		{
			var pos = parseInt(Math.random()*(length));
			console.log("monster pos:" + pos);
			var tmp = 0;
			var monsterInfo = [];
			var monsterSetObj = roundObj.bornConfig[group].monsterSet[j];
			for(var k in monsterSetObj)
			{
				console.log("monsterName:" + k);
				for(var x = 0; x < monsterSetObj[k]; x++)
				{
					id = this.monsterList.length;
					var monsterObj = {id : id, pos : this.monsterSpawnPos[pos][tmp++], monsterName : k, blood : 100};
					monsterInfo.push(monsterObj);
					this.monsterList.push(monsterObj);
				}
			}
			
			// 向client发送创建monster的命令 创建怪物的延时时间
			// 怪物id，怪物pos ==> monsterInfoObj
			console.log("monsterInfo:" + JSON.stringify(monsterInfo));
			for(var i in this.sceneObj.userList){
				this.sceneObj.userList[i].agent.createMonster(this.curTime, roundObj.bornConfig[group].bornTime, monsterInfo);
			}
		}
	}
	this.roundMonsterCount = roundObj.monsterCount;
}

/**
 * 判断回合是否结束
 */
GuardianMode.prototype.isRoundEnd = function(){
	// console.log("this.rodKillMonsterNum : " + this.rodKillMonsterNum);
	this.rodKillMonsterNum++;
	if(this.rodKillMonsterNum >= this.roundKillCount){
		for(var i in this.sceneObj.userList){
			this.sceneObj.userList[i].agent.roundEnd(this.rodTimes, this.sceneObj.userList[i].scores[this.rodTimes]);
		}
		// this.rodTimes++;
		// 计时6s后开始下一局游戏, todo
		// setTimeout(function(){
			
		// }, 6000);
		return 1;
	}
	return 0;
}

/**
 * 是否开始游戏
 */
GuardianMode.prototype.repRodStart = function(flag){
	if(!flag){
		var _this = this;
		setTimeout(function(){
			_this.rodTimes++;
			this.rodKillMonsterNum = 0;
			_this.roundStart(this);
		}, 6000);
	}
}
/**
 * 是否结束游戏
 */
GuardianMode.prototype.isGameOver = function(userList, roomObj){
	console.log("***game over typeof : " + typeof(userList));
	console.log("***game over typeof : " + typeof(roomObj));
	if(typeof(userList) != "undefined" && typeof(roomObj) != "undefined"){
		console.log("half way game pve !");
		var count = 0;
		for(var i in userList){
			count++;
		}
		if(count == 0){
			return 1;
		}
		return 0;
	} else {
		if(this.rodTimes + 1 <= this.rounds){
			return 0;
		}
		return 1;
	}
}

GuardianMode.prototype.getSTimer = function(playerInfo){
	console.log("playerInfo : " + JSON.stringify(playerInfo) + "\n");
	var sTime = this.curTime;
	var delayTime = this.delayTime;
	// for(var i in playerInfo){
	playerInfo.agent.clientClock(sTime, delayTime);
	// }
	
}

/**
 * 游戏结束条件
 */
GuardianMode.prototype.gameOver = function(userList, sceneObj){
	console.log("game over pve !");
	var flag = false;
	for(var i in userList){
		if(userList[i].blood){
			flag = true;
			break;
		}
	}
	if(!flag){
		console.log("player is death !");
		sceneObj.gameOver();
	}
	
}
/**
 * 战斗统计，通过伤害计算得分
 */
GuardianMode.prototype.fightingTable = function(hurt){
	
	
	return scores;
}
// 对战模式
function VsMode()
{
}
// 继承基础模式的属性
VsMode.prototype = new BaseBattleMode();
// 是否允许开始
VsMode.prototype.isAllowStart = function(userList){
	var ret = true;
	var count = 0;
	for(var i in userList){
		count++;
	}
	console.log("player count : " + count);
	if(count > 1){
		for(var i in userList){
			if(!(userList[i].isReady)){
				ret = false;
				break;
			}
		}
		return ret ; 
	}
	return 0;
}

VsMode.prototype.isStartMode = function(roomConfig, sceneObj){
	console.log("game model pvp !");
	this.sceneObj = sceneObj;
	var overTime = parseInt(roomConfig.time);  // seconds
	this.timer = 60 * overTime;
	// 游戏结束时间
	this.setTime(this);
	//this.setTime(this, 1);
	console.log("set time : " + overTime + "m . \n");
	this.isFinish = false;
}

// 设置定时器，单位秒。
VsMode.prototype.setTime = function(_this){
	console.log("setTime is :" + this.timer + "ms .\n");
	if(this.timer < 1 && !this.isFinish){
		//console.log("set time !");
		clearTimeout(this.timerOver);
		this.sceneObj.gameOver();
	} else {
		this.timer--;
		this.timerOver = setTimeout(function(){
			_this.setTime(_this, overTime);
		}, 1000);
	}
}
/**
 * 中途退出
 */
VsMode.prototype.isGameOver = function(userList, roomObj){
	console.log("half way game pvp !");
	var count = 0;
	for(var i in userList){
		count++;
	}
	if(count < 2){
		return 1;
	}
	return 0;
}
VsMode.prototype.gameOver = function(userList){
	console.log("game over pvp !");
}
/**
 * 终止回合定时
 */
VsMode.prototype.timerEnd = function(){
	clearTimeout(this.timerOver);
	this.isFinish = true;
}
