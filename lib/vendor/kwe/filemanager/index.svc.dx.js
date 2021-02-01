<@
	var GOJA={};
	var document=null;
	var window=null;
	//configpath="/kweutils/lib/config.goja.js";
	configpath="../../../config.goja.js";
	require([configpath],function(){require([
		"request",
		"kwe.filemanager"
	],function(
		req,
		FileManager,
	){
		try{
			/*
			function validate(args){
				return 	typeof(args)=="object"&&
					typeof(args.cwd)=="string"
				;
			}
			var actions={
				pwd:function(args){
					var fm=new FileManager({cwd:args.cwd});
					return fm.pwd();
				},
				ls:function(args){
					var fm=new FileManager({cwd:args.cwd});
					return fm.ls(args.path);
				},
				find:function(args){
					var fm=new FileManager({cwd:args.cwd});
					return fm.ls(args.path);
				},
				cd:function(args){
					var fm=new FileManager({cwd:args.cwd});
					return fm.cd(args.path);
				},

				find:function(args){
					var fm=new FileManager({cwd:args.cwd});
					return fm.find(args.path);
				},
				mkdir:function(args){
					var fm=new FileManager({cwd:args.cwd});
					return fm.mkdir(args.path);
				},
				cat:function(args){
					var fm=new FileManager({cwd:args.cwd});
					return fm.cat(args.path);
				},
				rm:function(args){
					var fm=new FileManager({cwd:args.cwd});
					return fm.rm(args.path);
				},
				touch:function(args){
					var fm=new FileManager({cwd:args.cwd});
					return fm.touch(args.path);
				},
				setcontents:function(args){
					var fm=new FileManager({cwd:args.cwd});
					return fm.setcontents(args.path,args.contents);
				}
			};
			var ret={};
			var t0=new Date();
			if(req.data().action==null){
				ret={"error":"no action specfied"};
			}else if(req.data().args==null){
				ret={"error":"arguments"};
			}else if(actions[req.data().action]!=null){
				if(validate(req.data().args)){
					ret=actions[req.data().action](req.data().args);
				}else{
					ret={"error":"invalid arguments"};
				}
			}else{
				ret={"error":"action not found"};
			}
			var t1=new Date();
			ret.dur=(t1-t0);
			request.ResponseHeader().Set("Content-Type","application/json");
			print(JSON.stringify(ret,0,2));
			*/
			//https://js.devexpress.com/Demos/Mvc/api/file-manager-file-system-images?command=GetDirContents&arguments=%7B%22pathInfo%22%3A%5B%5D%7D&_=1612176563748
			/*
			var res=
				{
					"success": true,
					"errorId": null,
					"errorText": "",
					"result": [
						{
							"key": "Poefies",
							"name": "Poefies",
							"dateModified": "2019-10-25T11:01:24.2610438Z",
							"isDirectory": true,
							"size": 0,
							"hasSubDirectories": true
						},
						{
							"key": "Contacts",
							"name": "Contacts",
							"dateModified": "2021-01-23T13:46:39.2019136Z",
							"isDirectory": true,
							"size": 0,
							"hasSubDirectories": false
						},
						{
							"key": "Landscapes",
							"name": "Landscapes",
							"dateModified": "2021-01-23T13:46:39.2800305Z",
							"isDirectory": true,
							"size": 0,
							"hasSubDirectories": false
						},
						{
							"key": "Portraits",
							"name": "Portraits",
							"dateModified": "2021-01-23T13:46:44.4050195Z",
							"isDirectory": true,
							"size": 0,
							"hasSubDirectories": false
						},
						{
							"key": "Widescreen",
							"name": "Widescreen",
							"dateModified": "2021-01-23T13:46:44.4362667Z",
							"isDirectory": true,
							"size": 0,
							"hasSubDirectories": false
						}
					]
				}
			;
			request.ResponseHeader().Set("Content-Type","application/json");
			print(JSON.stringify(res));
			//https://js.devexpress.com/Demos/Mvc/api/file-manager-file-system-images?command=GetDirContents&arguments=%7B%22pathInfo%22%3A%5B%7B%22key%22%3A%22Widescreen%22%2C%22name%22%3A%22Widescreen%22%7D%5D%7D&_=1612176563749
			*/


			function validate(args){
				return true;
			}
			var actions={
				GetDirContents:function(args){
					console.Log('GetDirContents:');
					console.Log(JSON.stringify(args));
					var path=['/'];
					args.pathInfo.forEach(function(pathcomponent){
						path.push(pathcomponent.key);
					});
					path=path.join('/');
					console.Log(path);
					return{
						"success": true,
						"errorId": null,
						"errorText": "",
						"result": (function(){
							var ret=[];
							var fm=new FileManager({cwd:path});
							fm.cd(path);
							//todo:sort
							fm.ls().entries.forEach(function(item){
								var obj={};
								obj.key=item.Name;
								obj.name=item.Name;
								obj.size=item.Size;
								obj.isDirectory=item.Type=="Dir";
								obj.hasSubDirectories=item.Type=="Dir";
								ret.push(obj);
							});
							/*
							ret.push({
								"key": "Poefies",
								"name": "Poefies",
								"dateModified": "2019-10-25T11:01:24.2610438Z",
								"isDirectory": true,
								"size": 0,
								"hasSubDirectories": true
							});
							*/
							return ret;
						})()
							/*[
							{
								"key": "Poefies",
								"name": "Poefies",
								"dateModified": "2019-10-25T11:01:24.2610438Z",
								"isDirectory": true,
								"size": 0,
								"hasSubDirectories": true
							},
							{
								"key": "Contacts",
								"name": "Contacts",
								"dateModified": "2021-01-23T13:46:39.2019136Z",
								"isDirectory": true,
								"size": 0,
								"hasSubDirectories": false
							},
							{
								"key": "Landscapes",
								"name": "Landscapes",
								"dateModified": "2021-01-23T13:46:39.2800305Z",
								"isDirectory": true,
								"size": 0,
								"hasSubDirectories": false
							},
							{
								"key": "Portraits",
								"name": "Portraits",
								"dateModified": "2021-01-23T13:46:44.4050195Z",
								"isDirectory": true,
								"size": 0,
								"hasSubDirectories": false
							},
							{
								"key": "Widescreen",
								"name": "Widescreen",
								"dateModified": "2021-01-23T13:46:44.4362667Z",
								"isDirectory": true,
								"size": 0,
								"hasSubDirectories": false
							}
						]*/
					}
				}

			};
			var ret={};
			var t0=new Date();
			if(req.data().command==null){
				ret={"error":"no action specfied"};
			}else if(req.data().arguments==null){
				ret={"error":"arguments"};
			}else if(actions[req.data().command]!=null){
				if(validate(req.data().arguments)){
					ret=actions[req.data().command](req.data().arguments);
				}else{
					ret={"error":"invalid arguments"};
				}
			}else{
				ret={"error":"action not found"};
			}
			var t1=new Date();
			ret.dur=(t1-t0);
			request.ResponseHeader().Set("Content-Type","application/json");
			print(JSON.stringify(ret,0,2));


		}catch(e){
			request.ResponseHeader().Set("Content-Type","application/json");
			print(JSON.stringify({"error":e.toString()}));
		}
	});});
@>
