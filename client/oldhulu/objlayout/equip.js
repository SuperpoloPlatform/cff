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
	//外骨骼机甲类equip	
	EQUIPDATA={
	/************************************************************************/
    /*  EQUIPDATA start	                                                    
    *
	*	id : {
	*		name:"";	//装备名称
	*		helmet:{	//头盔
	*			defense :{		//防御力
	*				physics:0,	//物理防御力
	*				energy:0,	//能量防御力
	*				repair:0,	//自我修复时间（秒）
	*				energyCon:0,	//能耗（秒）
	*			},
	*			cloaking:{			//隐身
	*				activetime:0,	//有效时间(秒)
	*				recoverytime:0,	//恢复时间（秒）
	*				energyCon:0,	//能耗（秒）
	*			},
	*			lifedetection:{		//生命探测模式
	*				activetime:0,	//有效时间(秒)
	*				recoverytime:0,	//恢复时间（秒）
	*			},
	*			energy:0,	//能量
	*			weight:0,	//重量
	*			image : "", //装备图片
	*			info : "" ,  //装备显示信息
	*		},
	*		bodyarmour:{	//身甲
	*			defense :{		//防御力
	*				physics:0,	//物理防御力
	*				energy:0,	//能量防御力
	*				repair:0,	//自我修复时间（秒）
	*				energyCon:0,	//能耗（秒）
	*			},
	*			cloaking:{			//隐身
	*				activetime:0,	//有效时间(秒)
	*				recoverytime:0,	//恢复时间（秒）
	*				energyCon:0,	//能耗（秒）
	*			},
	*			lifedetection:{		//生命探测模式
	*				activetime:0,	//有效时间(秒)
	*				recoverytime:0,	//恢复时间（秒）
	*			},
	*			extremejump:{		//极限跳跃
	*				distance:0,		//距离（米）
	*				energyCon:0,	//能耗（每次）
	*			},
	*			dexterity:0,//灵活度
	*			strength:0,	//力量
	*			energy:0,	//能量
	*			weight:0,	//重量
	*			image : "", //装备图片
	*			info : "" ,  //装备显示信息
	*		}
	*	}
    ************************************************************************/
		"ADA1" : {
			name:"ADA1",	//装备名称
			helmet:{	//头盔
				defense :{		//防御力
					physics:100,	//物理防御力
					energy:20,	//能量防御力
					repair:60,	//自我修复时间（秒）
					energyCon:1,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:10,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:15,	//有效时间(秒)
					recoverytime:30,	//恢复时间（秒）
				},
				energy:1000,	//能量
				weight:100,		//重量				
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			},
			bodyarmour:{	//身甲
				defense :{		//防御力
					physics:200,	//物理防御力
					energy:40,	//能量防御力
					repair:60,	//自我修复时间（秒）
					energyCon:2,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:10,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:15,	//有效时间(秒)
					recoverytime:30,	//恢复时间（秒）
				},
				extremejump:{		//极限跳跃
					distance:9,		//距离（米）
					energyCon:3,	//能耗（每次）
				},
				dexterity:90,	//灵活度
				strength:100,	//力量
				energy:1000,	//能量
				weight:100,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			}
		},
		"ADA2" : {
			name:"ADA2",	//装备名称
			helmet:{	//头盔
				defense :{		//防御力
					physics:120,	//物理防御力
					energy:24,	//能量防御力
					repair:57,	//自我修复时间（秒）
					energyCon:1,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:12,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:18,	//有效时间(秒)
					recoverytime:25,	//恢复时间（秒）
				},
				energy:1050,	//能量
				weight:105,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			},
			bodyarmour:{	//身甲
				defense :{		//防御力
					physics:240,	//物理防御力
					energy:48,	//能量防御力
					repair:57,	//自我修复时间（秒）
					energyCon:2,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:12,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:18,	//有效时间(秒)
					recoverytime:25,	//恢复时间（秒）
				},
				extremejump:{		//极限跳跃
					distance:10,	//距离（米）
					energyCon:3.1,	//能耗（每次）
				},
				dexterity:95,	//灵活度
				strength:110,	//力量
				energy:1050,	//能量
				weight:105,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			}
		},
		"ADA3" : {
			name:"ADA3",	//装备名称
			helmet:{	//头盔
				defense :{		//防御力
					physics:140,	//物理防御力
					energy:28,	//能量防御力
					repair:54,	//自我修复时间（秒）
					energyCon:1,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:14,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:22,	//有效时间(秒)
					recoverytime:20,	//恢复时间（秒）
				},
				energy:1100,	//能量
				weight:110,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			},
			bodyarmour:{	//身甲
				defense :{		//防御力
					physics:280,	//物理防御力
					energy:56,	//能量防御力
					repair:54,	//自我修复时间（秒）
					energyCon:2,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:14,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:22,	//有效时间(秒)
					recoverytime:20,	//恢复时间（秒）
				},
				extremejump:{		//极限跳跃
					distance:11,		//距离（米）
					energyCon:3.2,	//能耗（每次）
				},
				dexterity:100,	//灵活度
				strength:120,	//力量
				energy:1100,	//能量
				weight:110,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			}
		},
		"EVE1" : {
			name:"EVE1",	//装备名称
			helmet:{	//头盔
				defense :{		//防御力
					physics:100,	//物理防御力
					energy:20,	//能量防御力
					repair:60,	//自我修复时间（秒）
					energyCon:1,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:10,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:15,	//有效时间(秒)
					recoverytime:30,	//恢复时间（秒）
				},
				energy:1000,	//能量
				weight:100,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			},
			bodyarmour:{	//身甲
				defense :{		//防御力
					physics:200,	//物理防御力
					energy:40,	//能量防御力
					repair:60,	//自我修复时间（秒）
					energyCon:2,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:10,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:15,	//有效时间(秒)
					recoverytime:30,	//恢复时间（秒）
				},
				extremejump:{		//极限跳跃
					distance:9,		//距离（米）
					energyCon:3,	//能耗（每次）
				},
				dexterity:100,	//灵活度
				strength:90,	//力量
				energy:1000,	//能量
				weight:100,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			}
		},
		"EVE2" : {
			name:"EVE2",	//装备名称
			helmet:{	//头盔
				defense :{		//防御力
					physics:120,	//物理防御力
					energy:24,	//能量防御力
					repair:57,	//自我修复时间（秒）
					energyCon:1,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:12,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:18,	//有效时间(秒)
					recoverytime:25,	//恢复时间（秒）
				},
				energy:1050,	//能量
				weight:105,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			},
			bodyarmour:{	//身甲
				defense :{		//防御力
					physics:240,	//物理防御力
					energy:48,	//能量防御力
					repair:57,	//自我修复时间（秒）
					energyCon:2,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:12,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:18,	//有效时间(秒)
					recoverytime:25,	//恢复时间（秒）
				},
				extremejump:{		//极限跳跃
					distance:10,		//距离（米）
					energyCon:3.1,	//能耗（每次）
				},
				dexterity:105,	//灵活度
				strength:100,	//力量
				energy:1050,	//能量
				weight:105,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			}
		},
		"EVE3" : {
			name:"EVE3",	//装备名称
			helmet:{	//头盔
				defense :{		//防御力
					physics:140,	//物理防御力
					energy:28,	//能量防御力
					repair:54,	//自我修复时间（秒）
					energyCon:1,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:14,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:22,	//有效时间(秒)
					recoverytime:20,	//恢复时间（秒）
				},
				energy:1100,	//能量
				weight:110,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			},
			bodyarmour:{	//身甲
				defense :{		//防御力
					physics:280,	//物理防御力
					energy:56,	//能量防御力
					repair:54,	//自我修复时间（秒）
					energyCon:2,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:14,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:22,	//有效时间(秒)
					recoverytime:20,	//恢复时间（秒）
				},
				extremejump:{		//极限跳跃
					distance:11,		//距离（米）
					energyCon:3.2,	//能耗（每次）
				},
				dexterity:110,	//灵活度
				strength:110,	//力量
				energy:1100,	//能量
				weight:110,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			}
		},
		"SAM" : {
			name:"SAM",	//装备名称
			helmet:{	//头盔
				defense :{		//防御力
					physics:150,	//物理防御力
					energy:28,	//能量防御力
					repair:54,	//自我修复时间（秒）
					energyCon:1,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:14,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:22,	//有效时间(秒)
					recoverytime:20,	//恢复时间（秒）
				},
				energy:1400,	//能量
				weight:120,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			},
			bodyarmour:{	//身甲
				defense :{		//防御力
					physics:300,	//物理防御力
					energy:56,	//能量防御力
					repair:54,	//自我修复时间（秒）
					energyCon:2,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:14,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:22,	//有效时间(秒)
					recoverytime:20,	//恢复时间（秒）
				},
				extremejump:{		//极限跳跃
					distance:11,		//距离（米）
					energyCon:3.4,	//能耗（每次）
				},
				dexterity:100,	//灵活度
				strength:150,	//力量
				energy:1400,	//能量
				weight:120,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			}
		},
		"RAC" : {
			name:"RAC",	//装备名称
			helmet:{	//头盔
				defense :{		//防御力
					physics:160,	//物理防御力
					energy:30,	//能量防御力
					repair:30,	//自我修复时间（秒）
					energyCon:1.5,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:14,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:22,	//有效时间(秒)
					recoverytime:20,	//恢复时间（秒）
				},
				energy:1100,	//能量
				weight:110,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			},
			bodyarmour:{	//身甲
				defense :{		//防御力
					physics:320,	//物理防御力
					energy:60,	//能量防御力
					repair:30,	//自我修复时间（秒）
					energyCon:3,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:14,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:22,	//有效时间(秒)
					recoverytime:20,	//恢复时间（秒）
				},
				extremejump:{		//极限跳跃
					distance:11,		//距离（米）
					energyCon:3.2,	//能耗（每次）
				},
				dexterity:110,	//灵活度
				strength:110,	//力量
				energy:1100,	//能量
				weight:110,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			}
		},
		"REB" : {
			name:"REB",	//装备名称
			helmet:{	//头盔
				defense :{		//防御力
					physics:140,	//物理防御力
					energy:28,	//能量防御力
					repair:54,	//自我修复时间（秒）
					energyCon:1,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:14,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:22,	//有效时间(秒)
					recoverytime:20,	//恢复时间（秒）
				},
				energy:1100,	//能量
				weight:110,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			},
			bodyarmour:{	//身甲
				defense :{		//防御力
					physics:280,	//物理防御力
					energy:56,	//能量防御力
					repair:54,	//自我修复时间（秒）
					energyCon:2,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:14,	//有效时间(秒)
					recoverytime:60,	//恢复时间（秒）
					energyCon:10,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:22,	//有效时间(秒)
					recoverytime:20,	//恢复时间（秒）
				},
				extremejump:{		//极限跳跃
					distance:14,		//距离（米）
					energyCon:3.3,	//能耗（每次）
				},
				dexterity:120,	//灵活度
				strength:110,	//力量
				energy:1100,	//能量
				weight:110,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			}
		},
		"MOS" : {
			name:"MOS",	//装备名称
			helmet:{	//头盔
				defense :{		//防御力
					physics:140,	//物理防御力
					energy:28,	//能量防御力
					repair:54,	//自我修复时间（秒）
					energyCon:1,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:28,	//有效时间(秒)
					recoverytime:30,	//恢复时间（秒）
					energyCon:20,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:22,	//有效时间(秒)
					recoverytime:20,	//恢复时间（秒）
				},
				energy:1100,	//能量
				weight:110,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			},
			bodyarmour:{	//身甲
				defense :{		//防御力
					physics:280,	//物理防御力
					energy:56,	//能量防御力
					repair:54,	//自我修复时间（秒）
					energyCon:2,	//能耗（秒）
				},
				cloaking:{			//隐身
					activetime:28,	//有效时间(秒)
					recoverytime:30,	//恢复时间（秒）
					energyCon:20,	//能耗（秒）
				},
				lifedetection:{		//生命探测模式
					activetime:22,	//有效时间(秒)
					recoverytime:20,	//恢复时间（秒）
				},
				extremejump:{		//极限跳跃
					distance:11,		//距离（米）
					energyCon:3.2,	//能耗（每次）
				},
				dexterity:110,	//灵活度
				strength:110,	//力量
				energy:1100,	//能量
				weight:110,		//重量
				intact:100, 	//完好度
				image : "", 	//装备图片
				info : "" ,  	//装备显示信息
			}
		},
	};
	
	//护盾类shields
	SHIELDSDATA={
	/************************************************************************/
    /*   SHIELDSDATA start	                                                    
    *   	                                                     
    *  id : {
    *       name : "",		//护盾名称
    *       defense : {		//防御力
	*			physics:0,	//物理防御力
	*			energy:0,	//能量防御力
	*			repair:0,	//归零后恢复时间（秒）
	*			energyCon:0,//能耗（秒）
    *		},
	*		weight:0,			//重量
	*		image : "",        //护盾图片
	*		info : ""          //护盾显示信息
	*	}
    ************************************************************************/
		"CAN" : {
			name : "CAN",	//护盾名称
			defense : {		//防御力
				physics:30,	//物理防御力
				energy:150,	//能量防御力
				repair:60,	//归零后恢复时间（秒）
				energyCon:1,//能耗（秒）
    		},
			weight:2,			//重量
			intact:100, 		//完好度
			image : "",        //护盾图片
			info : ""          //护盾显示信息
		},
		"ZION" : {
			name : "ZION",	//护盾名称
			defense : {		//防御力
				physics:40,	//物理防御力
				energy:200,	//能量防御力
				repair:55,	//归零后恢复时间（秒）
				energyCon:1,//能耗（秒）
    		},
			weight:2.4,			//重量
			intact:100, 		//完好度
			image : "",        //护盾图片
			info : ""          //护盾显示信息
		},
		"JER" : {
			name : "JER",	//护盾名称
			defense : {		//防御力
				physics:50,	//物理防御力
				energy:250,	//能量防御力
				repair:50,	//归零后恢复时间（秒）
				energyCon:1,//能耗（秒）
    		},
			weight:2.8,			//重量
			intact:100, 		//完好度
			image : "",        //护盾图片
			info : ""          //护盾显示信息
		},
		"NJE" : {
			name : "NJE",	//护盾名称
			defense : {		//防御力
				physics:60,	//物理防御力
				energy:300,	//能量防御力
				repair:45,	//归零后恢复时间（秒）
				energyCon:1,//能耗（秒）
    		},
			weight:3.2,			//重量
			intact:100, 		//完好度
			image : "",        //护盾图片
			info : ""          //护盾显示信息
		},
	};
}catch(e)
{
	alert(e);
}