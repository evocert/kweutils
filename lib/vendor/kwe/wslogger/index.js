//websocket logger
//logs to server via websocket
define(["module","cyclejs"],function(module,cyclejs){
	function WSLogger(host){
		this.socket=null;
		this.init(host);
		this.msgbuf=[];
		this.connected=false;
		this.sending=false;
		this.wsidx=0;
		this.MAXMSGLEN=2048;
	};
	WSLogger.prototype.init=function(host){
		host=host?host:"ws://"+window.location.host;
		this.socket= new WebSocket(host);
		self=this;
		this.socket.onopen=function(e) {
			self.connected=true;
			if(self.msgbuf.length>0){
				//var msg=self.msgbuf.pop();
				var msg=self.msgbuf.shift();
				self.log(msg);
			}

		};
		this.socket.onmessage=function(event) {
			//console.log("wsdone"+(self.wsidx++));
			self.sending=false;
			if(self.msgbuf.length>0){
				//var msg=self.msgbuf.pop();
				var msg=self.msgbuf.shift();
				self.log(msg);
			}
			/*
			*/

		};
		this.socket.onclose=function(event) {
			self.connected=false;
			if(event.wasClean){
				console.error(event.code);
				console.error(event.reason);
			}else{
				console.error('[close] Connection died');
			}
			//self.init(this.host);
		};
		this.socket.onerror=function(error) {
			//console.error('onerror');
			console.error(error.msg);
		};
	}
	WSLogger.prototype._log=function(msg,lognode){
		if(this.connected&&!this.sending){
			//console.log("wssend");
			this.sending=true;
			var strmsg=JSON.stringify(cyclejs.decycle(msg));
			var msgproc=[
				"#!js",
				"\x3C\x40",
				["console."+lognode+"('",strmsg==null?"":strmsg.substring(0,this.MAXMSGLEN),"');"].join(""),
				"\x40\x3E",
				"#!commit",
				"\r\n"
			].join("\r\n")
			this.socket.send(msgproc);
		}else{
			//console.log("wsbuf");
			this.msgbuf.push(msg);
			//this.init(this.host);
		}
	};
	WSLogger.prototype.log=function(msg){
		this._log(msg,"Log");
	}
	WSLogger.prototype.error=function(msg){
		this._log(msg,"Error");
	}
	WSLogger.prototype.warn=function(msg){
		this._log(msg,"Warn");
	}
	module.exports=WSLogger;
});

