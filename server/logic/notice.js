/**
 * 通知机制，向所有在线用户发布一些官方信息，其中，包括各种列表通知等……
 */
try{
	
	Corba.RegisterObject("#test.my_context/delivery.Object#ServerNotice", {
		/**
		 * 刷新
		 * param : type --- refresh 操作类型，比如：刷新大厅，频道等……
		 */
		refresh : function(type){
			var usersObj = UsersRegObject();
			for(var i in usersObj){
				usersObj[i].refresh(type);
			}
		},
		/**
		 * 新用户进入
		 */
		userNotice : function(userName){
			var usersObj = UsersRegObject();
			for(var i in usersObj){
				usersObj[i].userEnter(userName);
			}
		},
	});
	
	/**
	 * 获取客户端用户注册对象
	 */
	function UsersRegObject(){
		var usersObj = [];
		for(var i in onlineUsers){
			var userObj = Corba.GetObject("#test.my_context/delivery.Object#" + i);
			usersObj.push(userObj);
		}
		return usersObj;
	}
	
} catch(e){
	alert("err : " + e);
}