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
		// 开枪时，视角上扬
		Event.Subscribe(function(e) {
			var actor = e.actor;
			var accuracy = e.accuracy;
			// console.log("shock accuracy = " + accuracy);
			var dist = 100 * (1 - accuracy / 100) / 1000;
			// console.log("shock dist = " + dist);
			// var x = actor.pcarray['pcactormove'].mousemove_xfactor;
			// var y = actor.pcarray['pcactormove'].mousemove_yfactor;
			// console.log("shock loc x = " + x);
			// console.log("shock loc y = " + y);
			// actor.pcarray['pcactormove'].MouseMove(x, y + dist);
			var pitch = actor.pcarray['pcdefaultcamera'].GetProperty('pitch');
			console.log("shock pitch = " + pitch);
			actor.pcarray['pcdefaultcamera'].SetProperty('pitch', pitch + dist); 
			actor.pcarray['pctimer'].WakeUp(100, true, 'attShockStop');
			
		}, "effect.attShock.start");	
		//设置静走的速度
		Event.Subscribe(function(e) {
			console.log("walk.start !\n");
			var actor = e.actor;
			var speed_movement = actor.movement * (1 - 0.3);
			console.log("actor walk movement : " + speed_movement);
			var speed_runing = actor.runing;
			var speed_rotation = actor.rotation;
			var speed_jumping = actor.jumping;
			//将移动速度少30%
			actor.pcarray['pcactormove'].SetSpeed(speed_movement, speed_runing, speed_rotation, speed_jumping);
		}, "effect.walk.start");	
		Event.Subscribe(function(e) {
			console.log("walk.end !\n");
			var actor = e.actor;
			var speed_movement = actor.movement;
			console.log("actor movement : " + speed_movement);
			var speed_runing = actor.runing;
			var speed_rotation = actor.rotation;
			var speed_jumping = actor.jumping;
			//将移动速度改为初始速度
			actor.pcarray['pcactormove'].SetSpeed(speed_movement, speed_runing, speed_rotation, speed_jumping);
		}, "effect.walk.end");			
		//向前移动
		Event.Subscribe(function(e) {
			var actor = e.actor;
			var curWeaponType = e.curWeaponType
			//如果手上没有武器或是拿着手雷时的速度为标准移动速度。
			// if(curWeaponType == 0 || curWeaponType == 4){
				// actor.movement = 5;
				// actor.pcarray['pcactormove'].SetSpeed(actor.movement);
				// console.log("@@@@@@@@@@curWeaponType == 4 : " + actor.movement)
			// } 
			console.log(" actor forward movement :" +  actor.movement + "\n");
			actor.pcarray['pcactormove'].Forward(true);
			
			actor.pcarray['pcmesh'].SetAnimation('run', true, false);
			//actor.pcarray['pcmesh'].SetAnimation('run', true, true);
			// if(actor.result == "life"){
				// if(actor.state == "down"){
					// // console.log("[Debug] effect.liedown : true");
				// }else if(actor.state == "stand"){
					// actor.pcarray['pcmesh'].SetAnimation('run', true, false);
				// }
			// } else if(actor.result == "injure"){
				// // console.log("[debug] [personCure] " + actor.name + " injure! .\n");
			// }
		}, "effect.forward.start");		
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[Debug] effect.forward : stop");
			actor.pcarray['pcactormove'].Forward(false);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
			// if(actor.result == "life"){
				// if(actor.state == "down"){
					// // console.log("[Debug] effect.liedown : true");
				// }else if(actor.state == "stand"){
					// actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
				// }
			// } else if(actor.result == "injure"){
				// // console.log("[debug] [personCure] " + actor.name + " injure! .\n");
			// // }
		}, "effect.forward.stop");
		//向后移动
		Event.Subscribe(function(e){
			var actor = e.actor;
			var curWeaponType = e.curWeaponType
			//如果手上没有武器或是拿着手雷时的速度为标准移动速度。
			// if(curWeaponType == 0 || curWeaponType == 4){
				// actor.movement = 5;
				// actor.pcarray['pcactormove'].SetSpeed(actor.movement);
			// } 			
			console.log(" actor backward movement :" +  actor.movement + "\n");
			actor.pcarray['pcactormove'].Backward(true);
			actor.pcarray['pcmesh'].SetAnimation('run', true, true);
			// if(actor.result == "life"){
				// if(actor.state == "down"){
					// // console.log("[Debug] effect.liedown : true");
				// }else if(actor.state == "stand"){
					// actor.pcarray['pcmesh'].SetAnimation('run', true, false);
				// }
			// } else if(actor.result == "injure"){	
				// // console.log("[debug] [personCure] " + actor.name + " injure! .\n");
			// }
		}, "effect.backward.start");		
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[Debug] effect.backward : stop");
			actor.pcarray['pcactormove'].Backward(false);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
			// if(actor.result == "life"){
				// if(actor.state == "down"){
					// // console.log("[Debug] effect.liedown : true");				
				// }else if(actor.state == "stand"){
					// actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
				// }
			// } else if(actor.result == "injure"){
				// // console.log("[debug] [personCure] " + actor.name + " injure! .\n");
			// }
		}, "effect.backward.stop");
		//向左移动
		Event.Subscribe(function(e){
			var actor = e.actor;
			//var curWeaponType = e.curWeaponType
			//如果手上没有武器或是拿着手雷时的速度为标准移动速度。
			// if(curWeaponType == 0 || curWeaponType == 4){
				// actor.movement = 5;
				// actor.pcarray['pcactormove'].SetSpeed(actor.movement);
			// } 
			console.log(" actor strafeleft movement :" +  actor.movement + "\n");
			actor.pcarray['pcactormove'].StrafeLeft(true);
			actor.pcarray['pcmesh'].SetAnimation('run', true, true);
			// if(actor.result == "life"){
				// if(actor.state == "down"){
					// // console.log("[Debug] effect.liedown : true");				
				// }else if(actor.state == "stand"){
					// actor.pcarray['pcmesh'].SetAnimation('run', true, true);
				// }
			// } else if(actor.result == "injure"){
				// // console.log("[debug] [personCure] " + actor.name + " injure! .\n");
			// }
		}, "effect.strafeleft.start");		
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[Debug] effect.strafeleft : stop");
			actor.pcarray['pcactormove'].StrafeLeft(false);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
			// if(actor.result == "life"){
				// if(actor.state == "down"){
					// // console.log("[Debug] effect.liedown : true");				
				// }else if(actor.state == "stand"){
					// actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
				// }
			// } else if(actor.result == "injure"){
				// // console.log("[debug] [personCure] " + actor.name + " injure! .\n");
			// }
		}, "effect.strafeleft.stop");
		//向右移动
		Event.Subscribe(function(e){
			var actor = e.actor;
			var curWeaponType = e.curWeaponType
			//如果手上没有武器或是拿着手雷时的速度为标准移动速度。
			// if(curWeaponType == 0 || curWeaponType == 4){
				// actor.movement = 5;
				// actor.pcarray['pcactormove'].SetSpeed(actor.movement);
			// } 
			console.log(" actor straferight movement :" +  actor.movement + "\n");
			actor.pcarray['pcactormove'].StrafeRight(true);
			actor.pcarray['pcmesh'].SetAnimation('run', true, true);
			// if(actor.result == "life"){
				// if(actor.state == "down"){
					// // console.log("[Debug] effect.liedown : true");				
				// }else if(actor.state == "stand"){
					// actor.pcarray['pcmesh'].SetAnimation('run', true, true);
				// }	
			// } else if(actor.result == "injure"){
				// // console.log("[debug] [personCure] " + actor.name + " injure! .\n");
			// }
		}, "effect.straferight.start");		
		Event.Subscribe(function(e){
			var actor = e.actor;
			var curWeaponType = e.curWeaponType
			// console.log("[Debug] effect.straferight : stop");
			actor.pcarray['pcactormove'].StrafeRight(false);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
			// if(actor.result == "life"){
				// if(actor.state == "down"){
					// // console.log("[Debug] effect.liedown : true");	
				// }else if(actor.state == "stand"){
					// actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
				// }
			// } else if(actor.result == "injure"){
				// // console.log("[debug] [personCure] " + actor.name + " injure! .\n");
			// }
		}, "effect.straferight.stop");
		//跳跃
		Event.Subscribe(function(e){
			var actor = e.actor;
			var speed_movement = actor.movement;
			var speed_runing = actor.runing;
			var speed_rotation = actor.rotation;
			var speed_jumping = actor.jumping;
			actor.pcarray['pcactormove'].SetSpeed(speed_movement, speed_runing, speed_rotation, speed_jumping);
			//应该是一个跳跃的动画，现在暂时用站立的动画来代替
			actor.pcarray['pcactormove'].Jump();
			actor.pcarray['pcmesh'].SetAnimation('stand', false, true);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, false);
		},"effect.jump.start");
		//超级跳跃
		Event.Subscribe(function(e){
			var actor = e.actor;
			var speed_movement = actor.movement;
			var speed_runing = actor.runing;
			var speed_rotation = actor.rotation;
			var speed_jumping = actor.jumping * 6;
			//BUG
			// // console.log("[debug] "+ actor.name +".state : superjump .\n");
			// actor.pcarray['pcdefaultcamera'].SetCamera("thirdperson");   //拉远视角
			// actor.pcarray['pcdefaultcamera'].SetProperty("distance", 6);
			//高度变为6m
			actor.pcarray['pcactormove'].SetSpeed(speed_movement, speed_runing, speed_rotation, speed_jumping);
			actor.pcarray['pcactormove'].Jump();
			//TODO  将来要换成半蹲,现在暂时用站立的动画来代替
			actor.pcarray['pcmesh'].SetAnimation('stand', false, true);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, false);
		}, "effect.superjump.start");
		Event.Subscribe(function(e){
			var actor = e.actor;
			var speed_movement = actor.movement;
			var speed_runing = actor.runing;
			var speed_rotation = actor.rotation;
			var speed_jumping = actor.jumping;
			//将高度设回原始高度1m
			actor.pcarray['pcactormove'].SetSpeed(speed_movement, speed_runing, speed_rotation, speed_jumping);
			// actor.pcarray['pcdefaultcamera'].SetCamera("firstperson");
			// actor.pcarray['pcdefaultcamera'].SetProperty("distance", 3);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
		}, "effect.superjump.stop");
		//加速前进
		Event.Subscribe(function(e){
			// console.log("[debug] effect.hurry : start .\n");
			var actor = e.actor;
			actor.pcarray['pcactormove'].Forward(true);
			actor.pcarray['pcmesh'].SetAnimation('run', true, false);
			//actor.pcarray['pcactormove'].SetSpeed(30, 60, 2, 4);
		}, "effect.hurry1");
		Event.Subscribe(function(e){
			var actor = e.actor;
			//actor.pcarray['pcactormove'].Forward(false);
			actor.pcarray['pcmesh'].SetAnimation('stand', true, false);
			//actor.pcarray['pcactormove'].SetSpeed(4, 60, 2, 4);
		}, "effect.hurry0");
		//平常速度前进
		// Event.Subscribe(function(e){
			// // console.log("[debug] effect.hurry : stop .\n");
			// var actor = e.actor;
			// actor.pcarray['pcactormove'].Forward(true);
			// actor.pcarray['pcmesh'].SetAnimation('run', true, true);
			// actor.pcarray['pcactormove'].SetSpeed(4, 2, 2, 4);
			
		// }, "effect.hurryStop");
		//卧倒
		/*Event.Subscribe(function(e){
			console.log("lieDown");
			var actor = e.actor;
			var speed_movement = actor.movement * (1 - 0.7);
			var speed_runing = actor.runing;
			var speed_rotation = actor.rotation;
			var speed_jumping = actor.jumping;
			//将移动速度少70%
			actor.pcarray['pcactormove'].SetSpeed(speed_movement, speed_runing, speed_rotation, speed_jumping);
			//TODO  需要换成卧倒效果
			//actor.pcarray['pcmesh'].SetAnimation('', , );
		},"effect.lieDown");*/
		//爬起
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] effect.pickUp ：begin .\n");
			// TODO  需要换成爬起效果
			actor.pcarray['pcmesh'].SetAnimation('run', true, false);
		},"effect.pickUp");
		Event.Subscribe(function(e){
			var actor = e.actor;
			actor.pcarray['pcmesh'].SetAnimation('stand', true, true);
		},"effect.jump.stop");
		//鼠标控制视角移动
		Event.Subscribe(function(e){
			var actor = e.actor;
			var x = e.x;
			var y = e.y;
			// console.log("effect.mouseMove x:" + x + " y:" + y);
			
			actor.pcarray['pcactormove'].MouseMove(x, y);
			
		}, "effect.mouseMove");
		//获得Application的屏幕的像素坐标
		Event.Subscribe(function(e){
			if(typeof(selfObj) != "undefined" && typeof(selfObj.selfPlayer) != "undefined"){
				selfObj.selfPlayer.mousex = e.x;
				selfObj.selfPlayer.mousey = e.y;
				// console.log("selfObj.selfPlayer.mouse : [x : " + selfObj.selfPlayer.mousex + ", y : " + selfObj.selfPlayer.mousey + "]\n");
			}
		}, "crystalspace.input.mouse.0.move");
		//手枪攻击
		Event.Subscribe(function(e){
			var actor = e.actor;
			var targetPos = e.targetPos;
			var bullet = e.bullet;
			var noTarget = e.noTarget;
			var pos = actor.pcarray['pcmesh'].GetProperty('position');
			bullet.pcarray['pcmesh'].MoveMesh([pos.x, pos.y + 1, pos.z + 1]);
			if(noTarget){
				var stability = actor.stability;
				var range = actor.range;
				var accuracy  = actor.accuracy;
				var angle = (1 - accuracy / 100) * 0.1 * (100 / 80);
				var radian = angle / 180 * Math.PI;
				var targetRad = Math.tan(radian) * range;
				var rid = Math.random() * 100 + 40;
				var rotRid = rid / 180 * Math.PI;
				// console.log("stability = " + stability);
				// console.log("range = " + range);
				// console.log("accuracy = " + accuracy);
				// console.log("angle = " + angle);
				// console.log("radian = " + radian);
				// console.log("rid = " + rid);
				// console.log("rotRid = " + rotRid);
				// console.log("targetRad = " + targetRad);
				var vecBult = new Math3.Vector3(pos.x, pos.y + 1, pos.z + 1);
				vecBult.Subtract(targetPos);
				vecBult.Normal();
				// console.log("vecBult Normal : [" + vecBult[0] + " ," + vecBult[1] + " ," + vecBult[2] + "]");
				
				// var dist = targetPos.Length();
				// console.log("dist = " + dist);
				
				// console.log("vecBult 1 : [" + vecBult[0] + " ," + vecBult[1] + " ," + vecBult[2] + "]");
				
				var mat3 = new Math3.Matrix3(0, 0, 1, 0, 1, 0, -1, 0, 0);
				// mat3.Multiply([vecBult.x, vecBult.y, vecBult.z]);
				var vec9 = mat3.Multiply(vecBult);
				// console.log("vecBult 2 : [" + vec9[0] + " ," + vec9[1] + " ," + vec9[2] + "]");
				
				//?
				var cos = Math.cos(rid);
				var sin = Math.sin(rid);
				// console.log("cos : " + cos);
				// console.log("sin : " + sin);
				var newMat = new Math3.Matrix3(cos, -sin, 0, sin, cos, 0, 0, 0, 1);
				var newVec = newMat.Multiply(vec9);
				// console.log("newVec : [" + newVec[0] + " ," + newVec[1] + " ," + newVec[2] + "]");
				// var newVec = new Math3.Vector3(newMat[0], newMat[1], newMat[2]);
				// newVec.Normal();
				// console.log("newVec 1 : [" + newVec[0] + " ," + newVec[1] + " ," + newVec[2] + "]");
				var R = range * Math.sin(radian);
				// console.log("R : " + R);
				var dist = Math.random() * R;
				console.log("dist : " + dist);
				newVec.Multiply(dist);
				// console.log("newVec 2 : [" + newVec[0] + " ," + newVec[1] + " ," + newVec[2] + "]");
				var post = new Math3.Vector3(targetPos[0] ,targetPos[1] ,targetPos[2]);
				post.Subtract([pos.x, pos.y + 1, pos.z + 1]);
				// console.log("post 1 : [" + post[0] + " ," + post[1] + " ," + post[2] + "]");
				
				post.Add(newVec);
				
			} else {
				post = targetPos;
			}
			bullet.pcarray['pcmesh'].PerformAction('SetVisible',['visible', false]);
			
			bullet.pcarray['pcprojectile'].Start([post[0], post[1], post[2]], 20.0, 200, 2.0);
		
			//TODO  需要添加打枪效果
		},"effect.handgun.start");
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] effect.weaponstate : handgunstop .\n");
			//TODO  需要添加打枪结束效果
		},"effect.handgun.stop");
		//长枪攻击
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] effect.weaponstate : gun .\n");			
		},"effect.gun.start");
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] effect weaponstate : gunstop .\n");
		},"effect.gun.stop");
		//手雷攻击
		Event.Subscribe(function(e){
			var actor = e.actor;
			var targetPos = e.targetPos;
			var curWeaponID = e.curWeaponID;
			var meshwraper = engine.FindMeshObject("grenade");
			var iPcSystem = actor.pcarray['pcmechsys'].QueryInterface('iPcMechanicsSystem');
			var grenade = Entities.CreateEntity(GRENADE);
			grenade.curWeaponID = curWeaponID;
			grenade.pcarray['pctimer'].WakeUp(10000, false, 'bombTimer');
			grenade.pcarray['pcmesh'].PerformAction('SetVisible',['visible', true]);
			var pos = actor.pcarray['pcmesh'].GetProperty('position');
			grenade.pcarray['pcmesh'].MoveMesh([pos.x, pos.y + 2, pos.z]);
			console.log("pos : [" + pos.x + " ," + pos.y + " ," + pos.z + "]");
			var trans = meshwraper.movable.GetTransform();
			var o2T = trans.GetO2T();
			var orig = trans.GetOrigin();
			var otthtrans = Math3.OrthoTransform(o2T, orig);
			var irbody = iPcSystem.CreateBody();
			irbody.AttachColliderMesh(meshwraper, otthtrans, 10, 1, 1, 1);
			irbody.AttachMesh(meshwraper);
			var orig = Math3.Vector3(pos.x , pos.y + 2, pos.z); 
			irbody.position = orig;
			var forward = Math3.Vector3(targetPos[0] , targetPos[1], targetPos[2]); 
			forward.Normal();
			forward.Multiply(10);
			// forward.Add(targetPos);
			// forward = Math3.Vector3(forward[0] , forward[1] + 10, forward[2]); 
			console.log("forward pos : [" + forward.x + " ," + forward.y + " ," + forward.z + "]");
			irbody.linearVelocity = forward;
			
			var linearMove = grenade.pcarray['pclinearmovement'].QueryInterface('iPcLinearMovement');
			
			var id = C3D.engine.SubscribeFrame(function(a,b){
				
				if(linearMove.IsOnGround()){
					var linerVe = Math3.Vector3(0 , 0, 0); 
					irbody.linearVelocity = linerVe;
					iPcSystem.RemoveBody(irbody);
					C3D.engine.UnsubscribeFrame(id);
					var grenadePos = grenade.pcarray['pcmesh'].GetProperty('position');
					grenade.pcarray['pcmesh'].MoveMesh([grenadePos.x, grenadePos.y + 2, grenadePos.z]);
					grenadePos = [grenadePos.x, grenadePos.y + 2, grenadePos.z];
					console.log("grenadePos : " + grenadePos);
					grenade.bombPlayer = actor.pcarray['pcmesh'].meshname;
					grenade.pcarray['pctrigger'].SetProperty("enabled", true);
					grenade.pcarray['pctrigger'].PerformAction(
						"SetupTriggerSphere", 
						['sector', 'Scene'], 
						['position', grenadePos], 
						['radius', 5]
					);
					
				} 
			});
			
		},"effect.grenade.start");
		Event.Subscribe(function(e){
			var actor = e.actor;
			actor.pcarray['pcmesh'].PerformAction('SetVisible',['visible', false]);
			// 手雷爆炸效果
			
		},"effect.bombEffect");
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] effect.weaponstate : grenadestop .\n");			
		},"effect.grenade.stop");
		//刀具攻击
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] effect.weaponstate : kinfeeasy .\n");			
		},"effect.kinfeeasy.start");
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] effect.weaponstate : kinfeeasystop .\n");						
		},"effect.kinfeeasy.stop");
		//刀具重击
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] effect.weaponstate : thumpkinfe .\n");			
		},"effect.thumpkinfe.start");
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] effect.weaponstate : thumpkinfestop .\n");			
		},"effect.thumpkinfe.stop");
		//长枪瞄准
		Event.Subscribe(function(e){
			var actor = e.actor;
			//actor.pcarray['pcsimplecamera'].SetPosition([0, 1, 9], [0, 1, 0]);
			// console.log("[debug] effect.aim : normal .\n");
		},"effect.aim.normal");
		Event.Subscribe(function(e){
			var actor = e.actor;
			//actor.pcarray['pcsimplecamera'].SetPosition([0, 1, 3], [0, 1, 0]);
			// console.log("[debug] effect.aim : twice .\n");
		},"effect.aim.twice");
		Event.Subscribe(function(e){
			var actor = e.actor;
			//actor.pcarray['pcsimplecamera'].SetPosition([0, 1, 3], [0, 1, 0]);
			// console.log("[debug] effect.aim : double .\n");
		},"effect.aim.double");
		//长枪换子弹
		Event.Subscribe(function(e){
			var actor = e.actor;
			actor.pcarray['pcdefaultcamera'].SetCamera("thirdperson");
			// if(actor.name != "player"){
				// actor.pcarray['pcsimplecamera'].SetPosition([-3, 1, 0], [0, 1, 0]);
			// }
			// console.log("[debug] [effect ammogun] ammogun .\n");
			
		},"effect.bulletgun");
		//手枪换子弹
		Event.Subscribe(function(e){
			var actor = e.actor;
			actor.pcarray['pcdefaultcamera'].SetCamera("thirdperson");
			// if(actor.name != "player"){
				// actor.pcarray['pcsimplecamera'].SetPosition([-3, 1, 0], [0, 1, 0]);
			// }
			// console.log("[debug] [effect ammohandgun] ammohandgun .\n");
			
		},"effect.bullethandgun");
		//换弹结束
		Event.Subscribe(function(e){
			var actor = e.actor;
			actor.pcarray['pcdefaultcamera'].SetCamera("firstperson");
			// if(actor.name != "player"){
				// actor.pcarray['pcsimplecamera'].SetPosition([0, 1, 3], [0, 1, 0]);
			// }
			// console.log("[debug] [effect ammohandgun] ammohandgun .\n");
			
		},"effect.bulletFinished");
		//蹲下
		Event.Subscribe(function(e){
			console.log("squat!\n");
			var actor = e.actor;
			var speed_movement = actor.movement * (1 - 0.5);
			var speed_runing = actor.runing;
			var speed_rotation = actor.rotation;
			var speed_jumping = actor.jumping;
			//var speed_move = movement * (1 - 0.5);
			//移动速度减半
			actor.pcarray['pcactormove'].SetSpeed(speed_movement, speed_runing, speed_rotation, speed_jumping);
            //插入一个蹲下的动画
			//actor.pcarray['pcmesh'].SetAnimation('', , );
			//console.log("[debug] [effect state] squat .\n");
		}, "effect.squat");
		//蹲下向前行走
		/*Event.Subscribe(function(e){
			console.log("squatForward.start!");
			var actor = e.actor;
			//移动速度减半
			actor.pcarray['pcactormove'].SetSpeed(1, 2, 2, 4);
			//添加蹲下向前移动的动画
			//actor.pcarray['pcmesh'].SetAnimation('', , );
		},"effect.squatForward.start");*/
		//站立
		Event.Subscribe(function(e){
			console.log("stand!\n");
			var actor = e.actor;
			var speed_movement = actor.movement;
			var speed_runing = actor.runing;
			var speed_rotation = actor.rotation;
			var speed_jumping = actor.jumping;
			//将移动速度改为初始速度
			actor.pcarray['pcactormove'].SetSpeed(speed_movement, speed_runing, speed_rotation, speed_jumping);
			// console.log("[debug] [effect state] stand .\n");
			
		}, "effect.stand");
		//隐身
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] [effect visible] : begin .\n");
			actor.pcarray['pcmesh'].SetVisible(false);
		},"effect.visible");
		//隐身结束
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] [effect visible] : over.\n");
			actor.pcarray['pcmesh'].SetVisible(true);
		},"effect.visibleStop");
		//跪射
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] [effect state] kneelingfire .\n");
			
		}, "effect.kneelingfire");
		//开启聊天窗口
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] [effect chat] open .\n");
			actor.chat[0].text="吃饭。睡觉。打豆豆。。。";
		},"effect.chatOpen");
		//关闭聊天窗口
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] [effect chat] close .\n");
		},"effect.chatClose");
		//发送消息
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] [effect chat] sendChatText .\n");
			// console.log("[debug] [effect chat] " + actor.chat[0].name + " .\n");
			// console.log("[debug] [effect chat] " + actor.chat[0].text + " .\n");
			// console.log("[debug] [effect chat] close .\n");
		},"effect.sendChatText");
		//开启对聊装置
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] [effect talk] open .\n");
			//这里要从UI选中一个用户来进行对聊
			// actor.talk[0].talkObject=member.warband_A[3].name;
			actor.talk[0].text="talk嗨，哥们儿，爆你头。。。";
		},"effect.talkOpen");
		//发送对聊消息
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] [effect talk] sendTalkText .\n");
			// console.log("[debug] [effect talk] " + actor.talk[0].talkObject + " .\n");
			// console.log("[debug] [effect talk] " + actor.talk[0].text + " .\n");
		},"effect.sendTalkText");
		//关闭对聊装置
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] [effect talk] close .\n");
			actor.talk[0].talkObject="";
			actor.talk[0].text="";
		},"effect.talkClose");
		//开启对话装置
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] [effect voice] open .\n");
			//这里要从UI选中一个用户来进行对话
			// actor.voice[0].voiceObject=member.warband_A[3].name;
			actor.voice[0].text="voice地瓜，地瓜，我是土豆，听到请回话。。。over";
			//输出测试
			// console.log("[debug] [effect voice] sendVoiceText .\n");
			// console.log("[debug] [effect voice] " + actor.voice[0].voiceObject + " .\n");
			// console.log("[debug] [effect voice] " + actor.voice[0].text + " .\n");
		},"effect.voiceOpen");
		//关闭对话装置
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] [effect voice] close .\n");
			actor.talk[0].voiceObject="";
			actor.talk[0].text="";
		},"effect.voiceClose");
		//切换装备
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] [effect state] " + actor.weaponstate + " .\n");
			
		}, "effect.quick");
		Event.Subscribe(function(e){
			var actor = e.actor;
			console.log("[debug] [state] " + actor.weaponstate + " .\n");
			
		}, "effect.page1");
		Event.Subscribe(function(e){
			var actor = e.actor;
			console.log("[debug] [effect state] " + actor.weaponstate + " .\n");
			
		}, "effect.page2");
		Event.Subscribe(function(e){
			var actor = e.actor;
			console.log("[debug] [effect state] " + actor.weaponstate + " .\n");
			
		}, "effect.page3");
		Event.Subscribe(function(e){
			var actor = e.actor;
			console.log("[debug] [effect state] " + actor.weaponstate + " .\n");
			
		}, "effect.page4");
		
		Event.Subscribe(function(e){
			var actor = e.actor;
			var oldWeaponID = e.oldWeaponID;
			var cameraDirect = e.cameraDirect;
			var bullet = e.bullet;
			var bultCount = e.bultCount;
			
			//求出丢弃枪的位置，显示其仍枪的效果。
			/**
			 * 获取摄像机方向向量
			 */
			var cameraDir = new Math3.Vector3(cameraDirect[0] , cameraDirect[1], cameraDirect[2]);
			cameraDir.Normal(); // 单位向量
			cameraDir.Multiply(9);
			var forward = cameraDir; 
			var pos = actor.pcarray["pcmesh"].GetProperty("position");//获取人物的位置
			console.log("cameraDir : " + cameraDir);
			var meshwraper = engine.FindMeshObject("gun");//获取枪的对象
			var iPcSystem = actor.pcarray['pcmechsys'].QueryInterface('iPcMechanicsSystem');//通过QueryInterface接口获取物理子系统
			var gun = null;//玩家丢弃的枪的entity
			for(var i in gunEntList){
				//console.log("*************** gunEntList[" + i + "] :" + JSON.stringify(gunEntList[i]) + "\n");
				//获取玩家丢掉的武器的entity。
				if(gunEntList[i].ownerBy == actor.loc && 
				gunEntList[i].curWeaponID == oldWeaponID){
					gun = gunEntList[i];
					break;
				}
			}
			if(gun != null){
					// 应该是以全局变量存储武器mesh的entity，暂时以一个盒子和临时创建的全局变量代替。
					gun.bullets = bullet;
					gun.bultCount = bultCount;
					gun.pcarray['pcmesh'].PerformAction('SetVisible',['visible', true]);
					gun.pcarray['pcmesh'].MoveMesh([pos.x, pos.y + 1, pos.z + 3]);//先将枪移到人的手上。
					var irbody = iPcSystem.CreateBody();//创建刚体
					irbody.AttachMesh(meshwraper);//将枪的mesh对象放到刚体中。
					var orig = Math3.Vector3(pos.x , pos.y + 1, pos.z + 1); 
					irbody.position = orig;//设置枪抛出的起始位置
					var forward = Math3.Vector3(cameraDir[0] , 3, cameraDir[2]); 
					console.log("forward pos : [" + forward.x + " ," + forward.y + " ," + forward.z + "]");
					irbody.linearVelocity = forward;//设置枪的线速度。
					var gunLiner = gun.pcarray['pclinearmovement'].QueryInterface('iPcLinearMovement');
					var id = C3D.engine.SubscribeFrame(function(a,b){
						if(gunLiner.IsOnGround()){//判断枪到达地面后，将其速度设为0使其停在地面上。
							console.log("hit ground");
							var setSpeed = [0, 0, 0];
							irbody.linearVelocity = setSpeed;//将枪的线速度设为0
							iPcSystem.RemoveBody(irbody);//将刚体移除。
							C3D.engine.UnsubscribeFrame(id);//取消sub事件。
							var gunPos = gun.pcarray['pcmesh'].GetProperty('position');
							gun.pcarray['pcmesh'].MoveMesh([gunPos.x, gunPos.y + 1, gunPos.z]);//将整个物体模型显示在地面上。
							/**
							 * 定时50s后,枪自动消失
							*/
							gun.pcarray['pctimer'].WakeUp(50000, false, 'hideGun');
							/**
							 * 在枪消失之前，有玩家靠近武器（以武器为中心，以r为半径的范围内）时，并且该玩家没有主武器的情况则，可以将武器拾起。
							*/
							var pos = [gunPos.x, gunPos.y + 1, gunPos.z];//枪的位置
							gun.pcarray['pctrigger'].PerformAction(
								"SetupTriggerSphere", 
								['sector', 'Scene'],
								['position', pos],
								['radius', 1]
							);
						}
					}); 
					if(actor.curWeaponType == 0){
						var weaponList = actor.weaponList;
						var weaponID = 0;
						var idx = 0;
						for(var i in weaponList){
							idx++;
							console.log("weaponList[" + i + "] :" + weaponList[i]);
							if(weaponList[i] != null){
								console.log("weaponList[" + i + "] :" + weaponList[i]);
								weaponID = weaponList[i];
								break;
							}
						}
						actor.curWeaponType =  idx;
						console.log("give up last switch weapon : " + weaponID);
						Event.Send({
							name : "effect.switchWeapon",
							actor : actor,
							weaponID : weaponID,
						});
						Event.Send({
							name : "net.switchWeapon",
							type : "switchWeapon",
							weaponID : weaponID,
						});
					}
				}	
		}, "effect.giveUpWeapon");
		
		Event.Subscribe(function(e){
			console.log("net.giveUpWeapon.\n");
			var actor = e.actor;
			var oldWeaponID = e.oldWeaponID;
			var cameraDirect = e.cameraDirect;
			var bullet = e.bullet;
			var bultCount = e.bultCount;
			curScene.giveUpWeapon(curUser, cameraDirect, oldWeaponID, bullet, bultCount);
		}, "net.giveUpWeapon");
		
		Event.Subscribe(function(e){
			console.log("effect.pickUpWepon.\n");
			var actor = e.actor;
			var pickUPwep = e.pickUPwep;
			//pickUPwep.pcarray['pcmesh'].PerformAction('SetVisible',['visible', false]);//将武器隐藏
			// 武器对应json对象
			weaponObj = weaponMap[pickUPwep.weaponID];
			// 切换武器动画
			console.log("weaponObj :" + JSON.stringify(weaponObj));
		}, "effect.pickUpWepon");
		
		Event.Subscribe(function(e){
			console.log("net.pickUpWepon.\n");
			var actor = e.actor;
			var pickUPwep = e.pickUPwep;
			curScene.PickupWeapon(curUser, pickUPwep);
		}, "net.pickUpWepon");
		
		Event.Subscribe(function(e){
			console.log("effect.hideWepon.\n");
			var actor = e.actor;
			var pickUPwep = e.pickUPwep;
			//pickUPwep.pcarray['pcmesh'].PerformAction('SetVisible',['visible', false]);//将武器隐藏
		}, "effect.hideWepon");
		
		Event.Subscribe(function(e){
			console.log("net.hideWepon.\n");
			var actor = e.actor;
			var pickUPwep = e.pickUPwep;
			curScene.HideWepon(curUser, pickUPwep);
		}, "net.hideWepon");
		
		Event.Subscribe(function(e){
			var actor = e.actor;
			actor.pcarray['pcdefaultcamera'].SetCamera(actor.person);
		}, "effect.cameracontrol");
		
		//受伤
		Event.Subscribe(function(e){
			var actor = e.actor;
			//actor.pcarray['pcdefaultcamera'].SetCamera("thirdperson");   //拉远视角
			//actor.pcarray['pcdefaultcamera'].SetProperty("distance", 3);
			// console.log("[debug] [attacker] " + actor.name + " injure! .\n");
			
		}, "effect.injure");
		
		//治疗
		Event.Subscribe(function(e){
			var actor = e.actor;
			var target = e.target;
			// console.log("[debug] [personCure] " + actor.name + " Cure " + target.name + " injure! .\n");
			actor.pcarray['pcdefaultcamera'].SetCamera("thirdperson");   //拉远视角
			// actor.pcarray['pcdefaultcamera'].SetProperty("distance", 3);
			
		}, "effect.personCure");
		Event.Subscribe(function(e){
			var actor = e.actor;
			var target = e.target;
			// console.log("[debug] [personCure] " + actor.name + " Cure " + target.name + " injure! .\n");
			actor.pcarray['pcdefaultcamera'].SetCamera("firstperson");   //拉远视角
			// actor.pcarray['pcdefaultcamera'].SetProperty("distance", 3);
			
			
		}, "effect.personCureStop");
		
		//死亡
		Event.Subscribe(function(e){
			var actor = e.actor;
			// console.log("[debug] [died] " + actor.name + " died ! .\n");			
			
		}, "effect.diedView");
		//游戏人物动作调度器
		Event.Subscribe(function(e){
			var action_name = e.action_name ;
			//console.log("effect, loc : " + e.other_id + " .\n");
			var actor = otherEntityList[e.other_id] ;
			//可以改为
			var moveType = "effect." + action_name;
			Event.Send({
				name : moveType, 
				actor : actor
			});
			// switch(action_name){
				// case "forward.start" :
					// Event.Send({
						// name : "effect.forward.start", 
						// actor : actor 
					// });
					// break ; 
				// case "forward.stop" :
					// Event.Send({
						// name : "effect.forward.stop" ,
						// actor : actor 
					// });
					// break ;
				// case "backward.start" :
					// Event.Send({
						// name : "effect.backward.start", 
						// actor : actor 
					// });
					// break ; 
				// case "backward.stop" :
					// Event.Send({
						// name : "effect.backward.stop" ,
						// actor : actor 
					// });
					// break ;
				// case "rotateleft.start" :
					// Event.Send({
						// name : "effect.rotateleft.start", 
						// actor : actor 
					// });
					// break ; 
				// case "rotateleft.stop" :
					// Event.Send({
						// name : "effect.rotateleft.stop" ,
						// actor : actor 
					// });
					// break ;
				// case "rotateright.start" :
					// Event.Send({
						// name : "effect.rotateright.start", 
						// actor : actor 
					// });
					// break ; 
				// case "rotateright.stop" :
					// Event.Send({
						// name : "effect.rotateright.stop" ,
						// actor : actor 
					// });
					// break ;		
				// case "strafeleft.start" :
					// Event.Send({
						// name : "effect.strafeleft.start", 
						// actor : actor 
					// });
					// break ; 
				// case "strafeleft.stop" :
					// Event.Send({
						// name : "effect.strafeleft.stop" ,
						// actor : actor 
					// });
					// break ;
				// case "straferight.start" :
					// Event.Send({
						// name : "effect.straferight.start", 
						// actor : actor 
					// });
					// break ; 
				// case "straferight.stop" :
					// Event.Send({
						// name : "effect.straferight.stop" ,
						// actor : actor 
					// });
					// break ;	
				// case "jump.start" :
					// Event.Send({
						// name : "effect.jump.start" ,
						// actor : actor 
					// });
					// break ;	
				// case "jump.stop" :
					// Event.Send({
						// name : "effect.jump.stop" ,
						// actor : actor 
					// });
					// break ;	
				// case "squat" :
					// Event.Send({
						// name : "effect.squat" ,
						// actor : actor 
					// });
					// break ;	
				// case "stand" :
					// Event.Send({
						// name : "effect.stand" ,
						// actor : actor 
					// });
					// break ;
				// case "hurry1" :
					// Event.Send({
						// name : "effect.hurry1" ,
						// actor : actor 
					// });
					// break ;
				// //可以添加玩家的各种动作.	
				// default : 
					// break ; 
			// };
		},"scene_model.action_dispatches");
		
		
		Event.Subscribe(function(e){
			console.log("net.playerMove, e.type:" + e.type);
			var myDate = new Date;
			var curTime = myDate.getTime() + selfObj.diffTime;
			var curPos = [e.actor.pcarray['pcmesh'].position.x, 
						  e.actor.pcarray['pcmesh'].position.y, 
						  e.actor.pcarray['pcmesh'].position.z]; 
			console.log("self player curPos:" + curPos + "\n");
			//curScene.test();
			curScene.playMove(e.type, curUser, curTime, curPos);
		}, "net.playerMove");
		
		//鼠标移动控制
		Event.Subscribe(function(e){
			// console.log("net.playerMove, e.type:" + e.type);
			var myDate = new Date;
			var curTime = myDate.getTime() + selfObj.diffTime;
			var curRot = [e.actor.pcarray['pcmesh'].rotation.x, 
						  e.actor.pcarray['pcmesh'].rotation.y, 
						  e.actor.pcarray['pcmesh'].rotation.z]; 
			// console.log("self player curRot:" + curRot + "\n");
			//curScene.test();
			curScene.mouseMove(e.type, curUser, curTime, curRot, e.x, e.y);
		}, "net.mouseMove");
		
		
		/**
		 * 与其它客户端进行攻击效果同步
		 * param -- curUser ：self 攻击者
		 * param -- target ：被攻击者
		 * param -- curTime ：时间
		 */
		Event.Subscribe(function(e){
			var actor = e.actor;
			isAttacker = curUser;
			var targetPos = [e.targetPos.x, e.targetPos.y, e.targetPos.z];
			// console.log("target pos effect to ser : [" + targetPos[0] + "," + targetPos[1] + "," + targetPos[2] + "] \n");
			var myDate = new Date;
			var curTime = myDate.getTime() + selfObj.diffTime;
			curScene.playerAttack(curUser, curTime, targetPos);
			
		}, "net.playerAttack");	
		
		/**
		 * 取得攻击对象
		 */
		// Event.Subscribe(function(e){
			// var entity = e.entity;
			// var meshname = e.meshname;
			// var selfMesh = selfObj.selfPlayer.pcarray['pcmesh'].meshname;
			// if(selfMesh != meshname){
				// console.log("attack target's mesh name is " + meshname + " !\n");
				// curScene.playerAttackTarget(curUser, meshname);
			// }
		// }, "net.playerAttackTarget");

		/**
		 * 计算攻击
		 */
		Event.Subscribe(function(e){
			console.log("attack start !\n");
			var ent = e.entity;
			var targetMshName = e.meshname;
			var isAttacker = e.isAttacker;
			curScene.setInvoke("getPlayerInfoList");
			var playerInfoList = curScene.getPlayerInfoList();
			// console.log("effect playerInfoList : " + JSON.stringify(playerInfoList));
			var attackerInfo = {};
			for(var i in playerInfoList){
				if(playerInfoList[i].userName == isAttacker){
					attackerInfo = playerInfoList[i];
				}
			}
			// console.log("attackerLoc : " + attackerInfo.loc);
			
			if(ent != null && attackerInfo.loc){
				var attakEnt = selfObj.selfPlayer;
				if(isAttacker != curUser){
					attakEnt = otherEntityList[attackerInfo.loc];
				}
				// console.log("[target] hurt life is " + hurt + " !\n");
				// console.log("test mesh is " + ent.pcarray['pcmesh'].meshname);
				var targetMsh = ent.pcarray['pcmesh'].meshname;
				var attackMsh = attakEnt.pcarray['pcmesh'].meshname;
				if(targetMsh != attackMsh){	
					// var targetLoc = ent.loc;
					// console.log("target loc is " + targetLoc);
					// console.log("target mesh is " + targetMsh);
					// console.log("attack mesh is " + attackMsh);
					// console.log("target life is " + targetInfo.blood);
					// console.log("attack life is " + attackerInfo.blood);
					 
					if(isAttacker == curUser){
						var actor = e.actor;
						var curWeaponID = actor.curWeaponID;
						var hurt = weaponMap[curWeaponID].harm;
						console.log("weapon hurm : " + hurt);
						var myDate = new Date;
						var curTime = myDate.getTime() + selfObj.diffTime;
						var updateInfo = {};
						updateInfo.hurt = hurt;
						updateInfo.curTime = curTime;
						updateInfo.attacker = isAttacker;
						updateInfo.type = ent.type;
						if(ent.type == "player"){
							updateInfo.targetLoc = ent.loc;
						} else if(ent.type == "monster"){
							updateInfo.targetId = ent.id;
						}
						curScene.gunDamage(updateInfo);
					}
				}
			}	
			
		}, "effect.attackTarget");
		// // 选择爆炸或者手雷
		// Event.Subscribe(function(e){
			// console.log("effect.switchWeapon!\n");
			// var actor = e.actor;
			// var weaponID = e.weaponID;
			// // 选择手雷或者烟雾弹的逻辑（默认选择了第一个）
			// weaponID = weaponID[0];
			// Event.Send({
				// name : "effect.switchWeapon",
				// actor : actor,
				// weaponID : weaponID
			// });
			// Event.Send({
				// name : "net.switchWeapon",
				// type : "switchWeapon",
				// weaponID : weaponID
			// });
			
		// }, "effect.switchWeapon.switchBomb");	
		// 切换背包
		Event.Subscribe(function(e){
			console.log("effect.switchBackpack!\n");
			var actor = e.actor;
			var packType = e.packType;
			//console.log("backpack type : " + packType + " !\n");
			curScene.setInvoke("getWeaponInfoList");
			var backpackList = curScene.getWeaponInfoList(curUser);
			//console.log("backpackList : " + JSON.stringify(backpackList)+ " .\n");
			actor.weaponList.priWeapons_1 = backpackList[packType][0];
			actor.weaponList.priWeapons_2 = backpackList[packType][1];
			actor.weaponList.secWeapans = backpackList[packType][2];
			actor.weaponList.throwingWeapon = backpackList[packType][3];
			var idx = 0;
			for(var i in gunEntList){
				if(gunEntList[i].ownerBy == actor.loc){
					if(typeof(backpackList[packType][idx]) != "undefined"){
						gunEntList[i].curWeaponID = backpackList[packType][idx];
						console.log("gunEntList[i].curWeaponID : " + gunEntList[i].curWeaponID);
						console.log("backpackList[packType][" + idx + "] : " + backpackList[packType][idx]);
					} else {
						break;
					}
					idx++;
				}
			}	
		}, "effect.switchBackpack");	
		//向server发送切换背包的命令
		Event.Subscribe(function(e){
			var actor = e.actor;
			var packType = e.packType;
			// 向server发送切换背包的消息
			curScene.switchPack(curUser, packType);
		}, "net.switchBackpack");	
		// 切换武器
		Event.Subscribe(function(e){
			console.log("effect.switchWeapon!\n");
			var actor = e.actor;
			var weaponID = e.weaponID;
			// 武器对应json对象
			var weaponObj = weaponMap[weaponID];
			//var weaponSpeedmove = weaponObj.speedmove;
			console.log("weaponObj :" + JSON.stringify(weaponObj));
			//console.log("weaponSpeedmove :" + weaponSpeedmove);
			if(typeof(weaponSpeedmove) != "undefined"){
				actor.movement = 5 * (weaponObj.speedmove / 100);
				var speed_movement = actor.movement;
				var speed_runing = actor.runing;
				var speed_rotation = actor.rotation;
				var speed_jumping = actor.jumping;
				//拿武器的运行速度
				actor.pcarray['pcactormove'].SetSpeed(actor.movement, speed_runing, speed_rotation, speed_jumping);
			} else{
				//console.log("!!!!!!!!!!!!!!!!!!!");
				actor.movement = 5 ;
				actor.pcarray['pcactormove'].SetSpeed(actor.movement);
			}
			// 切换武器动画
			
		}, "effect.switchWeapon");	
		//向server发送切换武器的命令
		Event.Subscribe(function(e){
			var actor = e.actor;
			var weaponID = e.weaponID;
			curScene.switchWeapon(curUser, weaponID);
			// 向server发送切换武器的消息
		}, "net.switchWeapon");	
		
		/**
		 * 弹孔效果
		 */
		Event.Subscribe(function(e){
			var meshname = e.meshname;
			var ent = e.entity;
			var pos = e.pos;
			if(ent == null){
				var iDecalManager = C3D.decalmgr;
				var meshWrapper = engine.FindMeshObject(meshname);
				
				var mshObj = meshWrapper.meshObject;
				var mshMovable = meshWrapper.movable;
				
				var matWrap = mshObj.matWrap;	
				console.log("matWrap : " + matWrap);
				var texturemanager = g3d.texturemanager;
				console.log("texturemanager : " + texturemanager);
				var color = ('0','0','0');
				var itextWrapper = engine.CreateTexture('kd.jpg', '../art/textures/bulletHoles.jpg', color, 'CS_TEXTURE_2D');
				console.log("itexturewrapper : " + itextWrapper);
				
				itextWrapper.Register(texturemanager);
				
				var materialWrapper = engine.CreateMaterial('material1', itextWrapper);
				console.log("materialWrapper : " + materialWrapper);
				
				var iDecalTemplate = iDecalManager.CreateDecalTemplate(materialWrapper);//matWrap material
				iDecalTemplate.livetime = 60.0;
				console.log("iDecalTemplate.livetime : " + iDecalTemplate.livetime);
				// var pos = mshMovable.pos;
				console.log("pos : [" + pos.x + ", " + pos.y + ", " + pos.z + "]");
				pos = new Math3.Vector3(pos.x, pos.y, pos.z);
				var v1 = new Math3.Vector3(0, 0, 2);
				var v2 = new Math3.Vector3(0, 2, 0);
				var iDecal = iDecalManager.CreateDecal(iDecalTemplate, meshWrapper, pos, v1, v2, .125, .125);
			}
			
		}, "effect.bulletHoles");
		
		/**
		 * 抛出手雷
		 */
		Event.Subscribe(function(e){
			var targetPos = e.targetPos;
			console.log("forward pos 1 : [" + targetPos[0] + " ," + targetPos[1] + " ," + targetPos[2] + "]");
			curScene.getOutGrenade(curUser, targetPos);
			
		}, "net.grenade");
		
		Event.Subscribe(function(e){
			var boMsh = e.boMsh;
			var damage = e.damage;
			var type = e.type;
			var bombPlayer = e.bombPlayer;
			console.log("bomb damage is 11 : " + JSON.stringify(damage));
			// var userLoc = {};
			// for(var i in otherEntityList){
				// var meshN = otherEntityList[i].pcarray['pcmesh'].meshname;
				// userLoc[i] = {};
				// for(var j in damage){
					// if(meshN == damage[j].meshname){
						// userLoc[i].loc = i;
						// userLoc[i].hurt = damage[j].hurt;
					// }
				// }
			// }
			var myDate = new Date;
			var curTime = myDate.getTime() + selfObj.diffTime;
			curScene.bombDamage(curUser, damage, curTime);
			
		},"net.bombDamage");
		Event.Subscribe(function(e){
			var actor = e.actor;
			var curWeaponID = e.curWeaponID;
			if(actor.bullet > 0){
				console.log("bullet : " + actor.bullet);
				// console.log("bultNum : " + bultNum);
				Event.Send({
					name : "ui.frontSight",
					state : true
				});
				Event.Send({
					name : "effect.attShock.start",
					actor : actor,
					accuracy : actor.accuracy
				});
				var pos = actor.pcarray['pcmesh'].GetProperty('position');
				
				// 创建子弹
				// var bullet = Entities.CreateEntity(BULLET);
				// console.log("create success !");
				var pos = actor.pcarray['pcmesh'].GetProperty('position');
				bult[bultNum - actor.bullet].pcarray['pcmesh'].MoveMesh([pos.x, -5, pos.z]);
				bult[bultNum - actor.bullet].pcarray['pcmesh'].PerformAction('SetVisible',['visible', false]);
				bult[bultNum - actor.bullet].curWeaponID = curWeaponID;
				//获得当前摄像机
				var pccam = actor.pcarray['pcdefaultcamera'].QueryInterface("iPcDefaultCamera");
				var iPcCamera = pccam.QueryInterface('iPcCamera');
				var cameraObj = iPcCamera.GetCamera();
				var g2d = C3D.g2d;
				// console.log("selfObj.selfPlayer.mouse : [x : " + this.mousex + ", y : " + this.mousey + "]\n");
				var v3d = cameraObj.InvPerspective([actor.mousex, g2d.height - actor.mousey], 1000);
				var startBeam = cameraObj.GetTransform().GetOrigin();
				var endBeam = cameraObj.GetTransform().This2Other(v3d);
				var targetPos = cameraObj.GetTransform().GetFront();
				console.log("camera forward pos : [" + targetPos.x + " ," + targetPos.y + " ," + targetPos.z + "]");
				var noTarget = false;
				// var sector = engine.sectors.FindByName('Scene');
				// var target = engine.GetNearbyMeshes(sector, startBeam, endBeam, true);
				var hitMeshObj = engine.FindScreenTarget([actor.mousex, actor.mousey], 500, cameraObj);
				if(hitMeshObj.mesh){
					var meshObj = hitMeshObj.mesh;
					targetPos = meshObj.HitBeam(startBeam, endBeam, true).isect;
					noTarget = true;
					// console.log("HitBeam pos : [" + targetPos.x + "," + targetPos.y + "," + targetPos.z + "] \n");
					// console.log("attacker target mesh name is " + meshObj.object.name + " \n");
					// console.log("typeof targetPos : " + typeof(targetPos));
					
				}
				if(typeof(targetPos) != "undefined"){
					
					// 射出子弹效果
					Event.Send({
						name : "effect.handgun.start",
						actor : actor,
						targetPos : targetPos, 
						bullet : bult[bultNum - actor.bullet],
						noTarget : noTarget
					});
					
					// 通知目标被攻击
					Event.Send({
						name : "net.playerAttack",
						actor : actor,
						targetPos : targetPos
					});
					
					// 在UI上显示子弹数量
					actor.bullet = actor.bullet - 1;
					Event.Send({
						name : "ui.blutCount",
						actor : actor
					});
					
				}
				
			}
		},"effect.gunTypeWeapon");
		
		// 濒死状态设置
		Event.Subscribe(function(e){
			var actor = e.actor;
			var speed_movement = actor.movement * (1 - 0.3);
			var speed_runing = actor.runing;
			var speed_rotation = actor.rotation;
			var speed_jumping = actor.jumping;
			//将移动速度少30%
			actor.pcarray['pcactormove'].SetSpeed(speed_movement, speed_runing, speed_rotation, speed_jumping);
			actor.pcarray['pctimer'].WakeUp(30000, true, 'playerMoribund');
		}, "effect.playerMoribund");
		// 死亡
		Event.Subscribe(function(e){
			var actor = e.actor;
			// 设置人物躺下
			
		}, "effect.playerDeath");
		
		Event.Subscribe(function(e){
			var actor = e.actor;
			curScene.playerDeath(curUser);
			
		}, "net.playerDeath");
		
		// 显示战斗统计表
		Event.Subscribe(function(e){
			Event.Send({
				name : "ui.showRecord"
			});
			
		}, "net.fightingTable");
		
		// 隐藏战斗统计表
		Event.Subscribe(function(e){
			Event.Send({
				name : "ui.visibleRecord"
			});
			
		}, "effect.figtTabIsVis");
		
		
		// 响应键盘事件
		Event.Subscribe(function(e){
			if(!selfObj.isControlPlayer){
				var keyBoard = e.keyCodeRaw;
				if(keyBoard == 1081360){
					console.log("F1 ! \n");
					if(typeof(selfObj.selfPlayer) != "undefined"){
						Event.Send({
							name : "effect.switchBackpack",
							actor : selfObj.selfPlayer,
							packType : 1
						});
						Event.Send({
							name : "net.switchBackpack",
							type : "switchBackpack",
							packType : 1
						});
					}
				} else if (keyBoard == 1081361){
					console.log("F2 ! \n");
					if(typeof(selfObj.selfPlayer) != "undefined"){
						Event.Send({
							name : "effect.switchBackpack",
							actor : selfObj.selfPlayer,
							packType : 2
						});
						Event.Send({
							name : "net.switchBackpack",
							type : "switchBackpack",
							packType : 2
						});
					}
				}
			}
			
		}, "crystalspace.input.keyboard.down");
		
	})();

} catch(e){
	alert(e);
}