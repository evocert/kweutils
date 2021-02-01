//todo: work out bulk execute
//use axios.all on for bulk executes for
//      kwe.filemanager.ls
//      kwe.filemanager.find
//      kwe.filemanager.mkdir
//      kwe.filemanager.touch
//      kwe.filemanager.setcontents
//      kwe.filemanager.rm
//      kwe.filemanager.cat
//also create bulk management in service handler
//this will be more appropriate and faster
//bulk execute will not be appropriate for cd for axios.all,
//but will be appropriate for service handler
define([
	"module",
	"axios"
],function(
	module,
	axios
){
	"use strict";
	var svcurl=<@print(JSON.stringify(
		[
			action().Path().substring(0,action().Path().lastIndexOf("/")),
			"index.svc.js"
		].join("/")
	));@>;
	function FileManager(options){
		options=typeof(options)=="object"?options:{};
		options.cwd=typeof(options.cwd)=="string"?options.cwd:"./";
		this.cwd=options.cwd;
		this.headers={};
		this.ls=function(path){
			path=typeof(path)=="undefined"?"./":path;
			return new Promise(
				function(resolve,reject){
					axios({
						method:"post",
						url:svcurl,
						data:{
							action:"ls",
							args:{cwd:this.cwd,path:path}
						},
						headers:this.headers
					}).then(function(response){
						if(!response.data.error){
							resolve(response.data.entries);
						}else{
							reject(response.data.error);
						}
					});
				}.bind(this),
				function(error){
					console.log(error);
					reject(error);
				});
		};
		this.find=function(path){
			path=typeof(path)=="undefined"?"./":path;
			return new Promise(
				function(resolve,reject){
					axios({
						method:"post",
						url:svcurl,
						data:{
							action:"find",
							args:{cwd:this.cwd,path:path}
						},
						headers:this.headers
					}).then(function(response){
						if(!response.data.error){
							resolve(response.data.entries);
						}else{
							reject(response.data.error);
						}
					});
				}.bind(this),
				function(error){
					console.log(error);
					reject(error);
				});
		};
		this.pwd=function(){
			return new Promise(
				function(resolve,reject){
					axios({
						method:"post",
						url:svcurl,
						data:{
							action:"pwd",
							args:{cwd:this.cwd}
						},
						headers:this.headers
					}).then(function(response){
						if(!response.data.error){
							resolve(response.data.cwd);
						}else{
							reject(response.data.error);
						}
					}.bind(this));
				}.bind(this),
				function(error){
					console.log(error);
					reject(error);
				}
			);
		};
		this.mkdir=function(path){
			if(typeof(path)!="string")throw("Invalid path");
			return new Promise(
				function(resolve,reject){
					axios({
						method:"post",
						url:svcurl,
						data:{
							action:"mkdir",
							args:{cwd:this.cwd,path:path}
						},
						headers:this.headers
					}).then(function(response){
						if(!response.data.error){
							resolve(response.data.created);
						}else{
							reject(response.data.error);
						}
					}.bind(this));
				}.bind(this),
				function(error){
					console.log(error);
					reject(error);
				}
			);
		};
		this.rm=function(path){
			if(typeof(path)!="string")throw("Invalid path");
			return new Promise(
				function(resolve,reject){
					axios({
						method:"post",
						url:svcurl,
						data:{
							action:"rm",
							args:{cwd:this.cwd,path:path}
						},
						headers:this.headers
					}).then(function(response){
						if(!response.data.error){
							resolve(response.data.removed);
						}else{
							reject(response.data.error);
						}
					}.bind(this));
				}.bind(this),
				function(error){
					console.log(error);
					reject(error);
				}
			);
		};
		this.touch=function(path){
			if(typeof(path)!="string")throw("Invalid path");
			return new Promise(
				function(resolve,reject){
					axios({
						method:"post",
						url:svcurl,
						data:{
							action:"touch",
							args:{cwd:this.cwd,path:path}
						},
						headers:this.headers
					}).then(function(response){
						if(!response.data.error){
							resolve(response.data.created);
						}else{
							reject(response.data.error);
						}
					}.bind(this));
				}.bind(this),
				function(error){
					console.log(error);
					reject(error);
				}
			);
		};
		this.setcontents=function(path,contents){
			if(typeof(path)!="string")throw("Invalid path");
			if(typeof(contents)!="string")throw("Invalid contents");
			return new Promise(
				function(resolve,reject){
					axios({
						method:"post",
						url:svcurl,
						data:{
							action:"setcontents",
							args:{cwd:this.cwd,path:path,contents:contents}
						},
						headers:this.headers
					}).then(function(response){
						if(!response.data.error){
							resolve(response.data.updated);
						}else{
							reject(response.data.error);
						}
					}.bind(this));
				}.bind(this),
				function(error){
					console.log(error);
					reject(error);
				}
			);
		};
		this.cat=function(path){
			if(typeof(path)!="string")throw("Invalid path");
			return new Promise(
				function(resolve,reject){
					axios({
						method:"post",
						url:svcurl,
						data:{
							action:"cat",
							args:{cwd:this.cwd,path:path}
						},
						headers:this.headers
					}).then(function(response){
						if(!response.data.error){
							resolve(response.data.contents);
						}else{
							reject(response.data.error);
						}
					}.bind(this));
				}.bind(this),
				function(error){
					console.log(error);
					reject(error);
				}
			);
		};
		this.cd=function(path){
			path=typeof(path)=="undefined"?"./":path;
			return new Promise(
				function(resolve,reject){
					axios({
						method:"post",
						url:svcurl,
						data:{
							action:"cd",
							args:{cwd:this.cwd,path:path}
						},
						headers:this.headers
					}).then(function(response){
						if(!response.data.error){
							this.cwd=response.data.cwd;
							resolve(response.data.cwd);
						}else{
							reject(response.data.error);
						}
					}.bind(this));
				}.bind(this),
				function(error){
					console.log(error);
					reject(error);
				}
			);
		};
		this.bulk=function(args){
			return new Promise(
				function(resolve,reject){
					axios.all((function(){
						var ret=[];
						args.forEach(function(arg){
							arg.args.cwd=this.cwd;
							//todo: build axios posts
							ret.push(axios({
								method:"post",
								url:svcurl,
								data:{
									action:arg.cmd,
									args:arg.args
								},
								headers:this.headers
							}));
						}.bind(this));
						return ret;
					}.bind(this))())
					.then(function(response){
						var data=[];
						response.forEach(function(responseitem){
							data.push(responseitem.data);
						});
						resolve(data);
					});
				}.bind(this),
				function(error){
					console.log(error);
					reject(error);
				}
			);
		}
		this.svcbulk=function(args){
			//todo
		}
	};
	module.exports=FileManager;
});
