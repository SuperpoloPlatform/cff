try{
	var console = Registry.Get("iConsole");
	console.log = console.WriteLine;
	load("/lib/db.js");
	
	var sqlite = new Sqlite();
	/**
	 * 创建数据库表
	 */
	var userdb = sqlite.DB("userssdf");
	/**
	 * 创建数据库表结构，参数是一个对象时。
	 */
	var format = {
		name1 : "name1", 
		name2 : "name2", 
		name3 : "name3"
	};
	// var usertable1 = userdb.Create("user1");
	var usertable1 = userdb.Create("user1", format);
	// var usertable1 = userdb.Create("user1", "name1", "name2", "name3");
	/**
	 * 创建数据库表结构，参数为多个，除了表名，其它均认为是字段名。
	 */
	var info = {
		name1 : "admin", 
		name2 : "123654", 
		name3 : "ttt"
	};
	usertable1.Insert(info);
	// var usertable2 = userdb.Create("user2", {
		// name1 : "name1",
		// name2 : "name2",
		// name3 : "name3"
	// });
	// usertable2.Insert(format);
	// var rs2 = usertable2.Select();
	// while(rs2.next()){
		// console.log(rs2.getValue(1) + " : " + rs2.getValue(2) + " : " + rs2.getValue(3));
	// }
	console.log("aaaaaaaaaaaaaaa");
	
	// usertable2.Insert("admina", "a123d654", "attta");
	var setStr = "name1 = 'abama'";
	var where = "name2 = '123654'";
	// usertable2.Update(setStr, where);
	// usertable2.Delete(setStr);
	
	// var rs2 = usertable2.Select();
	// while(rs2.next()){
		// console.log(rs2.getValue(1) + " : " + rs2.getValue(2) + " : " + rs2.getValue(3));
	// }
	
	var rs1 = usertable1.Select(where);
	while(rs1.next()){
		console.log(rs1.getValue(1) + " : " + rs1.getValue(2) + " : " + rs1.getValue(3));
	}
	

	usertable1.close();
	
} catch(e){
	alert("err : " + e);
}