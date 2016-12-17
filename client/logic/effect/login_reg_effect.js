try{

	if(!load("/logic/login_reg.js")){
		alert("Failed to load `userManger.js`");
	}
	
	Event.Subscribe(function(e){
	
		login_reg.userLogin(e.loginInfo);
		
	}, "logic.login");
	
	Event.Subscribe(function(e){
	
		login_reg.registerUser(e.loginInfo);
		
	}, "logic.register");
	
	
	Event.Subscribe(function(e){
	
		var ret = login_reg.RoleOrLabby();
		for(var i in ret){
			console.log(i + " : " + ret[i]);
		}
		Event.Send({
			name : "ui.sureState",
			userName : ret["userName"],
			state : ret["state"]
		});
		
	}, "logic.RoleOrLabby");
	
	Event.Subscribe(function(e){
	
		login_reg.ChooseCompany(e.userName, e.firm);
		
	}, "logic.ChooseCompany");
	
} catch(e){
	alert("err : " + e);
}