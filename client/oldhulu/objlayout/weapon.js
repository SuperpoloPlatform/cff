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

    /************************************************************************/
    /*   WEAPONDATA start	                                                    
    *   	                                                     
    *  id : {
	*		weaponmodel : "半自动",
    *       name : "MEWC HC2",
    *       type : "gun",
    *       attribute : {		//武器属性
	*			firingrate : ,  //射速
	*			muzzle : ,   //出膛速度
	*			range : ,    //射程
	*			weight : ,   //重量
	*			precision : ,   //精度
	*			recoil : ,   //后坐力
	*			damapower : {   //破坏力
	*				physics : ,   //物理伤害
	*				power : ,    //能量伤害
	*			},
	*			powersingle : ,   //单发耗能
    *           stamina : 100,		//耐久度
    *           damage : 30,		//攻击力
	*			bullet : 30,		//装弹数量
	*			ammos : 90,		//弹药总数
    *      },
	*	   image : "",        //武器图片
	*	   info : ""          //武器显示信息
	*	}
    ************************************************************************/

    WEAPONDATA = {
        "MEWC HC2" : {
			weaponmodel : "半自动",
            name : "MEWC HC2",
            type : "handgun",
            attribute : {		//武器属性
				firingrate : 230,  //射速
				muzzle : 400,   //出膛速度
				range : 60,    //射程
				weight : 1.5,   //重量
				precision : 75,   //精度
				recoil : 12,   //后坐力
				damapower : {   //破坏力
					physics : 4,   //物理伤害
					power : 7,    //能量伤害
				},
				powersingle : 3,   //单发耗能
                stamina : 100,		//耐久度
                damage : 30,		//攻击力
				bullet : 30,		//装弹数量
				ammos : 90,		//弹药总数
           },
		   image : "",        //武器图片
		   info : ""          //武器显示信息
        },
		"MEWC HS5" : {
			weaponmodel : "半自动",
            name : "MEWC HS5",
            type : "handgun",
            attribute : {		//武器属性
				firingrate : 220,  //射速
				muzzle : 410,   //出膛速度
				range : 50,    //射程
				weight : 1.2,   //重量
				precision : 73,   //精度
				recoil : 12,   //后坐力
				damapower : {   //破坏力
					physics : 3,   //物理伤害
					power : 8,    //能量伤害
				},
				powersingle : 3,   //单发耗能
                stamina : 100,		//耐久度
                damage : 30,		//攻击力
				bullet : 30,		//装弹数量
				ammos : 90,		//弹药总数
           },
		   image : "",        //武器图片
		   info : ""          //武器显示信息
        },
		"MEWC Z44" : {
			weaponmodel : "半自动",
            name : "MEWC Z44",
            type : "handgun",
            attribute : {		//武器属性
				firingrate : 210,  //射速
				muzzle : 380,   //出膛速度
				range : 50,    //射程
				weight : 1.3,   //重量
				precision : 70,   //精度
				recoil : 13,   //后坐力
				damapower : {   //破坏力
					physics : 3,   //物理伤害
					power : 9,    //能量伤害
				},
				powersingle : 4,   //单发耗能
                stamina : 100,		//耐久度
                damage : 30,		//攻击力
				bullet : 30,		//装弹数量
				ammos : 90,		//弹药总数
           },
		   image : "",        //武器图片
		   info : ""          //武器显示信息
        },
		"SIC B5" : {
			weaponmodel : "半自动",
            name : "SIC B5",
            type : "handgun",
            attribute : {		//武器属性
				firingrate : 240,  //射速
				muzzle : 290,   //出膛速度
				range : 50,    //射程
				weight : 1,   //重量
				precision : 72,   //精度
				recoil : 10,   //后坐力
				damapower : {   //破坏力
					physics : 2,   //物理伤害
					power : 8,    //能量伤害
				},
				powersingle : 2,   //单发耗能
                stamina : 100,		//耐久度
                damage : 30,		//攻击力
				bullet : 30,		//装弹数量
				ammos : 90,		//弹药总数
           },
		   image : "",        //武器图片
		   info : ""          //武器显示信息
        },
		"SIC B16" : {
			weaponmodel : "半自动",
            name : "SIC B16",
            type : "handgun",
            attribute : {		//武器属性
				firingrate : 260,  //射速
				muzzle : 360,   //出膛速度
				range : 50,    //射程
				weight : 1.3,   //重量
				precision : 74,   //精度
				recoil : 10,   //后坐力
				damapower : {   //破坏力
					physics : 1,   //物理伤害
					power : 9,    //能量伤害
				},
				powersingle : 2,   //单发耗能
                stamina : 100,		//耐久度
                damage : 30,		//攻击力
				bullet : 30,		//装弹数量
				ammos : 90,		//弹药总数
           },
		   image : "",        //武器图片
		   info : ""          //武器显示信息
        },
		"MEWC EAR-15" : {
			weaponmodel : "全自动",
            name : "MEWC EAR-15",
            type : "gun",
            attribute : {		//武器属性
				firingrate : 650,  //射速
				muzzle : 1020,   //出膛速度
				range : 650,    //射程
				weight : 3.8,   //重量
				precision : 74,   //精度
				recoil : 32,   //后坐力
				damapower : {   //破坏力
					physics : 19,   //物理伤害
					power : 35,    //能量伤害
				},
				powersingle : 9,   //单发耗能
                stamina : 100,		//耐久度
                damage : 30,		//攻击力
				bullet : 30,		//装弹数量
				ammos : 90,		//弹药总数
           },
		   image : "",        //武器图片
		   info : ""          //武器显示信息
        },
		"MEWC EAR-17" : {
			weaponmodel : "全自动",
            name : "MEWC EAR-17",
            type : "gun",
            attribute : {		//武器属性
				firingrate : 600,  //射速
				muzzle : 1040,   //出膛速度
				range : 650,    //射程
				weight : 3.6,   //重量
				precision : 76,   //精度
				recoil : 31,   //后坐力
				damapower : {   //破坏力
					physics : 20,   //物理伤害
					power : 37,    //能量伤害
				},
				powersingle : 10,   //单发耗能
                stamina : 100,		//耐久度
                damage : 30,		//攻击力
				bullet : 30,		//装弹数量
				ammos : 90,		//弹药总数
           },
		   image : "",        //武器图片
		   info : ""          //武器显示信息
        },
		"MEWC EAR-19" : {
			weaponmodel : "全自动",
            name : "MEWC EAR-19",
            type : "gun",
            attribute : {		//武器属性
				firingrate : 700,  //射速
				muzzle : 1200,   //出膛速度
				range : 700,    //射程
				weight : 4.3,   //重量
				precision : 75,   //精度
				recoil : 34,   //后坐力
				damapower : {   //破坏力
					physics : 15,   //物理伤害
					power : 30,    //能量伤害
				},
				powersingle : 8,   //单发耗能
                stamina : 100,		//耐久度
                damage : 30,		//攻击力
				bullet : 30,		//装弹数量
				ammos : 90,		//弹药总数
           },
		   image : "",        //武器图片
		   info : ""          //武器显示信息
        },
		"MEWC ALR46" : {
			weaponmodel : "半自动",
            name : "MEWC ALR46",
            type : "gun",
            attribute : {		//武器属性
				firingrate : 60,  //射速
				muzzle : 1500,   //出膛速度
				range : 1800,    //射程
				weight : 6.3,   //重量
				precision : 99,   //精度
				recoil : 42,   //后坐力
				damapower : {   //破坏力
					physics : 19,   //物理伤害
					power : 52,    //能量伤害
				},
				powersingle : 15,   //单发耗能
                stamina : 100,		//耐久度
                damage : 30,		//攻击力
				bullet : 30,		//装弹数量
				ammos : 90,		//弹药总数
           },
		   image : "",        //武器图片
		   info : ""          //武器显示信息
        },
		"SIC LRRG" : {
			weaponmodel : "半自动",
            name : "SIC LRRG",
            type : "gun",
            attribute : {		//武器属性
				firingrate : 45,  //射速
				muzzle : 1700,   //出膛速度
				range : 2000,    //射程
				weight : 7.5,   //重量
				precision : 97,   //精度
				recoil : 60,   //后坐力
				damapower : {   //破坏力
					physics : 23,   //物理伤害
					power : 68,    //能量伤害
				},
				powersingle : 17,   //单发耗能
                stamina : 100,		//耐久度
                damage : 30,		//攻击力
				bullet : 30,		//装弹数量
				ammos : 90,		//弹药总数
           },
		   image : "",        //武器图片
		   info : ""          //武器显示信息
        },
		"CWC NL09" : {
			weaponmodel : "半自动",
            name : "CWC NL09",
            type : "gun",
            attribute : {		//武器属性
				firingrate : 60,  //射速
				muzzle : 1200,   //出膛速度
				range : 1900,    //射程
				weight : 7.3,   //重量
				precision : 97,   //精度
				recoil : 63,   //后坐力
				damapower : {   //破坏力
					physics : 20,   //物理伤害
					power : 72,    //能量伤害
				},
				powersingle : 17,   //单发耗能
                stamina : 100,		//耐久度
                damage : 30,		//攻击力
				bullet : 30,		//装弹数量
				ammos : 90,		//弹药总数
           },
		   image : "",        //武器图片
		   info : ""          //武器显示信息
        },    
    };
		

}
catch (e)
{
	alert(e);
}