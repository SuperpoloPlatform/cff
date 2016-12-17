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

	PLAYER = {
		name : "player",
		pc : {
			"pczonemanager" : {
				action : [
					{
						name : "Load",
						param : [
							['path', '.'],
							['file', 'level.xml']
						]
					}
				]
			},
			"pcdefaultcamera" : {
				action : [
					{
						name : "SetCamera",
						param : [
							['modename', 'firstperson']
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
							['name','nan']
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
				]
			},
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							['movement',4],
							['running',2],
							['rotation',2],
							['jumping',4]
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
			"pcmeshselect" : {
				action : [
					{
						name : "SetCamera",
						param : [
							['entity', 'player']
						]
					},
					{
						name : "SetMouseButtons",
						param : [
							['buttons','l']
						]
					}
				],
				property : [
					{
						name : "global",
						value : true
					},
					{
						name : "follow",
						value : true
					}
				]
			},
			// 每秒钟发送一次位置信息
			"pctimer" : {
				
			},
			"pctrigger" : {
				action : [
					{
						name : "SetupTriggerSphere",
						param : [
							['sector', 'Scene'],
							['position', [-6, 0.2, -3.29]],
							['radius', 1]
						]
					}
				]
			},
			"pcprojectile" : {
			
			},
			"pcsimplecamera" : {
				action : [
					{
						name : 'SetPosition', 
						param : [
							['campos', [0, 1, 3]],
							['lookat', [0, 1, 0]]
						]
					}
				]
			},
			"pccommandinput" : {
				action : [
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
					{
						name : "Bind",
						param : [
							['trigger', 'n'],
							['command', 'superjump']
						]
					},
					//加速前进
					{
						name : "Bind",
						param : [
							['trigger', 'shift'],
							['command', 'hurry']
						]
					},
					//卧倒
					{
						name : "Bind",
						param : [
							['trigger','x'],
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
					//蹲下
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
					{
						name : "Bind",
						param : [
							['trigger', '1'],
							['command', 'page1']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', '2'],
							['command', 'page2']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', '3'],
							['command', 'page3']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', '4'],
							['command', 'page4']
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
							['trigger', 'tab'],
							['command', 'cameracontrol']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger', 'e'],
							['command', 'personCure']
						]
					},
				]
			}
		},
		
		// 订阅来自entity自身发出的事件，类似于`ent.behavious();`，
		// 一般这些事件都是entity内部的property class发出的。
		event : {
			"pccommandinput_quit0" : function(){
				System.Quit();
			},
			// 前后左右移动
			"pccommandinput_forward1" : function(){
				Event.Send({
					name : "effect.forward.start",
					self : this
				});
			},
			"pccommandinput_forward0" : function(){
				Event.Send({
					name : "effect.forward.stop",
					self : this	
				});
			},
			"pccommandinput_backward1" : function(){
				Event.Send({
					name : "effect.backward.start",
					self : this
				});
			},
			"pccommandinput_backward0" : function(){
				Event.Send({
					name : "effect.backward.stop",
					self : this
				});
			},
			"pccommandinput_strafeleft1" : function(){
				Event.Send({
					name : "effect.strafeleft.start",
					self : this
				});
			},
			"pccommandinput_strafeleft0" : function(){
				Event.Send({
					name : "effect.strafeleft.stop",
					self : this
				});
			},
			"pccommandinput_straferight1" : function(){
				Event.Send({
					name : "effect.straferight.start",
					self : this
				});
			},
			"pccommandinput_straferight0" : function(){
				Event.Send({
					name : "effect.straferight.stop",
					self : this
				});
			},
			//跳跃：一般跳
			"pccommandinput_jump1" : function(){
				this.pcarray['pctimer'].WakeUp(420, false, 'jumpStop');   //视角定时拉回
				Event.Send({
					name : "effect.jump.start",
					self : this
				});
			},
			"pctimer_jumpStop" : function (){
				Event.Send({
					name : "effect.jump.stop",
					self : this
				});
			},
			//超级跳
			"pccommandinput_superjump1" : function(){
				this.pcarray['pctimer'].WakeUp(800, false, 'superjumpStop');
				Event.Send({
					name : "effect.superjump.start",
					self : this
				});
			},
			"pctimer_superjumpStop" : function (){
				Event.Send({
					name : "effect.superjump.stop",
					self : this
				});
			},
			//加速前进
			"pccommandinput_hurry1" : function(){
				this.pcarray['pctimer'].PerformAction(
					'WakeUp',
					['time', 3000],
					['repeat', false],
					['name', 'hurryStop']
				);
				if(this.state == "stand"){	
					Event.Send({
						name : "effect.hurry1",
						self : this
					});
				}
			},
			"pccommandinput_hurry0" : function(){
				if(this.state == "stand"){
					Event.Send({
						name : "effect.hurry0",
						self : this
					});
				}	
			},
			"pctimer_hurryStop" : function (){
				if(this.state == "stand"){
					Event.Send({
						name : "effect.hurryStop",
						self : this
					});
				}
			},
			//卧倒
			"pccommandinput_lieDown1":function(){
				this.state = "down";
				Event.Send({
					name : "effect.lieDown",
					self:this
				});
			},
			//爬起
			"pccommandinput_pickUp1":function(){
				this.state = "stand";
				Event.Send({
					name:"effect.pickUp",
					self:this
				});
			},
			//鼠标控制,并且获取其坐标值
			"pccommandinput_mousemove" : function (msgid, x, y){
				this.x = x[1];
				this.y = y[1];
				Event.Send({
					name : "effect.viewmove",
					self : this,
					mouse_x : x[1],
					mouse_y : y[1]
				});	
				// if(this.bulletsfly==false){
					// var rotation=this.pcarray['pcmesh'].GetProperty("rotation");				
					// bullet.pcarray['pcmesh'].RotateMesh([rotation.x,rotation.y,rotation.z]);
				// }
			},
			//鼠标点击左键攻击开始
			"pccommandinput_mouseleft1" : function (){
				if(this.party == this.target.party){
					CONSOLE.Write("[debug] [target] 队友 .\n");
				} else {
					if(this.state != "squat" && this.state != "cure"){
						if(this.attackstate == 'finish'){
							CONSOLE.Write("[debug] [mouseleft] mouseleft .\n");
							this.attackstate = 'start';
							var pos = this.pcarray['pcmesh'].GetProperty('position');
							//获得当前摄像机
							var pccam = this.pcarray['pcdefaultcamera'].QueryInterface("iPcDefaultCamera");
							var iPcCamera = pccam.QueryInterface('iPcCamera');
							var cameraObj = iPcCamera.GetCamera();
							var g2d = C3D.g2d;
							var v3d = cameraObj.InvPerspective([this.mousex, g2d.height - this.mousey], 1000);
							var startBeam = cameraObj.GetTransform().GetOrigin();
							var endBeam = cameraObj.GetTransform().This2Other(v3d);
							var sector = engine.sectors.FindByName('Scene')
							var target = engine.GetNearbyMeshes(sector, startBeam, endBeam, true);
							while(target.HasNext()){
								meshObj = target.Next();
								var targetPos = meshObj.HitBeam(startBeam, endBeam, true).isect;
							}
							var targetObj = engine.GetNearbyMeshes(engine.sectors.FindByName('Scene'), pos, targetPos, true);
							//获取范围内的 mesh object
							// var targetObj = engine.GetNearbyMeshes(engine.sectors.FindByName('Scene'), pos, 10, true);							
							var targetList = [];   //受攻击目标
							var idx = 0;
							//遍历 mesh object	
							while(targetObj.HasNext()){
								obj = targetObj.Next();
								CONSOLE.Write("[debug] [mesh name] " + obj.object.name + " .\n");
								for(inx in entityList){   //遍历 entity object
									var meshname = entityList[inx].pcarray['pcmesh'].GetProperty('meshname');
									if(obj.object.name == meshname && this.party != entityList[inx].party){   //entity mesh 与取得的 mesh 匹配
										//保存 entity object
										targetList[idx] = entityList[inx];
										idx++;
									}
								}
								//targetList[idx] = Entities.GetEntity(obj.object);
								//idx++;									
							}
							CONSOLE.Write("[debug] [targetList NO.] length:" + targetList.length + " .\n");
							if(this.weaponstate == "gun"){
								//如果子弹为entity时所执行的代码
								this.bulletsfly = true;
								var position = this.pcarray['pcmesh'].GetProperty("position");
								var rotation = this.pcarray['pcmesh'].GetProperty("rotation");
								bullet.pcarray['pcmesh'].MoveMesh([position.x, position.y, position.z]);
								bullet.pcarray['pcmesh'].SetVisible(true);
								targetPos.Subtract(pos);
								bullet.pcarray['pcprojectile'].Start([targetPos.x, 0, targetPos.z], 20.0, 50.0, 20);
								player.pcarray['pctimer'].PerformAction(
									'WakeUp',
									['time', 2000],
									['repeat', false],
									['name', 'gunStop']
								);
								Event.Send({
									name : "effect.gun.start",
									self : player
								});
								for(i in targetList){   //遍历entity object
									this.AIObject.onEvent("to_attack", this, targetList[i], "gun");
								}
							} else if(this.weaponstate == "grenade"){
								grenade.pcarray['pcmesh'].SetVisible(true);
								grenade.pcarray['pctrigger'].SetupTriggerSphere("Scene",[3, 0.2, -6],10);
								grenade.pcarray['pclinearmovement'].InitCD([0, 0.0, 0],[0.5,0.5,0.5],[0.5,0.9,0.5]);
								grenade.pcarray['pcmesh'].MoveMesh([3,0.3,-6]);
								grenade.pcarray['pctimer'].WakeUp(1000, true, "alarm");
								player.pcarray['pctimer'].PerformAction(
									'WakeUp',
									['time', 2000],
									['repeat', false],
									['name', 'grenadeStop']
								);
								Event.Send({
									name : "effect.grenade.start",
									self : player
								});
								for(i in targetList){   //遍历entity object
									this.AIObject.onEvent("to_attack", this, targetList[i], "grenade");
								}
							} else if(this.weaponstate == "kinfe"){
								player.pcarray['pctimer'].PerformAction(
									'WakeUp',
									['time', 2000],
									['repeat', false],
									['name', 'kinfeStop']
								);
								Event.Send({
									name : "effect.kinfeeasy.start",
									self : player
								});
								for(i in targetList){   //遍历entity object
									this.AIObject.onEvent("to_attack", this, targetList[i], "kinfe");
								}
							} else if(this.weaponstate == "handgun"){
								player.pcarray['pctimer'].PerformAction(
									'WakeUp',
									['time', 2000],
									['repeat', false],
									['name', 'handgunStop']
								);
								Event.Send({
									name : "effect.handgun.start",
									self : player
								});
								for(i in targetList){   //遍历entity object
									this.AIObject.onEvent("to_attack", this, targetList[i], "handgun");
								}
							}
						}
					}
				}
			},
			//攻击结束 gunstop
			"pctimer_gunStop" : function (){
				this.attackstate = "finish";
				Event.Send({
					name : "effect.gun.stop",
					self : this
				});
			},
			//攻击结束 grenadestop
			"pctimer_grenadeStop" : function (){
				this.attackstate = "finish";
				Event.Send({
					name : "effect.grenade.stop",
					self : this
				});
			},
			//攻击结束 kinfestop
			"pctimer_kinfeStop" : function (){
				this.attackstate = "finish";
				Event.Send({
					name : "effect.kinfeeasy.stop",
					self : this
				});
			},
			//攻击结束 handgunstop
			"pctimer_handgunStop" : function (){
				this.attackstate = "finish";
				Event.Send({
					name : "effect.handgun.stop",
					self : this
				});
			},
			//鼠标点击右键改变状态
			"pccommandinput_mouseright1":function(){
				if(this.attackstate == "finish"){
					if(this.weaponstate=='kinfe'){
						this.attackstate = "start";
						this.pcarray['pctimer'].PerformAction(2000, false, 'thumpkinfeStop');
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
					self : this
				});
			},
			//蹲下
			"pccommandinput_squat1" : function (){
				CONSOLE.Write("[debug] [state] squat .\n");
				this.state = "squat";
				Event.Send({
					name : "effect.squat",
					self : this
				});
			},
			"pccommandinput_squat0" : function (){
				CONSOLE.Write("[debug] [state] stand .\n");
				this.state = "stand";
				Event.Send({
					name : "effect.stand",
					self : this
				});
			},
			"pccommandinput_kneelingfire1" : function (){
				CONSOLE.Write("[debug] [state] kneelingfire .\n");
				if(this.state == "kneelingfire"){
					this.state = "stand";
					Event.Send({
						name : "effect.stand",
						self : this
					});
				} else {
					this.state = "kneelingfire";
					Event.Send({
						name : "effect.kneelingfire",
						self : this
					});
				}
			},
			//隐身
			"pccommandinput_visible1":function(){
				if(this.isVisible==false){
					this.pcarray['pctimer'].WakeUp(6000, false, 'visibleStop');
					Event.Send({
						name: "effect.visible",
						self:this
					});
					this.isVisible=true;
				}
			},
			"pctimer_visibleStop":function(){
				Event.Send({
					name:"effect.visibleStop",
					self:this
				});
				this.isVisible=false;
			},
			//聊天功能按键判断
			"pccommandinput_chatAndTalk1":function(){
				if(this.talk[0].state){
					CONSOLE.Write("[debug] [effect talk] " +  this.talk[0].state + " .\n");
					Event.Send({
						name:"effect.sendTalkText",
						self:this
					});
					this.talk[0].text="";
				}else{
					CONSOLE.Write("[debug] [effect chat] " +  this.chat[0].state + " .\n");
					if(this.chat[0].state){
						if(this.chat[0].text==""){
							Event.Send({
								name:"effect.chatClose",
								self:this
							});	
						}else{
							if(this.party=="warband_A"){
								for(var i=0;i<member.warband_A.length;i++){
									this.chat[0].name=member.warband_A[i].name;
									Event.Send({
										name:"effect.sendChatText",
										self:this
									});
								}
							}else if(this.party=="warband_B"){
								for(var i=0;i<member.warband_B.length;i++){
									this.chat[0].name=member.warband_B[i].name;
									Event.Send({
										name:"effect.sendChatText",
										self:this
									});
								}
							}
							this.chat[0].text="";
						}
						this.chat[0].state=false;
					}else{
						Event.Send({
							name:"effect.chatOpen",
							self:this
						});
						this.chat[0].state=true;
					}
				}
			},
			//打开聊天窗口
			"pccommandinput_chatOpen":function(){
				Event.Send({
						name:"effect.chatOpen",
						self:this
					});
			},
			//关闭聊天窗口
			"pccommandinput_chatClose":function(){
				Event.Send({
					name:"effect.chatClose",
					self:this
				});
			},
			//发送聊天消息
			"pccommandinput_sendChatText":function(){
				Event.Send({
					name:"effect.sendChatText",
					self:this
				});
			},
			//对聊按键判断
			"pccommandinput_talk1":function(){
				if(this.talk[0].state){
					Event.Send({
						name:"effect.talkClose",
						self:this
					});
					this.talk[0].state=false;
					this.talk[0].text="";
				}else{
					Event.Send({
						name:"effect.talkOpen",
						self:this
					});
					this.talk[0].state=true;
				}
			},
			//开启对聊框
			"pccommandinput_talkOpen":function(){
				Event.Send({
					name:"effect.talkOpen",
					self:this
				});
			},
			//关闭对聊框
			"pccomandinput_talkClose":function(){
				Event.Send({
					name:"effect.talkClose",
					self:this
				});
			},
			//对话装置按键判断
			"pccommandinput_voice1":function(){
				if(this.voice[0].state){
					Event.Send({
						name:"effect.voiceClose",
						self:this
					});
					this.voice[0].state=false;
				}else{
					Event.Send({
						name:"effect.voiceOpen",
						self:this
					});
					this.voice[0].state=true;
				}
			},
			//开启对话装置
			"pccommandinput_voiceOpen":function(){
				Event.Send({
					name:"effect.voiceOpen",
					self:this
				});
			},
			//关闭对话装置
			"pccomandinput_voiceClose":function(){
				Event.Send({
					name:"effect.voiceClose",
					self:this
				});
			},
			//换子弹
			"pccommandinput_addbullet1" : function (){
				if(this.weaponstate == "gun"){
					var ammos = this.ammos[0].ammogun + this.ammos[0].bulletgun;
					this.ammos[0].ammogun = ammos - WEAPONDATA["MEWC EAR-15"].attribute.bullet;
					this.ammos[0].bulletgun = WEAPONDATA["MEWC EAR-15"].attribute.bullet;
					CONSOLE.Write("[debug] [addbullet] ammosgun=" + this.ammos[0].ammogun + "; bulletgun=" + this.ammos[0].bulletgun + " .\n");
					Event.Send({
						name : "effect.bulletgun",
						self : this
					});
				} else if (this.weaponstate == "handgun"){
					var ammos = this.ammos[0].ammohandgun + this.ammos[0].bullethandgun;
					this.ammos[0].ammohandgun = ammos - WEAPONDATA["MEWC HC2"].attribute.bullet;
					this.ammos[0].bullethandgun = WEAPONDATA["MEWC HC2"].attribute.bullet;
					CONSOLE.Write("[debug] [addbullet] bullethandgun=" + this.ammos[0].bullethandgun + "; ammohandgun=" + this.ammos[0].ammohandgun + " .\n");
					Event.Send({
						name : "effect.bullethandgun",
						self : this
					});
				}
				this.pcarray['pctimer'].WakeUp(2000, false, 'bulletFinished');
			},
			"pctimer_bulletFinished" : function(){
				Event.Send({
					name : "effect.bulletFinished",
					self : this
				});
			},
			//切换装备
			"pccommandinput_quick1" : function (){
				var weaponing = this.weaponstated; 
				this.weaponstated = this.weaponstate;
				this.weaponstate = weaponing;
				CONSOLE.Write("[debug] [page] " + this.weaponstate + " .\n");
				Event.Send({
					name : "effect.quick",
					self : this
				});
			},
			"pccommandinput_page11" : function (){
				if(this.weaponstate != "handgun")
					this.weaponstated = this.weaponstate;
				this.weaponstate = "handgun";
				CONSOLE.Write("[debug] [page] handgun .\n");
				Event.Send({
					name : "effect.page1",
					self : this
				});
			},
			"pccommandinput_page21" : function (){
				if(this.weaponstate != "gun")
					this.weaponstated = this.weaponstate;
				this.weaponstate = "gun";
				CONSOLE.Write("[debug] [page] gun .\n");
				Event.Send({
					name : "effect.page2",
					self : this
				});
			},
			"pccommandinput_page31" : function (){
				if(this.weaponstate != "kinfe")
					this.weaponstated = this.weaponstate;
				this.weaponstate = "kinfe";
				CONSOLE.Write("[debug] [page] kinfe .\n");
				Event.Send({
					name : "effect.page3",
					self : this
				});
			},
			"pccommandinput_page41" : function (){
				if(this.weaponstate != "grenade")
					this.weaponstated = this.weaponstate;
				this.weaponstate = "grenade";
				CONSOLE.Write("[debug] [page] grenade .\n");
				Event.Send({
					name : "effect.page4",
					self : this
				});
			},
			//打开地图
			"pccommandinput_map1" : function (){
				if(!this.mapstate){
					this.mapstate = true;
					Event.Send({
						name : "ui.xxx.xxx",
						param : "xxx"
					});
					CONSOLE.WriteLine("[Debug] [map] mapopen send UI .\n");
				} else {
					this.mapstate = false;
					Event.Send({
						name : "ui.yyy.yyy",
						param : "yyy"
					});
					CONSOLE.WriteLine("[Debug] [map] mapclose send UI .\n");
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
					self : this
				});
			},
			"pctrigger_entityenters" : function (){
				var pos = this.pcarray['pcmesh'].GetProperty("position");
				var meshObj = engine.GetNearbyMeshes(engine.sectors.FindByName('Scene'), pos, 1, true);	
				while(meshObj.HasNext()){
					mesh = meshObj.Next();
					for(inx in entityList){   //遍历 entity object
						var meshname = entityList[inx].pcarray['pcmesh'].GetProperty('meshname');
						var itself = this.pcarray['pcmesh'].GetProperty('meshname');
						var meshTarget = mesh.object.name;
						if(meshTarget == meshname && meshTarget != itself && this.party == entityList[inx].party){   //entity mesh 与取得的 mesh 匹配
							//保存 entity object
							this.target = entityList[inx];
						}
					}
				}
			},
			"pctrigger_entityleaves" : function (){
				if(this.target != ""){
					Event.Send({
						name : 'effect.personCureStop',
						self : this,
						target : this.target
					});
					this.target = "";
					this.state = "stand";
				}
			},
			//治疗
			"pccommandinput_personCure1" : function (){
				var pos = this.pcarray['pcmesh'].GetProperty("position");
				this.pcarray['pctrigger'].SetupTriggerSphere("Scene", [pos.x, pos.y, pos.z], 1);
			},
			"pccommandinput_personCure0" : function (){
				if(this.target != "" && this.state != "cure"){
					this.state = "cure";
					this.pcarray['pctimer'].WakeUp(5000, false, "personCureStop");
					Event.Send({
						name : 'effect.personCure',
						self : this,
						target : this.target
					});
				}
			},
			"pctimer_personCureStop" : function (){
				if(this.target != ""){
					Event.Send({
						name : 'effect.personCureStop',
						self : this,
						target : this.target
					});
					Event.Send({
						name : 'effect.monster.XXX',
						cure : 'finished'
					});
					this.state = "stand";
					this.target = "";
				}
				
			},
			/*//选中 mesh
			"pcmeshsel_down" : function (msgid, x, y, button, entity) {
				var sel = entity[1];
				CONSOLE.WriteLine("[Debug] [name]: '" + sel.name + "' is selected from mouse.");
				this.target = entity[1];
			},*/
		},
		// 为这个entity添加属性。
		property : {
			type : "player",
			life : 100, // 当前生命值
			max_hp : 100, // 最大生命值（和当前生命值一起，用来提供给UI，显示血条。）
			cur_mp : 0, // 当前魔法值 （显示在血条下方）
			max_mp : 10, // 最大魔法值
			result : "life", // 用来判断这个player是死(died)是活(life)还是伤害(injure) 。
			state : "stand",   //当前 player 状态，默认是站立，还有其它状态，比如：卧倒：down,蹲下：squat,治疗：cure等……
			target : "",   //鼠标选中目标
			weaponstate : "gun",// 当前 player 使用的武器， gun 是枪，kinfe 是刀，grenade 是手雷，还有其它，到时再添加。切换武器时，改变。
			attackready : {   // 攻击准备，当前状态非右键瞄准normal ，瞄准 twice or double
				aim : "normal"
			},
			attackstate : "finish",//当前player是否进入攻击状态，start是进入攻击状态，finish是非攻击状态
			weaponstated : "kinfe",   //player 前一次使用武器
			isVisible: false, //当前player是否隐身，true为隐身，false为非隐身
			party : "warband_A",//十人分组，A为A组，B为B组，空则不在游戏状态
			person : "firstperson",   //人物视角切换　firstperson or thirdperson
			bulletsfly: false,//让子弹飞一会儿，子弹飞的时候为true，否则为false
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
			ammos : [   //弹药
				{
					bulletgun : WEAPONDATA["MEWC EAR-15"].attribute.bullet,   //长枪子弹
					ammogun : WEAPONDATA["MEWC EAR-15"].attribute.ammos,   //弹药总数
					bullethandgun : WEAPONDATA["MEWC HC2"].attribute.bullet,    //手枪子弹
					ammohandgun : WEAPONDATA["MEWC HC2"].attribute.ammos   //手枪子弹总数
				}
			],
			weaponlist : [   //当前武器列表
				{
					handgun : WEAPONDATA["MEWC HC2"].name,   //手枪
					gun : WEAPONDATA["MEWC EAR-15"].name,   //武器型号
					kinfe : "kinfe",
					grenade : "grenade"
				}
			],
			pack : [  //背包
				{
					name : "MEWC HC2",   //装备号,用来加以区分装备
					type : "weapon",
					value : WEAPONDATA["MEWC HC2"],
				}				
			],
			weaponcurrent:[//当前武器属性值
				{
					damapower : {   //破坏力
						physics : 23,   //物理伤害
						power : 68,    //能量伤害
					}
				}
			],
			equipcurrent:[//当前机甲属性值
				{
					bodyarmour:{	//身甲
						defense :{		//防御力
							physics:240,	//物理防御力
							energy:48,	//能量防御力
						},
						intact:1000, 	//完好度
					}
				}
			],
			shieldscurrent:[//当前护盾属性值
				{
					defense : {		//防御力
						physics:50,	//物理防御力
						energy:250,	//能量防御力
					},
					intact:1000,	//完好度
				}
			],
			equip:EQUIPDATA["ADA2"].name,	//外骨骼机甲系列
			shields:SHIELDSDATA["NJE"].name,	//护盾
			forWard : [-6, 0.2, -3.29]   //方向
		},
		// 订阅全局的事件。一般这些事件都是使用`Event.Send()`发送的。
		subscribe : {
			
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
						CONSOLE.Write("[debug] [player injure] player injure attack * 50% ! .\n");
					} else {
						CONSOLE.Write("[debug] [gunaim] meshlife=" + player.life + " .\n");
						CONSOLE.Write("[debug] [player injure] player injure attack * 100% ! .\n");
					}
				} else if(player.result == "died") {
					CONSOLE.Write("[debug] [died1] player died .\n");
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
					CONSOLE.Write("[debug] [attacker] " + player.name + " .\n");
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
					CONSOLE.Write("[debug] [attacker] " + attacker.name + " .\n");
				}
			}
		}
	};

}
catch (e)
{
	alert(e);
}
