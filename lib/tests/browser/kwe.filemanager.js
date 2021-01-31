define([
	"module",
	"cyclejs",
	"jquery",
	"axios",
	"kwe.filemanager",
	"q",
	"LoremIpsum",
	"conzole",
],function(
	module,
	cyclejs,
	jq,
	axios,
	FileManager,
	Q,
	LoremIpsum,
	conzole
){
	conzole.open();
	conzole.setWidth(1024);
	conzole.toggleShowTimeDiff();
	console.log([module.id,'start'].join(':'));
	console.log(LoremIpsum);
	console.log(FileManager);
	console.log(conzole);
	$=jq;
	$("body").append($("<style/>").text(`
		html,body{
			background:#222222;
		}
	`));
	var li=new LoremIpsum();
	fm=new FileManager({cwd:"/tmp"});
	Q.fcall
	     (function(){                    return fm.cd("/mnt/c/tmp/www/kweutils")})
	.then(function(val){console.log(val);return fm.cd("./pub");})
	.then(function(val){console.log(val);return fm.cd("./local");})
	.then(function(val){console.log(val);return fm.cd("./tiled.app");})
	.then(function(val){console.log(val);return fm.cd("./res");})
	.then(function(val){console.log(val);return fm.cd("./map");})
	.then(function(val){console.log(val);return fm.ls();})
	.then(function(val){console.log(val);return fm.cat("./level0.json");})
	.then(function(val){console.log(val);return fm.cd("./..");})
	.then(function(val){console.log(val);return fm.cd("./..");})
	.then(function(val){console.log(val);return fm.cd("./js");})
	.then(function(val){console.log(val);return fm.ls("./");})
	.then(function(val){console.log(val);return fm.cat("./main.js");})
	.then(function(val){console.log(val);return fm.cd("../");})
	.then(function(val){console.log(val);return fm.cd("../");})
	.then(function(val){console.log(val);return fm.ls();})
	.then(function(val){console.log(val);return fm.pwd();})
	.then(function(val){console.log(val);return fm.cd("../");})
	.then(function(val){console.log(val);return fm.pwd();})
	.then(function(val){console.log(val);return fm.cd("../");})
	.then(function(val){console.log(val);return fm.pwd();})
	.then(function(val){console.log(val);return fm.cd("../");})
	.then(function(val){console.log(val);return fm.pwd();})
	.then(function(val){console.log(val);return fm.cd("../");})
	.then(function(val){console.log(val);return fm.cd("/tmp");})
	.then(function(val){console.log(val);return fm.ls();})
	.then(function(val){console.log(val);return fm.mkdir("./test");})
	.then(function(val){console.log(val);return fm.mkdir("./test/0");})
	.then(function(val){console.log(val);return fm.mkdir("./test/1");})
	.then(function(val){console.log(val);return fm.mkdir("./test/2");})
	.then(function(val){console.log(val);return fm.mkdir("./test/0/0");})
	.then(function(val){console.log(val);return fm.mkdir("./test/0/1");})
	.then(function(val){console.log(val);return fm.mkdir("./test/1/0");})
	.then(function(val){console.log(val);return fm.mkdir("./test/1/1");})
	.then(function(val){console.log(val);return fm.mkdir("./test/2/0");})
	.then(function(val){console.log(val);return fm.mkdir("./test/2/1");})
	.then(function(val){console.log(val);return fm.ls("./test");})
	.then(function(val){console.log(val);return fm.find("./test");})
	.then(function(val){console.log(val);return fm.rm("./test");})
	.then(function(val){console.log(val);return fm.find("./");})
	.then(function(val){console.log(val);return fm.mkdir("./test");})
	.then(function(val){console.log(val);return fm.cd("./test");})
	.then(function(val){console.log(val);return fm.touch("./0.txt");})
	.then(function(val){console.log(val);return fm.touch("./1.txt");})
	.then(function(val){console.log(val);return fm.touch("./2.txt");})
	.then(function(val){console.log(val);return fm.touch("./3.txt");})
	.then(function(val){console.log(val);return fm.ls("./");})
	.then(function(val){console.log(val);return fm.setcontents("./0.txt",li.paragraph(32));})
	.then(function(val){console.log(val);return fm.setcontents("./1.txt",li.paragraph(64));})
	.then(function(val){console.log(val);return fm.setcontents("./2.txt",li.paragraph(128));})
	.then(function(val){console.log(val);return fm.setcontents("./3.txt",li.paragraph(256));})
	.then(function(val){console.log(val);return fm.ls("./");})
	.then(function(val){console.log(val);return fm.cat("./0.txt");})
	.then(function(val){console.log(val);return fm.cat("./1.txt");})
	.then(function(val){console.log(val);return fm.cat("./2.txt");})
	.then(function(val){console.log(val);return fm.cat("./3.txt");})
	.then(function(val){console.log(val);return fm.cd("../");})
	.then(function(val){console.log(val);return fm.pwd();})
	.then(function(val){console.log(val);return fm.rm("./test");})
	.then(function(val){console.log(val);})
	.catch(function (e) {
		console.error(e);
	})
	.done();
});

