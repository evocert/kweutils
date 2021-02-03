<@
	var GOJA={};
	var document=null;
	var window=null;
	//configpath="/kweutils/lib/config.goja.js";
	configpath="../../../config.goja.js";
	require([configpath],function(){require([
		"request",
		"idutils",
		"kwe.filemanager"
	],function(
		req,
		idutils,
		FileManager,
	){
		try{
			function validate(args){
				return true;
			}
			var ROOT="/";///home/skullquake";
			var actions={
				GetDirContents:function(args){
					var path=[ROOT];
					args.pathInfo.forEach(function(pathcomponent){
						path.push(pathcomponent.name);
					});
					path=path.join('/');
					if(path.indexOf("//")==0)path=path.substring(1);
					return{
						"success": true,
						"errorId": null,
						"errorText": "",
						"result": (function(){
							var ret=[];
							function cmp(a,b){
								if(a.Name>b.Name)return 1;
								return -1;
							};
							function populate(item){
								var obj={};
								//issue: need unique key
								//issue: need key consistent between requests
								//need something seperate for root folder and folder created inside with same name
								obj.key=item.Name;//idutils.uuidv4();//item.Name;
								//obj.key=item.Name;
								obj.name=item.Name;
								obj.size=item.Size;
								obj.isDirectory=item.Type=="Dir";
								obj.hasSubDirectories=item.Type=="Dir";
								ret.push(obj);
							}
							var fm=new FileManager({cwd:path});
							var entries=fm.ls().entries;
							var arrdir=entries.filter(function(a){return a.Type=="Dir"}).sort(cmp);
							var arrreg=entries.filter(function(a){return a.Type!="Dir"}).sort(cmp);
							arrdir.sort(cmp);
							arrreg.sort(cmp);
							arrdir.forEach(populate);
							arrreg.forEach(populate);
							return ret.length>0?ret:null;
						})()
					}
				},
				GetFileContents:function(args){
					console.Log("GetFileContents:function(args){");
					console.Log(JSON.stringify(args));
					var path=[ROOT];
					args.pathInfo.forEach(function(pathcomponent){
						path.push(pathcomponent.name);
					});
					path=path.join('/');
					if(path.indexOf("//")==0)path=path.substring(1);
					try{
						var contents=fsutils.File2String(path);
						ret={
							"success":true,
							"errorId":null,
							"errorText":"",
							"result":contents
						}
					}catch(e){
						ret={
							"success":false,
							"errorId":null,
							"errorText":"Failed to create folder"
						}
					}
					return ret;
				},
				SetFileContents:function(args){
					console.Log("SetFileContents:function(args){");
					console.Log(JSON.stringify(args));
					var path=[ROOT];
					args.pathInfo.forEach(function(pathcomponent){
						path.push(pathcomponent.name);
					});
					path=path.join('/');
					var value=args.value;
					if(path.indexOf("//")==0)path=path.substring(1);
					try{
						fsutils.String2File(path,value);
						ret={
							"success":true,
							"errorId":null,
							"errorText":"",
							"result":[value.length," bytes saved"].join("")
						}
					}catch(e){
						ret={
							"success":false,
							"errorId":null,
							"errorText":"Failed to create folder"
						}
					}
					return ret;
				},

				CreateDir:function(args){
					var ret={}
					try{
						var path=[ROOT];
						args.pathInfo.forEach(function(pathcomponent){
							path.push(pathcomponent.name);
						});
						path.push(args.name);
						path=path.join('/');
						var fm=new FileManager({cwd:path});
						var fmcrtres=fm.mkdir(path);
						if(fmcrtres.created==true){
							ret={
								"success": true,
								"errorId": null,
								"errorText": ""
							}
						}else{
							ret={
								"success": false,
								"errorId": null,
								"errorText": "Failed to create folder"
							}
						}
					}catch(e){
						ret={
							"success": false,
							"errorId": null,
							"errorText": e.toString()
						}
					}
					return ret;
				},
				CreateFile:function(args){
					console.Log(JSON.stringify(args));
					var ret={}
					try{
						var path=[ROOT];
						args.pathInfo.forEach(function(pathcomponent){
							path.push(pathcomponent.name);
						});
						directory=path.join('/');
						if(directory.indexOf("//")==0)directory=directory.substring(1);
						console.Log(directory);
						path.push(args.name);
						path=path.join('/');
						if(path.indexOf("//")==0)path=path.substring(1);
						console.Log(path);
						var fm=new FileManager({cwd:directory});
						var exists=fm.ls(directory).entries.find(function(entry){
							console.Log(entry.Name);
							console.Log(args.name);
							return entry.Name==args.name;}
						)!=null;
						console.Log(exists);
						if(!exists){
							var fmcrtres=fm.touch(path,'');
							console.Log(JSON.stringify(fmcrtres));
							if(fmcrtres.created==true){
								ret={
									"success": true,
									"errorId": null,
									"errorText": ""
								}
							}else{
								ret={
									"success": false,
									"errorId": null,
									"errorText": "Failed to create file"
								}
							}
						}else{
							ret={
								"success": false,
								"errorId": null,
								"errorText": "File already exists"
							}
						}
					}catch(e){
						ret={
							"success": false,
							"errorId": null,
							"errorText": e.toString()
						}
					}
					return ret;
				},
				Remove:function(args){
					var ret={}
					try{
						var path=[ROOT];
						args.pathInfo.forEach(function(pathcomponent){
							path.push(pathcomponent.name);
						});
						//path.push(args.name);
						path=path.join('/');
						var fm=new FileManager({cwd:path});
						var fmcrtres=fm.rm(path);
						if(fmcrtres.removed==true){
							ret={
								"success": true,
								"errorId": null,
								"errorText": ""
							}
						}else{
							ret={
								"success": false,
								"errorId": null,
								"errorText": "Failed to create folder"
							}
						}
					}catch(e){
						ret={
							"success": false,
							"errorId": null,
							"errorText": e.toString()
						}
					}
					return ret;
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
