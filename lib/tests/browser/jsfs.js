//A (small) filesystem stored in the browser's LocalStorage
//https://github.com/nathancarter/jsfs
//https://github.com/nathancarter/jsfs/blob/master/jsfs.litcoffee#cd
define([
	"module",
	"jsfs",
],function(
	module,
	FileSystem
){
	console.log([module.id,'start'].join(':'));
	console.log(FileSystem);
	var F=new FileSystem("jsfs0");
	{
		console.log(F);
		var reportObject=(function(){
			var tbl=[];
			var cols=["col0","col1","col2","col3",];
			var nrows=32;
			tbl.push(cols);
			for(var i=0;i<nrows;i++){
				var row=[];
				cols.forEach(function(col,colidx){
					row.push(Math.random());
				});
				tbl.push(row);
			}
			return tbl;
		})();
		F.write( "tps_report.txt", reportObject );
	}
	{
		var reloaded = F.read( "tps_report.txt" );
		console.log(reloaded);
	}
	{//basic operations
		F.mkdir("/tmp");
		F.cd("/tmp");
		F.mkdir("test0");
		F.mkdir("test1");
		F.mkdir("test2");
		F.mkdir("test3");
		F.cd("./test0");
		F.write("./0.txt","0");
		F.write("./1.txt","01");
		F.write("./2.txt","012");
		F.write("./3.txt","0123");
		console.log(F.ls("./"));
		console.log(F.ls("/"));
		console.log(F.read("./0.txt"));
		console.log(F.read("./1.txt"));
		console.log(F.read("./2.txt"));
		console.log(F.read("./3.txt"));
		console.log(F.size("./0.txt"));
		console.log(F.size("./1.txt"));
		console.log(F.size("./2.txt"));
		console.log(F.size("./3.txt"));
		F.append("./3.txt","0");
		F.append("./2.txt","01");
		F.append("./1.txt","012");
		F.append("./0.txt","0123");
		console.log(F.read("./0.txt"));
		console.log(F.read("./1.txt"));
		console.log(F.read("./2.txt"));
		console.log(F.read("./3.txt"));
		console.log(F.size("./0.txt"));
		console.log(F.size("./1.txt"));
		console.log(F.size("./2.txt"));
		console.log(F.size("./3.txt"));
		F.rm("./0.txt");
		F.rm("./1.txt");
		console.log(F.ls("./"));
		F.rm("./2.txt");
		F.rm("./3.txt");
		console.log(F.ls("./"));
		F.write("./0.txt","0");
		F.write("./1.txt","01");
		F.cp("./0.txt","./2.txt");
		F.cp("./1.txt","./3.txt");
		console.log(F.ls("./"));
		console.log(F.read("./0.txt"));
		console.log(F.read("./1.txt"));
		console.log(F.read("./2.txt"));
		console.log(F.read("./3.txt"));
		F.cd("../");
		console.log(F._cwd);
		console.log(F.ls());
		F.cd("./test1");
		F.write("./0.txt","0");
		F.write("./1.txt","01");
		console.log(F.ls());
		F.mv("./0.txt","./a.txt");
		F.mv("./1.txt","./b.txt");
		console.log(F.ls());
	}
});
