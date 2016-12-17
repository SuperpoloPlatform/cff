// 该文件存放所有自己定义的全局变量
// RemoteObject : userManager
var login_reg = {};
login_reg.remoteServerAgentObj = Corba.GetObject("#test.my_context/delivery.Object#ServerAgent");

// RemoteObject:lobby object
var lobbyManager = {};
lobbyManager.remoteLobbyObj = null;

// RemoteObject:current channel
var curChalObj = {};
curChalObj.remoteChalObj = null;
//RemoteObject:current room object 
var curRoomObj = {};
curRoomObj.remoteRoomObj = null;

//RemoteObject:current scene object 
var curScene = {};
curScene.remoteSceneObj = null;
//存储创建出来的武器entity
var gunEntList = {};
//存储创建出来的子弹entity
var bult = {};
//存储手雷爆炸时，在爆炸范围内玩家列表
var bombpyerList = {};
//武器弹夹子弹总数
var bultNum = 0;
// 全局标志变量：是否非第一次创建sector变量的reference，只有第一次需要创建sector reference，以规避cff游戏退出一局游戏程序异常退出的bug
var refFlag = true;

// 在场景中的其他玩家所对应的entity列表
var otherEntityList = {};
// 怪物列表
var monsterList = {};
// 玩家自己的全局object，由本地UserInfoObj new出,并注册到server中，以便server通过对象标识来调用到client中的成员。
// 成员变量有：selfPlayer，以后有需要可以为其添加成员变量
var selfObj = {};
selfObj.isControlPlayer = true;

/**定义ui全局变量**/
var local = {};
local["focus"] = true; // 程序是否有焦点
local["needChangeFocus"] = false; // 切换程序是否需要更改mouseMove的值
local["localWin"] = "module/login/window";  //记录当前页，以便在退出页点击返回按钮的时候，跳转到之前页
local["firm"] = "";   //记录当前被选中的是哪个公司
local["isenterleft"] = "false"; //记录鼠标是否到达在左边界位置
local["isentertop"] = "false"; //记录鼠标是否到达在上边界位置
local["isenterright"] = "false"; //记录鼠标是否到达在右边界位置
local["isenterbottom"] = "false"; //记录鼠标是否到达在底边界位置
local["curOperate"] = false;   // 记录当前操作，有四种，1. 大厅 2. 频道 3. 房间 4. 游戏中，默认值是false，用户未登陆。
var curUser = "";

// 武器map，其中的成员在logic/data/weapon/weaponmap.js中定义
var weaponMap = {};