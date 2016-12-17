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
    /*   SCHEMEDATA start	                                                    */
    /************************************************************************/


	SCHEMEDATA = {
		scheme : {
			path : "interface.scheme",
			imageset_name : "ice",
			// 为了更像CF，使用十字准星
			//image_name : "MouseArrow"
			image_name : "MouseMoveCursor"
		},
		font : {
		    "/fonts/SIMHEI.TTF" : {
			    type : "FreeType",
			    name : "HeiTi",
			    PointSize : "5",
			    AutoScaled : "true",
			    NativeRes : "w:1440 h:900"
			},
			"/fonts/SIMFANG.TTF" : {
			    type : "FreeType",
			    name : "FangSongTi",
			    PointSize : "4",
			    AutoScaled : "true",
			    NativeRes : "w:1440 h:900"
			},
			"/fonts/SIMKAI.TTF" : {
			    type : "FreeType",
			    name : "KaiTi",
			    PointSize : "5",
			    AutoScaled : "true",
			    NativeRes : "w:1440 h:900"
			}
		}
	};

}
catch (e)
{
	alert(e);
}