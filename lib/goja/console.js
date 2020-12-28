define([],function(){
	//if(console!=null)return console;
	var console_=console;//todo:backup console
	this.counts={};
	this.timepoints={};
	return {
		log:console.log==null?function(val){console.Log(typeof(val)=='object'?JSON.stringify(val):val);}:console.log,
		warn:console.warn==null?function(val){console.Warn(typeof(val)=='object'?JSON.stringify(val):val);}:console.warn,
		error:console.error==null?function(val){console.Error(typeof(val)=='object'?JSON.stringify(val):val);}:console.error,
		debug:console.debug==null?function(val){console.Debug(typeof(val)=='object'?JSON.stringify(val):val);}:console.debug,
		assert:console.assert==null?function(val){}:console.assert,
		clear:console.clear==null?function(val){}:console.clear,
		count:console.count==null?function(val){val=val==null?"Default":typeof(val)=='object'?JSON.stringify(val):val;this.counts[val]=this.counts[val]==null?0:this.counts[val];console.Log([val,this.counts[val]++].join(':'));}.bind(this):console.count,
		countReset:console.countReset==null?function(val){val=val==null?"Default":typeof(val)=='object'?JSON.stringify(val):val;this.counts[val]=0;}.bind(this):console.countReset,
		info:console.info==null?function(val){console.Log(typeof(val)=='object'?JSON.stringify(val):val);}:console.info,
		table:console.table==null?function(val){/* todo: tabulate print table */}:console.table,
		trace:console.trace==null?function(val){/* todo: trace */}:console.trace,
		dir:console.dir==null?function(val){/* ??? */}:console.dir,
		dirxml:console.dirxml==null?function(val){/* ??? */}:console.dirxml,
		group:console.group==null?function(val){/* todo: start indentation */}:console.group,
		groupCollapsed:console.groupCollapsed==null?function(val){/* todo: reset indentation */}:console.groupCollapsed,
		groupEnd:console.groupEnd==null?function(val){/* todo: end indentation */}:console.groupEnd,
		time:console.time==null?function(val){val=val==null?"Default":typeof(val)=='object'?JSON.stringify(val):val;this.timepoints[val]=new Date();}.bind(this):console.time,
		timeLog:console.timeLog==null?function(val){val=val==null?"Default":typeof(val)=='object'?JSON.stringify(val):val;if(this.timepoints[val]!=null){console.Log([val,(new Date())-this.timepoints[val]+' ms'].join(':'));}}.bind(this):console.timeLog,
		timeEnd:console.timeEnd==null?function(val){val=val==null?"Default":typeof(val)=='object'?JSON.stringify(val):val;if(this.timepoints[val]!=null){console.Log([val,(new Date())-this.timepoints[val]+' ms - timer ended'].join(':'));delete(this.timepoints[val]);}}.bind(this):console.timeEnd,
		exception:console.exception==null?function(val){/* todo: propper log nodes */}:console.exception,
		timeStamp:console.timeStamp==null?function(val){/* ??? */}:console.timeStamp,
		profile:console.profile==null?function(val){/* ??? */}:console.profile,
		profileEnd:console.profileEnd==null?function(val){/* ??? */}:console.profileEnd
	};
});
