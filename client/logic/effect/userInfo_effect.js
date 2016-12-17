try{

	if(!load("/logic/userInfo.js")){
		alert("Failed to load `userInfo.js`");
	}
	

} catch(e){
	alert("err : " + e);
}