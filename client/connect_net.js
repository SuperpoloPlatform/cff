try{  

	require("corba.js");          
	var console = Registry.Get("iConsole");          
	console.log = console.WriteLine;          
	//cofig必须在InitClient前执行          
	Corba.Config({"threadPerConnectionPolicy":"1"});          
			  
	//initClient参数定义{rootFile:,ClientFile:},若无参数则使用默认的证书文件位置，当前js文件的certificate下          
	Corba.InitClient();          
			  
	//可以不执行SetDefaultNameService，但是这样RegisterObject以及GetObject时就不可以省略NameService段          
	Corba.SetDefaultNameService("corbaloc:iiop:localhost/NameService");          
	//Corba.SetDefaultNameService("corbaloc:iiop:192.168.2.230/NameService");          
  
}catch(e){  
	alert('error:',e);  
}  
