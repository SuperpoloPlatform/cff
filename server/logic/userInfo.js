try{
	// var curUserObj = {};
	function noticeUser(type, userList, userName){
		for(var i in userList){
			 // console.log("userList[i] : " + JSON.stringify(userList[i]));
			 // console.log("userList[i].id : " + userList[i].id);
			var curUserObj = Corba.GetObject("#test.my_context/delivery.Object#" + userList[i].id);
			if(type == "enter"){
				console.log("user notice type : " + type);
				curUserObj.noticeEnter(userName);
			} else if(type == "ready"){
				console.log("user notice type : " + type);
				curUserObj.noticeReady(userName);
			} else if(type == "start"){
				//curUserObj.noticeStart(userName);
			} else if(type == "quit"){
				console.log("user notice type : " + type);
				curUserObj.noticeQuit(userName);
			}
		}
	}
} catch(e){
	alert("err : " + e);
}

