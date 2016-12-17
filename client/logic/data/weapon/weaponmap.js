if(!load("/logic/data/weapon/pistol.js")){
	alert("Failed to load `/logic/data/weapon/pistol.js`");
}
if(!load("/logic/data/weapon/antitankgrenade.js")){
	alert("Failed to load `/logic/data/weapon/antitankgrenade.js`");
}
if(!load("/logic/data/weapon/assaultrifle.js")){
	alert("Failed to load `/logic/data/weapon/assaultrifle.js`");
}
if(!load("/logic/data/weapon/smokebomb.js")){
	alert("Failed to load `/logic/data/weapon/smokebomb.js`");
}
if(!load("/logic/data/weapon/sniperrifle.js")){
	alert("Failed to load `/logic/data/weapon/sniperrifle.js`");
}
if(!load("/logic/data/weapon/submachinegun.js")){
	alert("Failed to load `/logic/data/weapon/submachinegun.js`");
}
if(!load("/logic/data/weapon/dagger.js")){
	alert("Failed to load `/logic/data/weapon/dagger.js`");
}
if(!load("/logic/data/weapon/shotgun.js")){
	alert("Failed to load `/logic/data/weapon/shotgun.js`");
}

// 武器list
// id   武器名称
// 1    手枪
// 2    狙击枪
// 3    冲锋枪
// 4    突击步枪
// 5    手雷
// 6    烟雾弹
// 7    匕首
// 8    霰弹枪
try
{
	weaponMap["1"] = pistol;
	weaponMap["2"] = sniperRifle;
	weaponMap["3"] = submachineGun;
	weaponMap["4"] = assaultRifle;
	weaponMap["5"] = antitankGrenade;
	weaponMap["6"] = smokeBomb;
	weaponMap["7"] = dagger;
	weaponMap["8"] = shotGun;
}
catch(e)
{
	alert("err:" + e);
}