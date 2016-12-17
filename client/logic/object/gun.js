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
	GUN = {
		name:"gun",
		pc:{
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name', 'gun']
						]
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
			"pctimer" : {},
			"pctrigger" : {
				action : [
					{
						name : "SetupTriggerSphere",
						param : [
							['sector', 'Scene'],
							['position', [0, 0, 0]],
							['radius', 1]
						]
					}
				]
			}
		},
		event:{
			"pctimer_hideGun" : function (){
				console.log("pctimer_hideGun .\n");
				this.pcarray['pcmesh'].PerformAction('SetVisible',['visible', false]);
				this.pcarray['pctimer'].Clear("hideGun");
				this.pcarray['pctrigger'].SetProperty(" ", false);
			},
			"pctrigger_entityenters" : function (msgid, entity){//玩家进入拾起武器的范围内。
				// console.log("typeof(entity[1].loc) :" + typeof(entity[1].loc));
				if(typeof(entity[1].loc) != "undefined"){
					console.log("entity[1].loc : " + entity[1].loc + "enter .\n");
					var meshname = entity[1].pcarray["pcmesh"].meshname;
					console.log("entity : " + meshname + " .\n");
					console.log("entity[1].isPickUp :" + entity[1].isPickUp);
					entity[1].isPickUp = true;
					var idx = 0;
					var weaponInfo = {};
					weaponInfo.weaponID = this.curWeaponID;
					weaponInfo.bullet = entity[1].bullet;
					weaponInfo.bultCount = entity[1].bultCount;
					weaponInfo.ownerBy = entity[1].loc;
					var tempWeaponList = {}; //临时捡取武器列表 ：临时捡取武器列表中原有的武器加上当前可捡取的武器。
					var pickUPwepnLst = entity[1].pickUPwepnLst;
					for(var i in pickUPwepnLst){
						//临时捡取武器列表中原有的武器
						tempWeaponList[i] = pickUPwepnLst[i];
						idx++;
					}
					tempWeaponList[idx] = weaponInfo;//又一个可捡取的武器。
					entity[1].pickUPwepnLst = tempWeaponList;
					//console.log("********entity[1].isPickUp ::" + entity[1].isPickUp);
					//alert("please enter E pick up weapon");
					// if(entity[1].weaponList.priWeapons == null){
						// console.log("pick up Weapon");
						// console.log("entity[1].curWeaponType :" + entity[1].curWeaponType);
						// entity[1].curWeaponType = 1;
						// this.pcarray['pcmesh'].PerformAction('SetVisible',['visible', false]);
						// curScene.PickupWeapon(entity[1].loc, this.curWeaponID);
					// }

				}
			},
			"pctrigger_entityleaves" : function (msgid, entity){//玩家离开拾起武器的范围内。
				if(typeof(entity[1].loc) != "undefined"){
					console.log("entity[1].loc : " + entity[1].loc + "leaves .\n");
					var meshname = entity[1].pcarray["pcmesh"].meshname;
					console.log("leaves : " + meshname + " .\n");
				}
			}
		},
		property : {
			curWeaponID : 2,
			bullet : 0,
			bultCount : 0
		},
		subscribe : {
		
		}
	};
	
}
catch (e)
{
	alert(e);
}