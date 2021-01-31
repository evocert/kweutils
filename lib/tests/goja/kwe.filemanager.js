define([
	"module",
	"console",
	"cyclejs",
	"kwe.filemanager"
],function(
	module,
	console,
	cyclejs,
	FileManager
){
	"use strict";
	console.log(Object.keys(fsutils));
	try{//basic usage
		var fm=new FileManager({cwd:"/"});
		var res=[];
		var t0=new Date();
		fm.pwd();
		fm.cd("/mnt/c/tmp/www");
		fm.pwd();
		fm.cd("./kweutils");
		fm.pwd();
		fm.cd("./pub/local/tiled.app");
		fm.ls("../");
		fm.find("./res/map");
		fm.cd("/mnt/c/tmp/www/kweutils/pub/local/tiled.app");
		fm.ls("./");
		fm.touch("./test.txt");
		fm.setcontents("./test.txt","lorem ipsum");
		fm.cat('./test.txt');
		fm.mkdir("/tmp/test");
		fm.mkdir("/tmp/test/0");
		fm.mkdir("/tmp/test/1");
		fm.mkdir("/tmp/test/1/0");
		fm.mkdir("/tmp/test/1/1");
		fm.mkdir("/tmp/test/2/3/4/5");
		res.push(fm.find("/tmp/test"));
		fm.rm("/tmp/test");
		var t1=new Date();
		console.log("Duration:"+(t1-t0)+" ms");
		request.ResponseHeader().Set("Content-Type","application/json");
		print(JSON.stringify(res));
	}catch(e){
		request.ResponseHeader().Set("Content-Type","application/json");
		print(JSON.stringify({"error":e.toString()}));
	}
});
