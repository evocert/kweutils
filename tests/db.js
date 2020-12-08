require([
	'console',
	'document',
	'Promise',
	'alert',
	'idutils',
	'db'
],function(console,document,Promise,alert,idutils,db){
	document.head.append((function(){
		var el=document.createElement('style');
		el.innerText='*{background:#000000;color:#00FF00;font-family:monospace;}';
		return el;
	})());
	function addline(val){
		var el=document.createElement('div');
		el.innerText=typeof(val)=='object'?JSON.stringify(val):val;
		document.body.append(el);
	}
	//var DBALIAS='pg';
	//var DBALIAS='pgr';
	//var DBALIAS='mysql';
	var DBALIAS='mysqlr';
	var LOOPDB=false;
	var dbtst;
	dbtst=function(){
		addline('Dropping table');
		db.exec(
			DBALIAS,
			"drop table if exists test",
			[{}]
		).then(function(data){
			addline('Creating table');
			db.exec(
				DBALIAS,
				//"create table if not exists test(a varchar,b varchar)",
				"create table if not exists test(a varchar(128),b varchar(128))",
				[{}]
			).then(function(data){
				addline('Removing rows');
				db.exec(
					DBALIAS,
					"delete from test",
					[{}]
				).then(function(data){
					addline('Creating rows');
					db.exec(
							DBALIAS,
							"insert into test values(@@A@@,@@B@@)",
							[{
								A:idutils.uuidv4(),
								B:idutils.uuidv4()
							}]
					).then(function(){
						addline('Retrieving rows');
						db.query(
							DBALIAS,
							"select * from test",
							[{}]
						).then(function(res){
							addline(res);
							document.close(res);
						});
					});
				})
			})
		})
	}
	dbtst();
});
