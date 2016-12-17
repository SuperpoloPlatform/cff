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
    /*   PROGRESS_LAYOUT start	                                                    */
    /************************************************************************/
 
    PROGRESS_LAYOUT = {
		//layout文件的名称
	    name : "progress.layout",
		//这里定义的方法为UI事件的处理函数
	    method : {
	        "handerProgressDone" : function () {
	            CONSOLE.WriteLine("[Debug] <UI> handerProgressDone");
	            GUI.Windows.DestroyWindow(GUI.System.root);
	            GUI.CreateObjectLayout(SCENE_LAYOUT,"/ui");
	        }
	    },
	    window : {
	        "progressRoot" : {
	            property: {
                    "Image" : function (obj,propt_name) {
                        GUI.Imagesets.CreateImageset("progressRootBackground","loading.gif");
	                    obj.SetProperty(propt_name,"set:progressRootBackground image:full_image");
                    }
                },
                event : {
                    
                },
                subscribe : {
                    
                }
	        },
	        "progressRoot/Loading" : {
	            property: {
                    "count" : function (obj,propt_name) {
                        var file = [
		                    "player",
		                    "monster",
		                    "monster2",
		                    "monster3",
		                    "pig1",
		                    "tuzi1",
		                    "yang1",
		                    "businessman",
		                    "scenelayout",
		                    "effect",
		                    "layout"
	                    ];
	                    
                        obj[propt_name] = file.length;
                    },
                    "curCount" : function (obj,propt_name) {
                        obj[propt_name] = 0;
                    },
                    "update" : function (obj,propt_name) {
                        aeval(function () {
	                        CONSOLE.WriteLine("[Debug] <UI> aeval.........");
        	                Event.Subscribe(spp.hitch(obj,function (e) {
        	                    this.curCount = this.curCount + e.addCount;
        	                    CONSOLE.WriteLine("[Debug] <UI> this.curCount="+this.curCount+"");
                                CONSOLE.WriteLine("[Debug] <UI> this.count="+this.count+"");
        	                    this.SetProperty("CurrentProgress",this.curCount/this.count);
        	                }),"ui.progress.count.set");
	                    });
                    }
                },
                event : {
                    "ProgressDone" : "handerProgressDone"
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