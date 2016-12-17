/**************************************************************************
 *
 *  This file is part of the UGE(Uniform Game Engine).
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *
 *  See http://uge.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://uge.spolo.org/   sales@spolo.org uge-support@spolo.org
 *
**************************************************************************/

try {
	if(!load("/logic/object/grenade.js")){
		alert("Failed to load `/logic/object/grenade.js`");
	}
	if(!load("logic/object/bullet.js")){
		alert("Failed to load `logic/object/bullet.js`");
	}
	if(!load("/logic/data/weapon/weaponmap.js")){
		alert("Failed to load `weaponmap.js`");
	}
	if(!load("/logic/object/gun.js")){
		alert("Failed to load `gun.js`");
	}
	PLAYER = {
		name : "player",
		pc : {
			// "pczonemanager" : {
				// action : [
					// {
						// name : "Load",
						// param : [
							// ['path', '.'],
							// ['file', 'level.xml']
						// ]
					// }
				// ]
			// },
			"pcdefaultcamera" : {
				action : [
					{
						name : "SetCamera",
						param : [
							['modename', 'thirdperson']
						]
					},
					{
						name : "SetZoneManager",
						param : [
							['entity', 'player'], //同name一致
							['region', 'main'],
							['start', 'Camera']
						]
					}
				],
				property : [
					{
						name : "distance",
						value : 3
					}
				]
			},
			"pcmover" : {},
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
					}
				]
			},
			"pclinearmovement" : {
				action : [
					{
						name : "InitCD",
						param : [
							['offset',[0, 0.0, 0]],
							['body',[0.5,0.5,0.5]],
							['legs',[0.5,0.9,0.5]]
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
			"pcmechsys" : {},
			"pcmechobject" : {},
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
				],
				property : [
					// {
						// name : "mousemove",
						// value : true
					// },
					// {
						// name : "mousemove_inverted",
						// value : true
					// },
					{
						name : "mousemove_xfactor",
						value : 1.2
					},
					{
						name : "mousemove_yfactor",
						value : .5
					},
					// {
						// name : "mousemove_accelerate",
						// value : true
					// }
				]
			},
			// "pcmeshselect" : {
				// action : [
					// {
						// name : "SetCamera",
						// param : [
							// ['entity', 'player']
						// ]
					// },
					// // {
						// // name : "SetMouseButtons",
						// // param : [
							// // ['buttons','l']
						// // ]
					// // }
				// ],
				// property : [
					// {
						// name : "global",
						// value : true
					// },
					// {
						// name : "follow",
						// value : true
					// }
				// ]
			// },
			// 每秒钟发送一次位置信息
			"pctimer" : {
				action : [
					{
						name : "WakeUp", 
						param  : [
							["time", 1000],
							["repeat", true],
							["name", "position"]
						]
					},
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
			"pcprojectile" : {
			
			},
			// "pcsimplecamera" : {
				// action : [
					// {
						// name : 'SetPosition', 
						// param : [
							// ['campos', [0, 1, 3]],
							// ['lookat', [0, 1, 0]]
						// ]
					// }
				// ]
			// },
			"pccommandinput" : {
				action : [
					{
						name: "Activate",
						param:[
							['activate', true]
						]
					},
					{
						name : "Bind",
						param : [
							// 退出键
							['trigger','ESC'],
							['command','quit']
						]
					},
					// 前后左右移动
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
							['command', 'strafeleft']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', 'd'],
							['command', 'straferight']
						]
					},
					//跳跃：一般跳
					{
						name : "Bind",
						param : [
							['trigger', 'space'],
							['command', 'jump']
						]
					},
					//超级跳
					// {
						// name : "Bind",
						// param : [
							// ['trigger', ''],
							// ['command', 'superjump']
						// ]
					// },
					//静步行走
					{
						name : "Bind",
						param : [
							['trigger', 'shift'],
							['command', 'walk']
						]
					},
					//加速前进
					// {
						// name : "Bind",
						// param : [
							// ['trigger', 'shift'],
							// ['command', 'hurry']
						// ]
					// },
					//趴，爬行
					{
						name : "Bind",
						param : [
							['trigger','z'],
							['command','lieDown']
						]
					},
					//爬起
					{
						name : "Bind",
						param : [
							['trigger','v'],
							['command','pickUp']
						]
					},
					//鼠标控制
					{
							name : "Bind",
							param : [
									['trigger','MouseAxis0'],
									['command','mousemove']
							]
					},
					//鼠标左键
					{
							name : "Bind",
							param : [
									['trigger','MouseButton0'],
									['command','mouseleft']
							]
					},
					//鼠标右键
					{
							name : "Bind",
							param : [
									['trigger','MouseButton1'],
									['command','mouseright']
							]
					},
					//蹲下,蹲行
					{
						name : "Bind",
						param : [
							['trigger', 'ctrl'],
							['command', 'squat']
						]
					},
					
					//隐身
					{
						name:"Bind",
						param:[
							['trigger','c'],
							['command','visible']
						]
					},
					//跪射
					{
						name : "Bind",
						param : [
							['trigger', 'z'],
							['command', 'kneelingfire']
						]
					},
					//打开聊天窗口
					{
						name:"Bind",
						param:[
							['trigger','enter'],
							['command','chatAndTalk']
						]
					},
					//开启对聊窗口
					{
						name:"Bind",
						param:[
							['trigger','f'],
							['command','talk']
						]
					},
					//开启对话装置（语音）
					{
						name:"Bind",
						param:[
							['trigger','t'],
							['command','voice']
						]
					},
						//换子弹
					{
						name : "Bind",
						param : [
							['trigger', 'r'],
							['command', 'addbullet']
						]
					},
					//切换装备
					{
						name : "Bind",
						param : [
							['trigger', 'q'],
							['command', 'quick']
						]
					},
					// {
						// name : "Bind",
						// param : [
							// ['trigger', 'F1'],
							// ['command', 'backpack1']
						// ]
					// },
					// {
						// name : "Bind",
						// param : [
							// ['trigger', 'F2'],
							// ['command', 'backpack2']
						// ]
					// },
					{
						name : "Bind",
						param : [
							['trigger', '1'],
							['command', 'priWeapon1']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', '2'],
							['command', 'priWeapon2']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', '3'],
							['command', 'secWeapans']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', '4'],
							['command', 'throwingWeapon']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', 'g'],
							['command', 'giveUp']
						]
					},
					//打开地图
					{
						name : "Bind",
						param : [
							['trigger', '`'],
							['command', 'map']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', 'alt'],
							['command', 'cameracontrol']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', 'tab'],
							['command', 'fightingTable']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', 'e'],
							['command', 'pickup']
						]
					},
					{
						name : "Bind",
						param : [
							// 切换程序
							['trigger', 'o'],
							['command', 'switch']
						]
					},
					{
						name : "Bind",
						param : [
							// 切换程序
							['trigger','alt+tab'],
							['command','switch']
						]
					},
					{
						name : "Bind",
						param : [
							// 切换程序
							['trigger','`'],
							['command','table']
						]
					}
				],
				property : [
					{
						name : 'cooked',
						value : true
					}
				]
			}
		},
		
		// 订阅来自entity自身发出的事件，类似于`ent.behavious();`，
		// 一般这些事件都是entity内部的property class发出的。
		event : {
			"pccommandinput_table1" : function(){
				if(this.tab){
					this.tab = false;
					this.pcarray['pcdefaultcamera'].SetCamera("firstperson");
				} else {
					this.tab = true;
					this.pcarray['pcdefaultcamera'].SetCamera("thirdperson");
				}
			},
			"pctimer_position" : function(){
				
				var tmp = this.pcarray['pcactormove'].QueryInterface("iPcActorMove");
				if(tmp.IsMoving()){
					// 校验位置
					Event.Send({
						name : "net.playerMove",
						type : "verifyPosition",
						actor : this
					});
					//this.pcarray['pcmesh'].SetAnimation('run', true, false);
				}
				if(tmp.IsRotating())
				{
					Event.Send({
						name : "net.mouseMove",
						type : "verifyRotation",
						actor : this
					});
				}
				// else 
				// {
					// this.pcarray['pcmesh'].SetAnimation('stand', true, false);
				// }
			},
			"pccommandinput_quit0" : function(){
				// System.Quit();
				console.log("esc quit !");
				Event.Send({
					name : "ui.ESCTab",
					actor : this
				});
			},
			"pccommandinput_switch0" : function(){
				// System.Quit();
				console.log("pccommandinput_switch!\n");
				this.pcarray['pcactormove'].mousemove = false;
				this.pcarray['pccommandinput'].PerformAction('cel.action.RemoveBind',['trigger','MouseAxis0'],['command','mousemove']);
			},
			
			// （shift键 + 移动键 = 静走）按下shift键
			"pccommandinput_walk1" : function(){
				//this.shiftState = true;
				console.log("walk start !\n :");
				Event.Send({
					name : "effect.walk.start",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "walk.start",
					actor : this
				});
			},
			"pccommandinput_walk0" : function(){
				//this.shiftState = false;
				console.log("walk end !\n:");
				Event.Send({
					name : "effect.walk.end",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "walk.stop",
					actor : this
				});
			},
			// 前后左右移动
			"pccommandinput_forward1" : function(){
				var curWeaponType = this.curWeaponType ;
				console.log("forward start!\n" );	
				Event.Send({
					name : "effect.forward.start",
					curWeaponType : curWeaponType,
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					curWeaponType : curWeaponType,
					type : "forward.start",
					actor : this
				});
			
			},
			"pccommandinput_forward0" : function(){
				Event.Send({
					name : "effect.forward.stop",
					actor : this	
				});
				Event.Send({
					name : "net.playerMove",
					type : "forward.stop",
					actor : this
				});
			},
			"pccommandinput_backward1" : function(){
				var curWeaponType = this.curWeaponType ;
				Event.Send({
					name : "effect.backward.start",
					curWeaponType : curWeaponType,
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					curWeaponType : curWeaponType,
					type : "backward.start",
					actor : this
				});
			},
			"pccommandinput_backward0" : function(){
				Event.Send({
					name : "effect.backward.stop",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "backward.stop",
					actor : this
				});
			},
			"pccommandinput_strafeleft1" : function(){
				var curWeaponType = this.curWeaponType ;
				Event.Send({
					name : "effect.strafeleft.start",
					curWeaponType : curWeaponType,
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					curWeaponType : curWeaponType,
					type : "strafeleft.start",
					actor : this
				});
			},
			"pccommandinput_strafeleft0" : function(){
				Event.Send({
					name : "effect.strafeleft.stop",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "strafeleft.stop",
					actor : this
				});
			},
			"pccommandinput_straferight1" : function(){
				var curWeaponType = this.curWeaponType ;
				Event.Send({
					name : "effect.straferight.start",
					curWeaponType : curWeaponType,
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					curWeaponType : curWeaponType,
					type : "straferight.start",
					actor : this
				});
			},
			"pccommandinput_straferight0" : function(){
				Event.Send({
					name : "effect.straferight.stop",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "straferight.stop",
					actor : this
				});
			},
			//跳跃：一般跳
			"pccommandinput_jump1" : function(){
				this.clickCount++;
				this.pcarray['pctimer'].WakeUp(300, false, 'clickCount');
			},
			"pctimer_clickCount" : function(){
				console.log("**************this.clickCount : " + this.clickCount);
				this.pcarray['pctimer'].Clear('clickCount');
				if(this.clickCount == 1){
					this.clickCount = 0;
					this.pcarray['pctimer'].WakeUp(800, false, 'jumpStop');
					Event.Send({
						name : "effect.jump.start",
						actor : this
					}),
					Event.Send({
						name : "net.playerMove",
						type : "jump.start",
						actor : this
					});
				} else if(this.clickCount == 2){
					this.clickCount = 0;
					this.pcarray['pctimer'].WakeUp(4800, false, 'jumpStop');
					Event.Send({
						name : "effect.superjump.start",
						actor : this
					});
					Event.Send({
						name : "net.playerMove",
						type : "superjump.start",
						actor : this
					});
				}
			},
			"pctimer_jumpStop" : function (){
				Event.Send({
					name : "effect.jump.stop",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "jump.stop",
					actor : this
				});
			},
			//超级跳
			// "pccommandinput_superjump1" : function(){
				// this.pcarray['pctimer'].WakeUp(800, false, 'superjumpStop');
				// Event.Send({
					// name : "effect.superjump.start",
					// actor : this
				// });
				// Event.Send({
					// name : "net.playerMove",
					// type : "superjump.start",
					// actor : this
				// });
			// },
			"pctimer_superjumpStop" : function (){
				Event.Send({
					name : "effect.superjump.stop",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "superjump.stop",
					actor : this
				});
			},
			//加速前进
			// "pccommandinput_hurry1" : function(){
				// this.pcarray['pctimer'].PerformAction(
					// 'WakeUp',
					// ['time', 3000],
					// ['repeat', false],
					// ['name', 'hurryStop']
				// );
				// if(this.state == "stand"){	
					// Event.Send({
						// name : "effect.hurry1",
						// actor : this
					// });
				// }
				// Event.Send({
					// name : "net.playerMove",
					// type : "hurry1",
					// actor : this
				// });
			// },
			// "pccommandinput_hurry0" : function(){
				// if(this.state == "stand"){
					// Event.Send({
						// name : "effect.hurry0",
						// actor : this
					// });
				// }	
				// Event.Send({
					// name : "net.playerMove",
					// type : "hurry0",
					// actor : this
				// });
			// },
			// "pctimer_hurryStop" : function (){
				// if(this.state == "stand"){
					// Event.Send({
						// name : "effect.hurryStop",
						// actor : this
					// });
				// }
				// Event.Send({
					// name : "net.playerMove",
					// type : "hurryStop",
					// actor : this
				// });
			// },
			// 濒死状态时间
			"pctimer_playerMoribund" : function(){
				Event.Send({
					name : "effect.playerDeath",
					actor : this
				});
				Event.Send({
					name : "net.playerDeath",
					type : "playerDeath",
					actor : this
				});
			},
			// 救治
			// "pccommandinput_treatment1":function(){
				// this.pcarray['pctimer'].WakeUp(30000, false, 'treatment');
			// },
			// "pccommandinput_treatment0":function(){
				// this.
			// },
			// "pctimer_treatment":function(){
				// Event.Send({
					// name : "effect.treatmentSuccess",
					// actor : this
				// });
			// },
			//趴，爬行
			// "pccommandinput_lieDown":function(){
				//this.state = "down";
				// Event.Send({
					// name : "effect.lieDown",
					// actor : this
				// });
				// Event.Send({
					// name : "net.playerMove",
					// type : "lieDown",
					// actor : this
				// });
			// },
			//爬起
			// "pccommandinput_pickUp1":function(){
				// this.state = "stand";
				// Event.Send({
					// name : "effect.pickUp",
					// actor : this
				// });
				// Event.Send({
					// name : "net.playerMove",
					// type : "pickUp",
					// actor : this
				// });
			// },
			// //鼠标控制
			"pccommandinput_mousemove" : function(msgid, x, y){
				// 向server发送消息
				var pitch = this.pcarray['pcdefaultcamera'].GetProperty('pitch');
				this.pitch = pitch;
				// console.log("*******pitch : " + pitch);
				
				Event.Send({
					name : "net.mouseMove",
					type : "effect.mouseMove",
					actor : this,
					x : x[1],
					y : y[1]
				});
				// 转向
				Event.Send({
					name : "effect.mouseMove",
					actor : this,
					x : x[1],
					y : y[1]
				});
				
			},
			//鼠标点击左键攻击开始
			"pccommandinput_mouseleft1" : function (){
				console.log("player attack !");
				// console.log("current weapon is " + this.curWeaponType);
				// 获取武器id
				if(this.enabled){
					var curWeaponID;
					if(this.curWeaponType == 1){
						curWeaponID = this.weaponList.priWeapons_1;
						console.log("current weapon is " + this.curWeaponType);
						// Event.Send({
							// name : "effect.gunTypeWeapon",
							// actor : this
						// });
					} else if(this.curWeaponType == 2){
						curWeaponID = this.weaponList.priWeapons_2;
						Event.Send({
							name : "effect.gunTypeWeapon",
							actor : this,
							curWeaponID : curWeaponID
						});
					} else if(this.curWeaponType == 3){
						curWeaponID = this.weaponList.secWeapans;
					}else if(this.curWeaponType == 4){
						// console.log("******current weapon is " + this.curWeaponType);
						
						this.getOut = true;
					} else {
						console.log("error:error weapon type");
					}
				}
			},
			"pccommandinput_mouseleft0" : function (){
				Event.Send({
					name : "ui.frontSight",
					state : false
				});
				if(this.getOut){
					console.log("***current weapon is " + this.curWeaponType);
					var curWeaponID = this.weaponList.throwingWeapon;
					var pccam = this.pcarray['pcdefaultcamera'].QueryInterface("iPcDefaultCamera");
					var iPcCamera = pccam.QueryInterface('iPcCamera');
					var cameraObj = iPcCamera.GetCamera();
					var g2d = C3D.g2d;
					var v3d = cameraObj.InvPerspective([this.mousex, g2d.height - this.mousey], 1000);
					var targetPos = cameraObj.GetTransform().GetFront();
					targetPos = [targetPos.x, targetPos.y, targetPos.z];
					console.log("camera forward pos : [" + targetPos[0] + " ," + targetPos[1] + " ," + targetPos[2] + "]");
					Event.Send({
						name : "effect.grenade.start",
						actor : this,
						targetPos : targetPos,
						curWeaponID : curWeaponID
					});
					Event.Send({
						name : "net.grenade",
						actor : this,
						targetPos : targetPos
					});
				}
			},
			"pccommandinput_mouseright0" : function (){
				//console.log("this.mouseR :" + this.mouseR );
				if(this.mouseR){
					this.mouseR = false;
					Event.Send({
						name : "ui.bulletFire",
						mouseR : this.mouseR
					});
				} else {
					this.mouseR = true;
					Event.Send({
						name : "ui.bulletFire",
						mouseR : this.mouseR
					});
				}
			},
			"pccommandinput_fightingTable1" : function(){
				console.log("show fighting table !");
				Event.Send({
					name : "net.fightingTable"
				});
			},
			"pccommandinput_fightingTable0" : function(){
				console.log("visibile fighting table !");
				Event.Send({
					name : "effect.figtTabIsVis"
				});
			},
			// 
			"pctimer_attShockStop" : function (){
				// console.log("attack shock stop !");
				var pitch = this.pcarray['pcdefaultcamera'].GetProperty('pitch');
				// console.log("*********shock pitch = " + pitch);
				var dist = pitch - 10 / 1000;
				var flag = false;
				if(dist <= this.pitch){
					this.pcarray['pctimer'].Clear('attShockStop');
					flag = true;
				} 
				if(flag){
					this.pcarray['pcdefaultcamera'].SetProperty('pitch', this.pitch);
				} else {
					this.pcarray['pcdefaultcamera'].SetProperty('pitch', dist);
				}
			},
			//攻击结束 gunstop
			"pctimer_gunStop" : function (){
				this.attackstate = "finish";
				Event.Send({
					name : "effect.gun.stop",
					actor : this
				});
				// Event.Send({
					// name : "net.playerMove",
					// type : "gun.stop",
					// actor : this
				// });
			},
			//攻击结束 grenadestop
			"pctimer_grenadeStop" : function (){
				this.attackstate = "finish";
				Event.Send({
					name : "effect.grenade.stop",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "grenade.stop",
					actor : this
				});
			},
			//攻击结束 kinfestop
			"pctimer_kinfeStop" : function (){
				this.attackstate = "finish";
				Event.Send({
					name : "effect.kinfeeasy.stop",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "kinfeeasy.stop",
					actor : this
				});
			},
			//攻击结束 handgunstop
			"pctimer_handgunStop" : function (){
				this.attackstate = "finish";
				Event.Send({
					name : "effect.handgun.stop",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "handgun.stop",
					actor : this
				});
			},
			//鼠标点击右键改变状态
			"pccommandinput_mouseright1":function(){
				if(this.attackstate == "finish"){
					if(this.weaponstate=='kinfe'){
						this.attackstate = "start";
						this.pcarray['pctimer'].WakeUp(2000, false, 'thumpkinfeStop');
						Event.Send({
							name : "effect.thumpkinfe.start",
							self : this
						});
					} else if(this.weaponstate=='gun'){
						if(this.attackready.aim == "normal"){
							this.attackready.aim = "twice";
							Event.Send({
								name : "effect.aim.normal",
								self : this
							});	
						} else if(this.attackready.aim == "twice"){
							this.attackready.aim = "double";
							Event.Send({
								name : "effect.aim.twice",
								self : this
							});
						} else if(this.attackready.aim == "double"){
							this.attackready.aim = "normal";
							Event.Send({
								name : "effect.aim.double",
								self : this
							});
						}
					}
				}
			},
			"pctimer_thumpkinfeStop" : function (){
				this.attackstate = "finish";
				Event.Send({
					name : "effect.thumpkinfe.stop",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "thumpkinfe.stop",
					actor : this
				});
			},
			//蹲下
			"pccommandinput_squat1" : function (){
				// CONSOLE.Write("[debug] [state] squat .\n");
				this.state = "squat";
				Event.Send({
					name : "effect.squat",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "squat",
					actor : this
				});
			},
			"pccommandinput_squat0" : function (){
				// CONSOLE.Write("[debug] [state] stand .\n");
				this.state = "stand";
				Event.Send({
					name : "effect.stand",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "stand",
					actor : this
				});
			},
			"pccommandinput_kneelingfire1" : function (){
				// CONSOLE.Write("[debug] [state] kneelingfire .\n");
				if(this.state == "kneelingfire"){
					this.state = "stand";
					Event.Send({
						name : "effect.stand",
						actor : this
					});
				} else {
					this.state = "kneelingfire";
					Event.Send({
						name : "effect.kneelingfire",
						actor : this
					});
				}
			},
			//隐身
			"pccommandinput_visible1":function(){
				// if(this.isVisible==false){
					// this.pcarray['pctimer'].WakeUp(6000, false, 'visibleStop');
					// Event.Send({
						// name: "effect.visible",
						// actor:this
					// });
					// this.isVisible=true;
				// }
			},
			"pctimer_visibleStop":function(){
				// Event.Send({
					// name:"effect.visibleStop",
					// actor:this
				// });
				// this.isVisible=false;
			},
			//聊天功能按键判断
			"pccommandinput_chatAndTalk1":function(){
				if(this.talk[0].state){
					// CONSOLE.Write("[debug] [effect talk] " +  this.talk[0].state + " .\n");
					Event.Send({
						name:"effect.sendTalkText",
						actor:this
					});
					this.talk[0].text="";
				}else{
					// CONSOLE.Write("[debug] [effect chat] " +  this.chat[0].state + " .\n");
					if(this.chat[0].state){
						if(this.chat[0].text==""){
							Event.Send({
								name:"effect.chatClose",
								actor:this
							});	
						}else{
							if(this.party=="warband_A"){
								for(var i=0; i < this.member.warband_A.length; i++){
									this.chat[0].name = this.member.warband_A[i].name;
									Event.Send({
										name:"effect.sendChatText",
										actor:this
									});
								}
							}else if(this.party=="warband_B"){
								for(var i=0; i < this.member.warband_B.length; i++){
									this.chat[0].name = this.member.warband_B[i].name;
									Event.Send({
										name:"effect.sendChatText",
										actor:this
									});
								}
							}
							this.chat[0].text="";
						}
						this.chat[0].state=false;
					}else{
						Event.Send({
							name:"effect.chatOpen",
							actor:this
						});
						this.chat[0].state=true;
					}
				}
			},
			//打开聊天窗口
			"pccommandinput_chatOpen":function(){
				Event.Send({
						name:"effect.chatOpen",
						actor:this
					});
			},
			//关闭聊天窗口
			"pccommandinput_chatClose":function(){
				Event.Send({
					name:"effect.chatClose",
					actor:this
				});
			},
			//发送聊天消息
			"pccommandinput_sendChatText":function(){
				Event.Send({
					name:"effect.sendChatText",
					actor:this
				});
			},
			//对聊按键判断
			"pccommandinput_talk1":function(){
				if(this.talk[0].state){
					Event.Send({
						name:"effect.talkClose",
						actor:this
					});
					this.talk[0].state=false;
					this.talk[0].text="";
				}else{
					Event.Send({
						name:"effect.talkOpen",
						actor:this
					});
					this.talk[0].state=true;
				}
			},
			//开启对聊框
			"pccommandinput_talkOpen":function(){
				Event.Send({
					name:"effect.talkOpen",
					actor:this
				});
			},
			//关闭对聊框
			"pccomandinput_talkClose":function(){
				Event.Send({
					name:"effect.talkClose",
					actor:this
				});
			},
			//对话装置按键判断
			"pccommandinput_voice1":function(){
				if(this.voice[0].state){
					Event.Send({
						name:"effect.voiceClose",
						actor:this
					});
					this.voice[0].state=false;
				}else{
					Event.Send({
						name:"effect.voiceOpen",
						actor:this
					});
					this.voice[0].state=true;
				}
			},
			//开启对话装置
			"pccommandinput_voiceOpen":function(){
				Event.Send({
					name:"effect.voiceOpen",
					actor:this
				});
			},
			//关闭对话装置
			"pccomandinput_voiceClose":function(){
				Event.Send({
					name:"effect.voiceClose",
					actor:this
				});
			},
			//换子弹
			"pccommandinput_addbullet1" : function (){
				var bullet = this.bullet; // 弹夹中剩余子弹的个数
				var bultCount = this.bultCount; // 背包的子弹总数
				// console.log("bullet : " + bullet); 
				// console.log("bultCount : " + bultCount);
				// console.log("bultNum : " + bultNum);
				var firedBullet = bultNum - bullet;//发射子弹的个数（当前弹夹中发射出子弹的个数）
				if(bultCount > 0){
					if(firedBullet <= bultCount){
						//console.log("add full bullet !");
						this.bultCount = bultCount - firedBullet ;
						this.bullet = bultNum;
					} else {
						//console.log("add bullet");
						this.bultCount = 0;
						this.bullet = bullet + bultCount;
					}
					Event.Send({
						name : "ui.blutCount",
						actor : this
					});
				}
			},
			"pctimer_bulletFinished" : function(){
				Event.Send({
					name : "effect.bulletFinished",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "bulletFinished",
					actor : this
				});
			},
			
			//切换装备
			"pccommandinput_quick1" : function (){
				var weaponing = this.weaponstated; 
				this.weaponstated = this.weaponstate;
				this.weaponstate = weaponing;
				// CONSOLE.Write("[debug] [page] " + this.weaponstate + " .\n");
				Event.Send({
					name : "effect.quick",
					actor : this
				});
				Event.Send({
					name : "net.playerMove",
					type : "quick",
					actor : this
				});
			},
			"pccommandinput_backpack11" : function (){
				console.log("switch backpack1");
				Event.Send({
					name : "effect.switchBackpack",
					actor : this,
					packType : 1
				});
				Event.Send({
					name : "net.switchBackpack",
					type : "switchBackpack",
					packType : 1
				});
			},
			"pccommandinput_backpack21" : function (){
				console.log("switch backpack2");
				Event.Send({
					name : "effect.switchBackpack",
					actor : this,
					packType : 2
				});
				Event.Send({
					name : "net.switchBackpack",
					type : "switchBackpack",
					packType : 2
				});
			},
			"pccommandinput_priWeapon11" : function (){
				console.log("switch priWeapons_1");
				console.log("this.curWeaponType :" + this.curWeaponType + "\n");
				console.log("this.weaponList.priWeapons_1 :" + this.weaponList.priWeapons_1 + "\n");
				if((this.curWeaponType != 1)&&(this.weaponList.priWeapons_1 != null))
				{
					console.log("typeof(this.weaponList.priWeapons_1) :" + typeof(this.weaponList.priWeapons_1));
					this.curWeaponType = 1;
					Event.Send({
						name : "effect.switchWeapon",
						actor : this,
						weaponID : this.weaponList.priWeapons_1
					});
					Event.Send({
						name : "net.switchWeapon",
						type : "switchWeapon",
						weaponID : this.weaponList.priWeapons_1
					});
				}
			},
			"pccommandinput_priWeapon21" : function (){
				// console.log("switch priWeapons_2");
				if((this.curWeaponType != 2)&&(this.weaponList.priWeapons_2 != null))
				{
					this.curWeaponType = 2;
					Event.Send({
						name : "effect.switchWeapon",
						actor : this,
						weaponID : this.weaponList.priWeapons_2
					});
					Event.Send({
						name : "net.switchWeapon",
						type : "switchWeapon",
						weaponID : this.weaponList.priWeapons_2
					});
				}
			},
			"pccommandinput_secWeapans1" : function (){
				// console.log("switch secWeapans");
				if((this.curWeaponType != 3)&&(this.weaponList.secWeapans != null))
				{
					this.curWeaponType = 3;
					Event.Send({
						name : "effect.switchWeapon",
						actor : this,
						weaponID : this.weaponList.secWeapans
					});
					Event.Send({
						name : "net.switchWeapon",
						type : "switchWeapon",
						weaponID : this.weaponList.secWeapans
					});
				}
			},
			"pccommandinput_throwingWeapon1" : function (){
				// console.log("switch throwingWeapon");
				if((this.curWeaponType != 4)&&(this.weaponList.throwingWeapon != null))
				{
					this.curWeaponType = 4;
					Event.Send({
						name : "effect.switchWeapon",
						actor : this,
						weaponID : this.weaponList.throwingWeapon
					});
					Event.Send({
						name : "net.switchWeapon",
						type : "switchWeapon",
						weaponID : this.weaponList.throwingWeapon
					});
				}
			},
			// 丢弃武器
			"pccommandinput_giveUp1" : function(){
				if((this.curWeaponType == 1 && (this.weaponList.priWeapons_1 != null)) || 
				(this.curWeaponType == 2 && (this.weaponList.priWeapons_2 != null))){
					var oldWeaponID;
					if(this.curWeaponType == 1){
						console.log("this.curWeaponType :" + this.curWeaponType);
						this.curWeaponType = 0;
						oldWeaponID = this.weaponList.priWeapons_1;
						this.weaponList.priWeapons_1 = null;
						console.log("this.weaponList.priWeapons_1 :" + this.weaponList.priWeapons_1);
					} else {
						console.log("this.curWeaponType :" + this.curWeaponType);
						this.curWeaponType = 0;
						oldWeaponID = this.weaponList.priWeapons_2;
						this.weaponList.priWeapons_2 = null;
						console.log("this.weaponList.priWeapons_2 :" + this.weaponList.priWeapons_2);
					}
					// this.curWeaponType = 0;
					// this.weaponList.priWeapons = null;
					console.log("this.weaponList.priWeapons :" + this.weaponList.priWeapons);
					var pccam = this.pcarray['pcdefaultcamera'].QueryInterface("iPcDefaultCamera"); 
					var iPcCamera = pccam.QueryInterface('iPcCamera'); // 通过接口获取摄像机
					var iPcCamera = this.pcarray['pcdefaultcamera'].QueryInterface('iPcCamera'); // 通过接口获取摄像机
					var cameraObj = iPcCamera.GetCamera(); // 摄像机对象
					var cameraDirect = cameraObj.GetTransform().GetFront(); // 摄像机方向向量
					cameraDirect = [cameraDirect.x , cameraDirect.y, cameraDirect.z];
					Event.Send({
						name : "effect.giveUpWeapon",
						actor : this,
						cameraDirect : cameraDirect,
						oldWeaponID : oldWeaponID,
						bullet : this.bullet,
						bultCount : this.bultCount
					});
					Event.Send({
						name : "net.giveUpWeapon",
						type : "giveUpWeapon",
						cameraDirect : cameraDirect,
						oldWeaponID : oldWeaponID,
						bullet : this.bullet,
						bultCount : this.bultCount
					}); 
				}
			},
			//捡取武器
			"pccommandinput_pickup1" : function (){
				console.log("this.isPickUp :" + this.isPickUp + "\n");
				if(this.isPickUp){
					console.log("pickup weapon start! \n");
					this.isPickUp = false;
					var pickUPwep = {};
					for(var i in this.pickUPwepnLst){
						console.log("this.pickUPwepnLst :" + JSON.stringify(this.pickUPwepnLst[i]));
						if(this.pickUPwepnLst[i] != "undefined"){
							console.log("this.pickUPwepnLst[i] : " + this.pickUPwepnLst[i]);
							pickUPwep = this.pickUPwepnLst[i];
							console.log("pickUPwep :" + pickUPwep.weaponID);
							console.log("this.weaponList.priWeapon_1 :" + this.weaponList.priWeapons_1);
							break;
						}
					}
					var falg = false;
					for(var i in this.weaponList){
						/**
						 *拾取的武器在玩家的身上有相同的武器
						 */
						if(pickUPwep.weaponID == this.weaponList[i]){
							falg = true;
							if(pickUPwep.weaponID == 5){//拾取的武器是手雷
								//手雷数量加1
								
								
							} else{ //拾取的武器是枪
								var bultCount = this.bultCount;
								console.log("bultCount :" + bultCount);
								console.log("pickUPwep.bullet :" + pickUPwep.bullet);
								console.log("pickUPwep.bultCount :" + pickUPwep.bultCount);
								//武器的背包中子弹数为： 原背包中的子弹数 + 捡取武器的弹夹中的子弹数 + 捡取武器的背包中剩余子弹数量
								this.bultCount = pickUPwep.bullet + pickUPwep.bultCount + bultCount;
								console.log("this.bultCount :" + this.bultCount);
								Event.Send({
									name : "ui.blutCount",
									actor : this
								});
								Event.Send({
									name : "effect.hideWepon",
									actor : this,
									pickUPwep : pickUPwep
								});
								Event.Send({
									name : "net.hideWepon",
									type : "pickUpWepon",
									pickUPwep : pickUPwep
								}); 
							}
							break;
						}
							
					}
					if(!falg){
						/**
						 *拾取的武器在玩家的身上没有,此时判断玩家身上是否有该武器空位置
						 */
						if(this.weaponList.priWeapons_1 == null || this.weaponList.priWeapons_2 == null){
							Event.Send({
							name : "effect.pickUpWepon",
							actor : this,
							pickUPwep : pickUPwep
							});
							Event.Send({
								name : "net.pickUpWepon",
								type : "pickUpWepon",
								pickUPwep : pickUPwep
							}); 
						}
						
					}
						
					// Event.Send({
							// name : "effect.pickup",
							// actor : this,
							// pickUPwep : pickUPwep
						// });
					// Event.Send({
						// name : "net.pickup",
						// type : "pickup",
						// pickUPwep : pickUPwep
					// }); 
					
				}
				 
		
			},
			//打开地图
			"pccommandinput_map1" : function (){
				if(!this.mapstate){
					this.mapstate = true;
					Event.Send({
						name : "ui.xxx.xxx",
						param : "xxx"
					});
					// CONSOLE.WriteLine("[Debug] [map] mapopen send UI .\n");
				} else {
					this.mapstate = false;
					Event.Send({
						name : "ui.yyy.yyy",
						param : "yyy"
					});
					// CONSOLE.WriteLine("[Debug] [map] mapclose send UI .\n");
				}
			},
			//调整人称视角
			"pccommandinput_cameracontrol1" : function (){
				if(this.person != "firstperson"){
					this.person = "firstperson";
				} else if (this.person != "thirdperson"){
					this.person = "thirdperson";
				}
				Event.Send({
					name : 'effect.cameracontrol',
					actor : this
				});
			},
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
			}
		},
		// 为这个entity添加属性。
		property : {
			tab : true, // 测试专用
			type : "player",
			enabled : true, //禁止鼠标操作
			pickUPwepnLst : {}, 
			mouse_x : 0,
			mouse_y : 0,
			pitch : 0,
			getOut : false,
			mouseR : true,
			bultCount : 0,
			bullet : 0,
			clickCount : 0,
			stability : 0, // 射击稳定 
			range : 0,   // 有效射程
			accuracy : 0,   // 射击精度
			bulletPower : 0,   // 子弹威力
			movement : 0,
			runing : 0,
			rotation : 0,
			jumping : 0,
			loc : 0,
			life : 100, // 当前生命值
			max_hp : 100, // 最大生命值（和当前生命值一起，用来提供给UI，显示血条。）
			cur_mp : 0, // 当前魔法值 （显示在血条下方）
			max_mp : 10, // 最大魔法值
			result : "life", // 用来判断这个player是死(died)是活(life)还是伤害(injure) 。
			state : "stand",   //当前 player 状态，默认是站立，还有其它状态，比如：卧倒：down,蹲下：squat,治疗：cure等……
			shiftState : false,   // shift
			target : "",   //鼠标选中目标
			isPickUp : false,//判断是否可以触发拾取武器事件。
			curWeaponType : 1, // 当前武器类型， 1：主武器，2：副武器，3.近战武器，4.投掷武器
			weaponList : {"priWeapons_1":null, "priWeapons_2":null, "secWeapans":null, "throwingWeapon":null}, //{"priWeapons":1, "secWeapans":2, "closeinWeapons":3, "throwingWeapon":[4, 5]}
			backpackList : {"1" : [3, 2, 1, 5], "2" : [4, 8, 1, 5]}, 
			// weaponstate : "gun",// 当前 player 使用的武器， gun 是枪，kinfe 是刀，grenade 是手雷，还有其它，到时再添加。切换武器时，改变。
			// attackready : {   // 攻击准备，当前状态非右键瞄准normal ，瞄准 twice or double
				// aim : "normal"
			// },
			// attackstate : "finish",//当前player是否进入攻击状态，start是进入攻击状态，finish是非攻击状态
			// weaponstated : "kinfe",   //player 前一次使用武器
			// isVisible: false, //当前player是否隐身，true为隐身，false为非隐身
			party : "warband_A",//十人分组，A为A组，B为B组，空则不在游戏状态
			person : "firstperson",   //人物视角切换　firstperson or thirdperson
			bulletsfly: false,//让子弹飞一会儿，子弹飞的时候为true，否则为false
			member : {
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
			},
			chat:[
				{
					state : false,//是否开启聊天功能，true为聊天框开启状态，false为关闭状态
					name : "",//玩家名称
					text : "",//聊天内容
				}
			],
			voice:[
				{
					state:false,//是否开启对话装置，true为开启状态，false为关闭状态
					name:this.name,//玩家名称
					voiceObject:"",//对话对象
					text:"",//对话内容，先用text进行测试
				}
			],
			talk:[
				{
					state:false,//是否开启对聊，true为开启状态，false为关闭状态
					name:this.name,//玩家名称
					talkObject:"",//对聊对象
					text:"",//对聊内容
				}
			],
			mapstate : false,   //地图是否打开
			level : 1 , //等级
			experience : 0 , //经验值
			prestige : 0, //威望值
			successrate : 0, //任务成功率
			title : "无",   //称号
			bonus : 0,   //奖励值
			Mecha : [   //装备
				{
					defence : 0,   //防御 
					attack : 0,   //攻击力
					movespeed : 0,   //移动速度
					power : 0,   //能量消耗
					weight : 0,   //负载值
					loss : 0,   //损耗度
				}
			],
			hat : "1",   //帽子
			waist : "2",   //上衣
			trousers : "3",   //裤子 
			shoes : "4",   //鞋 
			eyeglass : "5",   //眼镜 
			necklace : "6",   //项链 
			suit : "7",   //套装 
			other : "8", //其他
			bultCount : 0,   // 装配子弹总数量
			bullet : 0,   // 装配子弹数量
			// ammos : [   //弹药
				// {
					// bulletgun : WEAPONDATA["MEWC EAR-15"].attribute.bullet,   //长枪子弹
					// ammogun : WEAPONDATA["MEWC EAR-15"].attribute.ammos,   //弹药总数
					// bullethandgun : WEAPONDATA["MEWC HC2"].attribute.bullet,    //手枪子弹
					// ammohandgun : WEAPONDATA["MEWC HC2"].attribute.ammos   //手枪子弹总数
				// }
			// ],
			// weaponlist : [   //当前武器列表
				// {
					// handgun : WEAPONDATA["MEWC HC2"].name,   //手枪
					// gun : WEAPONDATA["MEWC EAR-15"].name,   //武器型号
					// kinfe : "kinfe",
					// grenade : "grenade"
				// }
			// ],
			// pack : [  //背包
				// {
					// name : "MEWC HC2",   //装备号,用来加以区分装备
					// type : "weapon",
					// value : WEAPONDATA["MEWC HC2"],
				// }				
			// ],
			weaponcurrent:[//当前武器属性值
				{
					damapower : {   //破坏力
						physics : 23,   //物理伤害
						power : 68,    //能量伤害
					}
				}
			],
			// equipcurrent:[//当前机甲属性值
				// {
					// bodyarmour:{	//身甲
						// defense :{		//防御力
							// physics:240,	//物理防御力
							// energy:48,	//能量防御力
						// },
						// intact:1000, 	//完好度
					// }
				// }
			// ],
			// shieldscurrent:[//当前护盾属性值
				// {
					// defense : {		//防御力
						// physics:50,	//物理防御力
						// energy:250,	//能量防御力
					// },
					// intact:1000,	//完好度
				// }
			// ],
			// equip:EQUIPDATA["ADA2"].name,	//外骨骼机甲系列
			// shields:SHIELDSDATA["NJE"].name,	//护盾
			forWard : [-6, 0.2, -3.29]   //方向
		},
		// 订阅全局的事件。一般这些事件都是使用`Event.Send()`发送的。
		subscribe : {
			"effect.moveActor" : function(){
				this.pcarray['pccommandinput'].PerformAction("Activate", ['activate', true]);
			}
		}
	};
	
	AI_PLAYER = {
		event : {
			// player发起主动攻击。
			"to_attack" : function(player, target, skill_type) {
				if(skill_type == "gun"){
					Event.Send({
						 name : "AI." + target.name + ".attack",
						 self : player
					});
				} else if(skill_type == "grenade") {
					
				} else if(skill_type == "kinfe") {
					
				} else if(skill_type == "handgun") {
					
				}
			},
			"under_attack" : function(attacker, player/*被攻击*/) { //monster 反击
				if(player.result == "life"){
					if(attacker.result == "injure"){
						// CONSOLE.Write("[debug] [player injure] player injure attack * 50% ! .\n");
					} else {
						// CONSOLE.Write("[debug] [gunaim] meshlife=" + player.life + " .\n");
						// CONSOLE.Write("[debug] [player injure] player injure attack * 100% ! .\n");
					}
				} else if(player.result == "died") {
					// CONSOLE.Write("[debug] [died1] player died .\n");
				}
				if(player.life <= 20){
					player.result = "injure";
					Event.Send({
						name : 'effect.injure',
						self : player
					});
					Event.Send({
						name : 'UI.xxx.yyy',
						self : player
					});
					// CONSOLE.Write("[debug] [attacker] " + player.name + " .\n");
				}
				
				if(player.life == 0){
					player.result = "died";
				}
				
				if(target.result == "died"){
					Event.Send({
						name : 'effect.diedView',
						self : target
					});
					Event.Send({
						name : 'UI.yyy.yyy',
						self : attacker
					});
					// CONSOLE.Write("[debug] [attacker] " + attacker.name + " .\n");
				}
			}
		}
	};
}
catch (e)
{
	alert(e);
}
