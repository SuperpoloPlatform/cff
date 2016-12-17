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
							['running',2],
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
			"pctrigger" : {
				action : [
					{
						name : "SetupTriggerSphere",
						param : [
							['sector', 'Scene'],
							['position', [3, 0.2, -6]],
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
					// 前后左右移动
					// {
						// name : "Bind",
						// param : [
							// ['trigger', 'up'],
							// ['command', 'forward']
						// ]
					// },
				]
			},
		},
		event:{
			"pccommandinput_forward1" : function(){
				Event.Send({
					name : "effect.forward1",
					self : this
				});
			},
			"pccommandinput_forward0" : function(){	
				Event.Send({
					name : "effect.forward0",
					self : this
				});
			},
			"pctrigger_entityenters" : function (){
				var pos = this.pcarray['pcmesh'].GetProperty("position");
				CONSOLE.Write("[debug] [tigger in]" + pos.x + "," + pos.y + "," + pos.z+".\n");
			},
			"pctimer_alarm":function(){
				CONSOLE.Write("[debug] [alarm] :" + this.alarm +".\n");
				this.alarm--;
				if(this.alarm == 0){
					this.alarm = 10;
					this.pcarray['pctimer'].Clear("alarm");
					CONSOLE.Write("[debug] [baozha] : explode.\n");
					this.pcarray['pcmesh'].SetVisible(false);
					this.pcarray['pctrigger'].SetupTriggerSphere("Scene",[3, 0.2, -6],0);
					this.pcarray['pclinearmovement'].InitCD([0, 0.5, 0],[0.5,0.5,0.5],[0.5,0.9,0.5]);
				}
			},
			"pctrigger_entityleaves" : function (){
				var pos = this.pcarray['pcmesh'].GetProperty("position");
				CONSOLE.Write("[debug] [tigger out]" + pos.x + "," + pos.y + "," + pos.z+".\n");
			},
		},
		property:{
			alarm:10,//警报到记时
		},
		subscribe : {
		
		}
	};
	
	AI_GRENADE = {
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