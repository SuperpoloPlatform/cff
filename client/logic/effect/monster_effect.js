/**************************************************************************
 *  This file is part of the UGE(Uniform Game Engine) of SPP.
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *  See http://spp.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://spp.spolo.org/  sales@spolo.org spp-support@spolo.org
**************************************************************************/
try{
	(function(){
		Event.Subscribe(function(e){
			var actor = e.actor;
			console.log("monster effect, monster death !");
			// 怪物死亡后消失
			actor.pcarray['pcmesh'].PerformAction('SetVisible',['visible', false]);
			// monster死亡后，mesh藏于地下
			var pos = actor.pcarray['pcmesh'].GetProperty('position');
			actor.pcarray['pcmesh'].MoveMesh([pos.x, -100, pos.z]);
			
		},"effect.monster.monsterDeath");
		
	})();

} catch(e){
	alert(e);
}