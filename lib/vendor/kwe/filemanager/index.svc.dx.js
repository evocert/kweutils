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
			var actions={
				GetDirContents:function(args){
					var path=['/'];
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
								obj.key=idutils.uuidv4();//item.Name;
								//obj.key=item.Name;
								obj.name=item.Name;
								obj.size=item.Size;
								obj.isDirectory=item.Type=="Dir";
								obj.hasSubDirectories=item.Type=="Dir";
								ret.push(obj);
							}
							var fm=new FileManager({cwd:path});
							var entries=fm.ls().entries;
							console.Log('xxxxxxxxxxxxxxxxxxxx');
							console.Log(path);
							console.Log(JSON.stringify(entries));
							console.Log('xxxxxxxxxxxxxxxxxxxx');
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
				CreateDir:function(args){
					var ret={}
					try{
						var path=['/'];
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
				//http://localhost:1030/kweutils/lib/vendor/kwe/filemanager/index.svc.dx.js?command=Remove&arguments=%7B%22pathInfo%22%3A%5B%7B%22key%22%3A%22tmp%22%2C%22name%22%3A%22tmp%22%7D%2C%7B%22key%22%3A%22asdf%22%2C%22name%22%3A%22asdf%22%7D%2C%7B%22key%22%3A%22asdf%22%2C%22name%22%3A%22asdf%22%7D%5D%2C%22isDirectory%22%3Atrue%7D
				Remove:function(args){
					var ret={}
					try{
						var path=['/'];
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
