/**************************************************************************
*
*  This file is part of the UGE(Uniform Game Engine).
*  Copyright (C) by SanPolo Co.Ltd. 
*  All rights reserved.
*
*  See http://uge.spolo.org/ for more information.
*
*  SanPolo Co.Ltd
*  http://uge.spolo.org/  sales@spolo.org uge-support@spolo.org
*
**************************************************************************/
try {

// ui事件注册
if(!load("/ui/ui_effect.js"))
{
	alert("Failed to load `ui_effect.js`");
}
// logic事件注册
if(!load("/logic/effect/login_reg_effect.js")){
	alert("Failed to load `logic_effect.js`");
}

if(!load("/logic/effect/lobby_effect.js")){
	alert("Failed to load `lobby_effect.js`");
}


if(!load("/logic/effect/channel_effect.js")){
	alert("Failed to load `channel_effect.js`");
}
if(!load("/logic/effect/room_effect.js")){
	alert("Failed to load `room_effect.js`");
}
if(!load("/logic/effect/userInfo_effect.js")){
	alert("Failed to load `userInfo_effect.js`");mousemove
}
// 显示玩家战绩信息
function showRecord(userInfoList, rodTimes, state){
	var str = "module/zhanhoutongji/btn";
	var recordWinObj = {
		"Ranking" : "/mingci/text", // 名次
		"Honor" : "/rongyu/text", // 荣誉
		"order" : "/weijie/text", // 卫阶
		"name" : "/mingcheng/text", // 用户名
		"killOrDeath" : "/jisha/text", // 杀敌数/阵亡数
		"headShot" : "/baotou/text", // 爆头
		"rayKill" : "/leisha/text", // 雷杀
		"knifeKill" : "/daosha/text", // 刀杀
		"help" : "/jiuyuan/text", // 救援
		"trainingTime" : "/canxunshijian/text", // 参训时间
		"score" : "/defen/text", // 得分
		"exp" : "/jingyan/text", // 经验
		"TP" : "/TP/text", // tp
	};
	console.log("userInfoList : " + JSON.stringify(userInfoList) + "\n");
	var recordWinObjList = {};
	for(var i = 1; i <= 16; i++){
		recordWinObjList[i] = {};
		for(var k in recordWinObj){
			recordWinObjList[i][k] = str + i + recordWinObj[k];
		}
	}
	// console.log("recordWinObjList : " + JSON.stringify(recordWinObjList) + "\n");
	var sce = [];
	var idx = 0;
	for(var i in userInfoList){
		sce[idx] = userInfoList[i];
		idx++;
	}
	// console.log("recordWinObjList -- sce : " + JSON.stringify(sce) + "\n");
	for(var i = 0; i < sce.length; i++){
		console.log("0 typeof : " + i);
		console.log("1 typeof : " + typeof(sce[i]));
		console.log("2 typeof : " + typeof(sce[i].scores[rodTimes]));
		for(var j = i; j < sce.length; j++){
			if(typeof(sce[i].scores[rodTimes]) != "undefined" && typeof(sce[j].scores[rodTimes]) != "undefined"){
				var temp = {};
				if(sce[i].scores[rodTimes] < sce[j].scores[rodTimes]){
					temp = sce[i];
					sce[i] = sce[j];
					sce[j] = temp;
				}
			}
		}
	}
	var rdWinObjLst = {};
	for(var i in recordWinObjList){
		rdWinObjLst[i] = winObj.getWinObj(recordWinObjList[i]);
	}
	for(var i = 1; i <= 16; i++){
		rdWinObjLst[i]["Ranking"].SetProperty("Text", "");
		rdWinObjLst[i]["Honor"].SetProperty("Text", "");
		rdWinObjLst[i]["order"].SetProperty("Text", "");
		rdWinObjLst[i]["name"].SetProperty("Text", "");
		rdWinObjLst[i]["killOrDeath"].SetProperty("Text", "");
		rdWinObjLst[i]["headShot"].SetProperty("Text", "");
		rdWinObjLst[i]["rayKill"].SetProperty("Text", "");
		rdWinObjLst[i]["knifeKill"].SetProperty("Text", "");
		rdWinObjLst[i]["help"].SetProperty("Text", "");
		rdWinObjLst[i]["trainingTime"].SetProperty("Text", "");
		rdWinObjLst[i]["score"].SetProperty("Text", "");
		rdWinObjLst[i]["exp"].SetProperty("Text", "");
		rdWinObjLst[i]["TP"].SetProperty("Text", "");
	}
	for(var i = 0; i < sce.length; i++){
		if(typeof(sce[i].scores[rodTimes]) != "undefined"){
			rdWinObjLst[i + 1]["Ranking"].SetProperty("Text", i + 1);
			rdWinObjLst[i + 1]["Honor"].SetProperty("Text", "no");
			rdWinObjLst[i + 1]["order"].SetProperty("Text", "no");
			rdWinObjLst[i + 1]["name"].SetProperty("Text", sce[i].userName);
			rdWinObjLst[i + 1]["killOrDeath"].SetProperty("Text", sce[i].targetKillCount + "/" + sce[i].death);
			rdWinObjLst[i + 1]["headShot"].SetProperty("Text", "no");
			rdWinObjLst[i + 1]["rayKill"].SetProperty("Text", "no");
			rdWinObjLst[i + 1]["knifeKill"].SetProperty("Text", "no");
			rdWinObjLst[i + 1]["help"].SetProperty("Text", "no");
			rdWinObjLst[i + 1]["trainingTime"].SetProperty("Text", "no");
			if(state == "continue"){
				rdWinObjLst[i + 1]["score"].SetProperty("Text", sce[i].scores[rodTimes]);
			} else if(state == "over"){
				var total = 0;
				for(var k in sce[i].scores){
					total += sce[i].scores[k];
				}
				rdWinObjLst[i + 1]["score"].SetProperty("Text", total);
			}
			rdWinObjLst[i + 1]["exp"].SetProperty("Text", "no");
			rdWinObjLst[i + 1]["TP"].SetProperty("Text", "no");
		}
	}
	console.log("recordWinObjList -- sce : " + sce + "\n");
}

function updateUserList(userInfoList, isStart){
	// console.log("#########half way userInfoList : " + JSON.stringify(userInfoList) + " .\n");
	var userWinObj = {};
	for(var i = 1; i < 9; i++){
		userWinObj[i] = "module/wait/wanjialist_left/btn" + i;
		// GUI.Windows.Get(userWinObj[i]).SetProperty("text_theme", "");
	}
	for(var i in userInfoList){
		// console.log("ui, user i : " + i);
		// console.log("ui, user loc : " + userInfoList[i].loc);
		// console.log("ui, user win : " + userWinObj[userInfoList[i].loc]);
		var userName = userInfoList[i].userName;
		// console.log("userInfoList[i].userName::::::" + userInfoList[i].userName + " .\n");
		var nickName = userInfoList[i].nickName;
		var isReady = userInfoList[i].isReady;
		var isHost = userInfoList[i].isHost;
		var loc = userInfoList[i].loc;
		var readyState = "";
		var host = "";
		console.log("loc:" + userInfoList[i].loc + " ishost:" + userInfoList[i].isHost);
		if(isStart){
			host = "";
			console.log("ui update, player userName : " + userName);
			console.log("ui update, player curUser : " + curUser);
			console.log("ui update, player isReady : " + isReady);
			if(isReady && userName != curUser){
				readyState = "游戏进行中……";
			} else {
				readyState = "准备就绪";
			}
		} else {
			host = ""
			readyState = "未准备";
			if(isHost){
				host = "主机";
				readyState = "";
			}
			// console.log("ui, user isReady : " + i + " == " + isReady + " .\n");
			if(isReady && !isHost){
				readyState = "准备就绪";
			}
		}
		GUI.Windows.Get(userWinObj[loc]).SetProperty("text_theme", nickName + "    " + host + "    " + readyState);
	}
}
				
LAYOUTDATA = {
	name : "cff.layout",
	method : {
		to_registerView : function(){
			//还没注册，需先注册
			var login = GUI.GUISheet.Get("module/login/window");
			var register = GUI.GUISheet.Get("module/register/window");
			var setvCard = GUI.GUISheet.Get("module/reg/window/verificationcode_image/text");
			var vCard = login_reg.getvCard();
			// console.log("getvCard Init : " + vCard);
			login.SetProperty("Visible", "False");
			register.SetProperty("Visible", "True");
			local.localWin = "module/register/window";
			setvCard.SetProperty("Text", "[colour='FFFF0000']" + vCard);
			GUI.Windows.Get("module/register/window").active=true;//给注册页面添加一个焦点
		},
		to_backView : function(){
			//转到退出页
			var localwindow = GUI.GUISheet.Get(this.currentWindow[0]);
			var back = GUI.GUISheet.Get("module/exit/window");
			localwindow.SetProperty("Visible","False");
			back.SetProperty("Visible","True");
		},
		/*退出页面时，返回之前页*/ 
		backToView : function(){
			var localwindow = GUI.GUISheet.Get(this.currentWindow[0]);
			var lastWin = GUI.GUISheet.Get(local.localWin);
			localwindow.SetProperty("Visible","False");
			lastWin.SetProperty("Visible","True");
			lastWin.active = true;
		}, 
		login : function(){
			var loginInfoObj = {
				"userName" : "module/login/window/account_Editbox",
				"password" : "module/login/window/psw_Editbox"
			};
			var loginInfo = winObj.getWinValue("Text", loginInfoObj);
			Event.Send({
				name : "logic.login",
				loginInfo : loginInfo
			});
			// userLogin(loginInfo);
		},
		register : function(){
			var regInfoObj = {
				"userName" : "module/reg/window/account_Editbox",
				"nickName" : "module/reg/window/nicheng_Editbox",
				"password" : "module/reg/window/psw_Editbox",
				"repassword" : "module/reg/window/repsw_Editbox",
				"email" : "module/reg/window/email_Editbox",
				"realName" : "module/reg/window/name_Editbox",
				"idCard" : "module/reg/window/num_Editbox",
				"vCard" : "module/reg/window/verification_Editbox",
				// "userAgree" : "module/reg/window/checkbox_btn"
			};
			var regInfo = winObj.getWinValue("Text", regInfoObj);
			Event.Send({
				name : "logic.register",
				loginInfo : regInfo
			});
			// registerUser(regInfo);
		},
		getvCardServer : function(){
			var vCard = getvCard();
			// console.log("getvCard Update : " + vCard);
			var setvCard = GUI.GUISheet.Get("module/reg/window/verificationcode_image/text");
			setvCard.SetProperty("Text", "[colour='FFFF0000']" + vCard);
		},
		quit_win : function(){
			System.Quit();
		},
		
		/**选择公司，确定加入该公司**/
		join_or_no : function(){
			local.firm = this.firmName[0]
			// alert(local.firm);
			GUI.GUISheet.Get("module/choose_firm/join/window").SetProperty("Visible","True");
		},
		not_join : function(){
			GUI.GUISheet.Get("module/choose_firm/join/window").SetProperty("Visible","False");
		},
		ok_join : function(){
			Event.Send({
				name : "logic.ChooseCompany",
				userName : curUser,
				firm : local.firm
			});		
		},
		join_pindao : function(){
			//获取频道列表中被选中的频道
			var pindaoList = GUI.GUISheet.Get("module/main_home/center_pindao/list_window");
			var channel = GUI.GUISheet.Get("module/main_home/center_pindao/window");
			var zone = GUI.GUISheet.Get("module/main_home/center_kongjian/window");
			for(var index =0; index < pindaoList.childCount; index++){
				var childPindao = pindaoList.GetChildAtIdx(index);
				if(childPindao.GetProperty("Selected")=="True"){
					if(childPindao.GetProperty("id") != 0){
						// console.log("channel id : " + childPindao.GetProperty("id"));
						Event.Send({
							name : "logic.enterChannel",
							channelID : childPindao.GetProperty("id")
						});
						channel.SetProperty("Visible", "False");
						zone.SetProperty("Visible", "True");
					}
				
				}
			}
			local.localWin = "module/main_home/center_kongjian/window";
		},
		pindao_list : function(){
			//频道列表显示，当前页面隐藏
			GUI.GUISheet.Get("module/main_home/center_pindao/window").SetProperty("Visible", "True");
			if(local.localWin != "module/main_home/center_pindao/window"){
				console.log("@@@@@@@@@@@@local.localWin : " + local.localWin);
				GUI.GUISheet.Get(local.localWin).SetProperty("Visible", "False");
				local.localWin = "module/main_home/center_pindao/window";
				Event.Send({
					name : "logic.quitChannel",
					userName : curUser
				});
				Event.Send({
					name : "logic.enterLobby",
					userName : curUser
				});
			}
		},
		to_create_room : function(){
			GUI.GUISheet.Get("module/main_home/center_crateroom/window").SetProperty("Visible", "True");
			if(local.localWin != "module/main_home/center_crateroom/window"){
				GUI.GUISheet.Get(local.localWin).SetProperty("Visible", "False");
			} else {
				GUI.GUISheet.Get("module/main_home/center_kongjian/window").SetProperty("Visible", "False");
			}
			local.localWin = "module/main_home/center_crateroom/window";
		},
		direct_to_waitroom : function(){//新加，直接进入等候空间
			//获取选中空间的button
			var kongjian_win = GUI.Windows.Get("module/main_home/center_kongjian/list_window");
			for (var index = 0; index < kongjian_win.childCount; index++){
				var childKongjian = kongjian_win.GetChildAtIdx(index);
				if(childKongjian.GetProperty("Selected") == "True"){
					//console.log("game ==" + game);
					//if(!game){
						Event.Send({
							name : "logic.directRoom",
							customer : curUser,
							roomID : "room." + childKongjian.GetProperty("id")
						});
					//}else{
						//alert("not allowed enter the room");
					//}
				}
			}
		},
		create_to_waitroom : function(){//自己创建好空间后，进等候空间
			var name = {
				"name" : "module/main_home/center_crateroom/kongjian_name/Editbox"
			};
			var roomName = winObj.getWinValue("Text", name);
			var roomInfoObj = {
				"model" : "module/main_home/center_crateroom/xunlianmoshi/btn", // 模式
				"map" : "module/main_home/center_crateroom/choosemap/btn", // 地图
				"number" : "module/main_home/center_crateroom/canxunrenshu/btn", // 人数
				"target" : "module/main_home/center_crateroom/shadimubiao/btn", // 杀敌数
				"time" : "module/main_home/center_crateroom/shijianxianzhi/btn", // 时间
				"harmFriend" : "module/main_home/center_crateroom/youjunshanghai/btn", // 队友伤害是否开启
				"party" : "module/main_home/center_crateroom/zuduifangshi/btn", // 战队
				"cutin" : "module/main_home/center_crateroom/zhongtujiaru/btn", // 是否允许中途加入
				"watch" : "module/main_home/center_crateroom/guanzhanmoshi/btn" // 是否允许观战
			};
			var roomInfo = winObj.getWinValue("text_theme", roomInfoObj);
			roomInfo.name = roomName.name;
			// console.log("roomInfo ui : " + JSON.stringify(roomInfo));
			Event.Send({
				name : "logic.createRoom",
				roomInfo : roomInfo
			});
		},
		// 实现创建房间中的退出
		quitCreatRoom : function(){
			//隐藏要退出的界面。
			GUI.Windows.Get("module/main_home/center_crateroom/window").SetProperty("Visible","False");
			//显示要进入的界面。
			GUI.Windows.Get("module/main_home/center_kongjian/window").SetProperty("Visible","True");
			local.localWin = "module/main_home/center_kongjian/window";
		},
		/** 大厅中editbox中输入文本按发送，将文本显示的显示框 **/
		edit_enter : function(){
			var edit_win = GUI.Windows.Get("module/main_home/center_kongjian/dating_edit/Editbox");
			var enterText = edit_win.GetProperty("Text");
			var dis_win = GUI.Windows.Get("module/main_home/center_kongjian/dating_text/text");
			var dis_info = dis_win.GetProperty("Text");
			dis_info += "\n\
			"+ curUser + " : " + enterText;
			dis_win.SetProperty("Text",dis_info);
			edit_win.SetProperty("Text", "");
			
			Event.Send({
				name : "logic.chatAll",
				self : curUser	,
				text : enterText
						
			});
		},
		own_view : function(){
			GUI.GUISheet.Get("module/main_home/center_gerenkongjian/window").SetProperty("Visible", "True");
			GUI.GUISheet.Get(local.localWin).SetProperty("Visible", "False");
			local.localWin = "module/main_home/center_gerenkongjian/window";
		},
		readyGame : function(){
			GUI.Windows.Get("module/wait/window").SetProperty("Visible", "True");
			GUI.Windows.Get("module/root").SetProperty("Visible", "True");
			GUI.Windows.Get("module/wait/window/cancel_btn").SetProperty("Visible", "True");
			GUI.Windows.Get("module/wait/window/tuichu_btn").SetProperty("Disabled", "True");
			GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "False");
			local.localWin = "module/wait/window/cancel_btn";
			Event.Send({
				name : "logic.readyGame",
				userName : curUser
			});
		},
		/**
		 * 取消准备
		 */
		cancelReady : function(){
			console.log("client ui, cancel ready ! \n");
			GUI.Windows.Get("module/wait/window").SetProperty("Visible", "True");
			GUI.Windows.Get("module/root").SetProperty("Visible", "True");
			GUI.Windows.Get("module/wait/window/cancel_btn").SetProperty("Visible", "False");
			GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "True");
			GUI.Windows.Get("module/wait/window/tuichu_btn").SetProperty("Disabled", "False");
			local.localWin = "module/wait/window";
			Event.Send({
				name : "logic.cancelReady",
				userName : curUser
			});
		},
		quitRoom : function(){
			var ret = GUI.Windows.Get("module/wait/window/cancel_btn").GetProperty("Visible");
			//console.log("ret :" + ret);
			if(ret == "False"){
				console.log("ui : quit game !");
				Event.Send({
					name : "logic.quitRoom",
					userName : curUser
				});
				/**
				 * 退出房间跳转界面
				 */
				GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "False");
				GUI.GUISheet.Get("module/main_home/window").SetProperty("Visible", "True");
				GUI.GUISheet.Get("module/main_home/center_kongjian/window").SetProperty("Visible", "True");
				GUI.GUISheet.Get("module/main_home/center_crateroom/window").SetProperty("Visible", "False");
				local.localWin = "module/main_home/center_kongjian/window";
			}
			
		},
		startGame : function(){
			Event.Send({
				name : "logic.startGame",
				userName : curUser
			});
		},
		half_wayEnterGame : function(){
			console.log("ui.LoadGame");
			//跳转到加载（进度条）界面
			GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "False");
			GUI.GUISheet.Get("module/jiazaiye/window").SetProperty("Visible", "True");
			//隐藏鼠标指针
			GUI.System.SetDefaultMouseCursor("cff","touming");
			Event.Send({
				name : "logic.half_wayEnterGame",
				userName : curUser
			});
			local.localWin = "module/jiazaiye/window";
		},
		/**
		 * quitGameResult --- 点击战后统计界面的确定按钮后，返回到空间等候界面
		 */
		quitGameResult : function(){
			GUI.GUISheet.Get("module/zhanhoutongji/Window").SetProperty("Visible", "False");
			GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "True");
			GUI.GUISheet.Get("module/main_home/center_kongjian/window").SetProperty("Visible", "True");
			GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "True");
			GUI.Windows.Get("module/wait/window/cancel_btn").SetProperty("Visible", "False");
			GUI.Windows.Get("module/wait/window/tuichu_btn").SetProperty("Disabled", "False");
			local.localWin = "module/main_home/center_kongjian/window";
		},
		/**
		 * returnGame --- 点击ESC后，可以通过returnGame返回，继续游戏，关闭ESC浮层。
		 */
		returnGame : function(){
			console.log("user return game !");
			GUI.GUISheet.Get("changjing/root").SetProperty("Visible", "True");
			GUI.GUISheet.Get("changjing/esc").SetProperty("Visible", "False");
			local.needChangeFocus = true;
			selfObj.selfPlayer.pcarray['pcactormove'].mousemove = true;
			Event.Send({
				name : "effect.moveActor"
			});
		},
		/**
		 * returnRoomWait --- 点击ESC后，可以通过returnRoomWait返回到房间等待界面。
		 */
		returnRoomWait : function(){
			console.log("user return room wait !\n");
			GUI.GUISheet.Get("changjing/esc").SetProperty("Visible", "False");
			GUI.GUISheet.Get("changjing/root").SetProperty("Visible", "True");
			GUI.GUISheet.Get("changjing/esc_confirm").SetProperty("Visible", "True");
		},
		returnRoomWait_yes : function(){
			console.log("return room wait !\n");
			//销毁场景
			// var sectorObj = engine.sectors;
			// if((sectorObj.count > 0)&&(sectorObj.Get(0)))
			// {
				// sectorObj.Remove(0);//参数代表要清除第几个场景。0:代表第一个场景
			// }
			GUI.GUISheet.Get("changjing/root").SetProperty("Visible", "False");
			GUI.GUISheet.Get("changjing/esc_confirm").SetProperty("Visible", "False");
			GUI.GUISheet.Get("module/jiazaiye/window").SetProperty("Visible", "False");
			GUI.GUISheet.Get("module/root").SetProperty("Visible", "True");
			GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "True");
			GUI.Windows.Get("module/wait/window/join_btn").SetProperty("Visible", "True");
			GUI.Windows.Get("module/wait/window/start_btn").SetProperty("Visible", "False");
			GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "False");
			GUI.Windows.Get("module/wait/window/cancel_btn").SetProperty("Visible", "False");
			GUI.Windows.Get("module/wait/window/tuichu_btn").SetProperty("Disabled", "False");
			local.localWin = "module/wait/window";//最后显示的界面
			C3D.g2d.SetMouseCursor(C3D.g2d.cursor.csmcNone);
		
			Event.Send({
				name : "logic.quitGame",
				userName : curUser
			});
		},
		returnRoomWait_no : function(){
				console.log("not return Room Wait!");
				GUI.GUISheet.Get("changjing/esc_confirm").SetProperty("Visible", "False");
				GUI.Windows.Get("changjing/root").SetProperty("Visible","True");
				GUI.GUISheet.Get("changjing/esc").SetProperty("Visible", "True");
		},
		xialakuang_display:function(){
			GUI.Windows.Get(this.xialakuangName[0]).SetProperty("Visible","True");
			if(this.name == "module/main_home/center_crateroom/canxunrenshu/btn"){
				if(GUI.Windows.Get("module/main_home/center_crateroom/xunlianmoshi/btn").GetProperty("text_theme")!="守护模式"){
					GUI.Windows.Get(this.xialakuangName[1]).SetProperty("Visible","True");
					GUI.Windows.Get(this.xialakuangName[0]).SetProperty("Visible","False");
				}
			}
			if(this.name == "module/main_home/center_crateroom/shadimubiao/btn" || this.name == "module/main_home/center_crateroom/shijianxianzhi/btn"){
				if(GUI.Windows.Get("module/main_home/center_crateroom/xunlianmoshi/btn").GetProperty("text_theme")=="守护模式"){
					GUI.Windows.Get(this.xialakuangName[0]).SetProperty("Visible","False");
				}
			}
		},
		xialakuang_xiaoshi:function(){
			GUI.Windows.Get(this.xialakuangName[0]).SetProperty("Visible","False");
			var xiala_value = GUI.Windows.Get(this.xialakuangName[1]).GetProperty("text_theme");
			GUI.Windows.Get(this.xialakuangName[2]).SetProperty("text_theme",xiala_value);
			if(this.name == "module/main_home/center_crateroom/xunlianmoshi/shouhumoshi/btn"){
				GUI.Windows.Get("module/main_home/center_crateroom/canxunrenshu/btn").SetProperty("text_theme","2");
				GUI.Windows.Get("module/main_home/center_crateroom/shadimubiao/btn").SetProperty("text_theme","");
				GUI.Windows.Get("module/main_home/center_crateroom/shijianxianzhi/btn").SetProperty("text_theme","");
			}
			if(this.name == "module/main_home/center_crateroom/xunlianmoshi/tuanduifusheng/btn"){
				GUI.Windows.Get("module/main_home/center_crateroom/canxunrenshu/btn").SetProperty("text_theme","12");
				GUI.Windows.Get("module/main_home/center_crateroom/shadimubiao/btn").SetProperty("text_theme","100");
				GUI.Windows.Get("module/main_home/center_crateroom/shijianxianzhi/btn").SetProperty("text_theme","8分钟");
			}
		},
		key_tab : function(e){
			if(e.scancode == GUI.KeyBoard.Return){
				if(this.name == "module/login/window"){
					GUI.Windows.Get("module/login/window/login_btn").active = true;
					LAYOUTDATA.method.login();
				}
				if(this.name == "module/register/window"){
					GUI.Windows.Get("module/reg/window/reg_btn").active = true;
					LAYOUTDATA.method.register();
				}
			}
			if(e.scancode == GUI.KeyBoard.Tab){
				var is_have_active = "false";//记录当前是否有被激活的
				if(this.name == "module/login/window"){
					var tab_win = new Array;
					tab_win.push("module/login/window/account_Editbox");
					tab_win.push("module/login/window/psw_Editbox");
				}
				if(this.name == "module/register/window"){
					var tab_win = new Array;
					tab_win.push("module/reg/window/account_Editbox");
					tab_win.push("module/reg/window/nicheng_Editbox");
					tab_win.push("module/reg/window/psw_Editbox");
					tab_win.push("module/reg/window/repsw_Editbox");
					tab_win.push("module/reg/window/email_Editbox");
					tab_win.push("module/reg/window/name_Editbox");
					tab_win.push("module/reg/window/num_Editbox");
					tab_win.push("module/reg/window/verification_Editbox");
				}
				for(var index in tab_win){
					var win_name = tab_win[index];
					if(GUI.Windows.Get(win_name).active == true){
						if(parseInt(index)  == tab_win.length - 1){
							GUI.Windows.Get(tab_win[0]).active=true;
						}else{
							GUI.Windows.Get(tab_win[parseInt(index)+1]).active=true;
						}
						is_have_active = "true";
						break;
					}
				}
				/**如果当前editbox列表中没有被激活的，把第一个激活**/
				if(is_have_active == "false"){
					GUI.Windows.Get(tab_win[0]).active=true;
				}
			}
		}
	},
	window : {	
		"module/login/window" : {
			property: {},
			event: {
				"KeyUp" : "key_tab"
			},
			subscribe: {}
		},
		"module/register/window" : {
			property: {},
			event: {
				"KeyUp" : "key_tab"
			},
			subscribe: {}
		},
		"module/login/window/login_btn" : {
			property: {},
			event: {
				"MouseClick" : "login"
			},
			subscribe: {
				"crystalspace.input.mouse.0.move" :  function (e){
					// CONSOLE.WriteLine("e.x=  "+e.x);
					// CONSOLE.WriteLine("e.y=  "+e.y);
					// if(e.x>400&&e.x<1450&&e.y>250&&e.y<750){
						// CONSOLE.WriteLine("e.x=  "+e.x);
						// CONSOLE.WriteLine("e.y=  "+e.y);
					// }
					
					/***进入中间方块区域**/
					if(e.x>400&&e.x<1450&&e.y>250&&e.y<750){
						if(local.isenterleft == "true"){
							var anim = GUI.Animations.GetAnimation("root/image"+2);
							if(!anim){
								alert("动画获取失败了！");
							}
							var instant = GUI.Animations.InstantiateAnimation(anim);
							instant.SetTargetWindow(GUI.Windows.Get("root/image"));
							instant.Start();
							local.isenterleft = "false";
						}
						if(local.isentertop == "true"){
							var anim = GUI.Animations.GetAnimation("root/image"+4);
							if(!anim){
								alert("动画获取失败了！");
							}
							var instant = GUI.Animations.InstantiateAnimation(anim);
							instant.SetTargetWindow(GUI.Windows.Get("root/image"));
							instant.Start();
							local.isentertop = "false"
						}
						if(local.isenterright == "true"){
							var anim = GUI.Animations.GetAnimation("root/image"+6);
							if(!anim){
								alert("动画获取失败了！");
							}
							var instant = GUI.Animations.InstantiateAnimation(anim);
							instant.SetTargetWindow(GUI.Windows.Get("root/image"));
							instant.Start();
							local.isenterright = "false"	
						}
						if(local.isenterbottom == "true"){
							var anim = GUI.Animations.GetAnimation("root/image"+8);
							if(!anim){
								alert("动画获取失败了！");
							}
							var instant = GUI.Animations.InstantiateAnimation(anim);
							instant.SetTargetWindow(GUI.Windows.Get("root/image"));
							instant.Start();
							local.isenterbottom = "false"	
						}
					}
					if(e.x<=400&&e.y>250&&e.y<750){
						if(local.isenterleft == "false"){
							var anim = GUI.Animations.GetAnimation("root/image"+1);
							if(!anim){
								alert("动画获取失败了！");
							}
							var instant = GUI.Animations.InstantiateAnimation(anim);
							instant.SetTargetWindow(GUI.Windows.Get("root/image"));
							instant.Start();
						}
						local.isenterleft = "true";
					}
					if(e.y<=250&&e.x>400&&e.x<1450){
						if(local.isentertop == "false"){
							var anim = GUI.Animations.GetAnimation("root/image"+3);
							if(!anim){
								alert("动画获取失败了！");
							}
							var instant = GUI.Animations.InstantiateAnimation(anim);
							instant.SetTargetWindow(GUI.Windows.Get("root/image"));
							instant.Start();
						}
						local.isentertop = "true"
					}
					
					if(e.x>=1450&&e.y>250&&e.y<750){
						if(local.isenterright == "false"){
							var anim = GUI.Animations.GetAnimation("root/image"+5);
							if(!anim){
								alert("动画获取失败了！");
							}
							var instant = GUI.Animations.InstantiateAnimation(anim);
							instant.SetTargetWindow(GUI.Windows.Get("root/image"));
							instant.Start();
						}
						local.isenterright = "true"	
					}
					if(e.y>=750&&e.x>400&&e.x<1450){
						if(local.isenterbottom == "false"){
							var anim = GUI.Animations.GetAnimation("root/image"+7);
							if(!anim){
								alert("动画获取失败了！");
							}
							var instant = GUI.Animations.InstantiateAnimation(anim);
							instant.SetTargetWindow(GUI.Windows.Get("root/image"));
							instant.Start();
						}
						local.isenterbottom = "true"	
					}
					
				}
			}
		},
		"module/login/window/reg_btn" : {
			property: {},
			event: {
				"MouseClick" : "to_registerView"
			},
			subscribe: {}
		},
		"module/login/window/back_btn" : {
			property: {
				currentWindow : function(obj,propt_name){
					obj[propt_name]=["module/login/window"];
					var loadAnimation =GUI.Animations.LoadAnimations("/ui/data/cff.animation");
					if(!loadAnimation)
					{
						alert("animation文件导入失败了!!");
					}
					
					/***把所有的Editbox的光标都给设成闪动的**/
					var editbox_win = new Array;
					editbox_win.push("module/login/window/account_Editbox");
					editbox_win.push("module/login/window/psw_Editbox");
					editbox_win.push("module/reg/window/account_Editbox");
					editbox_win.push("module/reg/window/nicheng_Editbox");
					editbox_win.push("module/reg/window/psw_Editbox");
					editbox_win.push("module/reg/window/repsw_Editbox");
					editbox_win.push("module/reg/window/email_Editbox");
					editbox_win.push("module/reg/window/name_Editbox");
					editbox_win.push("module/reg/window/num_Editbox");
					editbox_win.push("module/reg/window/verification_Editbox");
					
					for(var index in editbox_win){
						var anim = GUI.Animations.GetAnimation("carat_alpha");
						if(!anim){
							alert("动画获取失败了！");
						}
						var instant = GUI.Animations.InstantiateAnimation(anim);
						instant.SetTargetWindow(GUI.Windows.Get(editbox_win[index]));
						instant.Start();
						GUI.Windows.Get("module/login/window").active=true;
					}
				}
			},
			event: {
				"MouseClick" : "to_backView"
			},
			subscribe: {}
		},
		"module/reg/window/back_btn" : {
			property: {
				currentWindow : function(obj,propt_name){
					obj[propt_name]=["module/register/window"];
				}
			},
			event: {
				"MouseClick" : "to_backView"
			},
			subscribe: {}
		},
		"module/reg/window/reg_btn" : {
			property: {
				
			},
			event: {
				"MouseClick" : "register"
			},
			subscribe: {}
		},
		//退出页的时候  返回
		"module/exit/window/exit_btn" : {
			property: {
				currentWindow : function(obj,propt_name){
					obj[propt_name]=["module/exit/window"];
				}
			},
			event: {
				"MouseClick" : "backToView"
			},
			subscribe: {}
		},
		"module/exit/window/back_btn" : {
			property: {},
			event: {
				"MouseClick" : "quit_win"
			},
			subscribe: {}
		},
		"module/creat/window/verification_explain" : {
			property: {}, 
			event: {
				"MouseClick" : "getvCardServer"
			},
			subscribe: {}
		},
		"module/choose_firm/window/xiongshi" : {
			property: {
				firmName : function(obj,propt_name){
					obj[propt_name]=["xiongshikuangye"];
				}
			},
			event: {
				"MouseClick" : "join_or_no"
			},
			subscribe: {}
		},
		"module/choose_firm/window/huangyu" : {
			property: {
				firmName : function(obj,propt_name){
					obj[propt_name]=["huanyutansuo"];
				}
			},
			event: {
				"MouseClick" : "join_or_no"
			},
			subscribe: {}
		},
		"module/choose_firm/join/ok_btn" : {
			property: {},
			event: {
				"MouseClick" : "ok_join"
			},
			subscribe: {
				"ui.enterLobby" : function(e){
					Event.Send({
						name : "logic.enterLobby",
						userName : e.userName
					});
					GUI.GUISheet.Get("module/main_home/window").SetProperty("Visible","True");
					GUI.GUISheet.Get("module/choose_firm/window").SetProperty("Visible","False");
					local.localWin = "module/main_home/window";
					// var roleState = RoleOrLabby();	
				},
			}
		},
		"module/choose_firm/join/cancel_btn" : {
			property: {},
			event: {
				"MouseClick" : "not_join"
			},
			subscribe: {}
		},
		//空间主页
		"module/main_home/center_pindao/joinPindao_btn" : {
			property: {},
			event: {
				"MouseClick" : "join_pindao"
			},
			subscribe: {}
		},
		//双击某频道进入该频道
		"module/main_home/center_pindao/list1_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list2_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list3_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list4_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list5_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list6_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list7_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list8_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list9_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list10_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list11_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list12_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list13_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list14_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list15_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list16_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list17_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list18_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list19_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/center_pindao/list20_btn" : {
			property: {},
			event: {
				"MouseDoubleClick" : "join_pindao"
			},
			subscribe: {}
			},
		"module/main_home/home_header/pindaolb_btn" : {
			property: {},
			event: {
				"MouseClick" : "pindao_list"
			},
			subscribe: {}
			},
		"module/main_home/center_crateroom/chuanjian_btn" : {//创建空间页中的创建按钮
			property: {},
			event: {
				"MouseClick" : "create_to_waitroom"
			},
			subscribe: {
				"ui.userCreateRoom" : function(e){
					// console.log("create room !");
					GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "True");
					GUI.GUISheet.Get("module/main_home/window").SetProperty("Visible", "False");
					GUI.Windows.Get("module/wait/window/start_btn").SetProperty("Visible", "True");
					GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "False");
					GUI.Windows.Get("module/wait/window/join_btn").SetProperty("Visible", "False");
					local.localWin = "module/wait/window";
					var userInfoList = e.userInfoList;
					updateUserList(userInfoList);
				},
				"ui.userJoinRoom" : function(e){
					// console.log("join room !");
					GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "True");
					GUI.GUISheet.Get("module/main_home/window").SetProperty("Visible", "False");
					GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "True");
					GUI.Windows.Get("module/wait/window/start_btn").SetProperty("Visible", "False");
					GUI.Windows.Get("module/wait/window/join_btn").SetProperty("Visible", "False");
					local.localWin = "module/wait/window";
					var userInfoList = e.userInfoList;
					updateUserList(userInfoList);
				},
				"ui.half_wayJoinRoom" : function(e){
					// console.log("join room !");
					GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "True");
					GUI.GUISheet.Get("module/main_home/window").SetProperty("Visible", "False");
					GUI.Windows.Get("module/wait/window/join_btn").SetProperty("Visible", "True");
					GUI.Windows.Get("module/wait/window/start_btn").SetProperty("Visible", "False");
					GUI.Windows.Get("module/wait/window/zhunbei_btn").SetProperty("Visible", "False");
					local.localWin = "module/wait/window";
					var userInfoList = e.userInfoList;
					var isStart = e.isStart;
					updateUserList(userInfoList, isStart);
					
				}
			}
		},
		"module/main_home/center_crateroom/quxiao_btn" : {
			property: {},
			event: {
				"MouseClick" : "quitCreatRoom"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/bottom_creatroom_btn" : {
			property: {},
			event: {
				"MouseClick" : "to_create_room"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/bottom_entrytraroom_btn" : {//选好房间后直接进入
			property: {},
			event: {
				"MouseClick" : "direct_to_waitroom"
			},
			subscribe: {
				"ui.enterDirectRoom" : function(e){
					GUI.GUISheet.Get("module/wait/window").SetProperty("Visible", "True");
					GUI.GUISheet.Get("module/main_home/window").SetProperty("Visible", "False");
					local.localWin = "module/wait/window";
				},
				"ui.userEnterRoom" : function(e){
					var userInfoList = e.userInfoList;
					var isStart = e.isStart;
					// console.log("client ui, userInfo : " + JSON.stringify(userInfoList));
					updateUserList(userInfoList, isStart);
				}
			}
		},
		"module/main_home/center_kongjian/list1_btn" : {//双击某房间后，直接进入
			property: {},
			event: {
				"MouseDoubleClick" : "direct_to_waitroom"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/list2_btn" : {//双击某房间后，直接进入
			property: {},
			event: {
				"MouseDoubleClick" : "direct_to_waitroom"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/list3_btn" : {//双击某房间后，直接进入
			property: {},
			event: {
				"MouseDoubleClick" : "direct_to_waitroom"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/list4_btn" : {//双击某房间后，直接进入
			property: {},
			event: {
				"MouseDoubleClick" : "direct_to_waitroom"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/list5_btn" : {//双击某房间后，直接进入
			property: {},
			event: {
				"MouseDoubleClick" : "direct_to_waitroom"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/list6_btn" : {//双击某房间后，直接进入
			property: {},
			event: {
				"MouseDoubleClick" : "direct_to_waitroom"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/list7_btn" : {//双击某房间后，直接进入
			property: {},
			event: {
				"MouseDoubleClick" : "direct_to_waitroom"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/list8_btn" : {//双击某房间后，直接进入
			property: {},
			event: {
				"MouseDoubleClick" : "direct_to_waitroom"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/list9_btn" : {//双击某房间后，直接进入
			property: {},
			event: {
				"MouseDoubleClick" : "direct_to_waitroom"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/list10_btn" : {//双击某房间后，直接进入
			property: {},
			event: {
				"MouseDoubleClick" : "direct_to_waitroom"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/list11_btn" : {//双击某房间后，直接进入
			property: {},
			event: {
				"MouseDoubleClick" : "direct_to_waitroom"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/list12_btn" : {//双击某房间后，直接进入
			property: {},
			event: {
				"MouseDoubleClick" : "direct_to_waitroom"
			},
			subscribe: {}
		},
		"module/main_home/center_kongjian/dating_edit/enter_btn" : {
			property: {},
			event: {
				"MouseClick" : "edit_enter"
			},
			subscribe: {
				"ui.channelChat" : function(e){
					var dis_win = GUI.Windows.Get("module/main_home/center_kongjian/dating_text/text");
					var dis_info = dis_win.GetProperty("Text");
					dis_info += "\n\
					"+ e.nickName + " : " + e.text;
					dis_win.SetProperty("Text",dis_info);
				}
			}
		},
		"module/main_home/home_header/own_btn" : {
			property: {},
			event: {
				"MouseClick" : "own_view"
			},
			subscribe: {}
		},
		"module/wait/window" : {
			property: {
				init : function(obj,propt_name){
					//找出当前wait页列表中那个Rediobutton被选中
					var parent_win = GUI.Windows.Get("module/wait/wanjialist_left_right/window");
					for(var index = 0; index < parent_win.childCount; index++){
						parent_win.GetChildAtIdx(index).Subscribe(GUI.Windows.MouseClick,function(){
							for(var i = 0; i < parent_win.childCount; i++){
								if(parent_win.GetChildAtIdx(i).GetProperty("Selected")=="True"){
									// alert(i);
									// alert(parent_win.GetChildAtIdx(i).name);
								}
							}
						});
					}
				}
			},
			event: {},
			subscribe: {}
		},
		"module/wait/window/zhunbei_btn" : {
			property: {},
			event: {
				"MouseClick" : "readyGame"
			},
			subscribe: {
				"ui.userReadyGame" : function(e){
					var userInfoList = e.userInfoList;
					updateUserList(userInfoList);
				}
			}
		},
		"module/wait/window/cancel_btn" : {
			property: {},
			event: {
				"MouseClick" : "cancelReady"
			},
			subscribe: {
				"ui.userCancelReadyGame" : function(e){
					var userInfoList = e.userInfoList;
					updateUserList(userInfoList);
				}
			}
		},	
		"module/wait/window/start_btn" : {
			property: {},
			event: {
				"MouseClick" : "startGame"
			},
			subscribe: {}
		},
		"module/wait/window/join_btn" : {
			property: {},
			event: {
				"MouseClick" : "half_wayEnterGame"
			},
			subscribe: {
				"ui.updateUserInfo" : function(e){
					var userInfoList = e.userInfoList;
					var isStart = e.isStart;
					updateUserList(userInfoList,isStart);
				}
			}
		},
		// 点击战后统计界面的确定按钮（进入空间等候界面）
		"module/zhanhoutongji/queren/btn" : {
			property: {},
			event: {
				"MouseClick" : "quitGameResult"
			},
			subscribe: {}
		},
		"module/wait/window/tuichu_btn" : {
			property: {},
			event: {
				"MouseClick" : "quitRoom"
			},
			subscribe: {
				"ui.userQuitRoom" : function(e){
					var loc = e.loc;
					// console.log("userName quit ui : " + userName);
					var userWinObj = {};
					// var userList = {};
					for(var i = 1; i < 9; i++){
						userWinObj[i] = "module/wait/wanjialist_left/btn" + i;
					}
					if(!loc){
						for(var i in userWinObj){
							GUI.Windows.Get(userWinObj[i]).SetProperty("text_theme", "");
						}
					} else {
						GUI.Windows.Get(userWinObj[loc]).SetProperty("text_theme", "");
					}
				},
				// "ui.hostQuitRoom" : function(e){
					// GUI.GUISheet.Get(local.localWin).SetProperty("Visible", "False");
					// GUI.GUISheet.Get("module/main_home/center_kongjian/window").SetProperty("Visible", "True");
					// local.localWin = "module/main_home/center_kongjian/window";
				// }
			}
		},
		"changjing/esc/exit_game/btn" : {
			property: {},
			event: {
				"MouseClick" : "returnGame"
			},
			subscribe: {}
		},
		"changjing/esc/back_room/btn" : {
			property: {},
			event: {
				"MouseClick" : "returnRoomWait"
			},
			subscribe: {}
		},
		"changjing/esc_confirm/yes/btn" : {
			property: {},
			event: {
				"MouseClick" : "returnRoomWait_yes"
			},
			subscribe: {
				"ui.half_wayQuit" : function(e){
					var userInfoList = e.userInfoList;
					var isStart = e.isStart;
					updateUserList(userInfoList,isStart);
				}
			}
		},
		"changjing/esc_confirm/no/btn" : {
			property: {},
			event: {
				"MouseClick" : "returnRoomWait_no"
			},
			subscribe: {}
		},
		//创建空间页中，点击按钮处下拉列表
		//训练模式
		"module/main_home/center_crateroom/xunlianmoshi/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/xunlianmoshi/xialakuang"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_display"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/xunlianmoshi/shouhumoshi/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/xunlianmoshi/xialakuang","module/main_home/center_crateroom/xunlianmoshi/shouhumoshi/btn","module/main_home/center_crateroom/xunlianmoshi/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/xunlianmoshi/tuanduifusheng/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/xunlianmoshi/xialakuang","module/main_home/center_crateroom/xunlianmoshi/tuanduifusheng/btn","module/main_home/center_crateroom/xunlianmoshi/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		//选择地图
		"module/main_home/center_crateroom/choosemap/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/xuanzeditu/xialakuang"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_display"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/xuanzeditu/yunshijukeng/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/xuanzeditu/xialakuang","module/main_home/center_crateroom/xuanzeditu/yunshijukeng/btn","module/main_home/center_crateroom/choosemap/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		//参训人数
		"module/main_home/center_crateroom/canxunrenshu/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/canxunrenshu/pve/xialakuang","module/main_home/center_crateroom/canxunrenshu/pvp/xialakuang"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_display"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/canxunrenshu/pve_2/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/canxunrenshu/pve/xialakuang","module/main_home/center_crateroom/canxunrenshu/pve_2/btn","module/main_home/center_crateroom/canxunrenshu/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/canxunrenshu/pve_4/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/canxunrenshu/pve/xialakuang","module/main_home/center_crateroom/canxunrenshu/pve_4/btn","module/main_home/center_crateroom/canxunrenshu/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/canxunrenshu/pve_8/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/canxunrenshu/pve/xialakuang","module/main_home/center_crateroom/canxunrenshu/pve_8/btn","module/main_home/center_crateroom/canxunrenshu/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/canxunrenshu/pvp_8/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/canxunrenshu/pvp/xialakuang","module/main_home/center_crateroom/canxunrenshu/pvp_8/btn","module/main_home/center_crateroom/canxunrenshu/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/canxunrenshu/pvp_12/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/canxunrenshu/pvp/xialakuang","module/main_home/center_crateroom/canxunrenshu/pvp_12/btn","module/main_home/center_crateroom/canxunrenshu/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/canxunrenshu/pvp_16/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/canxunrenshu/pvp/xialakuang","module/main_home/center_crateroom/canxunrenshu/pvp_16/btn","module/main_home/center_crateroom/canxunrenshu/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		//杀敌目标
		"module/main_home/center_crateroom/shadimubiao/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/shadimubiao/pvp/xialakuang"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_display"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/shadimubiao/pvp_60/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/shadimubiao/pvp/xialakuang","module/main_home/center_crateroom/shadimubiao/pvp_60/btn","module/main_home/center_crateroom/shadimubiao/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/shadimubiao/pvp_100/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/shadimubiao/pvp/xialakuang","module/main_home/center_crateroom/shadimubiao/pvp_100/btn","module/main_home/center_crateroom/shadimubiao/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/shadimubiao/pvp_150/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/shadimubiao/pvp/xialakuang","module/main_home/center_crateroom/shadimubiao/pvp_150/btn","module/main_home/center_crateroom/shadimubiao/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		//时间限制
		"module/main_home/center_crateroom/shijianxianzhi/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/shijianxianzhi/pvp/xialakuang"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_display"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/shijianxianzhi/pvp_8/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/shijianxianzhi/pvp/xialakuang","module/main_home/center_crateroom/shijianxianzhi/pvp_8/btn","module/main_home/center_crateroom/shijianxianzhi/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/shijianxianzhi/pvp_16/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/shijianxianzhi/pvp/xialakuang","module/main_home/center_crateroom/shijianxianzhi/pvp_16/btn","module/main_home/center_crateroom/shijianxianzhi/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/shijianxianzhi/pvp_32/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/shijianxianzhi/pvp/xialakuang","module/main_home/center_crateroom/shijianxianzhi/pvp_32/btn","module/main_home/center_crateroom/shijianxianzhi/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		//友军伤害
		"module/main_home/center_crateroom/youjunshanghai/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/youjunshanghai/xialakuang"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_display"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/youjunshanghai/kaiqi/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/youjunshanghai/xialakuang","module/main_home/center_crateroom/youjunshanghai/kaiqi/btn","module/main_home/center_crateroom/youjunshanghai/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/youjunshanghai/guanbi/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/youjunshanghai/xialakuang","module/main_home/center_crateroom/youjunshanghai/guanbi/btn","module/main_home/center_crateroom/youjunshanghai/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		//中途加入
		"module/main_home/center_crateroom/zhongtujiaru/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/zhongtujiaru/xialakuang"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_display"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/zhongtujiaru/kaiqi/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/zhongtujiaru/xialakuang","module/main_home/center_crateroom/zhongtujiaru/kaiqi/btn","module/main_home/center_crateroom/zhongtujiaru/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		},
		"module/main_home/center_crateroom/zhongtujiaru/guanbi/btn" : {
			property: {
				xialakuangName : function(obj,propt_name){
					obj[propt_name]=["module/main_home/center_crateroom/zhongtujiaru/xialakuang","module/main_home/center_crateroom/zhongtujiaru/guanbi/btn","module/main_home/center_crateroom/zhongtujiaru/btn"];
				}
			},
			event: {
				"MouseClick" : "xialakuang_xiaoshi"
			},
			subscribe: {}
		}
    }
}
} catch( e )
{
alert( e );
}