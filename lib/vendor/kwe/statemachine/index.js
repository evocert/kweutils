define(["module"],function(module){
	class StateMachine{
		constructor(initialState,possibleStates,stateArg={}){
			this.initialState=initialState;
			this.possibleStates=possibleStates;
			this.stateArg=stateArg;
			this.enterArgs=[];
			this.execArgs=[];
			this.state=null;
			for(const state of Object.values(this.possibleStates)){
				state.stateMachine=this;
			}
		}
		step(){
			console.log('step');
			if(this.state==null){
				this.state=this.initialState;
				this.possibleStates[this.state].enter(this.stateArg,...this.enterArgs)
			}
			this.possibleStates[this.state].execute(this.stateArg,...this.execArgs);
		}
		transition(newState,...enterArgs){
			console.log('transition');
			this.enterArgs=enterArgs;
			this.execArgs=enterArgs;
			this.state=newState;
			this.possibleStates[this.state].enter(this.stateArg,...enterArgs)
			this.enterArgs=[];
		}
	}
	class State{
		enter(){}
		execute(){}
	}
	/*
	class SBEGIN extends State{
		enter(ctx,arg){
			console.log("SBEGIN:ENTER")
			console.log(ctx);
			console.log(arg);
		}
		execute(ctx,arg){
			console.log("SBEGIN:EXECUTE")
			console.log(ctx);
			this.stateMachine.transition("S0",Math.random())
			console.log(arg);
			ctx.sidx++;
		}
	}
	class S0 extends State{
		enter(ctx,arg){
			console.log("S0:ENTER")
			console.log(ctx);
			console.log(arg);
		}
		execute(ctx,arg){
			console.log("S0:EXECUTE")
			console.log(ctx);
			this.stateMachine.transition("S1",Math.random())
			console.log(arg);
			ctx.sidx++;
		}
	}
	class S1 extends State{
		enter(ctx,arg){
			console.log("S1:ENTER")
			console.log(ctx);
		}
		execute(ctx){
			console.log("S1:EXECUTE")
			console.log(ctx);
			this.stateMachine.transition("SEND",Math.random())
			ctx.sidx++;
		}
	}
	class SEND extends State{
		enter(ctx,arg){
			console.log("SEND:ENTER")
			console.log(ctx);
		}
		execute(ctx){
			console.log("SEND:EXECUTE")
			console.log(ctx);
		}
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
	*/
	module.exports={
		StateMachine:StateMachine,
		State:State
	}
});
