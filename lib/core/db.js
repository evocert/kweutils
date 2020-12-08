/*
 * client side database class
 */
define([
	'jquery'
],function(_jquery){
	return{
		query:function(alias,query,args){
			return new Promise(_jquery.proxy(function(resolve,reject){
				_jquery.ajax({
					url:'http://localhost/dbms/.json',
					method:'POST',
					dataType:'text',
					processData:false,
					contentType:'application/json',
					data:JSON.stringify(
						{//correct json response [outer alias]
							"alias":alias,
							"k":(function(){
								var k={
									query:query,
									alias:alias
								};
								args.forEach(_jquery.proxy(function(arg){
									Object.keys(arg).forEach(_jquery.proxy(function(ka){
										k[ka]=arg[ka];
									}));
								}));
								return k;
							})()
						}
					),
					success:function(data){
						try{
							var dataobj=JSON.parse(data);
							if(dataobj.k.error!=null){reject(dataobj.error);return;};
							var resobj={columns:[],rows:[],err:null};
							dataobj['k'].columns.forEach(_jquery.proxy(function(colobj){
								resobj.rows.push(colobj.name);
							}));
							dataobj['k'].data.forEach(_jquery.proxy(function(dataobj){
								resobj.rows.push(dataobj);
							}));
							resolve(resobj);
						}catch(e){
							reject(e);
						}

					},
					error:function(err){
						reject(err);
					}
				});
			},this));
		},
		exec:function (alias,query,args){
			return new Promise(_jquery.proxy(function(resolve,reject){
				_jquery.ajax({
					url:'http://localhost/dbms/.json',
					method:'POST',
					dataType:'text',
					processData:false,
					contentType:'application/json',
					data:JSON.stringify(
						{//correct json response [outer alias]
							"alias":alias,
							"k":(function(){
								var k={
									query:query,
									//execute:query,
									alias:alias
								};
								args.forEach(_jquery.proxy(function(arg){
									Object.keys(arg).forEach(_jquery.proxy(function(ka){
										k[ka]=arg[ka];
									}));
								}));
								return k;
							})()
						}
					),
					success:function(data){
						try{
							var dataobj=JSON.parse(data);
							if(dataobj.k.error!=null){reject(dataobj.error);return;};
							var resobj={columns:[],rows:[],err:null};
							dataobj['k'].columns.forEach(_jquery.proxy(function(colobj){
								resobj.rows.push(colobj.name);
							}));
							dataobj['k'].data.forEach(_jquery.proxy(function(dataobj){
								resobj.rows.push(dataobj);
							}));
							resolve(resobj);
						}catch(e){
							reject(e);
						}
					},
					error:function(err){
						console.error('################################################################################');
						console.error(err);
						console.error('################################################################################');
						reject(err);
					}
				});
			},this));

		}
	};
});
