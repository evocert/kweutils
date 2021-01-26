//The Command Pattern is conceptually simple but quite versatile. Along with undoing actions, it can be used to retry actions, delay actions, chain actions together, and more!
define(["module"],function(module){
	function Cmder(val){
		this.cmdbuf=[];
		this.val=val?val:0;
		this.execute=function(cmd){
			var ret=null;
			var argbuf={};
			Object.keys(arguments).forEach(function(k,kidx){if(kidx>0)argbuf[k]=arguments[k]})
			var c=new (Function.prototype.bind.apply(cmd,arguments));
			this.cmdbuf.push(c);
			c.cmder=this;
			ret=c.execute();
			return ret;
		}
		this.undo=function(){
			var ret=null;
			var c=this.cmdbuf.pop();
			if(c!=null){ret=c.undo();delete c}
			return ret;
		}
		this.retry=function(){
			//todo: implement correctly
			//	buffer arguments along with commands
			//	call execute with last buffered class instance class and its buffered args
			var ret=null;
			if(this.cmdbuf.length>0){
				var c=this.cmdbuf[this.cmdbuf.length-1];
				ret=c.execute();
			}
			return ret;
		}
	}
	module.exports=Cmder;
});
