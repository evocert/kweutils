<@
	//vdom
	var GOJA={};
	var document=null;
	var window=null;
	try{
		//portability
		//var configpath="./www/kweutils/lib/config.goja"
		//@efert:
		//runtime error: slice bounds out of range [974:0]
		/*
		*/
require=null;
requirejs=null;
define=null;
eval(fsutils.File2String("./www/kweutils/lib/vendor/requirejs/require.evocert.js"));

		var configpath="/kweutils/lib/config.goja.js"
		console.Log("svc_fs:start");
		//var configpath="./www/kweutils/lib/config.goja.js"
		require([configpath],function(){
			require([
				'request',
				'pathutils'
			],function(
				r,
				pathutils
			){
				try{
					BASEPATH="./www/kweutils";
					var actions={
						ls:function(args){
							if(args.path==null){
								return {"error":"args.path null"}
							}else{
								var path=(args.path.startsWith("/")||args.path[1]==":")?args.path:[BASEPATH,args.path].join('/');
								try{
									var entries=fsutils.List(path);
									var ret=[];
									entries.forEach(function(entry){
										var entryout={};
										entry.path=pathutils.normalizepath(entry.Path);
										Object.keys(entry).forEach(function(k){
											entryout[k.toLowerCase()]=entry[k];
										});
										if(entry.Type=="Dir"){
											try{
												var subdir=fsutils.List(entry.Path)
												subdir.forEach(function(subdirentry){
													if(subdirentry.Name.startsWith('.favicon')){
														entryout.favicon=subdirentry.Name;
													}else if(subdirentry.Name=='.preview.js'){
														entryout.preview=subdirentry.Name;
													}
												});
											}catch(e){
												//console.log('favicon not found');
											}
										}else if(entry.Type=="File"){
											/*
											try{
												var subdir=fsutils.List(entry.Path)
												subdir.forEach(function(subdirentry){
													if(subdirentry.Name=='.preview.js')
														entryout.preview=subdirentry.Name;
												});
											}catch(e){
												//console.log('favicon not found');
											}
											*/

										}
										ret.push(entryout);
									});
									return ret;//entries;
								}catch(e){
									return {"error":"Failed to ls "+path+": "+e.toString()};
								}
							}
							return {"msg":"ls stub"}
						},
						find:function(args){
							if(args.path==null){
								return {"error":"args.path null"}
							}else{
								var path=[BASEPATH,args.path].join('/');
								try{
									var entries=fsutils.Walk(path);
									var ret=[];
									entries.forEach(function(entry){
										var entryout={};
										entry.path=pathutils.normalizepath(entry.Path);
										Object.keys(entry).forEach(function(k){
											entryout[k.toLowerCase()]=entry[k];
										});
										ret.push(entryout);
									});
									return ret;//entries;
								}catch(e){
									return {"error":"Failed to ls "+path+": "+e.toString()};
								}
							}
							return {"msg":"ls stub"}
						},
						cat:function(args){
							if(args.path==null){
								return {"error":"args.path null"}
							}else{
								var path=[BASEPATH,args.path].join('/');
								try{
									return fsutils.File2String(path);
								}catch(e){
									return {"error":"Failed to cat "+path+": "+e.toString()};
								}
							}
							return {"msg":"ls stub"}
						}
					};
					if(r.data().action==null){
						println(JSON.stringify({"error":"no action specfied"}))
						return false;
					}else if(r.data().args==null){
						println(JSON.stringify({"error":"arguments"}))
						return false;
					}else if(actions[r.data().action]!=null){
						var ret=actions[r.data().action](r.data().args);
						request.ResponseHeader().Set("Content-Type","application/json");//???
						println(JSON.stringify(ret,0,2));
					}else{
						println('action not found');
					}
				}catch(e){
					console.error(e.toString());
				}
			});
		});
	}catch(e){
		console.Log(e.toString());
	}
@>
