//Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript. Although originally designed for use with Node.js and installable via npm i async, it can also be used directly in the browser. A ESM/MJS version is included in the main async package that should automatically be used with compatible bundlers such as Webpack and Rollup.
//https://github.com/caolan/async
//https://caolan.github.io/async/v3/
define([
	"module",
	"async",
],function(
	module,
	async
){
	console.log([module.id,'start'].join(':'));
	console.log(async);
	{//basic usage
		async.map(['file1','file2','file3'],function(val){console.log(val)},function(err,results){
			console.log(err);
			console.log(results);
		});
		console.log("--------------------------------------------------------------------------------");
		async.parallel([
			function(callback){console.log('f0');},
			function(callback){console.log('f1');}
		],function(err,results){
			console.log(err);
			console.log(results);
		});
		console.log("--------------------------------------------------------------------------------");
	}
	{//concat(coll, iteratee, callbackopt) - Applies iteratee to each item in coll, concatenating the results. Returns the concatenated list. The iteratees are called in parallel, and the results are concatenated as they return. The results array will be returned in the original order of coll passed to the iteratee function.
		async.concat(
			['dir1','dir2','dir3'],
			function(val){
				console.log(val);
				return val;
			},function(err, files) {
				console.log(err);
				console.log(files);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//concatLimit(coll, limit, iteratee, callbackopt) - The same as concat but runs a maximum of limit async operations at a time.
		async.concatLimit(
			['dir1','dir2','dir3'],
			2,
			function(val){
				console.log(val);
				return val;
			},function(err, files) {
				console.log(err);
				console.log(files);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//concatSeries(coll, iteratee, callbackopt) - The same as concat but runs only a single async operation at a time.
		async.concatSeries(
			['dir1','dir2','dir3'],
			function(val){
				console.log(val);
				return val;
			},function(err, files) {
				console.log(err);
				console.log(files);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//detect(coll, iteratee, callbackopt) - Returns the first value in coll that passes an async truth test. The iteratee is applied in parallel, meaning the first iteratee to return true will fire the detect callback with that result. That means the result might not be the first item in the original coll (in terms of order) that passes the test. If order within the original coll is important, then look at detectSeries.
		async.detect(
			['file1','file2','file3'],
			function(filePath, callback) {
				callback(null,filePath=='file2')
			}, function(err, result) {
				// result now equals the first file in the list that exists
				console.log(err);
				console.log(result);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//detectLimit(coll, limit, iteratee, callbackopt) - The same as detect but runs a maximum of limit async operations at a time.
		async.detectLimit(
			['file1','file2','file3'],
			8,
				function(filePath, callback) {
				callback(null,filePath=='file2')
			}, function(err, result) {
				// result now equals the first file in the list that exists
				console.log(err);
				console.log(result);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//detectSeries(coll, iteratee, callbackopt) - The same as detect but runs only a single async operation at a time.
		async.detectSeries(
			['file1','file2','file3'],
			function(filePath, callback) {
				callback(null,filePath=='file2')
			}, function(err, result) {
				// result now equals the first file in the list that exists
				console.log(err);
				console.log(result);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//each(coll, iteratee, callbackopt) - Applies the function iteratee to each item in coll, in parallel. The iteratee is called with an item from the list, and a callback for when it has finished. If the iteratee passes an error to its callback, the main callback (for the each function) is immediately called with the error.
		async.each(
			['file1','file2','file3'],
			function(val){
				console.log(val);
			},
			function(err){
				console.error(val);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//eachLimit(coll, limit, iteratee, callbackopt) - The same as each but runs a maximum of limit async operations at a time.
		async.eachLimit(
			['file1','file2','file3'],
			2,
			function(val){
				console.log(val);
			},
			function(err){
				console.error(val);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//eachOf(coll, iteratee, callbackopt) - Like each, except that it passes the key (or index) as the second argument to the iteratee.
		async.eachOf(
			['file1','file2','file3'],
			function(val,key,cb){//A function to apply to each item in coll. The key is the item's key, or index in the case of an array. Invoked with (item, key, callback).
				console.log(val);
				console.log(key);
				console.log(val);
				console.log(cb);
			},
			function(err){//A callback which is called when all iteratee functions have finished, or an error occurs. Invoked with (err).
				console.error(err);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//eachOfLimit(coll, limit, iteratee, callbackopt) - The same as eachOf but runs a maximum of limit async operations at a time.
		async.eachOfLimit(
			['file1','file2','file3'],
			2,//limit
			function(val,key,cb){//A function to apply to each item in coll. The key is the item's key, or index in the case of an array. Invoked with (item, key, callback).
				console.log(val);
				console.log(key);
				console.log(val);
				console.log(cb);
			},
			function(err){//A callback which is called when all iteratee functions have finished, or an error occurs. Invoked with (err).
				console.error(err);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//eachOfSeries(coll, iteratee, callbackopt) - The same as eachOf but runs only a single async operation at a time.
		async.eachOfSeries(
			['file1','file2','file3'],
			function(val,key,cb){//A function to apply to each item in coll. The key is the item's key, or index in the case of an array. Invoked with (item, key, callback).
				console.log(val);
				console.log(key);
				console.log(val);
				console.log(cb);
			},
			function(err){//A callback which is called when all iteratee functions have finished, or an error occurs. Invoked with (err).
				console.error(err);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//eachSeries(coll, iteratee, callbackopt) - The same as each but runs only a single async operation at a time.
		async.eachSeries(
			[0,1,2,3],
			function(item,callback){
				console.log(item);
				console.log(callback);
			},
			function(err){//optional
				console.log(err);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//every(coll, iteratee, callbackopt) - Returns true if every element in coll satisfies an async test. If any iteratee call returns false, the main callback is immediately called.
		async.every(
			[0,1,2,3],
			function(item,callback){
				console.log(item);
				console.log(callback);
				callback(null,true);
			},
			function(err){
				console.log(err);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//everyLimit(coll, limit, iteratee, callbackopt) - The same as every but runs a maximum of limit async operations at a time.
		async.everyLimit(
			[0,1,2,3],
			2,
			function(item,callback){
				console.log(item);
				console.log(callback);
				callback(null,true);
			},
			function(err){
				console.log(err);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//everySeries(coll, iteratee, callbackopt) - The same as every but runs only a single async operation at a time.
		async.everySeries(
			[0,1,2,3],
			function(item,callback){
				console.log(item);
				console.log(callback);
				callback(null,true);
			},
			function(err){
				console.log(err);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//filter(coll, iteratee, callbackopt) - Returns a new array of all the values in coll which pass an async truth test. This operation is performed in parallel, but the results array will be in the same order as the original.
		async.filter(
			[0,1,2,3],
			function(value,callback) {
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,value%2==0);},100);
				});
			},
			function(err, results) {
				// results now equals an array of the existing files
				console.log(err);
				console.log(results);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//filterLimit(coll, limit, iteratee, callbackopt) - The same as filter but runs a maximum of limit async operations at a time.
		async.filterLimit(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),
			8,
			function(value,callback) {
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,value%2==0);},100);
				});
			},
			function(err, results) {
				// results now equals an array of the existing files
				console.log(err);
				console.log(results);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//filterSeries(coll, iteratee, callbackopt) - The same as filter but runs only a single async operation at a time.
		async.filterSeries(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),
			function(value,callback) {
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,value%2==0);},100);
				});
			},
			function(err, results) {
				// results now equals an array of the existing files
				console.log(err);
				console.log(results);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//groupBy(coll, iteratee, callbackopt) - Returns a new object, where each value corresponds to an array of items, from coll, that returned the corresponding key. That is, the keys of the object correspond to the values passed to the iteratee callback.
		async.groupBy(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),
			function(value,callback) {
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,value%2==0);},100);
				});
			}, function(err, results) {
				// result is object containing the userIds grouped by age
				// e.g. { 30: ['userId1', 'userId3'], 42: ['userId2']};
				console.log(err);
				console.log(results);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//groupByLimit(coll, limit, iteratee, callbackopt) - The same as groupBy but runs a maximum of limit async operations at a time.
		async.groupByLimit(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),
			8,
			function(value,callback) {
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,value%2==0);},100);
				});
			}, function(err, results) {
				// result is object containing the userIds grouped by age
				// e.g. { 30: ['userId1', 'userId3'], 42: ['userId2']};
				console.log(err);
				console.log(results);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//groupBySeries(coll, iteratee, callbackopt) - The same as groupBy but runs only a single async operation at a time.
		async.groupBySeries(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),
			function(item,callback) {
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item%2==0);},100);
				});
			}, function(err, results) {
				// result is object containing the userIds grouped by age
				// e.g. { 30: ['userId1', 'userId3'], 42: ['userId2']};
				console.log("async.groupBySeries:");
				console.log(err);
				console.log(results);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//map(coll, iteratee, callbackopt) - Produces a new collection of values by mapping each value in coll through the iteratee function. The iteratee is called with an item from coll and a callback for when it has finished processing. Each of these callback takes 2 arguments: an error, and the transformed item from coll. If iteratee passes an error to its callback, the main callback (for the map function) is immediately called with the error.
		async.map(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),
			function(item,callback){
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item%2==0);},100);
				});
			},
			function(err,results) {
				// results is now an array of stats for each file
				console.log("async.map:");
				console.log(err);
				console.log(results);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//mapLimit(coll, limit, iteratee, callbackopt) - The same as map but runs a maximum of limit async operations at a time.
		async.mapLimit(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),
			8,
			function(item,callback){
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item%2==0);},100);
				});
			},
			function(err,results) {
				// results is now an array of stats for each file
				console.log("async.mapLimit:");
				console.log(err);
				console.log(results);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//mapSeries(coll, iteratee, callbackopt) - The same as map but runs only a single async operation at a time.
		async.mapSeries(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),
			function(item,callback){
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item%2==0);},100);
				});
			},
			function(err,results) {
				// results is now an array of stats for each file
				console.log("async.mapSeries:");
				console.log(err);
				console.log(results);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//mapValues(obj, iteratee, callbackopt) - A relative of map, designed for use with objects.
		async.mapValues(
			(function(){
				var ret={};
				for(var i=0;i<32;i++)
					ret[["k",i].join("_")]=i
				return ret;
			})(),
			function(item,key,callback) {
				console.log(item);
				console.log(key);
				console.log(callback);
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item%2==0);},100);
				});
			},
			function(err, result) {
				// result is now a map of stats for each file, e.g.
				// {
				//	 f1: [stats for file1],
				//	 f2: [stats for file2],
				//	 f3: [stats for file3]
				// }
				console.log("async.mapValues:");
				console.log(err);
				console.log(result);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//mapValuesLimit(obj, limit, iteratee, callbackopt)
		async.mapValuesLimit(
			(function(){
				var ret={};
				for(var i=0;i<32;i++)
					ret[["k",i].join("_")]=i
				return ret;
			})(),
			8,
			function(item,key,callback) {
				console.log(item);
				console.log(key);
				console.log(callback);
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item%2==0);},100);
				});
			},
			function(err, result) {
				// result is now a map of stats for each file, e.g.
				// {
				//	 f1: [stats for file1],
				//	 f2: [stats for file2],
				//	 f3: [stats for file3]
				// }
				console.log("async.mapValuesLimit:");
				console.log(err);
				console.log(result);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//mapValuesSeries(obj, iteratee, callbackopt) - The same as mapValues but runs only a single async operation at a time.
		async.mapValuesSeries(
			(function(){
				var ret={};
				for(var i=0;i<32;i++)
					ret[["k",i].join("_")]=i
				return ret;
			})(),
			function(item,key,callback) {
				console.log(item);
				console.log(key);
				console.log(callback);
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item%2==0);},100);
				});
			},
			function(err, result) {
				// result is now a map of stats for each file, e.g.
				// {
				//	 f1: [stats for file1],
				//	 f2: [stats for file2],
				//	 f3: [stats for file3]
				// }
				console.log("async.mapValuesSeries:");
				console.log(err);
				console.log(result);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//reduce(coll, memo, iteratee, callbackopt) - Reduces coll into a single value using an async iteratee to return each successive step. memo is the initial state of the reduction. This function only operates in series.
		async.reduce(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),//col
			0,//memo - initial state
			function(memo,item,callback){
				console.log(memo);
				console.log(item);
				console.log(callback);
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item);},100);
				});
			},//iteratee
			function(err,result){
				// result is now equal to the last value of memo, which is 31
				console.log("async.reduce:");
				console.log(err);
				console.log(result);
			}//callback
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//reduceRight(array, memo, iteratee, callbackopt) - Same as reduce, only operates on array in reverse order.
		async.reduceRight(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),//col
			0,//memo - initial state
			function(memo,item,callback){
				console.log(memo);
				console.log(item);
				console.log(callback);
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item);},100);
				});
			},//iteratee
			function(err,result){
				// result is now equal to the first value of memo, which is 0
				console.log("async.reduceRight:");
				console.log(err);
				console.log(result);
			}//callback
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//reject(coll, iteratee, callbackopt) - The opposite of filter. Removes values that pass an async truth test.
		async.reject(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),//col
			function(item,callback){//iteratee
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item%2==0);},100);
				});
			}, function(err, results) {
				// results now equals an array of mismatches
				console.log("async.reject:");
				console.log(err);
				console.log(results);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//rejectLimit(coll, limit, iteratee, callbackopt) - The same as reject but runs a maximum of limit async operations at a time.
		async.rejectLimit(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),//col
			8,//limit
			function(item,callback){//iteratee
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item%2==0);},100);
				});
			}, function(err, results) {
				// results now equals an array of mismatches
				console.log("async.rejectLimit:");
				console.log(err);
				console.log(results);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//rejectSeries(coll, iteratee, callbackopt) - The same as reject but runs only a single async operation at a time.
		async.rejectSeries(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),//col
			function(item,callback){//iteratee
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item%2==0);},100);
				});
			}, function(err, results) {
				// results now equals an array of mismatches
				console.log("async.rejectSeries:");
				console.log(err);
				console.log(results);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//some(coll, iteratee, callbackopt) - Returns true if at least one element in the coll satisfies an async test. If any iteratee call returns true, the main callback is immediately called.
		async.some(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),//col
			function(item,callback) {
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item%2==0);},100);
				});
			}, function(err, result) {
				// if result is true then at least one of the files exists
				console.log("async.some:");
				console.log(err);
				console.log(result);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//someLimit(coll, limit, iteratee, callbackopt) - The same as some but runs a maximum of limit async operations at a time.
		async.someLimit(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),//col
			8,//limit
			function(item,callback) {
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item%2==0);},100);
				});
			}, function(err, result) {
				// if result is true then at least one of the files exists
				console.log("async.someLimit:");
				console.log(err);
				console.log(result);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//someSeries(coll, iteratee, callbackopt) - The same as some but runs only a single async operation at a time.
		async.someSeries(
			(function(){
				var ret=[];
				for(var i=0;i<32;i++)
					ret.push(i);
				return ret;
			})(),//col
			function(item,callback) {
				new Promise(function(resolve,reject){
					window.setTimeout(function(){callback(null,item%2==0);},100);
				});
			}, function(err, result) {
				// if result is true then at least one of the files exists
				console.log("async.someSeries:");
				console.log(err);
				console.log(result);
			}
		);
		console.log("--------------------------------------------------------------------------------");
	}
	{//sortBy(coll, iteratee, callback) - Sorts a list by the results of running each coll value through an async iteratee.
	}
});
