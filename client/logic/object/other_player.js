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
	OTHER = {
		name : "other",
		pc : {
			// "pczonemanager" : {
				// action : [
					// {
						// name : "Load",
						// param : [
								// ['path', '.'],
								// ['file', '/art/level.xml']
						// ]
					// }
				// ]
			// },
			// "pcdefaultcamera" : {
				// action : [
					// {
						// name : "SetCamera",
						// param : [
								// ['modename', 'thirdperson']
						// ]
					// },
					// {
						// name : "SetZoneManager",
						// param : [
								// ['entity', 'other'], 
								// ['region', 'main'],
								// ['start', 'Camera']
						// ]
					// }
				// ],
				// property : [
					// {
						// name : "distance",
						// value : 3
					// }
				// ]
			// },
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','man_1']
						]
					},
					{
						name : "SetAnimation",
						param : [
							['animation','stand'],
							['cycle',true]
						]
					},
					{
						name : "SetVisible",
						param : [
							['visible',true]
						]
					}
				]
			},
			"pclight" : {},
			"pcmechsys" : {},
			"pctimer":{},
			"pclinearmovement" : {
				action : [
					{
						name : "InitCD",
						param : [
							['offset',[0, 0.0, 0]],
							['body',[0.5,0.65,0.5]],
							['legs',[0.5,0.37,0.5]]
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
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							['movement',2],
							['running',2],
							['rotation',2],
							['jumping',4]
						]
					}
				]
			},
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
			"pcpathfinder" : {},
			"pcsteer" : {},
			"pcmover" : {},
			"pccommandinput" : {
				action : [
					{
						name: "Activate",
						param:[
							['activate', false]
						]
					},
					{
						name : "Bind",
						param : [
								['trigger','ESC'],
								['command','quit']
						]
					},
					{
						name : "Bind",
						param : [
								['trigger', 'w'],
								['command', 'forward']
						]
					},
					{
						name : "Bind",
						param : [
								['trigger', 's'],
								['command', 'backward']
						]
					},
					{
						name : "Bind",
						param : [
								['trigger', 'a'],
								['command', 'rotateleft']
						]
					},
					{
						name : "Bind",
						param : [
								['trigger', 'd'],
								['command', 'rotateright']
						]
					},
					
				]
			}
		},
		property : {
			type : "other",
			life : 100,
			weaponstate : "gun",
			weaponstated : "kinfe",
			movement : 0,
			runing : 0,
			rotation : 0,
			jumping : 0,
			weaponList : {"priWeapons":null, "secWeapans":null, "closeinWeapons":null, "throwingWeapon":null}, //{"priWeapons":1, "secWeapans":2, "closeinWeapons":3, "throwingWeapon":[4, 5]}
			weaponstate : "gun",// 当前 player 使用的武器， gun 是枪，kinfe 是刀，grenade 是手雷，还有其它，到时再添加。切换武器时，改变。
		},	
		event : {
			"pctrigger_entityenters" : function (msgid, entity){
				var meshname = entity[1].pcarray['pcmesh'].meshname;
				if(meshname == "grenade"){
					console.log("g, entity leave name is " + meshname);
					var mshN = this.pcarray['pcmesh'].meshname;
					if(typeof(bombpyerList[mshN]) == "undefined"){
						bombpyerList[mshN] = this;		
					}
				}
			},	
			"pctrigger_entityleaves" : function (msgid, entity){
				var meshname = entity[1].pcarray['pcmesh'].meshname;
				if(meshname == "grenade"){
					console.log("g, entity leave name is " + meshname);
					var mshN = this.pcarray['pcmesh'].meshname;
					if(typeof(bombpyerList[mshN]) != "undefined"){
						delete bombpyerList[mshN];		
					}
				}
			},	
		},
		subscribe : {}
	};

}
catch (e)
{
	alert(e);
}