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
		name:"bullet",
		pc:{
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name', 'bullet']
						]
					},
					{
						name : "SetAnimation",
						param : [
							['animation', 'stand'],
							['cycle', true]
						]
					},
					{
						name : "SetVisible",
						param : [
							['visible', false]
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
		},
		property:{
			bullet_forward:function(e){
				Event.Send({
					name : "effect.forward1",
					self : this
				});
			}
		},
		subscribe : {
			"AI.bullet.mouseforward" : "bullet_forward"
		}
	};
	
	AI_BULLET = {
		event : {
			"to_attack" : function(attacker, target) {
				
			},
			"under_attack" : function(attacker, target) {
			
			}
		}
	};
}
catch (e)
{
	alert(e);
}