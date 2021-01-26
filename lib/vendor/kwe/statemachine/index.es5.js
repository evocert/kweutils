define([
	"module"
],function(module){
	function StateMachine(initialState,possibleStates,stateArgs){
		//construction
		stateArgs=stateArgs?stateArgs:[];
		this.initialState=initialState;
		this.possibleStates=possibleStates;
		this.stateArgs=stateArgs;
		this.state=null;
		/*
		*/
		var self=this;
		Object.values(this.possibleStates).forEach(function(state){
			state.stateMachine=self;
		});
	}
	StateMachine.prototype.step=function(){
		if(this.state==null){
			this.state=this.initialState;
			this.possibleStates[this.state].enter.apply(this,this.stateArgs);
		}
		this.possibleStates[this.state].execute.apply(this.possibleStates[this.state],this.stateArgs);
	}
	StateMachine.prototype.transition=function(newState,/*...*/enterArgs){
		this.state=newState;
		this.possibleStates[this.state].enter.call(this,Array.prototype.concat.call(this.stateArgs,enterArgs));
	}
	function State(){}
	State.prototype.enter=function(){}
	State.prototype.execute=function(){}
	module.exports={
		StateMachine:StateMachine,
		State:State
	}
});
/*
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
*/

