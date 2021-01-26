define([
	"module",
],function(
	module
){
	function SrvCommand(options){
		options=options==null?{}:options;
		if(options.path==null||options.path=="")throw "No path";
		options.args=options.args?options.args:[];
		options.timeout=options.timeout?options.timeout:0;
		options.defaultcb=typeof(options.defaultcb)=='function'?options.defaultcb:null;
		this.path=options.path;
		this.args=options.args;
		this.timeout=options.timeout;
		this.defaultcb=options.defaultcb;
		this.cmd=newcommand(this.path,this.args);
		this.cmd.SetReadTimeout(this.timeout);
		this.lastinput=null;
		this.lastcallback=null;
		this.execbuf=[];
	}
	SrvCommand.prototype.exec=function(input,callback){
		if(!this.cmd){
			this.cmd=newcommand(path,args);
			this.cmd.SetReadTimeout(timeout);
		}
		this.cmd.Println(input);
		this.execbuf.push({
			input:input,
			callback:callback
		})
		if(typeof(callback)!='undefined'&&callback==null)return;//to skip reading
		var line=this.cmd.ReadAll();
		if(typeof(callback)=='function')callback(line,input);
		else if(typeof(this.defaultcb)=='function')this.defaultcb(line,input);
		this.lastinput=input;
		this.lastcallback=callback;
	}
	SrvCommand.prototype.flush=function(){
		if(this.cmd)this.cmd.ReadAll();
	}
	SrvCommand.prototype.pop=function(){
		return this.execbuf.pop();
	}
	SrvCommand.prototype.rerun=function(idx){
		idx=typeof(idx)=='number'?idx:this.execbuf.length-1;
		idx=idx<0?(this.execbuf.length-1-Math.abs(idx)):idx;
		for(var i=idx;i<this.execbuf.length;i++){
			var input=this.execbuf[i].input;
			var callback=this.execbuf[i].callback;
			if(!this.cmd){
				this.cmd=newcommand(path,args);
				this.cmd.SetReadTimeout(timeout);
			}
			this.cmd.Println(input);
			var line=this.cmd.ReadAll();
			if(typeof(callback)=='function')callback(line,input);
			else if(typeof(this.defaultcb)=='function')this.defaultcb(line,input);
		}
	}
	SrvCommand.prototype.settimeout=function(timeout){
		timeout=timeout?timeout:0;
		this.timeout=timeout;
	}
	SrvCommand.prototype.close=function(){
		if(this.cmd)this.cmd.Close();
		this.cmd=null;
	}
	module.exports=SrvCommand;
});
