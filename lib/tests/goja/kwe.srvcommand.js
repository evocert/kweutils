define([
	"module",
	"console",
	"cyclejs",
	"kwe.srvcommand"
],function(
	module,
	console,
	cyclejs,
	SrvCommand
){
	console.log([module.id,"start"].join(":"));
	try{//basic usage
		var cmd=new SrvCommand({
			"path":"/bin/bash",
			"args":[],
			"timeout":0,
			"defaultcb":function(output,command){console.log([command,output].join(":"))}
		})
		cmd.settimeout(500);
		cmd.exec("printf 'script starting'");
		cmd.exec("printf 'testing repeat'");
		cmd.rerun(0);cmd.rerun(0);cmd.rerun(0);cmd.rerun(0);
		cmd.settimeout(500);
		cmd.exec([
			"for I in `seq 0 1 10`;do",
			"\techo $I",
			"done"
		].join("\n"));
		cmd.settimeout(0);
		for(var i=0;i<4096;i++){
			var line=["TESTVAR_",i,"=",i].join("");
			cmd.exec(line,null);
			cmd.pop();
			console.log(line);
		}
		cmd.flush();
		for(var i=0;i<8;i++){
			var line=["printf \"$TESTVAR_",i,"\""].join("");
			cmd.exec(line);
		}

		cmd.settimeout(500);
		cmd.exec("man -P cat man");


		cmd.settimeout(0);
		cmd.exec("date");
		cmd.exec("time");
		cmd.exec("whoami");
		cmd.exec("pwd");
		cmd.settimeout(200);
		cmd.exec("ls -l /usr/bin");
		cmd.settimeout(100);
		cmd.exec("ps -e",function(output){
			var lines=output.split("\n");
			var processedlines=[];
			lines.forEach(function(line){
				processedlines.push(line.split(/[ ,]+/));
			});
			var objout=[];
			processedlines.forEach(function(line,lineidx){
				if(lineidx==0)return;
				var obj={}
				processedlines[0].forEach(function(col,colidx){
					if(col==""||col==null)return;
					obj[col]=line[colidx];
				});
				objout.push(obj);
			});
			request.ResponseHeader().Set("Content-Type","application/json");
			println(JSON.stringify(objout,0,2));
		});//cmd.close();return;
		cmd.pop();//remove for final re-execution;
		cmd.settimeout(0);
		cmd.exec("cd /tmp");
		cmd.exec("mkdir prj0");
		cmd.exec("cd prj0");
		cmd.exec("mkdir ./src");
		cmd.exec("mkdir ./bin");
		fsutils.String2File(
			"/tmp/prj0/src/a.c",
			[
				'#include<stdio.h>',
				'#include<stdlib.h>',
				'int main(){',
				'\tprintf("%s\\n","Hello world!");',
				(function(){
					srclinebuf=[];
					for(var i=0;i<32;i++){
						srclinebuf.push('\tprintf("%s\\n","test '+i+'");')
					}
					return srclinebuf.join("\n");
				})(),
				'   return EXIT_SUCCESS;',
				'}'
			].join("\n")
		);
		fsutils.String2File(
			"/tmp/prj0/makefile",
			[
				'CC=gcc',
				'SRC=./src/a.c',
				'BIN=./bin/a.out',
				'$(BIN):$(SRC)',
				'\t$(CC) $(SRC) -o $(BIN)',
				'run:$(BIN)',
				'\t$(BIN)',
				''
			].join("\n")
		);
		cmd.settimeout(500);//potentially long running
		cmd.exec("cat makefile")
		cmd.exec("cat ./src/a.c")
		cmd.exec("make")
		cmd.exec("make run&&ls -l ./bin/a.out")
		cmd.settimeout(0);//reset
		cmd.exec("cd /tmp");
		cmd.exec("rm -r ./prj0");
		cmd.exec("mkdir ./tst0");
		cmd.exec("cd ./tst0");
		for(var i=0;i<2;i++){
			cmd.exec("mkdir ./tst"+i);
			cmd.exec("cd ./tst"+i);
			for(var j=0;j<2;j++){
				cmd.exec("mkdir ./tst"+j);
				cmd.exec("cd ./tst"+i);
				for(var k=0;k<2;k++){
					cmd.exec("mkdir ./tst"+k);
				}
				cmd.exec("cd ../");
			}
			cmd.exec("cd ../");
		}
		cmd.exec("find ./tst0");
		cmd.exec("cd /tmp");
		cmd.exec("rm -r /tmp/tst0");
		console.log('----------------------------------------');
		cmd.exec(
			[
				"mkdir -p",
				(function(){
					var buf=["foo","bar","baz"]
					var ret=[]
					buf.forEach(function(name){
						var path=["/tmp","tst0"];
						path.push(name);
						buf.forEach(function(name){
							path.push(name);
							ret.push(path.join("/"));
							buf.forEach(function(name){
								path.push(name);
								ret.push(path.join("/"));
							});
						});
						ret.push(path.join("/"));
					});
					return ret;
				})().join(" ")
			].join(" ")
		)
		cmd.exec("find /tmp/tst0");
		cmd.exec("rm -r /tmp/tst0");
		console.log('----------------------------------------');
		cmd.exec("printf 'test0'");
		cmd.exec("printf 'test1'");
		cmd.exec("printf 'test2'");
		cmd.exec("printf 'test3'");
		console.log('----------------------------------------');
		cmd.rerun();
		console.log('----------------------------------------');
		cmd.rerun(-1);
		console.log('----------------------------------------');
		cmd.rerun(-2);
		console.log('----------------------------------------');
		cmd.rerun(-3);
		console.log('----------------------------------------');
		for(var i=0;i<4;i++){
			cmd.rerun(-3);
			console.log('----------------------------------------');
		}
		console.log('----------------------------------------');
		console.log('REPLAYING ENTIRE SCRIPT...');
		console.log('----------------------------------------');
		cmd.flush();cmd.rerun(0);
		cmd.flush();cmd.rerun(0);
		cmd.flush();cmd.rerun(0);
		cmd.flush();cmd.rerun(0);
		console.log('----------------------------------------');
		cmd.close();
		console.log(cyclejs.decycle(cmd));
	}catch(e){
		println(e.toString());
		cmd?cmd.close():null;
	}
	console.log([module.id,"end"].join(":"));
});
