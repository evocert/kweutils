define([
	"module",
	"kwe.statemachine",
],function(
	module,
	libstatemachine
){
	console.log([module.id,'start'].join(':'));
	console.log(libstatemachine);
	{//basic usage
		let StateMachine=libstatemachine.StateMachine;
		let State=libstatemachine.State;
		class SBEGIN extends State{
			enter(ctx,arg){
				console.log("SBEGIN:ENTER")
				console.log(["ctx",JSON.stringify(ctx)].join(":"));
				console.log(["arg",JSON.stringify(arg)].join(":"));
			}
			execute(ctx,arg){
				console.log("SBEGIN:EXECUTE")
				console.log(["ctx",JSON.stringify(ctx)].join(":"));
				console.log(["arg",JSON.stringify(arg)].join(":"));
				this.stateMachine.transition("S0",Math.random(),Math.random())
				ctx.sidx++;
			}
		}
		class S0 extends State{
			enter(ctx,arg0,arg1){
				console.log("S0:ENTER")
				console.log(["ctx",JSON.stringify(ctx)].join(":"));
				console.log(["arg0",JSON.stringify(arg0)].join(":"));
				console.log(["arg1",JSON.stringify(arg1)].join(":"));
			}
			execute(ctx,arg0,arg1){
				console.log("S0:EXECUTE")
				console.log(["ctx",JSON.stringify(ctx)].join(":"));
				console.log(["arg0",JSON.stringify(arg0)].join(":"));
				console.log(["arg1",JSON.stringify(arg1)].join(":"));
				this.stateMachine.transition("S1")
				ctx.sidx++;
			}
		}
		class S1 extends State{
			enter(ctx,arg){
				console.log("S1:ENTER")
				console.log(["ctx",JSON.stringify(ctx)].join(":"));
				console.log(["arg",JSON.stringify(arg)].join(":"));
			}
			execute(ctx,arg){
				console.log("S1:EXECUTE")
				console.log(["ctx",JSON.stringify(ctx)].join(":"));
				console.log(["arg",JSON.stringify(arg)].join(":"));
				this.stateMachine.transition("SEND",Math.random(),42,24)
				ctx.sidx++;
			}
		}
		class SEND extends State{
			enter(ctx,arg0,arg1,arg2){
				console.log("SEND:ENTER")
				console.log(["ctx",JSON.stringify(ctx)].join(":"));
				console.log(["arg0",JSON.stringify(arg0)].join(":"));
				console.log(["arg1",JSON.stringify(arg1)].join(":"));
				console.log(["arg2",JSON.stringify(arg2)].join(":"));
			}
			execute(ctx,arg0,arg1,arg2){
				console.log("SEND:EXECUTE")
				console.log(["ctx",JSON.stringify(ctx)].join(":"));
				console.log(["arg0",JSON.stringify(arg0)].join(":"));
				console.log(["arg1",JSON.stringify(arg1)].join(":"));
				console.log(["arg2",JSON.stringify(arg2)].join(":"));
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
			ctx
		);
		for(var i=0;i<8;i++){
			stateMachine.step();
		}
	}
});
