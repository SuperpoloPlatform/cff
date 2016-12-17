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

try{
	GRENADE={
		name:"grenade",
		pc:{
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name', 'grenade']
						]
					}
				],
				property : [
					{
						name : "gravity",
						value : 19.6
					}
				]
			},
			"pctimer" : {},
			"pctrigger" : {
				action : [
					{
						name : 'SetupTriggerSphere', 
						param : [
							['sector', 'Scene'], 
							['position', [0, 0, 0]], 
							['radius', 10]
						]
					}
				],
				property : [
					{
						name : "enabled",
						value : false
					}
				]
			},
			"pclinearmovement" : {
				action : [
					{
						name : "InitCD",
						param : [
							['offset', [0, 0.5, 0]],
							['body', [0.5,0.5,0.5]],
							['legs', [0.5,0.9,0.5]]
						]
					}
				],
				property : [
					{
						name : "gravity",
						value : 19.6
					}
				]
			},
		},
		event:{
			"pctrigger_entityenters" : function (msgid, entity){
				var meshname = entity[1].pcarray['pcmesh'].meshname;
				if(meshname != "grenade"){
					console.log("g, entity leave name is " + meshname);
					if(typeof(bombpyerList[meshname]) == "undefined"){
						bombpyerList[meshname] = entity[1];		
					}
				}
			},	
			"pctrigger_entityleaves" : function (msgid, entity){
				var meshname = entity[1].pcarray['pcmesh'].meshname;
				if(meshname != "grenade"){
					console.log("g, entity leave name is " + meshname);
					if(typeof(bombpyerList[meshname]) != "undefined"){
						delete bombpyerList[meshname];		
					}
				}
			},	
			"pctimer_bombTimer" : function(){
				// console.log("bombpyerList : " + JSON.stringify(bombpyerList));
				var mshName = selfObj.selfPlayer.pcarray['pcmesh'].meshname;
				if(this.bombPlayer == mshName){
					var damage = {};
					var idx = 1;
					for(var i in bombpyerList){
						var entMsh = bombpyerList[i].pcarray['pcmesh'].meshname;
						console.log("entMsh : " + entMsh);
						var playerPos = bombpyerList[i].pcarray['pcmesh'].GetProperty("position");
						console.log("playerPos : [" + playerPos[0] + " ," + playerPos[1] + " ," + playerPos[2] + "]");
						var bombPos = this.pcarray['pcmesh'].GetProperty("position");
						console.log("bombPos : [" + bombPos[0] + " ," + bombPos[1] + " ," + bombPos[2] + "]");
						var bombDirect = playerPos.Subtract(bombPos);
						console.log("bombDirect : [" + bombDirect[0] + " ," + bombDirect[1] + " ," + bombDirect[2] + "]");
						var distance = bombDirect.Length();
						console.log("bomb and player distance : " + distance);
						damage[idx] = {};
						var power = weaponMap[this.curWeaponID].harm;
						console.log("grenade power : " + power);
						damage[idx].hurt = Math.round(Math.abs(power * (1 - distance / 5) * 2.5));
						damage[idx].meshname = bombpyerList[i].pcarray['pcmesh'].meshname;
						damage[idx].loc = bombpyerList[i].loc;
						console.log("damage : " + JSON.stringify(damage));
						idx++;
					}
					var boMsh = this.pcarray['pcmesh'].meshname;
				
					Event.Send({
						name : "net.bombDamage",
						type : "bombDamage",
						damage : damage,
						boMsh : boMsh,
						bombPlayer : this.bombPlayer
					});
					bombpyerList = {};
				}
				Event.Send({
					name : "effect.bombEffect",
					actor : this
				});
			}
		},
		property:{
			curWeaponID : 0
		},
		subscribe : {
		
		}
	};
	
}
catch (e)
{
	alert(e);
}