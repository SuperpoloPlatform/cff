/**************************************************************************
 *
 *  This file is part of the UGE(Uniform Game Engine).
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *
 *  See http://uge.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://uge.spolo.org/  sales@spolo.org uge-support@spolo.org
 *
**************************************************************************/

try {

	/** 全局变量 **/
	// 当点选一个monster的时候，将该monster的entity付给这个全局变量，以方便之后调用。
	var globalObj;
    
    var UpdateProgress = function (count) {
        CONSOLE.WriteLine("[Debug] <UI> UpdateProgress.........");
        Event.Send({
            name : "ui.progress.count.set",
            addCount : count
        });
    }
    
    	
	// 初始化object layout中各个对象。
	// TODO 以后可能需要将每个对象保存在单个文件中。
	if(!load("/objlayout/layout.js"))
	{
	    alert("Failed to load `/objlayout/layout.js`");
	}
	
	
	// 初始化效果。
	if(!load("/effect.js"))
	{
	    alert("Failed to load `effect.js`");
	}
	

	//下面这个方式，通过传入一个对象来初始化。这里我们以JSON格式来定义这个初始化对象。（比如`PLAYER`）
	//这个对象可以被保存在文件中，可以动态加载，加载进来就可以定义若干entity.
	//这里的entity你可以随意添加属性，就是普通的js对象！
	//我们的编辑器将会编辑产生一个entity def json，加载进来就是Entities.CreateEntity中的参数。
	
	//假如接到5个A组人，5个B组人
	var member={
		"warband_A":[
			{name:"player_1"},
			{name:"player_2"},
			{name:"player_3"},
			{name:"player_4"},
			{name:"player_5"}
		],
		"warband_B":[
			{name:"player_6"},
			{name:"player_7"},
			{name:"player_8"},
			{name:"player_9"},
			{name:"player_10"}
		]
	}
	//暂时把Player当成全局唯一的。
	/*var */player = Entities.CreateEntity(PLAYER);
	Entities.CreateAI(player, AI_PLAYER);
	
	//player.forward = 0;
	//player.state = "stand";
	//等效于上边，测试spp.mixin:

	var monster = Entities.CreateEntity(MONSTER);
	Entities.CreateAI(monster, AI_MONSTER);
	
	var grenade = Entities.CreateEntity(GRENADE);
	Entities.CreateAI(grenade, AI_GRENADE);
	
	var bullet = Entities.CreateEntity(BULLET);
	Entities.CreateAI(bullet, AI_BULLET);
	//entity object
	entityList = [
		player,
		monster
	];
	UpdateProgress(11);
    /************************************************************************/	
	/*player创建的时候发送"ui.player.status.set"消息，用于初始化player的UI。*/
	/************************************************************************/
	Event.Send({
		name : "ui.player.status.set",
		player : "玩家",
		cur_hp : player.life,
		max_hp : player.max_hp,
		cup_mp : 0,
		max_mp : player.max_mp,
		
	});
	
}catch(e){
	alert('error:',e);
}