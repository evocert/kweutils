define([
	"Promise",
	"console"
],function(Promise,console){
	return{
		query:function(alias,query,args){
			console.log(alias);
			console.log(query);
			console.log(args);
			return new Promise(function(resolve,reject){
				var t0=new Date();
				var ret={columns:[],rows:[],err:null};
				try{
					var r=dbms.QuerySettings({
						alias:alias,
						query:query,
						success:function(r){
							r.OnColumns=function(cls,clstpes){
								cls.Columns().forEach(function(col,colidx){
									ret.columns.push(col);
								});
							};
							r.OnRow=function(rdr,rownr){
								var row=[];
								r.Data().forEach(function(val,nr){
									row.push(val);
								});
								ret.rows.push(row);
							};
							r.OnFinalize=function(){
							};
							return ret;
						},
						error:function(e){
							ret.err=e;
						},
						finalize:function(){
							ret.duration=(new Date())-t0;
						},
						args:args,
						repeatable:false,//true,
						script:script
					});
				}catch(e){
					ret.err=e;
				}
				console.log(['core','db','query',[JSON.stringify({alias:alias,query:query,args:args}),JSON.stringify(ret)].join(' --> ')].join(':'));
				if(ret.err==null){
					while(r.Next());
					r.Close();
				}
				if(ret.err==null)
					resolve(ret);
				else
					reject(ret.err);
			});
		},
		exec:function (alias,query,args){
			return new Promise(function(resolve,reject){
				var t0=new Date();
				var ret={err:null}
				try{
					var r=dbms.ExecuteSettings({
						alias:alias,
						query:query,
						script:script,
						success:function(r){
						},
						error:function(e){
							ret.err==e;
						},
						finalize:function(){
							ret.duration=(new Date())-t0;
						},
						repeatable:true,//false,
						args:args
					});
					//r.Commit();
					//r.Close();
					resolve(ret);
				}catch(e){
					ret.err=e;
					reject(e);
				}
				console.log(['core','db','exec',[JSON.stringify({alias:alias,query:query,args:args}),JSON.stringify(ret)].join(' --> ')].join(':'));
			});
		}
	};
});
