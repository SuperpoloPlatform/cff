if(!load("/logic/channel.js"))
{
	alert("Failed to load `channel.js`");
}

(function(){

var chlList = {
	1 : {"id" : "channel01", "name" : "channel1", "net" : "wangtong", "level" :"1-10"},
	2 : {"id" : "channel02", "name" : "channel2", "net" : "dianxin", "level" :"1-10"},
	3 : {"id" : "channel03", "name" : "channel3", "net" : "wangtong", "level" :"11-20"},
	4 : {"id" : "channel04", "name" : "channel4", "net" : "dianxin", "level" :"11-20"},
	5 : {"id" : "channel05", "name" : "channel5", "net" : "wangtong", "level" :"21-30"},
	6 : {"id" : "channel06", "name" : "channel6", "net" : "dianxin", "level" :"21-30"},
	7 : {"id" : "channel07", "name" : "channel7", "net" : "wangtong", "level" :"11-20"}
};

var lobby = {
	userList : {},
	channelList : [],
	initChannel : function(){
		var type = "channel";
		var chlName = "";
		var chlObj;
		for(var i in chlList){
			var userList = {};
			chlName = type + "." + chlList[i].id;
			chlObj = new channel(userList, chlList[i]);
			Corba.RegisterObject("#test.my_context/delivery.Object#" + chlName, chlObj);
			this.channelList.push(chlObj);
		}
	},
	enter : function(curUser){
		this.userList[curUser] = this.getUserInfo(curUser);
		// console.log("lobby server, userInfo : " + JSON.stringify(this.userList));
		console.log(curUser + " enter lobby !");
		// 将用户加入到userList中
		return true;
	},
	getChannelList : function(){
		//构建channel信息
		var tmpList = [];
		for(var i in this.channelList)
		{
			tmpList.push(this.channelList[i].getChlInfo());
		}
		return tmpList;
	},
	getChannelUserCount : function(){
		var count = [];
	},
	getUserInfo : function(curUser){
		// console.log("get " + curUser + " info !");
		var where = "userName = '" + curUser + "'";
		var rs = userTable.Select(where);  
		var ret = {};
		while(rs.next()){                      
			ret["id"] = curUser;   // user Id 是登陆后服务器分配的。
			ret["userName"] = rs.getValue("userName");      
			ret["nickName"] = rs.getValue("nickName");      
		}  
		// console.log("userInfo : " + JSON.stringify(ret));
		return ret;
	},
	quit : function(curUser){
		console.log(curUser + " quit lobby, close game !");
		delete this.userList[curUser];
		delete onlineUsers[curUser];
	},
	chatAll : function(msg){
		//遍历userList，向大厅内所有人发送消息
	},
	chatArmy : function(){
		//暂不实现
	}
}
lobby.initChannel();

Corba.RegisterObject("#test.my_context/delivery.Object#Lobby", lobby);
})();