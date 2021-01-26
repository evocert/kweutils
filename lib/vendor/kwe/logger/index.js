define(["module"],function(module){
	function Logger(){
		this.loggersByName={};
	};
	Logger.prototype.add=function(name,logger){
		if(this.loggersByName[name])
			this.remove(name);
		this.loggersByName[name]=logger;
	};
	Logger.prototype.remove=function(name){
		if(this.loggersByName[name])
			delete this.loggersByName[name]
	};
	Logger.prototype.log=function(message){
		Object.values(this.loggersByName).forEach(function(logger){
			logger.log(message);
		});
	};
	module.exports=new Logger();//instance
});
