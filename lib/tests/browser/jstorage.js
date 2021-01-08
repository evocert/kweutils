define([
	"module",
	"jstorage",
],function(
	module,
	jStorage
){
	console.log([module.id,'start'].join(':'));
	console.log(jStorage);
	try{//set
		jStorage.set('k0','v0',{/*options*/});
	}catch(e){console.error(e.toString());}
	try{//get
		console.log(jStorage.get('k0'))
		console.log(jStorage.get('k1',"default value"));
	}catch(e){console.error(e.toString());}
	try{//deleteKey
		jStorage.deleteKey('k0');
	}catch(e){console.error(e.toString());}
	try{//setTTL (time for key to live)
		jStorage.set("mykey", "keyvalue");
		jStorage.setTTL("mykey", 3000); // expires in 3 seconds
	}catch(e){console.error(e.toString());}
	try{//getTTL
		console.log(jStorage.getTTL("mykey")); // TTL in milliseconds or 0
	}catch(e){console.error(e.toString());}
	try{//index
		console.log(jStorage.index());
	}catch(e){console.error(e.toString());}
	try{//flush
		jStorage.flush()
	}catch(e){console.error(e.toString());}
	try{//storageSize
		console.log(jStorage.storageSize());
	}catch(e){console.error(e.toString());}
	try{//storageAvailable
		console.log(jStorage.storageAvailable());
	}catch(e){console.error(e.toString());}
	try{//currentBackend
		console.log(jStorage.currentBackend());
	}catch(e){console.error(e.toString());}
	try{//reInit
		jStorage.reInit()
	}catch(e){console.error(e.toString());}
	try{//subscribe
		jStorage.subscribe("ch1", function(channel, payload){
			    console.log(payload+ " from " + channel);
		});
	}catch(e){console.error(e.toString());}
	try{//publish
		jStorage.publish("ch1", "data");
	}catch(e){console.error(e.toString());}
	try{//listenKeyChange
		jStorage.listenKeyChange("mykey", function(key, action){
			    console.log(key + " has been " + action);
		});
	}catch(e){console.error(e.toString());}
	try{//stopListening
		jStorage.stopListening("mykey"); // cancel all listeners for "mykey" change
	}catch(e){console.error(e.toString());}
});
