define([
	"module",
	"console",
	"kwe.command.es5",
],function(
	module,
	console,
	Cmder
){
	{//basic usage
		var cmder=new Cmder(0);
		function CmdNop(userdata){
			this.userdata=userdata;
			this.execute=function(){
				if(this.userdata)console.log(['userdata',JSON.stringify(this.userdata)].join(":"));
			}
			this.undo=function(){
				if(this.userdata)console.log(['userdata',JSON.stringify(this.userdata)].join(":"));
			}
		}

		function CmdInc(){
			this.execute=function(){
				this.cmder.val++;
			}
			this.undo=function(){
				this.cmder.val--;
			}
		}
		function CmdDec(){
			this.execute=function(){
				this.cmder.val--;
			}
			this.undo=function(){
				this.cmder.val++;
			}
		}
		function CmdAdd(val){
			this.val=val;
			this.execute=function(){
				this.cmder.val+=this.val;
			}
			this.undo=function(){
				this.cmder.val-=this.val;
			}
			return this;
		}
		function CmdSub(val){
			this.val=val;
			this.execute=function(){
				this.cmder.val-=this.val;
			}
			this.undo=function(){
				this.cmder.val+=this.val;
			}
		}
		function CmdMul(val){
			this.val=val;
			this.execute=function(){
				this.cmder.val*=this.val;
			}
			this.undo=function(){
				this.cmder.val/=val;
			}
		}
		function CmdDiv(val){
			this.val=val;
			this.execute=function(){
				this.cmder.val/=this.val;
			}
			this.undo=function(){
				this.cmder.val*=val;
			}
		}
		cmder.execute(CmdInc);console.log(cmder.val);
		cmder.execute(CmdInc);console.log(cmder.val);
		cmder.execute(CmdInc);console.log(cmder.val);
		cmder.undo();console.log(cmder.val);
		cmder.undo();console.log(cmder.val);
		cmder.undo();console.log(cmder.val);
		cmder.undo();console.log(cmder.val);
		cmder.execute(CmdAdd,32);console.log(cmder.val);
		cmder.execute(CmdSub,16);console.log(cmder.val);
		cmder.execute(CmdMul,8);console.log(cmder.val);
		cmder.execute(CmdDiv,4);console.log(cmder.val);
		cmder.undo();console.log(cmder.val);
		cmder.undo();console.log(cmder.val);
		cmder.undo();console.log(cmder.val);
		cmder.undo();console.log(cmder.val);
		cmder.execute(CmdNop);console.log(cmder.val);
		cmder.execute(CmdNop);console.log(cmder.val);
		cmder.execute(CmdNop,"HELLO");console.log(cmder.val);
		cmder.execute(CmdNop);console.log(cmder.val);
		cmder.execute(CmdNop);console.log(cmder.val);
		cmder.undo();console.log(cmder.val);
		cmder.undo();console.log(cmder.val);
		cmder.undo();console.log(cmder.val);
		cmder.undo();console.log(cmder.val);
		cmder.undo();console.log(cmder.val);
		cmder.execute(CmdNop,"retrytest");console.log(cmder.val);
		cmder.retry();
		cmder.retry();
		cmder.retry();
	}
});
