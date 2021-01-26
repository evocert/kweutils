define([
	"module",
	"console",
	"cyclejs",
	"kwe.statemachine.es5",
],function(
	module,
	console,
	cyclejs,
	libstatemachine
){
	console.log([module.id,'start'].join(':'));
	console.log(libstatemachine);
	{//basic usage
		var StateMachine=libstatemachine.StateMachine;
		var State=libstatemachine.State;
		function SBEGIN(){}
		SBEGIN.prototype.enter=function(ctx,arg){
			console.log("SBEGIN:ENTER")
			console.log(cyclejs.decycle(this));
			console.log(ctx);
			console.log(arg);
		}
		SBEGIN.prototype.execute=function(ctx,arg){
			console.log("SBEGIN:EXECUTE")
			console.log(ctx);
			this.stateMachine.transition("S0",Math.random())
			console.log(arg);
			ctx.sidx++;
		}
		function S0(){}
		S0.prototype.enter=this.enter=function(ctx,arg){
			console.log("S0:ENTER")
			console.log(ctx);
			console.log(arg);
		}
		S0.prototype.execute=function(ctx,arg){
			console.log("S0:EXECUTE")
			console.log(ctx);
			this.stateMachine.transition("S1",Math.random())
			console.log(arg);
			ctx.sidx++;
		}
		function S1(){}
		S1.prototype.enter=function(ctx,arg){
			console.log("S1:ENTER")
			console.log(ctx);
		}
		S1.prototype.execute=function(ctx){
			console.log("S1:EXECUTE")
			console.log(ctx);
			this.stateMachine.transition("SEND",Math.random())
			ctx.sidx++;
		}
		function SEND(){}
		SEND.prototype.enter=function(ctx,arg){
			console.log("SEND:ENTER")
			console.log(ctx);
		}
		SEND.prototype.execute=function(ctx){
			console.log("SEND:EXECUTE")
			console.log(ctx);
		}
		var ctx={"context":"data","sidx":0}
		var stateMachine=new StateMachine(
			"SBEGIN",
			{
				"SBEGIN":new SBEGIN(),
				"S0":new S0(),
				"S1":new S1(),
				"SEND":new SEND()
			},
			[ctx]
		);
		for(var i=0;i<8;i++){
			stateMachine.step();
		}
	}
});
