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

	// 动作最难看的女人。
	MONSTER = {
		name : "monster",
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name', 'nv']
						]
					},
					{
						name : "SetAnimation",
						param : [
							['animation', 'stand'],
							['cycle', true]
						]
					}
				]
			},
			"pclinearmovement" : {
				action : [
					{
						name : "InitCD",
						param : [
							['offset', [0, 0.0, 0]],
							['body', [0.5,0.5,0.5]],
							['legs', [0.5,0.9,0.5]]
						]
					}
				]
			},
			"pctimer" : {
				
			},
			"pcmover" : {
				
			},
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							['movement', 4],
							['running', 2],
							['rotation', 2],
							['jumping', 3]
						]
					}
				]
			},
			"pccommandinput" : {
				action : [
					{
						name : "Bind",
						param : [
							['trigger','up'],
							['command','forward']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','down'],
							['command','backward']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','left'],
							['command','rotateleft']
						]
					},
					{
						name : "Bind",
						param : [
							['trigger','right'],
							['command','rotateright']
						]
					}
				]
			}
		},
		
		event : {
			
		},
		property : {
			type : "player",
			life : 100, // 当前生命值
			max_hp : 100, // 最大生命值（和当前生命值一起，用来提供给UI，显示血条。）
			cur_mp : 0, // 当前魔法值 （显示在血条下方）
			max_mp : 10, // 最大魔法值
			result : "life", // 用来判断这个player是死(died)是活(life)还是伤害(injure) 。
			state : "stand",   //当前 player 状态，默认是站立，还有其它状态，比如：卧倒：down,蹲下：squat,等……
			weaponstate : "gun",// 当前 player 使用的武器， gun 是枪，kinfe 是刀，grenade 是手雷，还有其它，到时再添加。切换武器时，改变。
			attackstate : "finish",//当前player是否进入攻击状态，start是进入攻击状态，finish是非攻击状态
			weaponstated : "kinfe",   //player 前一次使用武器
			isVisible: false, //当前player是否隐身，true为隐身，false为非隐身
			party : "warband_B",//十人分组，A为A组，B为B组，空则不在游戏状态
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
						intact:100, 	//完好度
					}
				}
			],
			shieldscurrent:[//当前护盾属性值
				{
					defense : {		//防御力
						physics:50,	//物理防御力
						energy:250,	//能量防御力
					},
					intact:100,	//完好度
				}
			],
			equip:EQUIPDATA["ADA2"].name,	//外骨骼机甲系列
			shields:SHIELDSDATA["NJE"].name,	//护盾
			under_attack : function (e){
				var attacker = e.self;
				this.AIObject.onEvent("under_attack", /*攻击者*/attacker, /*被攻击者*/this);
			},
			monster_die:function(e){
				Event.Send({
					name : "effect.diedView",
					self : this
				});
			}
		},
		// 接受全局事件。
		subscribe : {
			"AI.monster.attack" : "under_attack",
			"AI.monster.die" : "monster_die"
		}
	};
	AI_MONSTER = {
		event : {
			"to_attack" : function(attacker, target) {
				
			},
			"under_attack" : function(attacker, target) {
				if(target.result == "life"){
					if(attacker.result != "injure"){
						CONSOLE.Write("[debug] [gunaim] meshattacker=" + attacker.name + " .\n");
						CONSOLE.Write("[debug] [gunaim] meshtarget=" + target.name + " .\n");
						CONSOLE.Write("[debug] [gunaim] meshlife=" + target.life + " .\n");
						CONSOLE.Write("[debug] [gunaim] meshequip=" + target.equip + " .\n");
						/*target.life = target.life + target.Mecha.defence - attacker.weaponcurrent[0].damapower.physics - attacker.weaponcurrent[0].damapower.power;
						target.equipcurrent[0].bodyarmour.intact = target.equipcurrent[0].bodyarmour.intact  + target.shieldscurrent[0].defense.physics + target.shieldscurrent[0].defense.energy - attacker.weaponcurrent[0].damapower.physics - attacker.weaponcurrent[0].damapower.power;
						target.shieldscurrent[0].intact = target.shieldscurrent[0].intact - attacker.weaponcurrent[0].damapower.physics - attacker.weaponcurrent[0].damapower.power;*/
						var resphydam=attacker.weaponcurrent[0].damapower.physics-target.equipcurrent[0].bodyarmour.defense.physics;//一次残余物理伤害值
						if(resphydam>0){
							resphydam-=target.shieldscurrent[0].defense.physics;//二次残余物理伤害值
							if(resphydam>0){
								target.life-=resphydam;//一次残余人物生命值
							}
						}
						var resenedam=attacker.weaponcurrent[0].damapower.energy-target.shieldscurrent[0].defense.energy;//一次残余能量伤害值
						if(resenedam>0){
							resenedam-=target.equipcurrent[0].bodyarmour.defense.energy;//二次残余能量伤害值
							if(resenedam>0){
								target.life-=resenedam;//二次残余人物生命值
							}
						}
						CONSOLE.Write("[debug] [gunaim] meshlife=" + target.life + " .\n");
						//CONSOLE.Write("[debug] [gunaim] meshintact=" + target.equipcurrent[0].bodyarmour.intact + " .\n");
						//CONSOLE.Write("[debug] [gunaim] meshintact=" + target.shieldscurrent[0].intact + " .\n");
						//target.life -= attacker.weaponcurrent[0].damapower.physics;
					} else if(attacker.result == "injure"){
						CONSOLE.Write("[debug] [player injure] player injure attack * 50% ! .\n");
					}
				} else if(target.result == "died") {
					CONSOLE.Write("[debug] [died1] target died .\n");
				}
				if(target.life <= 20){
					this.result = "injure";
					Event.Send({
						name : 'effect.injure',
						self : target
					});
					Event.Send({
						name : 'UI.xxx.yyy',
						self : target
					});
					CONSOLE.Write("[debug] [attacker] " + target.name + " .\n");
				}
				if(target.life <= 0){
					target.result = "died";
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
				//假设人被一枪打死了（测试用）
				Event.Send({
					name : 'effect.diedView',
					self : target
				});
			}
		}
	};
}
catch (e)
{
	alert(e);
}