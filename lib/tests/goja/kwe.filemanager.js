define([
	"module",
	"console",
	"cyclejs",
	"kwe.filemanager",
	"LoremIpsum"
],function(
	module,
	console,
	cyclejs,
	FileManager,
	LoremIpsum
){
	"use strict";
	console.log(Object.keys(fsutils));
	try{//basic usage
		var fm=new FileManager({cwd:"/"});
		var res=[];
		var t0=new Date();
		var li=new LoremIpsum();
		res.push(fm.cd("/tmp"));
		res.push(fm.ls());
		res.push(fm.mkdir("./test"));
		res.push(fm.mkdir("./test/0"));
		res.push(fm.mkdir("./test/1"));
		res.push(fm.mkdir("./test/2"));
		res.push(fm.mkdir("./test/0/0"));
		res.push(fm.mkdir("./test/0/1"));
		res.push(fm.mkdir("./test/1/0"));
		res.push(fm.mkdir("./test/1/1"));
		res.push(fm.mkdir("./test/2/0"));
		res.push(fm.mkdir("./test/2/1"));
		res.push(fm.ls("./test"));
		res.push(fm.find("./test"));
		res.push(fm.rm("./test"));
		res.push(fm.find("./"));
		res.push(fm.mkdir("./test"));
		res.push(fm.cd("./test"));
		res.push(fm.touch("./0.txt"));
		res.push(fm.touch("./1.txt"));
		res.push(fm.touch("./2.txt"));
		res.push(fm.touch("./3.txt"));
		res.push(fm.ls("./"));
		res.push(fm.setcontents("./0.txt",li.paragraph(32)));
		res.push(fm.setcontents("./1.txt",li.paragraph(64)));
		res.push(fm.setcontents("./2.txt",li.paragraph(128)));
		res.push(fm.setcontents("./3.txt",li.paragraph(256)));
		res.push(fm.ls("./"));
		res.push(fm.cat("./0.txt"));
		res.push(fm.cat("./1.txt"));
		res.push(fm.cat("./2.txt"));
		res.push(fm.cat("./3.txt"));
		res.push(fm.cd("../"));
		res.push(fm.pwd());
		res.push(fm.rm("./test"));
		var t1=new Date();
		console.log("Duration:"+(t1-t0)+" ms");
		request.ResponseHeader().Set("Content-Type","application/json");
		print(JSON.stringify(res));
	}catch(e){
		request.ResponseHeader().Set("Content-Type","application/json");
		print(JSON.stringify({"error":e.toString()}));
	}
});
