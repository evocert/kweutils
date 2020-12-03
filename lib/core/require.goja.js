if(typeof(require)=='undefined')(function(ctx){
	mkrequire=function(){//function factory(used again by define)
		return function(pbuf_,cb){//functor
			var pbuf=(typeof(pbuf_)=='string')?[pbuf_]:pbuf_;
			try{
				
				pbuf.forEach(function(p){
					if(require.pmap[p]==null){
						var path=[
							require.options.baseUrl==null?"":require.options.baseUrl,
							require.options.paths[p]==null?p:require.options.paths[p],
							(require.options.urlArgs==null||require.options.urlArgs==''?'':('?cachebust='+require.options.urlArgs))
						].join('');
						path=[
							path,
							(require.options.defaultExtension!=null&&require.options.defaultExtension!='')?
								(
									path.lastIndexOf(require.options.defaultExtension)==-1?
									require.options.defaultExtension:
									''
								):
								''
						].join('');
						console.Log("require: buffering    "+p+" -> "+path);
						require.pmap[p]=eval(fsutils.File2String(path))
					}else{
						console.Log("require: not buffered "+p);
					}
				});
				switch(typeof(cb)){
					case 'function':
						var args=[];
						for(var i=0;i<pbuf.length;i++){
							args.push(require.pmap[pbuf[i]]);
						}
						return cb.apply(this,args);
						break;
					default:
						break;
				}
				return this;
			}catch(e){
				throw(e);
			}
		}
	};
	var require=mkrequire();
	require.pmap={};//pathmap
	require.defined=function(k){//test member defined
		return require.pmap[k]!=null;
	}
	require.undef=function(k){//undefine member
		if(require.defined(k)){
			delete require.pmap[k];
			return true;
		}
		return false;
	}
	require.options={
		urlArgs:null,
		baseUrl:null,
	};
	require.config=function(options){
		options=options==null?{}:options;
		require.options=options;
		require.options.defaultExtension=require.options.defaultExtension==null?'.js':require.options.defaultExtension;//custom
		require.options.baseUrl=require.options.baseUrl==null?'':require.options.baseUrl;
		require.options.urlArgs=require.options.urlArgs==null?'':require.options.urlArgs;
		require.options.paths=require.options.paths==null?{}:require.options.paths;
		require.options.map=require.options.map==null?{}:require.options.map;
		require.options.shim=require.options.shim==null?{}:require.options.shim;
	}
	var define=mkrequire();
	define.amd={};
	var requirejs=require;
	ctx.require=require;
	ctx.define=define;
})(this);
