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
    /*   ROLE_CHOICE_LAYOUT start	                                                    */
    /************************************************************************/
 
    ROLE_CHOICE_LAYOUT = {
		//layout文件的名称
	    name : "rolechoice.layout",
		//这里定义的方法为UI事件的处理函数
	    method : {
	        "loadNextWindow" : function () {
	            CONSOLE.WriteLine("[Debug] <UI> loadNextWindow");
	            
	            GUI.Windows.DestroyWindow(GUI.System.root);
	            GUI.CreateObjectLayout(PROGRESS_LAYOUT,"/ui");
	            meval(function () {
	                CONSOLE.WriteLine("[Debug] <UI> meval.........");
        	        if(!load("/login.js"))
	                {
	                    alert("Failed to load `login.js`");
	                }
	            });
                
	        },
	        "loadPreWindow" : function () {
	            CONSOLE.WriteLine("[Debug] <UI> loadPreWindow");
                
	            GUI.Windows.DestroyWindow(GUI.System.root);
	            GUI.CreateObjectLayout(LOGIN_LAYOUT,"/ui");
	        }
	    },
	    window : {
	        "roleChoiceRoot" : {
	            property: {
                    "Image" : function (obj,propt_name) {
                        GUI.Imagesets.CreateImageset("roleChoiceBackground","rolechoice.jpg");
	                    obj.SetProperty(propt_name,"set:roleChoiceBackground image:full_image");
                    }
                },
                event : {
                    
                },
                subscribe : {
                    
                }
	        },
	        "roleChoiceRoot/LoadingGame" : {
	            property: {

                },
                event : {
                    "Clicked" : "loadNextWindow"
                },
                subscribe : {
                    
                }
	        },
	        "roleChoiceRoot/Return" : {
	            property: {

                },
                event : {
                    "Clicked" : "loadPreWindow"
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