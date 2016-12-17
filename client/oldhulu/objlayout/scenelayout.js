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
    /*   SCENE_LAYOUT start	                                                    */
    /************************************************************************/
 
    SCENE_LAYOUT = {
		//layout文件的名称
	    name : "scene.layout",
		//这里定义的方法为UI事件的处理函数
	    method : {
	        //在处理函数中使用this可以对应到相应的window上
	        setVisible : function () {
	            var associatedWindow = this.associatedWindow;
	            for(var index in associatedWindow)
	            {
	                if (associatedWindow[index] == "this") {
	                    this.SetProperty("Visible","False");
	                }
	                else
	                {
	                    var show_window = GUI.Windows.Get(associatedWindow[index]);
	                    if(!show_window)
				        {
					        CONSOLE.Write("\n Failed to Get '" + show_window.name + "' \n");	    
				        }
                        var isVisible = show_window.GetProperty("Visible");

                        if (isVisible == "True") {
                            show_window.SetProperty("Visible","False");
                        }
                        else
                        {
                            show_window.SetProperty("Visible","True");
                        }
	                }
	            }
	        },
			shortCutContainerSingleClicked : function () {
				switch(this.attack)
				{
					case "attacknormal":
						Event.Send({
							name : "attack.normal",
							attacker : player,
							target : player.target
						});
						CONSOLE.WriteLine("[Debug] <UI> Send attack.normal success");
						break;
					case "attackspecial1":
						Event.Send({
							name : "attack.special",
							attacker : player,
							target : player.target,
							skill : 1
						});
						CONSOLE.WriteLine("[Debug] <UI> Send attack.special1 success");
						break;
					case "attackspecial2":
						Event.Send({
							name : "attack.special",
							attacker : player,
							target : player.target,
							skill : 2
						});
						CONSOLE.WriteLine("[Debug] <UI> Send attack.special2 success");
						break;
					case "attackspecial3":
						Event.Send({
							name : "attack.special",
							attacker : player,
							target : player.target,
							skill : 3
						});
						CONSOLE.WriteLine("[Debug] <UI> Send attack.special3 success");
						break;
					case "attackspecial4":
						Event.Send({
							name : "attack.special",
							attacker : player,
							target : player.target,
							skill : 4
						});
						CONSOLE.WriteLine("[Debug] <UI> Send attack.special4 success");
						break;
					default:
						break;
				}
			},
	        handleDropped : function () {
	            //获取被拖拽的窗口
	            var root = GUI.Windows.Get("root");
	            if(!root)
				{
					CONSOLE.Write("\n Failed to Get '" + root.name + "' \n");	    
				}
				
	            var draged_window = root.GetActiveChild();
	            if(!draged_window)
				{
					CONSOLE.Write("\n Failed to Get '" + draged_window.name + "' \n");	    
				}
				
	            if (draged_window.childCount == 0) {
	                CONSOLE.WriteLine("[Debug] <UI> handleDropped:拖拽窗口中没有物品");
	                return ;
	            }
	            
	            //如果目标窗口或者拖拽窗口为装备栏，判断类型是否一致
	            if (typeof(this.weaponType) != "undefined") {
	                if (WEAPONDATA[draged_window.weapon].type != this.weaponType) {
	                    CONSOLE.WriteLine("[Debug] <UI> handleDropped:装备类型不一致");
	                    return ;
	                }
	            }else if (typeof(draged_window.weaponType) != "undefined" && this.childCount != 0) {
	                if (WEAPONDATA[this.weapon].type[0] != draged_window.weaponType) {
	                    CONSOLE.WriteLine("[Debug] <UI> handleDropped:装备类型不一致");
	                    return ;
	                }
	            }
	            
	            //获取被拖拽窗口的子窗口
	            var draged_child_window = draged_window.GetChildAtIdx(0);
	            if(!draged_child_window)
				{
					CONSOLE.Write("\n Failed to Get '" + draged_child_window.name + "' \n");	    
				}
	            //获取窗口的物品
	            var draged_window_object = draged_child_window.GetProperty("Image");
	            
	            CONSOLE.WriteLine("[Debug] <UI> handleDropped:目标窗口中的物品="+this.childCount+"");

	            //目标窗口中没有物品
	            if (this.childCount == 0) {
	                //交换物品ID
	                this.weapon = draged_window.weapon;
	                draged_window.weapon = "0";
	                //交换物品tooltip
	                this.SetProperty("CustomTooltipType",draged_window.GetProperty("CustomTooltipType"));
	                this.SetProperty("Tooltip",draged_window.GetProperty("Tooltip"));
	                draged_window.SetProperty("CustomTooltipType","");
	                draged_window.SetProperty("Tooltip","");
	                //交换子窗口
	                draged_child_window.parent = null;
	                draged_child_window.parent = this;
	                draged_child_window.SetProperty("UnifiedMaxSize",this.GetProperty("UnifiedMaxSize"));
	                draged_child_window.SetProperty("UnifiedMinSize",this.GetProperty("UnifiedMinSize"));
	            }
	            //目标窗口中有物品
	            else if (this.childCount != 0) {
	                var target_child_window = this.GetChildAtIdx(0);
	                if(!target_child_window)
				    {
					    CONSOLE.Write("\n Failed to Get '" + target_child_window.name + "' \n");	    
				    }
	                var target_window_object = target_child_window.GetProperty("Image");
	                //目标窗口中的物品与被拖拽窗口中的物品相同,物品叠加
	                if (draged_window_object == target_window_object) {
	                    draged_child_window.parent = null;
	                }
	                //目标窗口中的物品与被拖拽窗口中的物品不同,物品替换
	                else{
	                    //交换物品ID
	                    var target_weapon = this.weapon;
	                    this.weapon = draged_window.weapon;
	                    draged_window.weapon = target_weapon;
                        //交换物品tooltip
	                    var target_tooltip_info = this.GetProperty("Tooltip");
	                    this.SetProperty("Tooltip",draged_window.GetProperty("Tooltip"));
	                    draged_window.SetProperty("Tooltip",target_tooltip_info);
                        //交换子窗口
	                    target_child_window.parent = null;
	                    draged_child_window.parent = null;
	                    target_child_window.parent = draged_window;
	                    target_child_window.SetProperty("UnifiedMaxSize",draged_window.GetProperty("UnifiedMaxSize"));
	                    target_child_window.SetProperty("UnifiedMinSize",draged_window.GetProperty("UnifiedMinSize"));
	                    draged_child_window.parent = this;
	                    draged_child_window.SetProperty("UnifiedMaxSize",this.GetProperty("UnifiedMaxSize"));
	                    draged_child_window.SetProperty("UnifiedMinSize",this.GetProperty("UnifiedMinSize"));
	                }
	            }
	        },
	        handleEnters : function () {

	        },
	        handleLeaves : function () {

	        },
	        PopConfirmMenu : function () {
	            //如果有足够的金币
	            if (1) {
	                CONSOLE.WriteLine("[Debug] <UI> PopConfirmMenu:this.associatedWindow[0]="+this.associatedWindow[0]+"");
	                CONSOLE.WriteLine("[Debug] <UI> PopConfirmMenu:this.associatedWindow[0]="+this.confirmMenu[0]+"");
	                var associatedWindow = GUI.Windows.Get(this.associatedWindow[0]);
	                if(!associatedWindow)
				    {
					    CONSOLE.Write("\n Failed to Get '" + associatedWindow.name + "' \n");	    
				    }
	                var isVisible = associatedWindow.GetProperty("Visible");

                    if (isVisible == "True") {
                        associatedWindow.SetProperty("Visible","False");
                    }
                    else
                    {
                        associatedWindow.SetProperty("Visible","True");
                    }
	                
	                var confirmMenu = GUI.Windows.Get(this.confirmMenu[0]);
	                if(!confirmMenu)
				    {
					    CONSOLE.Write("\n Failed to Get '" + confirmMenu.name + "' \n");	    
				    }
	                confirmMenu.weaponId = this.weapon;
	            }
	        },
	        handerConfirm : function () {
	            if (this.weaponId != "0") {
	                var bag = GUI.Windows.Get("UI/PlayerBag/BagContainer");
	                if(!bag)
				    {
					    CONSOLE.Write("\n Failed to Get '" + bag.name + "' \n");	    
				    }
	                
	                for(var index = 1;index <= bag.childCount;index++)
	                {
	                    //获取拖拽窗口
	                    var bag_child = GUI.Windows.Get("UI/PlayerBag/BagContainer/Button"+index+"/GoodsContainer");
	                    if(!bag_child)
				        {
					        CONSOLE.Write("\n Failed to Get '" + bag_child.name + "' \n");	    
				        }
	                    
	                    if (bag_child.childCount == 0) {
	                        //创建物品
	                        var object = GUI.Windows.CreateWindow("interface/StaticImage",bag_child.name+"/object");
	                        if(!object)
				            {
					            CONSOLE.Write("\n Failed to CreateWindow '" + object.name + "' \n");	    
				            }
	                        object.SetProperty("UnifiedMaxSize",bag_child.GetProperty("UnifiedMaxSize"));
	                        object.SetProperty("UnifiedMinSize",bag_child.GetProperty("UnifiedMinSize"));
	                        object.SetProperty("UnifiedPosition","{{0,0},{0,0}}");
	                        object.SetProperty("UnifiedSize",bag_child.GetProperty("UnifiedMinSize"));
	                        object.SetProperty("MousePassThroughEnabled","True");
	                        object.SetProperty("BackgroundEnabled","True");
	                        object.SetProperty("FrameEnabled","False");
	                        object.SetProperty("Image",WEAPONDATA[this.weaponId].image);
	                        //将物品添加为拖拽窗口的子窗口，然后设置物品信息
	                        object.parent = bag_child;
	                        bag_child.weapon = this.weaponId;
	                        //将物品id还原为0
	                        this.weaponId = "0";
	                        bag_child.SetProperty("CustomTooltipType","interface/Tooltip");
	                        bag_child.SetProperty("Tooltip",WEAPONDATA[bag_child.weapon].info);
	                        
	                        //向entity发送获取物品的事件
	                        Event.Send({
                                  name : "ui.player.pack.set",
                                  id : bag_child.weapon 
                            });
                            break;
	                    }
	                }
	                if (index > bag.childCount) {
	                    alert("背包已满");
	                }
	                //关闭交易对话框
	                var associatedWindow = GUI.Windows.Get(this.associatedWindow[0]);
                    associatedWindow.SetProperty("Visible","False");
	            }
	        },
	        "handleWeaponChanged" : function () {
                            var weaponId = this.weapon;
                            if (weaponId != "0") {
	                            var target = GUI.Windows.Get("UI/RoleWindow/RoleTheme");
	                            if(!target)
				                {
					                CONSOLE.Write("\n Failed to Get '" + target.name + "' \n");	    
				                }

	                                //获取拖拽窗口
	                                var target_child = GUI.Windows.Get(target[WEAPONDATA[weaponId].type]);
	                                if(!target_child)
				                    {
					                    CONSOLE.Write("\n Failed to Get '" + target_child.name + "' \n");	    
				                    }
                	                //如果物品类型一致，交换物品
	                                if (target_child.weaponType == WEAPONDATA[weaponId].type) {
	                                    //获取当前窗口的物品
	                                    var draged_child_window = this.GetChildAtIdx(0);
	                                    if(!draged_child_window)
				                        {
					                        CONSOLE.Write("\n Failed to Get '" + draged_child_window.name + "' \n");	    
				                        }
	                                    //目标窗口中没有物品
	                                    if (target_child.childCount == 0) {
	                                        //交换物品ID
	                                        target_child.weapon = weaponId;
	                                        weaponId = "0";
	                                        //交换物品tooltip
	                                        target_child.SetProperty("CustomTooltipType",this.GetProperty("CustomTooltipType"));
	                                        target_child.SetProperty("Tooltip",this.GetProperty("Tooltip"));
	                                        this.SetProperty("CustomTooltipType","");
	                                        this.SetProperty("Tooltip","");
	                                        //交换子窗口
	                                        draged_child_window.parent = null;
	                                        draged_child_window.parent = target_child;
	                                        draged_child_window.SetProperty("UnifiedMaxSize",target_child.GetProperty("UnifiedMaxSize"));
	                                        draged_child_window.SetProperty("UnifiedMinSize",target_child.GetProperty("UnifiedMinSize"));
	                                    }
	                                    //目标窗口中有物品
	                                    else if (target_child.childCount != 0) {
	                                        //获取目标窗口的物品
	                                        var target_child_window = target_child.GetChildAtIdx(0);
	                                        if(!target_child_window)
				                            {
					                            CONSOLE.Write("\n Failed to Get '" + target_child_window.name + "' \n");	    
				                            }

	                                        //目标窗口中的物品与被拖拽窗口中的物品不同,物品替换
	                                        else{
	                                            //交换物品ID
	                                            var target_weapon = target_child.weapon;
	                                            target_child.weapon = this.weapon;
	                                            this.weapon = target_weapon;
                                                //交换物品tooltip
	                                            var target_tooltip_info = target_child.GetProperty("Tooltip");
	                                            target_child.SetProperty("Tooltip",this.GetProperty("Tooltip"));
	                                            this.SetProperty("Tooltip",target_tooltip_info);
                                                //交换子窗口
	                                            target_child_window.parent = null;
	                                            draged_child_window.parent = null;
	                                            target_child_window.parent = this;
	                                            target_child_window.SetProperty("UnifiedMaxSize",this.GetProperty("UnifiedMaxSize"));
	                                            target_child_window.SetProperty("UnifiedMinSize",this.GetProperty("UnifiedMinSize"));
	                                            draged_child_window.parent = target_child;
	                                            draged_child_window.SetProperty("UnifiedMaxSize",target_child.GetProperty("UnifiedMaxSize"));
	                                            draged_child_window.SetProperty("UnifiedMinSize",target_child.GetProperty("UnifiedMinSize"));
	                                        }
	                                    }
	                                }
                            }
	        },
	        "loadPreWindow" : function () {
	            CONSOLE.WriteLine("[Debug] <UI> loadPreWindow");
	            
	            CONSOLE.WriteLine("[Debug] <UI> RemoveEntity start: Entities.entityCount="+Entities.entityCount+"");
                Entities.RemoveEntity();
                CONSOLE.WriteLine("[Debug] <UI> RemoveEntity end: Entities.entityCount="+Entities.entityCount+"");
                
	            GUI.Windows.DestroyWindow(GUI.System.root);
	            GUI.CreateObjectLayout(ROLE_CHOICE_LAYOUT,"/ui");
	        }
	    },
	    window : {
	        "root" :{
				//JS object的自定义属性
                property: {
                    
                },
				//UI事件ID：事件处理函数的字串(事件处理的时候会调用method中的setVisible)
                event : {
                    
                },
				//订阅全局事件，在处理函数中使用this可以对应到相应的window上
                subscribe : {
                
                }
            },
            "UI/ToolBar/RoleButton" :{
                property: {
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/RoleWindow"];
                    }
                },
                event : {
                    "Clicked" : "setVisible"
                },
                subscribe : {
                
                }
            },
            "UI/ToolBar/SystemButton" :{
                property: {
                    
                },
                event : {
                    "Clicked" : "loadPreWindow"
                },
                subscribe : {
                
                }
            },
			"UI/ToolBar/Bag_1/DragContainer" :{
				property: {
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/PlayerBag"];
                    }
				},
				event : {
					"MouseClick" : "setVisible"
				},
				subscribe : {
				
				}
			},
			"UI/ShortcutBar/Button1/ShortCutContainer" :{
				property: {
					"attack" : function (obj,propt_name) {
                        obj[propt_name] = "attacknormal";
                    }
				},
				event : {
					"MouseClick" : "shortCutContainerSingleClicked"
				},
				subscribe : {
				
				}
			},
			"UI/ShortcutBar/Button2/ShortCutContainer" :{
				property: {
					"attack" : function (obj,propt_name) {
                        obj[propt_name] = "attackspecial2";
                    }
				},
				event : {
					"MouseClick" : "shortCutContainerSingleClicked"
				},
				subscribe : {
				
				}
			},
			"UI/ShortcutBar/Button3/ShortCutContainer" :{
				property: {
					"attack" : function (obj,propt_name) {
                        obj[propt_name] = "attackspecial3";
                    }
				},
				event : {
					"MouseClick" : "shortCutContainerSingleClicked"
				},
				subscribe : {
				
				}
			},
			"UI/ShortcutBar/Button4/ShortCutContainer" :{
				property: {
					"attack" : function (obj,propt_name) {
                        obj[propt_name] = "attackspecial4";
                    }
				},
				event : {
					"MouseClick" : "shortCutContainerSingleClicked"
				},
				subscribe : {
				
				}
			},
            "UI/RoleStatusBar" :{
                property: {
                    "player_name" : function (obj,propt_name) {
                        obj[propt_name] = function (player_name){
		                    CONSOLE.WriteLine("[Debug] <UI> target_name"+player_name+" ");
		                    
		                    var playerstatusbar_name = GUI.Windows.Get("UI/RoleStatusBar/RoleName");
		                    if(!playerstatusbar_name)
				            {
					            CONSOLE.Write("\n Failed to Get '" + playerstatusbar_name.name + "' \n");	    
				            }
		                    playerstatusbar_name.SetProperty("font_theme",player_name);
                        };
                    },
                    "player_hp" : function (obj,propt_name) {
                        obj[propt_name] = function (player_cur_hp,player_max_hp) {
                            CONSOLE.WriteLine("[Debug] <UI> show target_hp "+player_cur_hp+" ");
		                    var playerstatusbar_hp = GUI.Windows.Get("UI/RoleStatusBar/HP");
		                    if(!playerstatusbar_hp)
				            {
					            CONSOLE.Write("\n Failed to Get '" + playerstatusbar_hp.name + "' \n");	    
				            }
		                    playerstatusbar_hp.SetProperty("CurrentProgress",player_cur_hp/player_max_hp);
		                    playerstatusbar_hp.SetProperty("font_theme", player_cur_hp + "/" +player_max_hp);
                        }
                    },
                    "player_mp" : function (obj,propt_name) {
                        obj[propt_name] = function (player_cur_mp,player_max_mp) {
                            CONSOLE.WriteLine("[Debug] <UI> show target_mp "+player_cur_mp+" ");
		                    var playerstatusbar_mp = GUI.Windows.Get("UI/RoleStatusBar/MP");
		                    if(!playerstatusbar_mp)
				            {
					            CONSOLE.Write("\n Failed to Get '" + playerstatusbar_mp.name + "' \n");	    
				            }
		                    playerstatusbar_mp.SetProperty("CurrentProgress",player_cur_mp/player_max_mp);
		                    playerstatusbar_mp.SetProperty("font_theme", player_cur_mp + "/" +player_max_mp);
                        }
                    },
                    "player_level" : function (obj,propt_name) {
                        obj[propt_name] = function (player_level) {
		                    CONSOLE.WriteLine("[Debug] <UI> show target_level "+player_level+"");
		                    var playerstatusbar_level = GUI.Windows.Get("UI/RoleStatusBar/HeadPortrait/Level");
		                    if(!playerstatusbar_level)
				            {
					            CONSOLE.Write("\n Failed to Get '" + playerstatusbar_level.name + "' \n");	    
				            }
		                    playerstatusbar_level.SetProperty("font_theme",player_level);
                        }
                    },
                    "player_pack" : function (obj,propt_name) {
                        obj[propt_name] = function (player_pack) {
                            CONSOLE.Write("\n set player_pack start \n");
                             //遍历已有装备
		                    for(var i in player_pack)
                            {
                                var weaponId = player_pack[i].name;
                                if (weaponId != "0") {
	                                var bag = GUI.Windows.Get("UI/PlayerBag/BagContainer");
	                                if(!bag)
				                    {
					                    CONSOLE.Write("\n Failed to Get '" + bag.name + "' \n");	    
				                    }
                	                //遍历物品格
	                                for(var index = 1;index <= bag.childCount;index++)
	                                {
	                                    //获取拖拽窗口
	                                    var bag_child = GUI.Windows.Get("UI/PlayerBag/BagContainer/Button"+index+"/GoodsContainer");
	                                    if(!bag_child)
				                        {
					                        CONSOLE.Write("\n Failed to Get '" + bag_child.name + "' \n");	    
				                        }
                	                    //如果物品格为空，创建子窗口用来存放物品
	                                    if (bag_child.childCount == 0) {
	                                        //创建物品
	                                        var object = GUI.Windows.CreateWindow("interface/StaticImage",bag_child.name+"/object");
	                                        if(!object)
				                            {
					                            CONSOLE.Write("\n Failed to Get '" + object.name + "' \n");
				                            }
	                                        object.SetProperty("UnifiedMaxSize",bag_child.GetProperty("UnifiedMaxSize"));
	                                        object.SetProperty("UnifiedMinSize",bag_child.GetProperty("UnifiedMinSize"));
	                                        object.SetProperty("UnifiedPosition","{{0,0},{0,0}}");
	                                        object.SetProperty("UnifiedSize",bag_child.GetProperty("UnifiedMinSize"));
	                                        object.SetProperty("MousePassThroughEnabled","True");
	                                        object.SetProperty("BackgroundEnabled","True");
	                                        object.SetProperty("FrameEnabled","False");
	                                        object.SetProperty("Image",WEAPONDATA[weaponId].image);
	                                        //将物品添加为拖拽窗口的子窗口，然后设置物品信息
	                                        object.parent = bag_child;
	                                        bag_child.weapon = weaponId;
	                                        //将物品id还原为0
	                                        weaponId = "0";
	                                        bag_child.SetProperty("CustomTooltipType","interface/Tooltip");
	                                        bag_child.SetProperty("Tooltip",WEAPONDATA[bag_child.weapon].info);

                                            break;
	                                    }
	                                }
	                                if (index > bag.childCount) {
	                                    alert("背包已满");
	                                }
	                            }
                            }
                        }
                    },
                    "player_weapons" : function (obj,propt_name) {
                        obj[propt_name] = function (player_weapons) {
                            CONSOLE.Write("\n set player_weapons start \n");
                             //遍历已有装备,暂不区分装备类型
		                    for(var i in player_weapons)
                            {
                                var weaponId = player_weapons[i].name;
                                
                                if (weaponId != "0") {
	                                var bag = GUI.Windows.Get("UI/RoleWindow/RoleTheme");
	                                if(!bag)
				                    {
					                    CONSOLE.Write("\n Failed to Get '" + bag.name + "' \n");	    
				                    }

	                                //获取装备所在的窗口
	                                var bag_child = GUI.Windows.Get(bag[WEAPONDATA[weaponId].type]);
	                                if(!bag_child)
				                    {
					                    CONSOLE.Write("\n Failed to Get '" + bag_child.name + "' \n");	    
				                    }
                                    //如果物品格为空，创建子窗口用来存放物品
	                                if (bag_child.childCount == 0 && bag_child.weaponType == WEAPONDATA[weaponId].type) {
	                                //创建物品
	                                var object = GUI.Windows.CreateWindow("interface/StaticImage",bag_child.name+"/object");
	                                if(!object)
				                    {
					                    CONSOLE.Write("\n Failed to Get '" + object.name + "' \n");	    
				                    }
	                                object.SetProperty("UnifiedMaxSize",bag_child.GetProperty("UnifiedMaxSize"));
	                                object.SetProperty("UnifiedMinSize",bag_child.GetProperty("UnifiedMinSize"));
	                                object.SetProperty("UnifiedPosition","{{0,0},{0,0}}");
	                                object.SetProperty("UnifiedSize",bag_child.GetProperty("UnifiedMinSize"));
	                                object.SetProperty("MousePassThroughEnabled","True");
	                                object.SetProperty("BackgroundEnabled","True");
	                                object.SetProperty("FrameEnabled","False");
	                                object.SetProperty("Image",WEAPONDATA[weaponId].image);
	                                //将物品添加为拖拽窗口的子窗口，然后设置物品信息
	                                object.parent = bag_child;
	                                bag_child.weapon = weaponId;
	                                //将物品id还原为0
	                                weaponId = "0";
	                                bag_child.SetProperty("CustomTooltipType","interface/Tooltip");
	                                bag_child.SetProperty("Tooltip",WEAPONDATA[bag_child.weapon].info);
	                                }
	                            }
                            }
                        }
                    },
                    "player_attr" : function (obj,propt_name) {
                        obj[propt_name] = function (player) {
                            CONSOLE.Write("\n set player_attr start \n");
		                    var player_attr_left = GUI.Windows.Get("UI/RoleWindow/RoleTheme/LeftText");
		                    if(!player_attr_left)
				            {
					            CONSOLE.Write("\n Failed to Get '" + player_attr_left.name + "' \n");	    
				            }
		                    player_attr_left.SetProperty("text_theme",
		                    "力量     "+ player.power + 
		                    "\n敏捷     "+ player.agility + 
		                    "\n智力     "+ player.wit + 
		                    "\n耐力     "+ player.stamina + 
		                    "\n护甲     "+ player.armor + "");
		                    
		                    var player_attr_right = GUI.Windows.Get("UI/RoleWindow/RoleTheme/RightText");
		                    if(!player_attr_right)
				            {
					            CONSOLE.Write("\n Failed to Get '" + player_attr_right.name + "' \n");	    
				            }
		                    player_attr_right.SetProperty("text",
		                    "伤害     "+ player.hurt + 
		                    "\n速度     "+ player.speed + 
		                    "\n命中等级 "+ player.hitRate + 
		                    "\n暴击率   "+ player.critRate +
		                    "\n精准     "+ player.accurate + "");
                        }
                    }
                },
                event : {
                    
                },
                subscribe : {
                    "ui.player.status.set" : function (e) {
				        //player:玩家名称
				        //cur_hp:玩家当前生命值
				        //max_hp:玩家最大生命值
				        //cur_mp:玩家当前魔法值
				        //max_mp:玩家最大魔法值
				        //level:玩家等级
				        if (typeof e.player != "undefined") {
				            this.player_name(e.player);
				        }
				        if (typeof e.cur_hp != "undefined" && typeof e.max_hp != "undefined") {
				            this.player_hp(e.cur_hp,e.max_hp);
				        }
				        if (typeof e.cur_mp != "undefined" && typeof e.max_mp != "undefined") {
				            this.player_mp(e.cur_mp,e.max_mp);
				        }
				        if (typeof e.level != "undefined") {
				            this.player_level(e.level);
				        }
				        if (typeof e.pack != "undefined") {
				            this.player_pack(e.pack);
				        }
				        if (typeof e.weapons != "undefined") {
				            this.player_weapons(e.weapons);
				        }
				        this.player_attr(e);
                    }
                }
            },
            "UI/TargetStatusBar" :{
                property: {
                    "target_name" : function (obj,propt_name) {
                        obj[propt_name] = function (target_name){
		                    CONSOLE.WriteLine("[Debug] <UI> target_name"+target_name+" ");
		                    var targetstatusbar_name = GUI.Windows.Get("UI/TargetStatusBar/TargetName");
		                    if(!targetstatusbar_name)
				            {
					            CONSOLE.Write("\n Failed to Get '" + targetstatusbar_name.name + "' \n");	    
				            }
		                    targetstatusbar_name.SetProperty("font_theme",target_name);
                        }
                    },
                    "target_hp" : function (obj,propt_name) {
                        obj[propt_name] = function (target_cur_hp,target_max_hp) {
                            CONSOLE.WriteLine("[Debug] <UI> show target_hp "+target_cur_hp+" ");
		                    var targetstatusbar_hp = GUI.Windows.Get("UI/TargetStatusBar/HP");
		                    if(!targetstatusbar_hp)
				            {
					            CONSOLE.Write("\n Failed to Get '" + targetstatusbar_hp.name + "' \n");	    
				            }
		                    targetstatusbar_hp.SetProperty("CurrentProgress",target_cur_hp/target_max_hp);
		                    targetstatusbar_hp.SetProperty("font_theme", target_cur_hp + "/" +target_max_hp);
                        }
                    },
                    "target_mp" : function (obj,propt_name) {
                        obj[propt_name] = function (target_cur_mp,target_max_mp) {
                            CONSOLE.WriteLine("[Debug] <UI> show target_mp "+target_cur_mp+" ");
		                    var targetstatusbar_mp = GUI.Windows.Get("UI/TargetStatusBar/MP");
		                    if(!targetstatusbar_mp)
				            {
					            CONSOLE.Write("\n Failed to Get '" + targetstatusbar_mp.name + "' \n");	    
				            }
		                    targetstatusbar_mp.SetProperty("CurrentProgress",target_cur_mp/target_max_mp);
		                    targetstatusbar_mp.SetProperty("font_theme", target_cur_mp + "/" +target_max_mp);
                        }
                    },
                    "target_level" : function (obj,propt_name) {
                        obj[propt_name] = function (target_level) {
		                    CONSOLE.WriteLine("[Debug] <UI> show target_level "+target_level+"");
		                    var targetstatusbar_level = GUI.Windows.Get("UI/TargetStatusBar/HeadPortrait/Level");
		                    if(!targetstatusbar_level)
				            {
					            CONSOLE.Write("\n Failed to Get '" + targetstatusbar_level.name + "' \n");	    
				            }
		                    targetstatusbar_level.SetProperty("font_theme",target_level);
                        }
                    }
                },
                event : {

                },
                subscribe : {
                    "ui.target.status.set" : function (e) {
				        //visible:目标窗口是否显示 
				        //target:目标名称
				        //cur_hp:目标当前生命值
				        //max_hp:目标最大生命值
				        //cur_mp:目标当前魔法值
				        //max_mp:目标最大魔法值
				        //level:目标等级
				        
				        if (typeof e.visible != "undefined") {
				            CONSOLE.WriteLine("[Debug] <UI> e.visible="+e.visible+"");
				            this.SetProperty("Visible",e.visible);
				        }
				        if (typeof e.target != "undefined") {
				            this.target_name(e.target);
				        }
				        if (typeof e.cur_hp != "undefined" && typeof e.max_hp != "undefined") {
				            this.target_hp(e.cur_hp,e.max_hp);
				        }
				        if (typeof e.cur_mp != "undefined" && typeof e.max_hp != "undefined") {
				            this.target_mp(e.cur_mp,e.max_hp);
				        }
				        if (typeof e.level != "undefined") {
				            this.target_level(e.level);
				        }
			        }
                }
            },
            "UI/ExperienceBar" :{
                property: {
                    
                },
                event : {

                },
                subscribe : {
                    "ui.player.experience.set" : function (e) {
				        //cur_exp:玩家击杀怪物后获得的经验值
				        //max_exp:玩家升级所需的最大经验值
				        if (typeof(e.cur_exp) != "undefined" && typeof(e.max_exp) != "undefined") {
				            this.SetProperty("CurrentProgress", e.cur_exp/e.max_exp);
				            this.SetProperty("font_theme", e.cur_exp + "/" +e.max_exp);
				        }
				        else
				        {
				            CONSOLE.Write("\n[Debug] <UI> e.cur_hp is "+e.cur_exp+" \n");
				            CONSOLE.Write("\n[Debug] <UI> e.max_hp is "+e.max_exp+" \n");
				        }
			        }
                }
            },
            "UI/NpcBag" :{
                property: {
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["this"];
                    }
                },
                event : {
                    "CloseClicked" : "setVisible"
                },
                subscribe : {
                    
                }
            },
            "UI/RoleWindow" :{
                property: {
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["this"];
                    }
                },
                event : {
                    "CloseClicked" : "setVisible"
                },
                subscribe : {
                    "ui.player.weaponsOpened.set" : function (e) {
                        var isVisible = this.GetProperty("Visible");

                        if (isVisible == "True") {
                            this.SetProperty("Visible","False");
                        }
                        else
                        {
                            this.SetProperty("Visible","True");
                        }
                    }
                }
            },
            "UI/RoleWindow/RoleTheme" :{
                property: {
                    //创建玩家装备窗口，目前没有添加武器栏
                    "CreateRoleTheme" : function (obj,propt_name) {
                        CONSOLE.Write("\n CreateRoleTheme start \n");	
                        var base_name = obj.name;
                        var type = ["head","neck","shoulder","chest","shirt","backside","badges","wristbands","armguard","belt","legs","shoes","ring","ring","adornArticle","adornArticle"];
                        for(var column = 1;column <= 2;column++)
                        {
                            for(var line = 1;line <= 8;line++)
                            {
                                var index = (column - 1)*8+line-1;
                                
                                //把ring与adornArticle分开
                                if (index == 12 || index == 14) {
                                    var role_theme_button = GUI.Windows.CreateWindow("interface/Button",base_name+"/"+type[index]+"1");
                                }
                                else if (index == 13 || index == 15) {
                                    var role_theme_button = GUI.Windows.CreateWindow("interface/Button",base_name+"/"+type[index]+"2");
                                }
                                else
                                {
                                    var role_theme_button = GUI.Windows.CreateWindow("interface/Button",base_name+"/"+type[index]);
                                }

                                if(!role_theme_button)
				                {
					                CONSOLE.Write("\n Failed to CreateWindow '" + role_theme_button.name + "' \n");	    
				                }
                                role_theme_button.SetProperty("UnifiedMaxSize","{{0.0194,0},{0.03,0}}");
	                            role_theme_button.SetProperty("UnifiedMinSize","{{0.0194,0},{0.03,0}}");
	                            if (column == 1) {	
	                                role_theme_button.SetProperty("UnifiedPosition","{{"+0.016+",0},{"+((line-1)*0.113+0.005)+",0}}");
	                            }else if (column == 2) {
	                                role_theme_button.SetProperty("UnifiedPosition","{{"+0.869+",0},{"+((line-1)*0.113+0.005)+",0}}");
	                            }
	                            role_theme_button.SetProperty("UnifiedSize","{{0.0194,0},{0.03,0}}");
	                            role_theme_button.SetProperty("ButtonBg","set:interface image:"+type[index]);
	                            role_theme_button.SetProperty("HoverImage","set:interface image:wupin_image_frame_hover");
	                            role_theme_button.SetProperty("NormalImage","set:interface image:wupin_image_frame_normal");
	                            role_theme_button.SetProperty("ButtonWidth","28");
	                            role_theme_button.SetProperty("ButtonHeight","27");
	                            role_theme_button.SetProperty("BgImageWidth","27");
	                            role_theme_button.SetProperty("BgImageHeight","26");
	                            role_theme_button.parent = obj;
    	                        
	                            var goods_container = GUI.Windows.CreateWindow("interface/DragContainer",role_theme_button.name+"/Container");
	                            if(!goods_container)
				                {
					                CONSOLE.Write("\n Failed to CreateWindow '" + goods_container.name + "' \n");	    
				                }
	                            goods_container.SetProperty("UnifiedMaxSize","{{0.016,0},{0.0255,0}}");
	                            goods_container.SetProperty("UnifiedMinSize","{{0.016,0},{0.0255,0}}");
	                            goods_container.SetProperty("UnifiedPosition","{{0.103,0},{0.103,0}}");
	                            goods_container.SetProperty("UnifiedSize","{{0.016,0},{0.0255,0}}");
	                            goods_container.SetProperty("DragAlpha","0.5");
	                            goods_container.SetProperty("DragThreshold","8");
	                            goods_container.weaponType = type[index];
	                            goods_container.parent = role_theme_button;
	                            goods_container.Subscribe("DragDropItemDropped",spp.hitch(goods_container,SCENE_LAYOUT.method["handleDropped"]));
	                            goods_container.Subscribe("DragDropItemEnters",spp.hitch(goods_container,SCENE_LAYOUT.method["handleEnters"]));
	                            goods_container.Subscribe("DragDropItemLeaves",spp.hitch(goods_container,SCENE_LAYOUT.method["handleLeaves"]));
	                            
	                            obj[goods_container.weaponType] = goods_container.name;
                            }
                        }
                    }
                },
                event : {

                },
                subscribe : {
                
                }
            },
            "UI/PlayerBag" :{
                property: {
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["this"];
                    }
                },
                event : {
                    "CloseClicked" : "setVisible"
                },
                subscribe : {
                    "ui.player.packOpened.set" : function (e) {
                        var isVisible = this.GetProperty("Visible");

                        if (isVisible == "True") {
                            this.SetProperty("Visible","False");
                        }
                        else
                        {
                            this.SetProperty("Visible","True");
                        }
                    }
                }
            },
            "UI/DialogContext" :{
                property: {
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["this"];
                    }
                },
                event : {
                    "CloseClicked" : "setVisible"
                },
                subscribe : {
                    "ui.npc.dialog.set" : function (e) {
                        if (typeof(e.visible) != "undefined") {
                            this.SetProperty("Visible",e.visible);
                        }
                        if (typeof(e.text) != "undefined") {
                            var dialog_theme_window = GUI.Windows.Get("UI/DialogContext/DialogTheme");
                            dialog_theme_window.SetProperty("text_theme",e.text);
                        }
                    }
                }
            },
            "UI/DialogContext/DialogTheme/Continue" :{
                property: {
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/DialogContext","UI/PlayerBag","UI/NpcBag"];
                    }
                },
                event : {
                    "Clicked" : "setVisible"
                },
                subscribe : {
                    
                }
            },
            "UI/DialogContext/DialogTheme/Quit" :{
                property: {
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/DialogContext"];
                    } 
                },
                event : {
                    "Clicked" : "setVisible"
                },
                subscribe : {
                
                }
            },
            "UI/PlayerBag/BagContainer" :{
                property: {
                    //创建玩家背包，目前有25个背包格
                    "CreateBag" : function (obj,propt_name) {
                        var base_name = obj.name;
                        for(var line = 1;line <= 5;line++)
                        {
                            for(var column = 1;column <= 5;column++)
                            {
                                var index = (line - 1)*5+column;
                                var bag_container_button = GUI.Windows.CreateWindow("interface/Button",base_name+"/Button"+index);
                                if(!bag_container_button)
				                {
					                CONSOLE.Write("\n Failed to CreateWindow '" + bag_container_button.name + "' \n");	    
				                }
                                bag_container_button.SetProperty("UnifiedMaxSize","{{0.036,0},{0.058,0}}");
	                            bag_container_button.SetProperty("UnifiedMinSize","{{0.036,0},{0.058,0}}");
	                            bag_container_button.SetProperty("UnifiedPosition","{{"+((column-1)*0.2)+",0},{"+((line-1)*0.193)+",0}}");
	                            bag_container_button.SetProperty("UnifiedSize","{{0.036,0},{0.058,0}}");
	                            bag_container_button.SetProperty("ButtonBg","set:interface image:wupin_image");
	                            bag_container_button.SetProperty("HoverImage","set:interface image:wupin_image_frame_hover");
	                            bag_container_button.SetProperty("NormalImage","set:interface image:wupin_image_frame_normal");
	                            bag_container_button.SetProperty("ButtonWidth","52");
	                            bag_container_button.SetProperty("ButtonHeight","52");
	                            bag_container_button.SetProperty("BgImageWidth","50");
	                            bag_container_button.SetProperty("BgImageHeight","50");
	                            bag_container_button.parent = obj;
    	                        
	                            var goods_container = GUI.Windows.CreateWindow("interface/DragContainer",bag_container_button.name+"/GoodsContainer");
	                            if(!goods_container)
				                {
					                CONSOLE.Write("\n Failed to CreateWindow '" + goods_container.name + "' \n");	    
				                }
	                            goods_container.SetProperty("UnifiedMaxSize","{{0.03,0},{0.048,0}}");
	                            goods_container.SetProperty("UnifiedMinSize","{{0.03,0},{0.048,0}}");
	                            goods_container.SetProperty("UnifiedPosition","{{0.103,0},{0.103,0}}");
	                            goods_container.SetProperty("UnifiedSize","{{0.03,0},{0.048,0}}");
	                            goods_container.SetProperty("DragAlpha","0.5");
	                            goods_container.SetProperty("DragThreshold","8");
	                            goods_container.parent = bag_container_button;
	                            goods_container.Subscribe("DragDropItemDropped",spp.hitch(goods_container,SCENE_LAYOUT.method["handleDropped"]));
	                            goods_container.Subscribe("DragDropItemEnters",spp.hitch(goods_container,SCENE_LAYOUT.method["handleEnters"]));
	                            goods_container.Subscribe("DragDropItemLeaves",spp.hitch(goods_container,SCENE_LAYOUT.method["handleLeaves"]));
	                            goods_container.Subscribe("MouseClick",spp.hitch(goods_container,SCENE_LAYOUT.method["handleWeaponChanged"]));
                            }
                        }
                    }
                },
                event : {

                },
                subscribe : {
                    "ui.player.packAddProp.set" : function (e) {
                        for(var index in e.weapons)
                        {
                            var weaponId = e.weapons[index].name;
                            CONSOLE.Write("\n[Debug] <UI> get weaponId '" + weaponId + "' \n");
                            if (typeof(weaponId) == "undefined") {
                                CONSOLE.Write("\n[Debug] <UI> e.weapons is undefined\n");
                                return ;
                            }
                            
                            for(var index = 1;index <= this.childCount;index++)
	                        {
	                            //获取拖拽窗口
	                            var bag_child = GUI.Windows.Get("UI/PlayerBag/BagContainer/Button"+index+"/GoodsContainer");
	                            if(!bag_child)
				                {
					                CONSOLE.Write("\n Failed to Get '" + bag_child.name + "' \n");	    
				                }
        	                    
	                            if (bag_child.childCount == 0) {
	                                //创建物品
	                                var object = GUI.Windows.CreateWindow("interface/StaticImage",bag_child.name+"/object");
	                                if(!object)
				                    {
					                    CONSOLE.Write("\n Failed to CreateWindow '" + object.name + "' \n");	    
				                    }
	                                object.SetProperty("UnifiedMaxSize",bag_child.GetProperty("UnifiedMaxSize"));
	                                object.SetProperty("UnifiedMinSize",bag_child.GetProperty("UnifiedMinSize"));
	                                object.SetProperty("UnifiedPosition","{{0,0},{0,0}}");
	                                object.SetProperty("UnifiedSize",bag_child.GetProperty("UnifiedMinSize"));
	                                object.SetProperty("MousePassThroughEnabled","True");
	                                object.SetProperty("BackgroundEnabled","True");
	                                object.SetProperty("FrameEnabled","False");
	                                object.SetProperty("Image",WEAPONDATA[weaponId].image);
	                                CONSOLE.Write("\n[Debug] <UI> get weapons '" + WEAPONDATA[weaponId].name + "' \n");
	                                //将物品添加为拖拽窗口的子窗口，然后设置物品信息
	                                object.parent = bag_child;
	                                bag_child.weapon = weaponId;
	                                //将物品id还原为0
	                                weaponId = "0";
	                                bag_child.SetProperty("CustomTooltipType","interface/Tooltip");
	                                bag_child.SetProperty("Tooltip",WEAPONDATA[bag_child.weapon].info);
        	                        
                                    break;
	                            }
	                        }
                        }
                    }
                }
            },
            "UI/NpcBag/BagContainer/Button1/GoodsContainer" :{
                property: {
                    "CustomTooltipType" : function (obj,propt_name) {
                        if (obj.childCount > 0) {
                            obj.SetProperty(propt_name,"interface/Tooltip");
                        }
                    },
                    "weapon" : function (obj,propt_name) {
                        obj[propt_name] = "5";
                        if (obj.childCount > 0) {
                            var child = obj.GetChildAtIdx(0);
                            child.SetProperty("Image",WEAPONDATA[obj.weapon].image);
                        }
                    },
                    "Tooltip" : function (obj,propt_name) {
                        if (obj.childCount > 0) {
                            obj.SetProperty(propt_name,WEAPONDATA[obj.weapon].info);
                        }
                    },
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/ConfirmMenu"];
                    },
                    "confirmMenu" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/ConfirmMenu/Ok"];
                    }
                },
                event : {
                    "MouseClick" : "PopConfirmMenu"
                },
                subscribe : {
                
                }
            },
            "UI/NpcBag/BagContainer/Button2/GoodsContainer" :{
                property: {
                    "CustomTooltipType" : function (obj,propt_name) {
                        if (obj.childCount > 0) {
                            obj.SetProperty(propt_name,"interface/Tooltip");
                        }
                    },
                    "weapon" : function (obj,propt_name) {
                        obj[propt_name] = "7";
                        if (obj.childCount > 0) {
                            var child = obj.GetChildAtIdx(0);
                            child.SetProperty("Image",WEAPONDATA[obj.weapon].image);
                        }
                    },
                    "Tooltip" : function (obj,propt_name) {
                        if (obj.childCount > 0) {
                            obj.SetProperty(propt_name,WEAPONDATA[obj.weapon].info);
                        }
                    },
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/ConfirmMenu"];
                    },
                    "confirmMenu" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/ConfirmMenu/Ok"];
                    }
                },
                event : {
                    "MouseClick" : "PopConfirmMenu"
                },
                subscribe : {
                
                }
            },
            "UI/NpcBag/BagContainer/Button3/GoodsContainer" :{
                property: {
                    "CustomTooltipType" : function (obj,propt_name) {
                        if (obj.childCount > 0) {
                            obj.SetProperty(propt_name,"interface/Tooltip");
                        }
                    },
                    "weapon" : function (obj,propt_name) {
                        obj[propt_name] = "8";
                        if (obj.childCount > 0) {
                            var child = obj.GetChildAtIdx(0);
                            child.SetProperty("Image",WEAPONDATA[obj.weapon].image);
                        }
                    },
                    "Tooltip" : function (obj,propt_name) {
                        if (obj.childCount > 0) {
                            obj.SetProperty(propt_name,WEAPONDATA[obj.weapon].info);
                        }
                    },
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/ConfirmMenu"];
                    },
                    "confirmMenu" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/ConfirmMenu/Ok"];
                    }
                },
                event : {
                    "MouseClick" : "PopConfirmMenu"
                },
                subscribe : {
                
                }
            },
            "UI/NpcBag/BagContainer/Button4/GoodsContainer" :{
                property: {
                    "CustomTooltipType" : function (obj,propt_name) {
                        if (obj.childCount > 0) {
                            obj.SetProperty(propt_name,"interface/Tooltip");
                        }
                    },
                    "weapon" : function (obj,propt_name) {
                        obj[propt_name] = "9";
                        if (obj.childCount > 0) {
                            var child = obj.GetChildAtIdx(0);
                            child.SetProperty("Image",WEAPONDATA[obj.weapon].image);
                        }
                    },
                    "Tooltip" : function (obj,propt_name) {
                        if (obj.childCount > 0) {
                            obj.SetProperty(propt_name,WEAPONDATA[obj.weapon].info);
                        }
                    },
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/ConfirmMenu"];
                    },
                    "confirmMenu" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/ConfirmMenu/Ok"];
                    }
                },
                event : {
                    "MouseClick" : "PopConfirmMenu"
                },
                subscribe : {
                
                }
            },
            "UI/NpcBag/BagContainer/Button5/GoodsContainer" :{
                property: {
                    "CustomTooltipType" : function (obj,propt_name) {
                        if (obj.childCount > 0) {
                            obj.SetProperty(propt_name,"interface/Tooltip");
                        }
                    },
                    "weapon" : function (obj,propt_name) {
                        obj[propt_name] = "11";
                        if (obj.childCount > 0) {
                            var child = obj.GetChildAtIdx(0);
                            child.SetProperty("Image",WEAPONDATA[obj.weapon].image);
                        }
                    },
                    "Tooltip" : function (obj,propt_name) {
                        if (obj.childCount > 0) {
                            obj.SetProperty(propt_name,WEAPONDATA[obj.weapon].info);
                        }
                    },
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/ConfirmMenu"];
                    },
                    "confirmMenu" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/ConfirmMenu/Ok"];
                    }
                },
                event : {
                    "MouseClick" : "PopConfirmMenu"
                },
                subscribe : {
                
                }
            },
            "UI/ConfirmMenu/Ok" :{
                property: {
                    "weaponId" : function (obj,propt_name) {
                        obj[propt_name] = "0";
                    },
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/ConfirmMenu"];
                    }
                },
                event : {
                    "Clicked" : "handerConfirm"
                },
                subscribe : {
                
                }
            },
            "UI/ConfirmMenu/Quit" :{
                property: {
                    "associatedWindow" : function (obj,propt_name) {
                        obj[propt_name] = ["UI/ConfirmMenu"];
                    }
                },
                event : {
                    "Clicked" : "setVisible"
                },
                subscribe : {
                
                }
            }
        }
    };

}
catch (e)
{
	alert(e);
}