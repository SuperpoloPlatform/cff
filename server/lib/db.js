try{
	var console = Registry.Get("iConsole");
	console.log = console.WriteLine;
	
	function Sqlite(){
	
	}
	
	Sqlite.prototype.DB = function(name){
		this.DB.conn = SQL.DriverManager.getConnection("jdbc:sqlite:data\\" + name + ".db");
		this.DB.Create = function(){
			var ret = false;
			if(arguments.length == 0){
				return 0;
			} else {
				ret = new CreateTable(this.conn, arguments);
			}
			return ret;
		}
		return this.DB;
	}
	Sqlite.prototype.CloseDB = function(){
		delete SQL.DriverManager; 
	}
	
	function CreateTable(){
		this.conn = arguments[0];
		var args = [];
		for(var i in arguments[1]){
			args.push(arguments[1][i]);
		}	
		this.state = false;
		this.prep = false;
		this.tableName = args[0];
		if(args.length == 0){
			return 0;
		} else if(args.length == 1 && typeof(this.tableName) != "object"){
			this._create = "create table if not exists " + this.tableName + " (id);";
			this._insert = "insert into " + this.tableName + " values (?);";
			this._select = "select * from " + this.tableName + ";";
			this.state = this.conn.createStatement();
			this.state.executeUpdate(this._create);
		} else if(args.length > 1 && typeof(this.tableName) != "object"){
			var field = "";
			var idx = "";
			if((args.length == 2) && typeof(args[1]) == "object"){   
				for(var i in args[1]){
					field += args[1][i] + ",";
					idx += "?,";
				}
			} else {
				for(var i = 1; i < args.length; i++){
					field += args[i] + ",";
					idx += "?,";
				}
			}
			field = field.substring(0, field.length - 1);
			idx = idx.substring(0, idx.length - 1);
			this._create = "create table if not exists " + this.tableName + " (" + field + ");";
			this._insert = "insert into " + this.tableName + " values (" + idx + ");";
			this._select = "select * from " + this.tableName + ";";
			this.state = this.conn.createStatement();
			this.state.executeUpdate(this._create);
		}
		return this;
	}
	
	CreateTable.prototype.Insert = function(){
		this.prep = this.conn.prepareStatement(this._insert);  
		if(typeof(arguments[0]) == "object"){
			var idx = 1;
			for(var i in arguments[0]){
				this.prep.setValue(idx, arguments[0][i]);
				idx++;
			}
		} else {
			for(var i = 0; i < arguments.length; i++){
				this.prep.setValue(i + 1, arguments[i]);
			}
		}
		this.prep.executeUpdate();
		//return this.prep;
	}
	CreateTable.prototype.Update = function(setString, where){
		var _update = "update " + this.tableName + " set " + setString + " where " + where;
		// alert(_update);
		var rs = this.state.executeUpdate(_update);
		return rs;
	}
	CreateTable.prototype.Delete = function(where){
		var _delete = "delete from " + this.tableName + " where " + where;
		// alert(_delete);
		var rs = this.state.executeUpdate(_delete);
		return rs;
	}
	CreateTable.prototype.Select = function(){
		var select1 = "";
		if(arguments.length == 0){ 
			select1 = this._select;
		} else if(arguments.length == 1){
			select1 = this._select.substring(0, this._select.length - 1) + " where " + arguments[0] + ";";
		}
		var rs = this.state.executeQuery(select1);
		return rs;
	}
	CreateTable.prototype.close = function(){
		if (this.state) {
			this.state.close();
			delete this.state; 
		}
		if (this.prep) {
			this.prep.close();
			delete this.prep; 
		}
	}
	
} catch(e){
	alert("err : " + e);
}