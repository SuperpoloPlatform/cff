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
	BULLET={
		// mesh : {
			// libPath : "/art/models/genCube/genCube.003",
			// factName : "genCube.003"
		// },
		pc:{
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name', 'bullet']
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
				]
			},
			"pctimer" : {
				
			},
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							['movement',4],
							['running',40],
							['rotation',2],
							['jumping',3]
						]
					}
				],
				property : [
					{
						name : "mousemove",
						value : false
					}
				]
			},			
			"pcprojectile" : {
			
			},
			"pctrigger" : {
				action : [
					{
						name : "SetupTriggerSphere",
						param : [
							['sector', 'Scene'],
							['position', [-7, 0.2, -3.29]],
							['radius', 0]
						]
					}
				],
				property : [
					{
						name : "enable",
						value : true
					}
				]
			},
			"pccommandinput" : {
				action : [
					//鼠标控制
					/*{
							name : "Bind",
							param : [
									['trigger','MouseAxis0'],
									['command','mousemove']
							]
					},*/
				]
			},
		},
		event:{
			//鼠标控制,并且获取其坐标值
			"pccommandinput_mousemove" : function (msgid, x, y){
				var crash=this.pcarray['pclinearmovement'].GetProperty("hug");
				CONSOLE.Write("[debug] [forward ] :" + crash +".\n");
			},
			"pctrigger_entityenters" : function (){
				var pos = this.pcarray['pcmesh'].GetProperty("position");
				CONSOLE.Write("[debug] [tigger in]" + pos.x + "," + pos.y + "," + pos.z+".\n");				
			},
			"pctrigger_entityleaves" : function (){
				var pos = this.pcarray['pcmesh'].GetProperty("position");
				CONSOLE.Write("[debug] [tigger out]" + pos.x + "," + pos.y + "," + pos.z+".\n");
			},
			"pcprojectile_stopped" : function(){
				this.pcarray['pcmesh'].PerformAction('SetVisible',['visible', false]);
				var pos = this.pcarray['pcmesh'].GetProperty("position");
				console.log("pos : [" + pos.x + ", " + pos.y + ", " + pos.z + "]");
				this.pcarray['pcmesh'].MoveMesh([pos.x, -5, pos.z]);
			},
			"pcprojectile_hit" : function(msgid, entity, intersection, meshname){
				console.log("bullet target mesh is " +  entity[1]);
				console.log("bullet target mesh is " + meshname[1]);
				console.log("isAttacker bullet : " + isAttacker);
				var pos = this.pcarray['pcmesh'].GetProperty("position");
				// 弹孔效果
				Event.Send({
					name : "effect.bulletHoles",
					entity : entity[1],
					meshname : meshname[1],
					pos : pos
				});
				Event.Send({
					name : "effect.attackTarget",
					actor : this,
					entity : entity[1],
					meshname : meshname[1],
					isAttacker : isAttacker
				});
				this.pcarray['pcprojectile'].Interrupt();
			},
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