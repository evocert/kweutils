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
			function validate(args){
				return true;
			}
			var actions={
				GetDirContents:function(args){
					var path=['/'];
					args.pathInfo.forEach(function(pathcomponent){
						path.push(pathcomponent.key);
					});
					path=path.join('/');
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
								obj.key=item.Name;
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
							return ret;
						})()
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
