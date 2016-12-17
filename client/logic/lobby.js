try{	
	/**
	 * 进入大厅
	 */
	lobbyManager.enterLobby = function(userName){
		local.curOperate = "lobby";
		console.log(userName + " enterLobby !");
		this.remoteLobbyObj = Corba.GetObject("#test.my_context/delivery.Object#Lobby");
		// 获取 userID，这个是服务端分配的，当用户退出时，自动释放，再次登陆时，从新分配。
		/**
		 * 通过userName获取相应的userID.
		 * param : userName.
		 */
		if(typeof login_reg.remoteServerAgentObj == "null")
		{
			console.log("login_reg.remoteServerAgentObj is null!\n");
			return;
		}
		if(typeof this.remoteLobbyObj == "null")
		{
			console.log("this.remoteLobbyObj is null!\n");
			return;
		}
		login_reg.remoteServerAgentObj.setInvoke("getUserID");
		var userID = login_reg.remoteServerAgentObj.getUserID(userName);
		/**
		 * 获取个人信息.
		 * param : userID --- getUserInfo(userID)参数必须是userID.
		 */
		login_reg.remoteServerAgentObj.setInvoke("getUserInfo");
		var userInfoObj = login_reg.remoteServerAgentObj.getUserInfo(userID);
		// console.log("userInfo : " + JSON.stringify(userInfoObj));
		
		/**
		 * Channel List from server DB.
		 */
		//console.log("channel list updatting !");
		this.remoteLobbyObj.setInvoke("enter");
		var ret = this.remoteLobbyObj.enter(curUser);
		if(ret){
			this.remoteLobbyObj.setInvoke("getChannelList");
			var channelList = this.remoteLobbyObj.getChannelList();
			//从服务端获取每个频道用户的个数
			var channel = [];
			//var userNumber = [];
			var type = "channel";
			var chlName;
			for(var i in channelList){
				chlName = type + "." + channelList[i].id;
				channel[i] = Corba.GetObject("#test.my_context/delivery.Object#" + chlName);
				//channel[i].setInvoke("UserNumber");
				//userNumber[i] = channel[i].UserNumber(channelList[i].id);
			}
			//var channelState = State(userNumber);
			Event.Send({
				name : "ui.channelShow",
				channelList : channelList,
				//channelState : channelState
			});
			
			//战队及称号显示
			
			Event.Send({
				name : "ui.teamShow",
				team : userInfoObj.team,
				title : userInfoObj.title,
				nickName : userInfoObj.nickName
			});
		}
	}
	// 退出大厅
	lobbyManager.quitLobby = function(userName){
		if(typeof(this.remoteLobbyObj) != null)
			this.remoteLobbyObj.quit(curUser);
	}
	
	//频道状态（空闲、拥挤、爆满）
	function State(userNumber){
		var channelState = [];
		for (var i in userNumber){
			if(userNumber[i]<=10){
				channelState[i] = "idel";
			}else if((userNumber[i]>10)&&(userNumber[i]<=20)){
				channelState[i] = "crowde";
			}else if(userNumber[i]>20){
				channelState[i] = "full";
			}
		}
		return channelState;
	}
	
	

	
} catch(e){
	alert("err : " , e);
}