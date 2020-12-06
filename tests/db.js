/*
request.ResponseHeader().Set("Content-Type","application/json");
request.ResponseHeaders().forEach(function(a,b){
        println([a,request.ResponseHeader().Get(a)].join(":"));
});
request.ResponseHeader().Set("Content-Type","application/json");
*/

require([
	'console',
	'Promise',
	'alert',
	'idutils',
	'db'
],function(console,Promise,alert,idutils,db){
	var DBALIAS='mydb';
	var LOOPDB=false;
	var dbtst;
	dbtst=function(){
		console.log('Dropping table');
		db.exec(
			DBALIAS,
			"drop table test",
			[{}]
		).then(function(data){
			console.log('Creating table');
			return db.exec(
				DBALIAS,
				"create table if not exists test(a varchar,b varchar)",
				[{}]
			);
		}).then(function(data){
			console.log('Removing rows');
			return db.exec(
				DBALIAS,
				"delete from test",
				[{}]
			);
		}).then(function(data){
			console.log('Creating rows');
			var pbuf=[];
			for(var i=0;i<32;i++){
				pbuf.push(db.exec(
					DBALIAS,
					"insert into test values(@@A@@,@@B@@)",
					[{
						A:idutils.uuidv4(),
						B:idutils.uuidv4()
					}]
				));
			}
			return Promise.all(pbuf);
		}).then(function(data){
			console.log('Retrieving rows');
			return db.query(
				DBALIAS,
				"select * from test",
				[{}]
			);
		}).then(function(res){
			res.rows.forEach(function(row){
				try{
					console.log(row,0,2);
					//recloop();
				}catch(e){
					console.error(e.toString());
				}
			});
			if(LOOPDB)dbtst();
		});
	}
	dbtst();
});
