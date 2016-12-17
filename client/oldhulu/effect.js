/**************************************************************************
 *  This file is part of the UGE(Uniform Game Engine) of SPP.
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *  See http://spp.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://spp.spolo.org/  sales@spolo.org spp-support@spolo.org
**************************************************************************/
try{
	(function(){
		//向前移动
		Event.Subscribe(function(e) {
			var actor = e.self;
			CONSOLE.WriteLine("[Debug] effect.forward : start");
			actor.pcarray['pcactormove'].Forward(true);
			if(actor.result == "life"){
				if(actor.state == "down"){
					CONSOLE.WriteLine("[Debug] effect.liedown : true");
				}else if(actor.state == "stand"){
					actor.pcarray['pcmesh'].SetAnimation('run', true, false);
				}
			} else if(actor.result == "injure"){
				CONSOLE.Write("[debug] [personCure] " + actor.name + " injure! .\n");
			}
		}, "effect.forward.start");		
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.WriteLine("[Debug] effect.forward : stop");
			actor.pcarray['pcactormove'].Forward(false);
			if(actor.result == "life"){
				if(actor.state == "down"){
					CONSOLE.WriteLine("[Debug] effect.liedown : true");
				}else if(actor.state == "stand"){
					actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
				}
			} else if(actor.result == "injure"){
				CONSOLE.Write("[debug] [personCure] " + actor.name + " injure! .\n");
			}
		}, "effect.forward.stop");
		//向后移动
		Event.Subscribe(function(e){
			var actor = e.self;	
			CONSOLE.WriteLine("[Debug] effect.backward : start");
			actor.pcarray['pcactormove'].Backward(true);
			if(actor.result == "life"){
				if(actor.state == "down"){
					CONSOLE.WriteLine("[Debug] effect.liedown : true");
				}else if(actor.state == "stand"){
					actor.pcarray['pcmesh'].SetAnimation('run', true, false);
				}
			} else if(actor.result == "injure"){	
				CONSOLE.Write("[debug] [personCure] " + actor.name + " injure! .\n");
			}
		}, "effect.backward.start");		
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.WriteLine("[Debug] effect.backward : stop");
			actor.pcarray['pcactormove'].Backward(false);
			if(actor.result == "life"){
				if(actor.state == "down"){
					CONSOLE.WriteLine("[Debug] effect.liedown : true");				
				}else if(actor.state == "stand"){
					actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
				}
			} else if(actor.result == "injure"){
				CONSOLE.Write("[debug] [personCure] " + actor.name + " injure! .\n");
			}
		}, "effect.backward.stop");
		//向左移动
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.WriteLine("[Debug] effect.strafeleft : start");
			actor.pcarray['pcactormove'].StrafeLeft(true);
			if(actor.result == "life"){
				if(actor.state == "down"){
					CONSOLE.WriteLine("[Debug] effect.liedown : true");				
				}else if(actor.state == "stand"){
					actor.pcarray['pcmesh'].SetAnimation('run', true, true);
				}
			} else if(actor.result == "injure"){
				CONSOLE.Write("[debug] [personCure] " + actor.name + " injure! .\n");
			}
		}, "effect.strafeleft.start");		
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.WriteLine("[Debug] effect.strafeleft : stop");
			actor.pcarray['pcactormove'].StrafeLeft(false);
			if(actor.result == "life"){
				if(actor.state == "down"){
					CONSOLE.WriteLine("[Debug] effect.liedown : true");				
				}else if(actor.state == "stand"){
					actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
				}
			} else if(actor.result == "injure"){
				CONSOLE.Write("[debug] [personCure] " + actor.name + " injure! .\n");
			}
		}, "effect.strafeleft.stop");
		//向右移动
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.WriteLine("[Debug] effect.straferight : start");
			actor.pcarray['pcactormove'].StrafeRight(true);
			if(actor.result == "life"){
				if(actor.state == "down"){
					CONSOLE.WriteLine("[Debug] effect.liedown : true");				
				}else if(actor.state == "stand"){
					actor.pcarray['pcmesh'].SetAnimation('run', true, true);
				}	
			} else if(actor.result == "injure"){
				CONSOLE.Write("[debug] [personCure] " + actor.name + " injure! .\n");
			}
		}, "effect.straferight.start");		
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.WriteLine("[Debug] effect.straferight : stop");
			actor.pcarray['pcactormove'].StrafeRight(false);
			if(actor.result == "life"){
				if(actor.state == "down"){
					CONSOLE.WriteLine("[Debug] effect.liedown : true");	
				}else if(actor.state == "stand"){
					actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
				}
			} else if(actor.result == "injure"){
				CONSOLE.Write("[debug] [personCure] " + actor.name + " injure! .\n");
			}
		}, "effect.straferight.stop");
		//跳跃
		Event.Subscribe(function(e){
			var actor = e.self;	
			CONSOLE.Write("[debug] "+ actor.name +".state : jump .\n");
			//BUG
			// actor.pcarray['pcdefaultcamera'].SetCamera("thirdperson");   //拉远视角
			actor.pcarray['pcdefaultcamera'].SetProperty("distance", 6);
			// CONSOLE.WriteLine("[Debug] effect.distance : "+actor.pcarray['pcdefaultcamera'].distance);
			// actor.pcarray['pcactormove'].SetSpeed(4, 2, 2, 4);
			actor.pcarray['pcactormove'].Jump(true);
			//TODO  将来要换成半蹲
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
		}, "effect.jump.start");
		Event.Subscribe(function(e){
			var actor = e.self;
			// actor.pcarray['pcdefaultcamera'].SetCamera("firstperson");
			actor.pcarray['pcdefaultcamera'].SetProperty("distance", 3);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
		}, "effect.jump.stop");
		//超级跳跃
		Event.Subscribe(function(e){
			var actor = e.self;
			//BUG
			// CONSOLE.Write("[debug] "+ actor.name +".state : superjump .\n");
			actor.pcarray['pcdefaultcamera'].SetCamera("thirdperson");   //拉远视角
			actor.pcarray['pcdefaultcamera'].SetProperty("distance", 6);
			actor.pcarray['pcactormove'].SetSpeed(4, 2, 2, 8);
			actor.pcarray['pcactormove'].Jump(true);
			//TODO  将来要换成半蹲
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
		}, "effect.superjump.start");
		Event.Subscribe(function(e){
			var actor = e.self;
			// actor.pcarray['pcdefaultcamera'].SetCamera("firstperson");
			actor.pcarray['pcdefaultcamera'].SetProperty("distance", 3);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
		}, "effect.superjump.stop");
		//加速前进
		Event.Subscribe(function(e){
			CONSOLE.Write("[debug] effect.hurry : start .\n");
			var actor = e.self;
			// actor.pcarray['pcactormove'].Forward(true);
			actor.pcarray['pcmesh'].SetAnimation('run', true, false);
			actor.pcarray['pcactormove'].SetSpeed(10, 60, 2, 4);
		}, "effect.hurry1");
		Event.Subscribe(function(e){
			var actor = e.self;
			//actor.pcarray['pcactormove'].Forward(false);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, false);
			actor.pcarray['pcactormove'].SetSpeed(4, 60, 2, 4);
		}, "effect.hurry0");
		//平常速度前进
		// Event.Subscribe(function(e){
			// CONSOLE.Write("[debug] effect.hurry : stop .\n");
			// var actor = e.self;
			// actor.pcarray['pcactormove'].Forward(true);
			// actor.pcarray['pcmesh'].SetAnimation('run', true, true);
			// actor.pcarray['pcactormove'].SetSpeed(4, 2, 2, 4);
			
		// }, "effect.hurryStop");
		//卧倒
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] effect.lieDown ：begin .\n");
			//TODO  需要换成卧倒效果
			actor.pcarray['pcmesh'].SetAnimation('run', true, false);
		},"effect.lieDown");
		//爬起
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] effect.pickUp ：begin .\n");
			//TODO  需要换成爬起效果
			actor.pcarray['pcmesh'].SetAnimation('run', true, false);
		},"effect.pickUp");
		//鼠标控制视角移动
		Event.Subscribe(function(e){
			var actor = e.self;
			var x = e.mouse_x;
			var y = e.mouse_y;
			//CONSOLE.Write("[debug] effect.viewmove:[x: " + x + "   y: " + y + "].\n");
			actor.pcarray['pcactormove'].mousemove = true;
			actor.pcarray['pcactormove'].MouseMove(x, y);
		}, "effect.viewmove");
		//获得Application的屏幕的像素坐标
		Event.Subscribe(function(e){
			player.mousex = e.x;
			player.mousey = e.y;
		}, "crystalspace.input.mouse.0.move");
		//手枪攻击
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] effect.weaponstate : handgun .\n");	
			//TODO  需要添加打枪效果
		},"effect.handgun.start");
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] effect.weaponstate : handgunstop .\n");
			//TODO  需要添加打枪结束效果
		},"effect.handgun.stop");
		//长枪攻击
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] effect.weaponstate : gun .\n");			
		},"effect.gun.start");
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] effect weaponstate : gunstop .\n");
		},"effect.gun.stop");
		//手雷攻击
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] effect.weaponstate . grenade .\n");
		},"effect.grenade.start");
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] effect.weaponstate : grenadestop .\n");			
		},"effect.grenade.stop");
		//刀具攻击
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] effect.weaponstate : kinfeeasy .\n");			
		},"effect.kinfeeasy.start");
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] effect.weaponstate : kinfeeasystop .\n");						
		},"effect.kinfeeasy.stop");
		//刀具重击
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] effect.weaponstate : thumpkinfe .\n");			
		},"effect.thumpkinfe.start");
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] effect.weaponstate : thumpkinfestop .\n");			
		},"effect.thumpkinfe.stop");
		//长枪瞄准
		Event.Subscribe(function(e){
			var actor = e.self;
			//actor.pcarray['pcsimplecamera'].SetPosition([0, 1, 9], [0, 1, 0]);
			CONSOLE.Write("[debug] effect.aim : normal .\n");
		},"effect.aim.normal");
		Event.Subscribe(function(e){
			var actor = e.self;
			//actor.pcarray['pcsimplecamera'].SetPosition([0, 1, 3], [0, 1, 0]);
			CONSOLE.Write("[debug] effect.aim : twice .\n");
		},"effect.aim.twice");
		Event.Subscribe(function(e){
			var actor = e.self;
			//actor.pcarray['pcsimplecamera'].SetPosition([0, 1, 3], [0, 1, 0]);
			CONSOLE.Write("[debug] effect.aim : double .\n");
		},"effect.aim.double");
		//长枪换子弹
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetCamera("thirdperson");
			actor.pcarray['pcsimplecamera'].SetPosition([-3, 1, 0], [0, 1, 0]);
			CONSOLE.Write("[debug] [effect ammogun] ammogun .\n");
			
		},"effect.bulletgun");
		//手枪换子弹
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetCamera("thirdperson");
			actor.pcarray['pcsimplecamera'].SetPosition([-3, 1, 0], [0, 1, 0]);
			CONSOLE.Write("[debug] [effect ammohandgun] ammohandgun .\n");
			
		},"effect.bullethandgun");
		//换弹结束
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetCamera("firstperson");
			actor.pcarray['pcsimplecamera'].SetPosition([0, 1, 3], [0, 1, 0]);
			CONSOLE.Write("[debug] [effect ammohandgun] ammohandgun .\n");
			
		},"effect.bulletFinished");
		//蹲下
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect state] squat .\n");
			
		}, "effect.squat");
		//站立
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect state] stand .\n");
			
		}, "effect.stand");
		//隐身
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect visible] : begin .\n");
			actor.pcarray['pcmesh'].SetVisible(false);
		},"effect.visible");
		//隐身结束
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect visible] : over.\n");
			actor.pcarray['pcmesh'].SetVisible(true);
		},"effect.visibleStop");
		//跪射
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect state] kneelingfire .\n");
			
		}, "effect.kneelingfire");
		//开启聊天窗口
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect chat] open .\n");
			actor.chat[0].text="吃饭。睡觉。打豆豆。。。";
		},"effect.chatOpen");
		//关闭聊天窗口
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect chat] close .\n");
		},"effect.chatClose");
		//发送消息
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect chat] sendChatText .\n");
			CONSOLE.Write("[debug] [effect chat] " + actor.chat[0].name + " .\n");
			CONSOLE.Write("[debug] [effect chat] " + actor.chat[0].text + " .\n");
			CONSOLE.Write("[debug] [effect chat] close .\n");
		},"effect.sendChatText");
		//开启对聊装置
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect talk] open .\n");
			//这里要从UI选中一个用户来进行对聊
			actor.talk[0].talkObject=member.warband_A[3].name;
			actor.talk[0].text="talk嗨，哥们儿，爆你头。。。";
		},"effect.talkOpen");
		//发送对聊消息
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect talk] sendTalkText .\n");
			CONSOLE.Write("[debug] [effect talk] " + actor.talk[0].talkObject + " .\n");
			CONSOLE.Write("[debug] [effect talk] " + actor.talk[0].text + " .\n");
		},"effect.sendTalkText");
		//关闭对聊装置
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect talk] close .\n");
			actor.talk[0].talkObject="";
			actor.talk[0].text="";
		},"effect.talkClose");
		//开启对话装置
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect voice] open .\n");
			//这里要从UI选中一个用户来进行对话
			actor.voice[0].voiceObject=member.warband_A[3].name;
			actor.voice[0].text="voice地瓜，地瓜，我是土豆，听到请回话。。。over";
			//输出测试
			CONSOLE.Write("[debug] [effect voice] sendVoiceText .\n");
			CONSOLE.Write("[debug] [effect voice] " + actor.voice[0].voiceObject + " .\n");
			CONSOLE.Write("[debug] [effect voice] " + actor.voice[0].text + " .\n");
		},"effect.voiceOpen");
		//关闭对话装置
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect voice] close .\n");
			actor.talk[0].voiceObject="";
			actor.talk[0].text="";
		},"effect.voiceClose");
		//切换装备
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect state] " + actor.weaponstate + " .\n");
			
		}, "effect.quick");
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [state] " + actor.weaponstate + " .\n");
			
		}, "effect.page1");
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect state] " + actor.weaponstate + " .\n");
			
		}, "effect.page2");
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect state] " + actor.weaponstate + " .\n");
			
		}, "effect.page3");
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [effect state] " + actor.weaponstate + " .\n");
			
		}, "effect.page4");
		
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcdefaultcamera'].SetCamera(actor.person);
		}, "effect.cameracontrol");
		
		//受伤
		Event.Subscribe(function(e){
			var actor = e.self;
			//actor.pcarray['pcdefaultcamera'].SetCamera("thirdperson");   //拉远视角
			//actor.pcarray['pcdefaultcamera'].SetProperty("distance", 3);
			CONSOLE.Write("[debug] [attacker] " + actor.name + " injure! .\n");
			
		}, "effect.injure");
		
		//治疗
		Event.Subscribe(function(e){
			var actor = e.self;
			var target = e.target;
			CONSOLE.Write("[debug] [personCure] " + actor.name + " Cure " + target.name + " injure! .\n");
			actor.pcarray['pcdefaultcamera'].SetCamera("thirdperson");   //拉远视角
			// actor.pcarray['pcdefaultcamera'].SetProperty("distance", 3);
			
		}, "effect.personCure");
		Event.Subscribe(function(e){
			var actor = e.self;
			var target = e.target;
			CONSOLE.Write("[debug] [personCure] " + actor.name + " Cure " + target.name + " injure! .\n");
			actor.pcarray['pcdefaultcamera'].SetCamera("firstperson");   //拉远视角
			// actor.pcarray['pcdefaultcamera'].SetProperty("distance", 3);
			
			
		}, "effect.personCureStop");
		
		//死亡
		Event.Subscribe(function(e){
			var actor = e.self;
			CONSOLE.Write("[debug] [died] " + actor.name + " died ! .\n");			
			
		}, "effect.diedView");

	})();

} catch(e){
	alert(e);
}