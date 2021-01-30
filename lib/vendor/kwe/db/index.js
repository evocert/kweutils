define([
	"module"
],function(
	module
){
	function query(alias,query,args,onColumns,onRows){
		//QuerySettings - map[string]interface{} settings wrapper for Query
		//// settings :
		//// alias -  cn alias
		//// query -  statement
		//// args - [] slice of arguments
		//// success - func(r) event when ready
		//// error - func(error) event when encountering an error
		//// finalize - func() final wrapup event
		//// repeatable - true keep underlying stmnt open and allows for repeating query
		//// script - script handle
		//console.Log("query:start");
		//console.Log([alias,query,JSON.stringify(args)].join(','));
		try{
			var r=dbms.QuerySettings({
				alias:alias,
				query:query,
				success:function(r){
					//console.Log("query:success");
					r.OnColumns=function(cls,clstpes) {
						//console.Log("OnColumns:start");
						if(onColumns){
							onColumns(cls.Columns());
						}else{
							cls.Columns().forEach(function(col,colidx){
								console.Log([colidx,col].join(':'));
							});
						}
						//console.Log("OnColumns:end");
					};
					r.OnRow=function(data) {
						//console.Log("OnRow:start");
						if(onRows)onRows(r.Data());else
						r.Data().forEach(function(val,nr){
							//console.Log([nr,val].join(':'));
						});
						//console.Log("OnRow:end");
					};
					r.OnFinalize=function(){
						//console.Log("query:success:OnFinalize:start");
						//console.Log("query:success:OnFinalize:end");
					};
				},
				error:function(err){//@efert: error does not seem to trigger on invalid sql
					//console.Log("query:error");
					console.Log(err.toString);
				},
				finalize:function(){//@efert: probably in success callback and not here
					//console.Log("query:finalize:start");
					//console.Log("query:finalize:end");
				},
				args:args,
				//repeatable:true,
				repeatable:true,
				script:script
			});
			//while(r.Next());
			//r.Close();
		}catch(e){
			//console.Log("query:error");
			console.Log(e.message);
		}
		while(r.Next());
		r.Close();
		//console.Log("query:end");
		//console.Log("----------------------------------------");
	}
	function exec(alias,query,args){
		//ExecuteSettings - map[string]interface{} settings wrapper for Execute
		//// settings :
		//// alias -  cn alias
		//// query -  statement
		//// args - [] slice of arguments
		//// success - func(r) event when ready
		//// error - func(error) event when encountering an error
		//// finalize - func() final wrapup event
		//// repeatable - true keep underlying stmnt open and allows for repeating query
		//// script - script handle
		//console.Log("exec:start");
		//console.Log([alias,query,JSON.stringify(args)].join(','));
		try{
			var r=dbms.ExecuteSettings({
				alias:alias,
				query:query,
				script:script,
				success:function(r){
					//console.Log("exec:done");
				},
				error:function(err){
					//console.Log("exec:error:");
					console.Log(err.toString);
				},
				finalize:function(){
					//console.Log("exec:finalize");
				},
				//repeatable:true,
				repeatable:true,//false,
				args:args
			});
			//r.Commit();
			//r.Close();
			return r;

		}catch(e){
			//console.Log("exec:error");
			console.Log(e.message);
		}
		//console.Log("exec:end");
		//console.Log("----------------------------------------");
	}
	module.exports={
		"query":query,
		"exec":exec
	};
});


