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
    /*   LOGIN_LAYOUT start	                                                    */
    /************************************************************************/
 
    LOGIN_LAYOUT = {
		//layout文件的名称
	    name : "login.layout",
		//这里定义的方法为UI事件的处理函数
	    method : {
	        "loadNextWindow" : function () {
	            CONSOLE.WriteLine("[Debug] <UI> loadNextWindow");

	            GUI.Windows.DestroyWindow(GUI.System.root);
	            GUI.CreateObjectLayout(ROLE_CHOICE_LAYOUT,"/ui");
	        }
	    },
	    window : {
	        "loginRoot" : {
	            property: {
                    "Image" : function (obj,propt_name) {
                        GUI.Imagesets.CreateImageset("loginBackground","login.jpg");
	                    obj.SetProperty(propt_name,"set:loginBackground image:full_image");
                    }
                },
                event : {
                    
                },
                subscribe : {
                    
                }
	        },
	        "login/Landing" : {
	            property: {
                    
                },
                event : {
                    "Clicked" : "loadNextWindow"
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