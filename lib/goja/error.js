define("Error",[],function(){
	var Error=function(){
		messageP=messageP==null?"":messageP;
		this.message=messageP;
		this.name="stub";
		this.lineNumber=-1;
	};
	return Error;
});
