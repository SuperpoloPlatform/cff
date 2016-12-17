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

	// 一只山羊的entity template
	YANG_TPL = {
		mesh : {
			libPath : "/art/models/monster/yang/yang.xml",
			factName : "genYang"
		},
		pc : {
			"pcmesh" : {
				action : [
					{
						name : "SetMesh",
						param : [
							['name','Cube']
						]
					},
					{
						name : "SetAnimation",
						param : [
							['animation','stand'],
							['cycle',true]
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
							['body', [0.5, 0.5, 0.5]],
							['legs', [0.5, 0.9, 0.5]]
						]
					}
				]
			},
			"pcactormove" : {
				action : [
					{
						name : "SetSpeed",
						param : [
							['movement',4],
							['running',2],
							['rotation',2],
							['jumping',3]
						]
					}
				]
			},
			"pctimer" : {},
			"pcmover" : {},
			"pccommandinput" : {
				action : [
					{
						name : "Bind",
						param : [
							['trigger','m'],
							['command','getpos']
						]
					}
				]
			}
		},
		
		event : {
			"pccommandinput_getpos1" : function(e)
			{
				//alert(0000);
				Event.Send({
					name : "effect.forward1",
					self : yang1
				});
			}
		},
		property : {
		},
		// 接受全局事件。
		subscribe : {
		}
	};

}
catch (e)
{
	alert(e);
}
