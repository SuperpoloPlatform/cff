(function(){
// 生命值和子弹UI数据
if(!load("../ui/ui.lifebar.js")){
	alert("Failed to load `ui.lifebar.js`");
}
/**
 * 在UI上显示回合开始次数
 */
Event.Subscribe(function(e){
	console.log("ui.showRound ! \n");
	var rodTimes = e.rodTimes;
	console.log("rodTimes :" + rodTimes + "\n");
	GUI.GUISheet.Get("changjing/huihetishi/window").SetProperty("Visible", "True");
	GUI.GUISheet.Get("changjing/huihetishi/text").SetProperty("Text", "");
	GUI.GUISheet.Get("changjing/huihetishi/text").SetProperty("Text", "ROUND " + rodTimes);
	//回合提示显示5秒钟后隐藏
	// setTimeout(function(){
		// HideRound();
	// }, 5000);
}, "ui.showRound");
/**
 * 在UI上隐藏回合开始次数
 */	
 // function HideRound(){
	// console.log("hideRound! \n");
	// GUI.GUISheet.Get("changjing/huihetishi/window").SetProperty("Visible", "False");
// }
/**
 * 在UI上显示回合结束提示
 */
Event.Subscribe(function(e){
	var rodTimes = e.rodTimes;
	var scores = e.scores;
	console.log("ui.showroundEnd ! \n");
	GUI.GUISheet.Get("changjing/huihewancheng/window").SetProperty("Visible", "True");
	GUI.GUISheet.Get("changjing/huihewancheng/text").SetProperty("Text", "");
	GUI.GUISheet.Get("changjing/huihewancheng/text").SetProperty("Text", "ROUND  " + rodTimes + "  CLEAR");
	GUI.GUISheet.Get("changjing/huihefenshu/text").SetProperty("Text", "");
	GUI.GUISheet.Get("changjing/huihefenshu/text").SetProperty("Text", " " + scores);
	//回合提示显示5秒钟后隐藏
	// setTimeout(function(){
		// HideRoundEnd();
	// }, 6000);
}, "ui.showroundEnd");
/**
 * 在UI上隐藏回合结束提示
 */	
 function HideRoundEnd(){
	console.log("hideRoundEnd! \n");
	GUI.GUISheet.Get("changjing/huihewancheng/window").SetProperty("Visible", "False");
}

/**
 * 在UI上显示时钟
 */
Event.Subscribe(function(e){
	// console.log("ui.showClock !\n");
	var time = e.time;
	var minutes =  parseInt(time / 60);
	var seconds = time % 60;
	// console.log("minutes :" + minutes + "\n");
	// console.log("seconds :" + seconds + "\n");
	GUI.GUISheet.Get("changjing/jifenshijian/time/text").SetProperty("Text", minutes + ":" + seconds);
}, "ui.showClock");
/**
 * 在UI上显示目标剩余生命值
 */
Event.Subscribe(function(e){
	var blood = e.blood;
	// console.log("ui, target residual life is " + blood);
	var letUp = 100 - blood;
	var pert = 0;
	if(letUp > 0){
		pert = parseInt(letUp / 5 - 1);
	}
	// console.log("pert : " + pert);
	// console.log("rect : " + LIFE_BAR[pert].rect);
	// console.log("image : " + LIFE_BAR[pert].image);
	GUI.GUISheet.Get("changjing/shengming/count/image").SetProperty("UnifiedAreaRect", LIFE_BAR[pert].rect);
	GUI.GUISheet.Get("changjing/shengming/count/image").SetProperty("image", "set:new_cff image:" + LIFE_BAR[pert].image);
	
	
}, "ui.targetResidualLife");
/**
 * 在UI上显示剩余子弹数量
 */
Event.Subscribe(function(e){
	var actor = e.actor;
	var bultCount = actor.bultCount;
	var count = actor.bullet;
	console.log("ui, bullet bultCount is " + bultCount);
	console.log("ui, bullet count is " + count);
	// var letUp = 30 - count;
	// var pert = parseInt(letUp / 1.5 - 1);
	// console.log("pert : " + pert);
	// console.log("rect : " + BULLET_BAR[pert].rect);
	// console.log("image : " + BULLET_BAR[pert].image);
	var state = "bai";
	var col = "FFFFFFFF";
	if(count >= (bultNum * 0.7)){
		state = "bai";
		col = "FFFFFFFF";
	} else if(count >= (bultNum * 0.3) && count < (bultNum * 0.7)){
		state = "huang";
		col = "FFFFF901";
	} else if(count >= 0 && count < (bultNum * 0.3)){
		state = "hong";
		col = "FFAA0A0A";
	}
	
	GUI.GUISheet.Get("changjing/zidan/count/image").SetProperty("image", "set:new_cff image:" + BULLET_BAR[state].image);
	
	GUI.GUISheet.Get("changjing/zidan/count/text").SetProperty("text_theme", count);
	
	GUI.GUISheet.Get("changjing/zidan/count/text").SetProperty("text_colour", col);
	
	GUI.GUISheet.Get("changjing/zidan/gang/text").SetProperty("text_colour", col);
	
	GUI.GUISheet.Get("changjing/zidan/totle/text").SetProperty("text_theme", bultCount);
	GUI.GUISheet.Get("changjing/zidan/totle/text").SetProperty("text_colour", col);
	if(count == 0){
		Event.Send({
			name : "ui.frontSight",
			state : false
		});
	}
	
}, "ui.blutCount");
/**
 * 房主点击游戏开始时，房间中没有点击准备的用户跳转进入界面通知(pve模式)
 */
Event.Subscribe(function(e){
	var userInfoList = e.userInfoList;
	var isStart = e.isStart;
	console.log("isStart :" + isStart + "\n");
	for(var i in userInfoList){
		GUI.GUISheet.Get("module/root").SetProperty("Visible", "True");
		GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "True");
		GUI.Windows.Get("module/wait/window/join_btn").SetProperty("Visible", "True");
		GUI.Windows.Get("module/wait/window/start_btn").SetProperty("Visible", "False");
		GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "False");
		GUI.Windows.Get("module/wait/window/tuichu_btn").SetProperty("Disabled", "False");
		GUI.Windows.Get("module/wait/window/cancel_btn").SetProperty("Visible", "False");
		local.localWin = "module/wait/window";//最后显示的界面
	}
	// console.log("userInfoList :" + JSON.stringify(userInfoList) + "\n");
	console.log("isStart :" + isStart + "\n")
	updateUserList(userInfoList, isStart);
},"ui.noticeSwitch");
/**
 *通知新人房主跳转到房主界面
 */
Event.Subscribe(function(e){
	var userInfoList = e.userInfoList;
	//userInfoListvar newHost = userInfoList
	console.log("ui.updateHost !");
	for(var i in userInfoList)
	{
		console.log("userInfoList[i].userName :" + userInfoList[i].userName);
		if(curUser == userInfoList[i].userName){
			GUI.GUISheet.Get("module/root").SetProperty("Visible", "True");
			GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "True");
			GUI.Windows.Get("module/wait/window/join_btn").SetProperty("Visible", "False");
			GUI.Windows.Get("module/wait/window/start_btn").SetProperty("Visible", "True");
			GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "False");
			GUI.Windows.Get("module/wait/window/tuichu_btn").SetProperty("Disabled", "False");
			GUI.Windows.Get("module/wait/window/cancel_btn").SetProperty("Visible", "False");
			local.localWin = "module/wait/window";//最后显示的界面
		}else{
			GUI.GUISheet.Get("module/root").SetProperty("Visible", "True");
			GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "True");
			GUI.Windows.Get("module/wait/window/join_btn").SetProperty("Visible", "False");
			GUI.Windows.Get("module/wait/window/start_btn").SetProperty("Visible", "False");
			GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "True");
			GUI.Windows.Get("module/wait/window/tuichu_btn").SetProperty("Disabled", "False");
			GUI.Windows.Get("module/wait/window/cancel_btn").SetProperty("Visible", "False");
			local.localWin = "module/wait/window";//最后显示的界面
		}
	}
	updateUserList(userInfoList);
},"ui.updateHost");
/**
 *通知房间中的用户更新列表
 */
Event.Subscribe(function(e){
	var userInfoList = e.userInfoList;
	console.log("ui.newHost !");
	updateUserList(userInfoList);
},"ui.newHost");
/**
 * 游戏结束后，通知不在游戏中但在房间中的用户跳转界面
 */
Event.Subscribe(function(e){
	console.log("ui.switchInterface start !");
	var userInfoList = e.userInfoList;
	var isStart = e.isStart;
	for(var i in userInfoList){
		if(userInfoList[i].userName == curUser){
			if(userInfoList[i].isHost){//如果是房主
				console.log("curUser :" + curUser);
				GUI.GUISheet.Get("module/root").SetProperty("Visible", "True");
				GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "True");
				GUI.Windows.Get("module/wait/window/join_btn").SetProperty("Visible", "False");
				GUI.Windows.Get("module/wait/window/start_btn").SetProperty("Visible", "True");
				GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "False");
				GUI.Windows.Get("module/wait/window/tuichu_btn").SetProperty("Disabled", "False");
				GUI.Windows.Get("module/wait/window/cancel_btn").SetProperty("Visible", "False");
				local.localWin = "module/wait/window";//最后显示的界面
			}else{
				GUI.GUISheet.Get("module/root").SetProperty("Visible", "True");
				GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "True");
				GUI.Windows.Get("module/wait/window/join_btn").SetProperty("Visible", "False");
				GUI.Windows.Get("module/wait/window/start_btn").SetProperty("Visible", "False");
				GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "True");
				GUI.Windows.Get("module/wait/window/tuichu_btn").SetProperty("Disabled", "False");
				GUI.Windows.Get("module/wait/window/cancel_btn").SetProperty("Visible", "False");
				local.localWin = "module/wait/window";//最后显示的界面
			}
		}
	}
	updateUserList(userInfoList,isStart);
	console.log("ui.switchInterface end !");
},"ui.switchInterface");
/**
 * 游戏结束（时间）
 */
Event.Subscribe(function(e){
	console.log("ui.gameOver start !");
	var actor = e.actor;
	var userInfoList = e.userInfoList;
	// var number = e.number;
	// var rodTimes = e.rodTimes;
	actor.pcarray['pccommandinput'].PerformAction("Activate", ['activate', false]);
	var sectorObj = engine.sectors;
	if((sectorObj.count > 0)&&(sectorObj.Get(0)))
	{
		sectorObj.Remove(0);//参数代表要清除第几个场景。0:代表第一个场
	}
	// GUI.Windows.Get("module/root").SetProperty("Visible","True");
	// GUI.GUISheet.Get("module/zhanhoutongji/Window").SetProperty("Visible", "True");
	// GUI.GUISheet.Get("module/jiazaiye/window").SetProperty("Visible", "false");
	// // GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "false");
	// // GUI.GUISheet.Get("module/main_home/center_kongjian/window").SetProperty("Visible", "false");
	// GUI.GUISheet.Get("changjing/root").SetProperty("Visible", "false");
	// GUI.GUISheet.Get("changjing/esc").SetProperty("Visible", "false");
	// local.localWin = "module/zhanhoutongji/Window";
	// console.log("ui.gameOver end !");
	// showRecord(userInfoList);
	Event.Send({
		name : "ui.showRecord"
		// userInfoList : userInfoList,
		// number : number,
		// rodTimes : rodTimes
	});
	updateUserList(userInfoList);
},"ui.gameOver");
/**
 * 显示玩家战绩
 */
Event.Subscribe(function(e){
	// var userInfoList = e.userInfoList;
	// var number = e.number;
	// var rodTimes = e.rodTimes;
	GUI.Windows.Get("module/root").SetProperty("Visible","True");
	GUI.GUISheet.Get("module/zhanhoutongji/Window").SetProperty("Visible", "True");
	GUI.GUISheet.Get("module/jiazaiye/window").SetProperty("Visible", "False");
	// GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "False");
	// GUI.GUISheet.Get("module/main_home/center_kongjian/window").SetProperty("Visible", "False");
	GUI.GUISheet.Get("changjing/root").SetProperty("Visible", "False");
	GUI.GUISheet.Get("changjing/esc").SetProperty("Visible", "False");
	local.localWin = "module/zhanhoutongji/Window";
	console.log("ui.gameOver end !");
	// showRecord(userInfoList, number, rodTimes);
},"ui.showRecord");
// 隐藏战绩统计
Event.Subscribe(function(e){
	// var userInfoList = e.userInfoList;
	// var number = e.number;
	// var rodTimes = e.rodTimes;
	GUI.Windows.Get("module/root").SetProperty("Visible","False");
	GUI.GUISheet.Get("module/zhanhoutongji/Window").SetProperty("Visible", "False");
	GUI.GUISheet.Get("changjing/root").SetProperty("Visible", "True");
	console.log("ui.gameOver end !");
	// showRecord(userInfoList, number, rodTimes);
},"ui.visibleRecord");
 
/**
 * 玩家中途都退出游戏后，将重新开始下一局游戏
 */
Event.Subscribe(function(e){
	console.log("ui.next game start !");
	local.curOperate = "room";
	var userInfoList = e.userInfoList;
	for(var i in userInfoList){
		if(userInfoList[i].userName == curUser){
			if(userInfoList[i].isHost){
				console.log("userInfoList[i].isHost :" + userInfoList[i].isHost);
				GUI.GUISheet.Get("module/root").SetProperty("Visible", "True");
				GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "True");
				GUI.Windows.Get("module/wait/window/start_btn").SetProperty("Visible", "True");
				GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "False");
				GUI.Windows.Get("module/wait/window/join_btn").SetProperty("Visible", "False");
				GUI.Windows.Get("module/wait/window/cancel_btn").SetProperty("Visible", "False");
				GUI.Windows.Get("module/wait/window/tuichu_btn").SetProperty("Disabled", "False");
				GUI.GUISheet.Get("module/jiazaiye/window").SetProperty("Visible", "False");
				GUI.GUISheet.Get("changjing/root").SetProperty("Visible", "false");
				GUI.GUISheet.Get("changjing/esc").SetProperty("Visible", "false");
				local.localWin = "module/wait/window/start_btn";
			}else{
				console.log("userInfoList[i].isHost :" + userInfoList[i].isHost);
				GUI.GUISheet.Get("module/root").SetProperty("Visible", "True");
				GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "True");
				GUI.Windows.Get("module/wait/window/start_btn").SetProperty("Visible", "False");
				GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "True");
				GUI.Windows.Get("module/wait/window/tuichu_btn").SetProperty("Disabled", "False");
				GUI.Windows.Get("module/wait/window/cancel_btn").SetProperty("Visible", "False");
				GUI.Windows.Get("module/wait/window/join_btn").SetProperty("Visible", "False");
				GUI.GUISheet.Get("module/jiazaiye/window").SetProperty("Visible", "False");
				GUI.GUISheet.Get("changjing/root").SetProperty("Visible", "false");
				GUI.GUISheet.Get("changjing/esc").SetProperty("Visible", "false");
				local.localWin = "module/wait/window";
			}
		}
	} 
	updateUserList(userInfoList);
	console.log("next gmae switch interface end!\n");
},"ui.nextGameStart");
/**
 * 关闭CFF
 */
Event.Subscribe(function(e){
    // alert("crystalspace.application.quit");
	var localUser = false;
	if(local.curOperate == "ingame"){
		// alert("user in gamming !");
		localUser = true;
		Event.Send({
			name : "logic.winQuit",
			userName : curUser
		});
	}
	if(local.curOperate == "room" || localUser){
		// alert("user in room !");
		localUser = true;
		Event.Send({
			name : "logic.quitRoom",
			userName : curUser
		});
	} 
	if(local.curOperate == "channel" || localUser){
		// alert("user in channel !");
		localUser = true;
		Event.Send({
			name : "logic.quitChannel",
			userName : curUser
		});
	} 
	if(local.curOperate == "lobby" || localUser){
		// alert("user in lobby !");
		Event.Send({
			name : "logic.quitLobby",
			userName : curUser
		});
	} 
	
}, "crystalspace.application.quit");

//程序获取焦点
Event.Subscribe(function(e){
    console.log("crystalspace.application.focus.gained");
	local.focus = true;
	// 如果在场景中
	if((local.curOperate == "ingame")&&(local.needChangeFocus))
	{
		selfObj.selfPlayer.pcarray['pcactormove'].mousemove = true;
	}
}, "crystalspace.application.focus.gained");

//程序失去焦点
Event.Subscribe(function(e){
    console.log("crystalspace.application.focus.lost");
	local.focus = false;
	// 如果在场景中
	if(local.curOperate == "ingame")
	{
		selfObj.selfPlayer.pcarray['pcactormove'].mousemove = false;
	}
}, "crystalspace.application.focus.lost");

/**
 * ESC 
 */
 Event.Subscribe(function(e){
	console.log("ui.ESCTab !");
	GUI.GUISheet.Get("changjing/root").SetProperty("Visible", "True");
	GUI.GUISheet.Get("changjing/esc").SetProperty("Visible", "True");
	local.needChangeFocus = false;
	e.actor.pcarray['pcactormove'].mousemove = false;
	//e.actor.pcarray['pccommandinput'].Activate('activate', false);
	e.actor.pcarray['pccommandinput'].PerformAction("Activate", ['activate', false]);
},"ui.ESCTab");
/**
 *  开枪准星变化
 */
 Event.Subscribe(function(e){
	console.log("ui.bulletFire !");
	var mouseR = e.mouseR;
	if(mouseR){
		console.log("jixie .\n");
		GUI.Windows.Get("changjing/zhunxin_putong/image").SetProperty("Visible","True");
		GUI.Windows.Get("changjing/zhunxin_jixie/image").SetProperty("Visible","False");
	}else{
		console.log("putong .\n");
		GUI.Windows.Get("changjing/zhunxin_putong/image").SetProperty("Visible","False");
		GUI.Windows.Get("changjing/zhunxin_jixie/image").SetProperty("Visible","True");
	}
},"ui.bulletFire");
/**
 *  开枪准星变化
 */
 Event.Subscribe(function(e){
	var state = e.state;
	console.log("ui.bulletFire !");
	if(state){
		GUI.Windows.Get("changjing/zhunxin_putong/image").SetProperty("Visible","False");
		GUI.Windows.Get("changjing/zhunxin_jixie/image").SetProperty("Visible","True");
	} else {
		GUI.Windows.Get("changjing/zhunxin_putong/image").SetProperty("Visible","True");
		GUI.Windows.Get("changjing/zhunxin_jixie/image").SetProperty("Visible","False");
	}
},"ui.frontSight");

Event.Subscribe(function(e){
	//console.log("ui.LoadGame");
	var actor = e.actor
	//隐藏鼠标指针
	GUI.System.SetDefaultMouseCursor("cff","touming");
	GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "False");
	GUI.GUISheet.Get("module/jiazaiye/window").SetProperty("Visible", "True");
	local.localWin = "module/jiazaiye/window";
	
},"ui.LoadGame");

Event.Subscribe(function(e){
	var forwardWhere = {
		"choose" : "module/choose_firm/window",
		"lobby" : "module/main_home/window",
		"login" : "module/login/window",
		"register" : "module/register/window",
	};
	var forwardObj = winObj.getWinObj(forwardWhere);
	// if(e.where == "choose"){
		// forwardObj[e.where].SetProperty("Visible","True");
		// forwardObj[e.from].SetProperty("Visible","False");
	// } else if(e.where == "lobby"){
	if(e.where == "lobby"){
		forwardObj[e.where].SetProperty("Visible","True");
		forwardObj[e.from].SetProperty("Visible","False");
		Event.Send({
			name : "logic.enterLobby",
			userName : e.userName
		});
		local.localWin = "module/main_home/center_pindao/window";
	}
}, "ui.JumpInterface");

Event.Subscribe(function(e){
	/**
		* 验证信息显示位置
	*/
	var regCheckObj = {
		"errorRegister" : "module/reg/window/error_info",
		"register" : "module/register/window",
		"choose" : "module/choose_firm/window",
		"lobby" : "module/main_home/window",
		"userName" : "module/creat/window/accout_explain",
		"nickName" : "module/creat/window/nicheng_explain",
		"password" : "module/creat/window/psw_explain",
		"repassword" : "module/creat/window/repsw_expalin",
		"realName" : "module/creat/window/name_explain",
		"email" : "module/creat/window/email_expalin",
		"idCard" : "module/creat/window/num_expalin",
		"vCard" : "module/creat/window/verification_explain"
	};
	var regObject = winObj.getWinObj(regCheckObj);
	if(!e.state){
		// 注册失败，失败原因
		regObject[e.type].SetProperty("Text", "[colour='FFFF0000']" + e.value);
	} else {
		//注册成功
		regObject[e.type].SetProperty("Text", "[colour='FF00FF00']" + e.value);
	}
}, "ui.RegisterCheckInfo");

Event.Subscribe(function(e){
	LoginCheckInfo(e.state, e.type, e.value);
}, "ui.LoginCheckInfo");

Event.Subscribe(function(e){
	GUI.GUISheet.Get("root").SetProperty("Visible", "False");
	GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "False");
	//local.localWin = "module/main_home/center_kongjian/window";
}, "ui.hide_main_page");

Event.Subscribe(function(e){
	
		channelShow(e.channelList);
		
}, "ui.channelShow");

Event.Subscribe(function(e){
	
	SetRoomListShow(e.roomInfoList);
	
}, "ui.SetRoomListShow");

Event.Subscribe(function(e){
	var roomName = e.roomName;
	RoomNameShow(roomName);
	
}, "ui.RoomName");

Event.Subscribe(function(e){
	var team = e.team;
	var title = e.title;
	var nickName = e.nickName;
	if(typeof title == "undefined"){
		title = "无";
	}
	if(typeof team == "undefined"){
		team = "无";	
	}
	
	TeamShow(team ,title, nickName);
	
}, "ui.teamShow");


})();

/**
 *team show
 */
function TeamShow(team, title, nickName){
	var teamWinObj = {
		"module/main_home/home_header/touxiang/zhandui_info" : team,
		"module/main_home/home_header/touxiang/chenghao_info" : title,
		"module/main_home/home_header/touxiang/name" : nickName
	};
	winObj.setWinValue("Text", teamWinObj);
	
	// var teamWinObj = GUI.GUISheet.Get("module/main_home/home_header/touxiang/zhandui_info");
	// teamWinObj.SetProperty("Text", "[colour='FFFFFFFF']" + team);
	
	// var titleWinObj = GUI.GUISheet.Get("module/main_home/home_header/touxiang/chenghao_info");
	// titleWinObj.SetProperty("Text", "[colour='FFFFFFFF']" + title);
	
	// var nickWinObj = GUI.GUISheet.Get("module/main_home/home_header/touxiang/name");
	// nickWinObj.SetProperty("Text", "[colour='FFFFFFFF']" + nickName);
}

/**
 * show channel list
 */
function channelShow(channelList){
	/**
	* 获取频道UI windows名称
	*/
	var chanObjWinT = {
		"pindao" : "_btn/pindao/text",
		"jibie" : "_btn/jibie/text",
		"kongxian" : "_btn/kongxian/text"
	};
	var chlLayoutName = "module/main_home/center_pindao/list";
	var channelNetObj = {};   // 网通
	var channelTelObj = {};   // 电信
	var chalNetWinObj = {};
	var chalTelWinObj = {};
	var m = 1, n = 1;
	for(var i = 1; i <= 20; i++){
		if(i % 2 == 0){
			var chanObj1 = {};
			for(var j in chanObjWinT){
				chanObj1[j] = chlLayoutName + i + chanObjWinT[j];
			}
			channelTelObj[m] = chanObj1;
			chalTelWinObj[m] = chlLayoutName + i + "_btn";
			m++;
		} else {
			var chanObj2 = {};
			for(var j in chanObjWinT){
				chanObj2[j] = chlLayoutName + i + chanObjWinT[j];
			}
			channelNetObj[n] = chanObj2;
			chalNetWinObj[n] = chlLayoutName + i + "_btn";
			n++;
		}
	}
	// console.log("channelNetObj : " + JSON.stringify(chalNetWinObj));
	// console.log("channelTelObj : " + JSON.stringify(chalTelWinObj));
	var chalNetObj = [];
	for(var i in channelNetObj){
		chalNetObj[i] = winObj.getWinObj(channelNetObj[i]);
	}
	var chalTelObj = [];
	for(var i in channelTelObj){
		chalTelObj[i] = winObj.getWinObj(channelTelObj[i]);
	}
	var chalNetWinObjList = winObj.getWinObj(chalNetWinObj);
	var chalTelWinObjList = winObj.getWinObj(chalTelWinObj);
	
	// console.log("chalNetObj : " + chalNetObj);
	// console.log("chalTelObj : " + chalTelObj);
	var a = 1, b = 1;
	for(var i in channelList){
		// console.log("name: " + channelList[i].name);
		if(channelList[i].net == "wangtong"){
			chalNetWinObjList[a].SetProperty("id", channelList[i].id);
			chalNetObj[a].pindao.SetProperty("text_theme", "[colour='FFFFFFFF']" + channelList[i].name);
			chalNetObj[a].jibie.SetProperty("text_theme", "[colour='FFFFFFFF']" + channelList[i].level);
			chalNetObj[a].kongxian.SetProperty("text_theme", "[colour='FFFFFFFF']" + channelList[i].state);
			a++;
		}
		if(channelList[i].net == "dianxin"){
			chalTelWinObjList[b].SetProperty("id", channelList[i].id);
			chalTelObj[b].pindao.SetProperty("text_theme", "[colour='FFFFFFFF']" + channelList[i].name);
			chalTelObj[b].jibie.SetProperty("text_theme", "[colour='FFFFFFFF']" + channelList[i].level);
			chalTelObj[b].kongxian.SetProperty("text_theme", "[colour='FFFFFFFF']" + channelList[i].state);
			b++;
		}
	}
	
}
/**
 * room list show
 */
function SetRoomListShow(roomList){
	// console.log("roomList:" + JSON.stringify(roomList));
	var roomWinName = "module/main_home/center_kongjian/list";
	/**
	* 获取房间UI windows名称
	*/
	var roomObjWinT = {
		"bianhao" : "_btn/bianhao/text",
		"mingcheng" : "_btn/mingcheng/text",
		"mapname" : "_btn/mapname/text",
		"moshi" : "_btn/moshi/text",
		"renshu" : "_btn/renshu/text",
		"zudui" : "_btn/zudui/text",
		"state" : "_btn/state/text"
	};
	var roomWinNameObj = {};
	var roomObjWinList = {};
	for(var i = 1; i <= 12; i++){
		var roomObj = {};
		for(var j in roomObjWinT){
				roomObj[j] = GUI.GUISheet.Get(roomWinName + i + roomObjWinT[j]);
				// console.log("roomObj[j] : " + j);
		}
		// console.log("roomObj : " + roomObj[j]);
		roomObjWinList[i] = roomObj;
		roomWinNameObj[i] = roomWinName + i + "_btn";
	}
	var roomID = {};
	var roomName = {};
	var setRoomID = {};
	var setRoomText = {};
	var idx = 1;
	for(var i in roomWinNameObj){
		setRoomID[roomWinNameObj[i]] = "";
		// setRoomText[roomWinNameObj[i]] = ""; 
	}
	for(var i in roomObjWinList){
		// console.log("clear room start！" );
		roomObjWinList[i].bianhao.SetProperty("Text", "");
		roomObjWinList[i].mingcheng.SetProperty("Text", "");
		roomObjWinList[i].mapname.SetProperty("Text", "");
		roomObjWinList[i].moshi.SetProperty("Text", "");
		roomObjWinList[i].renshu.SetProperty("Text", "");
		roomObjWinList[i].zudui.SetProperty("Text", "");
		roomObjWinList[i].state.SetProperty("Text", "");
		// console.log("clear room end！");
	}
	winObj.setWinValue("id", setRoomID);
	// winObj.setWinValue("text_theme", setRoomText);
	for(var i in roomList){
		setRoomID[roomWinNameObj[idx]] = roomList[i].id;
		roomObjWinList[idx].bianhao.SetProperty("Text", "[colour='FFFFFFFF']" + roomList[i].roomId);
		roomObjWinList[idx].mingcheng.SetProperty("Text", "[colour='FFFFFFFF']" + roomList[i].name);
		roomObjWinList[idx].mapname.SetProperty("Text", "[colour='FFFFFFFF']" + roomList[i].map);
		roomObjWinList[idx].moshi.SetProperty("Text", "[colour='FFFFFFFF']" + roomList[i].model);
		roomObjWinList[idx].renshu.SetProperty("Text", "[colour='FFFFFFFF']" + roomList[i].count + "/" + roomList[i].number);
		roomObjWinList[idx].zudui.SetProperty("Text", "[colour='FFFFFFFF']" + roomList[i].party);
		roomObjWinList[idx].state.SetProperty("Text", "[colour='FFFFFFFF']" + roomList[i].state);
		idx++;
	}

	if(idx != 1){
		winObj.setWinValue("id", setRoomID);
		// winObj.setWinValue("text_theme", setRoomText);
	}
}



function LoginCheckInfo(){
	var loginCheckObj = {
		"errorLogin" : "module/login/window/error_info",
		"choose" : "module/choose_firm/window",
		"lobby" : "module/main_home/window",
		"login" : "module/login/window",
		"userName" : "module/login/window/accout_explain",
		"password" : "module/login/window/psw_explain"
	};
	var loginObj = winObj.getWinObj(loginCheckObj);
	if(!arguments[0]){
		// 登陆失败，失败原因
		loginObj[arguments[1]].SetProperty("Text", "[colour='FFFF0000']" + arguments[2]);
	} else {
		// 登陆成功
		loginObj[arguments[1]].SetProperty("Text", "[colour='FFFF0000']" + arguments[2]);
	}
}

/**
 * 获取Windows对象
 */
var winObj = {
	/**
	 * param : arguments[0] --- windows object .
	 */
	getWinObj : function(){
		if(typeof(arguments[0]) == "object" && arguments.length == 1){
			var winObject = {};
			for(var i in arguments[0]){
				winObject[i] = GUI.Windows.Get(arguments[0][i]);
			}
			return winObject;
		}
		return 0;
	},
	/**
	 * param : arguments[0] --- windows object property name ，比如： Text and text_theme.
	 * param : arguments[1] --- windows object .
	 */
	getWinValue : function(){
		var winValue = {};
		if(arguments.length == 0){
			return 0;
		} else if(typeof(arguments[0]) == "object" && arguments.length == 1){
			for(var i in arguments[0]){
				winValue[i] = GUI.Windows.Get(arguments[0][i]).GetProperty("Text");
			}
			return winValue;
		} else if(typeof(arguments[1]) == "object" && arguments.length == 2){
			for(var i in arguments[1]){
				winValue[i] = GUI.Windows.Get(arguments[1][i]).GetProperty(arguments[0]);
			}
			return winValue;
		}
	},
	/**
	 * param : arguments[0] --- windows object property name ，比如： Text and text_theme.
	 * param : arguments[1] --- windows object and value .
	 */
	setWinValue : function(){   
		if(typeof(arguments[1]) == "object" && arguments.length == 2){
			for(var i in arguments[1]){
				GUI.Windows.Get(i).SetProperty(arguments[0], arguments[1][i]);
			}
			return true;
		}
		return 0;
	}
}