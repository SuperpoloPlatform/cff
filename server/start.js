Event.Send("application.open",true);            
            
require("corba.js");            
load("/lib/db.js");            
	            
var console = Registry.Get("iConsole");            
console.log = console.WriteLine;            
if(!load("/logic/dbManager.js")){            
    alert("Failed to load dbManager.js`");            
}	            
//cofig必须在InitServer前执行            
//Corba.Config({"threadPerConnectionPolicy":"0","endPointPublish":"all(addr)"});            
//initServer参数定义{rootFile:,serverFile:},若无参数则使用默认的证书文件位置，当前js文件的certificate下            
Corba.InitServer();            
            
Corba.SetDefaultNameService("corbaloc:iiop:localhost/NameService");            
//Corba.SetDefaultNameService("corbaloc:iiop:192.168.2.230/NameService");            
var delivery = new Delivery("test.my_context/delivery.Object");

if(!load("/logic/lobby.js")){
	alert("Failed to load `lobby.js`");
}

if(!load("/logic/userInfo.js")){
	alert("Failed to load `userInfo.js`");
}    

if(!load("/logic/notice.js")){
	alert("Failed to load `notice.js`");
}      
var onlineUsers = {};            
//onlineUsers[userid] = username;            
Corba.RegisterObject("#test.my_context/delivery.Object#ServerAgent",{           
	currentUser : "",
	userRegister : function(userMsgObj){    
		/**            
			* 匹配插入数据是否存在            
		*/            
		var userName = userMsgObj.userName;            
		var vCard = userMsgObj.vCard;            
		var index = false;            
		var rs = userTable.Select();            
		while(rs.next()){            
			if(rs.getValue("userName") == userName){            
				index = true;            
				break;            
			}            
		}            
		if(!index && (vCard == this.vCard)){  
			console.log(userName + " register !!");
			this.currentUser = userName;
			onlineUsers[userName] = userName;  		
			delete userMsgObj.vCard;  
			userMsgObj["loginTime"] = userMsgObj.registerTime;
            userMsgObj["loginTimes"] = 0;
			userMsgObj["roles"] = false;            
			userMsgObj["company"] = false;   
			// console.log("userMsgObj :" + JSON.stringify(userMsgObj));
			userTable.Insert(userMsgObj); 
			console.log("userMsgObj");
			// this.IsCompany = userMsgObj["company"];
		}   	
		//这里需要检查是否允许被注册，如：用户是否已被注册，若已经被注册，则提示用户“用户名已存在”            
		var ret = {};            
		if(index){            
			ret["userName"] = "username is exist !";            
		}            
		if(vCard != this.vCard){            
			ret["vCard"] = "check card no match !";            
		}    
		return ret;            
	},            
	userLogin : function(userName, password){
		
		var index = false;
		// var ret = {}; 		
		var LastLoginTime;            
		var roles;            
		var rs = userTable.Select();            
		while(rs.next()){
			
			if((rs.getValue("userName") == userName) && (rs.getValue("password") == password)){ 
				 //判断是否已登录
				// for(var i in onlineUsers){
					console.log("userName :" + userName);
					if(onlineUsers[userName] == userName){
						//判断是否还在线（可能异常退出）
						var checkUserObj = Corba.GetObject("#test.my_context/delivery.Object#" + onlineUsers[userName]);
						checkUserObj.setInvoke("checkQuit");
						var isOnline = checkUserObj.checkQuit();
						console.log("isOnline :" + isOnline);
						if(isOnline){
							//该账号已经登录
							console.log(userName + "has been logged");
							return "logged";
						}else{
							//该账号已经异常退出，可再次登陆
							console.log(userName + " login !");
							index = true; 
							this.currentUser = userName;
							onlineUsers[userName] = userName;                  
							// break;            
						}
						
			        }else{ 
						//如果没有登录，则成功登陆
						console.log(userName + " login !");
						index = true; 
						this.currentUser = userName;
						onlineUsers[userName] = userName;         
						// LastLoginTime = rs.getValue(7);            
						// LastLoginTimes = rs.getValue(8);            
						// ret["company"] = rs.getValue("company");           
						// userTable.Insert();            
						// break;            
					}
					
					
		       // }
				
			}            
		}            
		// callback  
		// this.IsCompany = ret["company"];
		return index;            
	},            
	vCard : "",             
	getvCard : function(){            
		this.vCard = "skrk";            
		return this.vCard;            
	},            
	getUserState : function(){     
		var ret = {};
		ret["userName"] = this.currentUser;
		while(rs.next()){            
			if(rs.getValue("userName") == this.currentUser){            
				ret["state"] = rs.getValue("roles");
			}
		}
		return ret;            
	},
	/**
	 * param : getUserID --- 在服务端创建临时用户服务名称
	 */
	getUserID : function(userName){
		for(var i in onlineUsers){
			if(onlineUsers[i] == userName){
				return i;
				break;
			}
		}
	},	
	getUserInfo : function(userID){
		var userName = onlineUsers[userID];
		var where = "userName = '" + userName + "'";
		var userRs = userTable.Select(where);  
		var ret = {};
		while(userRs.next()){                        
			ret["userName"] = userRs.getValue("userName");
			ret["nickName"] = userRs.getValue("nickName");
			ret["realName"] = userRs.getValue("realName");
			ret["idCard"] = userRs.getValue("idCard");
			ret["loginTime"] = userRs.getValue("loginTime");
			ret["roles"] = userRs.getValue("roles");        
		}   
		var userSetRs = userSetTable.Select(where);  
		while(userSetRs.next()){       
			ret["team"] = userSetRs.getValue("team");
			ret["title"] = userSetRs.getValue("title");       
		}  
		return ret;
	},
	chooseCompany : function(userName, firm){
		var setStr = "company = '" + firm + "'";
		var where = "userName = '" + userName + "'";
		userTable.Update(setStr, where);
	},
	clockSyn : function(userName, clientTime)
	{
		var tmpDate = new Date();
		var sTime = tmpDate.getTime();
		console.log("userManger clockSyn start!");
		var agent = Corba.GetObject("#test.my_context/delivery.Object#" + userName);
		
		var myDate=new Date();
		var curTime = myDate.getTime();
		var useTime = curTime - sTime;
		console.log("useTime:" + useTime);
		//agent.setInvoke("clockSyn");
		agent.clockSyn(sTime, clientTime, useTime);
	}
});            
