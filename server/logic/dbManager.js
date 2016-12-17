try{
	/**
	 * sqlite db
	 */
	var formatTab1 = {
		"1" : "userName",
		"2" : "nickName",
		"3" : "password",
		"4" : "email",
		"5" : "realName",
		"6" : "idCard",
		"7" : "registerTime",
		"8" : "loginTime",
		"9" : "loginTimes",
		"10" : "roles",
		"11" : "company"
	};
	var sql = new Sqlite();
	var userDB = sql.DB("users");
	var userTable = userDB.Create("user", formatTab1);
	var userRs = userTable.Select();
	if(!userRs.next()){
		userTable.Insert("admin", "nana", "123654");
		userTable.Insert("qq", "lili", "123654");
		userTable.Insert("zz", "luly", "123654");
		userTable.Insert("kk", "oo", "123654");
	}
	var formatTab2 = {
		"1" : "userName",
		"2" : "team",
		"3" : "title",
	};
	var userSetTable = userDB.Create("userSet", formatTab2);
	var userSetRs = userSetTable.Select();
	if(!userSetRs.next()){
		userSetTable.Insert("admin", "Eagle", "xiaoying");
		userSetTable.Insert("qq", "雄鹰", "队长");
		userSetTable.Insert("kk", "雄鹰", "队长");
		userSetTable.Insert("zz", "雄鹰", "队长");
	}
	// var channelTab = {
		// "1" : "userName",
		// "2" : "nickName",
		// "3" : "password",
		// "4" : "realName"
	// }
	// var channelTable = userDB.Create("channel", );
	// usertable.Insert("admin", "", "123654");
	
	
} catch(e){
	alert("err : " + e);
}