define([
	"module",
	"console",
	"cyclejs",
	//"pubsub"
],function(
	module,
	console,
	cyclejs,
	//PubSub
){
	console.log([module.id,'start'].join(':'));
	//console.log(typeof(PubSub));
	PubSub=function(){
		var pubsub={};
		(function(myObject){
			var topics={};//topic storage
			var subUid=-1;//topic identifier
			myObject.topics=topics;
			myObject.subUid=subUid;
			myObject.publish=function(topic,args){
				if(!topics[topic]){
					return false;
				}
				var subscribers=topics[topic],
					len=subscribers?subscribers.length:0;
				while(len--){
					subscribers[len].func(topic,args);
				}
				return this;
			};
			myObject.subscribe=function(topic,func){
				if(!topics[topic]){
					topics[topic]=[];
				}
				var token=(++subUid).toString();
				topics[topic].push({
					token:token,
					func:func
				});
				return token;
			};
			myObject.unsubscribe=function(token){
				for(var m in topics){
					if(topics[m]){
						for(var i=0,j=topics[m].length;i<j;i++){
							if(topics[m][i].token===token){
								topics[m].splice(i,1);
								return token;
							}
						}
					}
				}
				return this;
			};
		}(pubsub));
		return pubsub;
	}
	{//basic usage

		//publisher data endpoint
		var TOPIC="foo";
		var PUBS2S_DATAROOT="/memdb/";
		var PUBS2S_EPDATA="pubs2s.json";
		var PUBS2S_URL=[PUBS2S_DATAROOT,PUBS2S_EPDATA].join("");
		var PUBS2S_DATA="";


		var ps=new PubSub();
		function SubScriber(dataroot,epdata){
			this.SUBS2S_DATAROOT=dataroot?dataroot:"/memdb/";
			this.SUBS2S_EPDATA=epdata?epdata:"subs2s.json";
			this.SUBS2S_URL=[this.SUBS2S_DATAROOT,this.SUBS2S_EPDATA].join("");
			this.cb=function(topic,data){
				try{
					this.SUBS2S_DATA=data
					//resourcing.RegisterEndpoint(this.SUBS2S_DATAROOT,"");
					//resourcing.RemovePathResource(this.SUBS2S_URL);
					resourcing.MapEndpointResource(
						this.SUBS2S_DATAROOT,
						this.SUBS2S_EPDATA,
						typeof(this.SUBS2S_DATA)!='string'?JSON.stringify(this.SUBS2S_DATA):this.SUBS2S_DATA
					);
					/*
					*/
				}catch(e){
					console.error(e.toString());
				}
				//console.log(resourcing.FindRSString(this.SUBS2S_URL).length);
			}
			console.log(this);
		}
		for(var i=0;i<8;i++){
			var s=new SubScriber("/subjects/","sub"+i+".json")
			var tok=ps.subscribe(TOPIC,s.cb.bind(s));
			console.log(s.toString());
			//ps.unsubscribe(tok);
		}
		ps.publish(TOPIC,42);
		ps.publish(TOPIC,43);

		DATA={"lorem":"ipsum"}
		resourcing.RegisterEndpoint(PUBS2S_DATAROOT,"");
		resourcing.RemovePathResource(PUBS2S_URL);
		resourcing.MapEndpointResource(PUBS2S_DATAROOT,PUBS2S_EPDATA,typeof(PUBS2S_DATA)!='string'?JSON.stringify(PUBS2S_DATA):PUBS2S_DATA);
		console.log(PUBS2S_URL);
		console.log(resourcing.FindRSString(PUBS2S_URL).length);
		try{
			request.ResponseHeader().Set("Content-Type","application/json");
			println(JSON.stringify({"msg":cyclejs.decycle(ps)}));
		}catch(e){
			request.ResponseHeader().Set("Content-Type","application/json");
			println(JSON.stringify({"error":e.toString()}));
		}
	}
});
