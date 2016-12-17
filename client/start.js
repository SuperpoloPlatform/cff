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

	//开启快捷键（调试）
	Registry.Get('iBugPlug',"crystalspace.utilities.bugplug");
	
	if(!load("/connect_net.js"))
	{
		alert("Failed to load `connect_net.js`");
	}
	//全局变量的声明
	if(!load("/globalvar.js"))
	{
		alert("Failed to load `globalvar.js`");
	}
	
	// 全局变量，方便调试。
	var CONSOLE = Registry.Get("iConsole");
	//CONSOLE.Write = function(){};//关闭调试窗口

	// 设定屏幕分辨率
	// @todo 需要在UI上提供设定屏幕分辨率的选项，
	// 并且在JS层提供动态修改分辨率的接口。
	//CmdLine.AddOption("fs", true);
	CmdLine.AddOption("mode", "1920x1080");
	
	var uiOpt = false;
	uiOpt = CmdLine.GetOption("ui");
	CONSOLE.WriteLine(uiOpt);
	
	// 加载Object Layout库，这是UGE的核心库。
	require("objlayout.js");
	
	Plugin.Load("spp.script.gui.cegui");
	Event.Send("application.open", true);
	VFS.Mount("/shader/snippets", System.InstallPath() + "/data/shader-snippets\\");
	VFS.Mount("/shader/snippets", System.InstallPath() + "/data/shader-old/snippets\\");
	require("ui.js");
	if(!load("/ui/layout.js"))
	{
	    alert("Failed to load `layout.js`");
	}
	if(!load("/ui/uischeme.js"))
	{
	    alert("Failed to load uischeme.js`");
	}	
	GUI.CreateObjectScheme(SCHEMEDATA,"/ui/data");
	GUI.CreateObjectLayout(LAYOUTDATA,"/ui/data");	
	
    engine = Registry.Get('iEngine');
	g3d = Registry.Get('iGraphics3D');
	view = new iView(engine,g3d);
	var count = Event.InstallHelper('3d',view,'frame');

}catch(e){
	alert('error:',e);
}
