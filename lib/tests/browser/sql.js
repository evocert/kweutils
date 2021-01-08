//sqlite wasm
//https://sql.js.org/#/?id=usage
define([
	"module",
	"sqljs",
],function(
	module,
	initSqlJs
){
	console.log([module.id,'start'].join(':'));
	console.log(initSqlJs);
	{//basic usage
			initSqlJs({locateFile: function(){
				return "lib/vendor/sqljs/1.4.0/sql-wasm.wasm";//todo: wrap in module in ./lib/vendor/sqljs/1.4.0/index.js or something like that
			}}).then(function (SQL) {
				var db = new SQL.Database();
				db.run("CREATE TABLE test (col1, col2);");
				db.run("INSERT INTO test VALUES (?,?), (?,?)",[1, 111, 2, 222]);
				{
					var stmt = db.prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
					stmt.getAsObject({ $start: 1, $end: 1 });
					stmt.bind({$start:1,$end:2});
					while(stmt.step()){
						var row = stmt.getAsObject();
						console.log('Here is a row: ', row);
					}
				}
				for(var i=0;i<8;i++)
					db.run("INSERT INTO test VALUES (?,?)",[i,i*2]);
				console.log('--------------------------------------------------------------------------------');
				{
					var stmt = db.prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
					stmt.getAsObject({ $start: 1, $end: 1 });
					stmt.bind({$start:1,$end:2});
					while(stmt.step()){
						var row = stmt.getAsObject();
						console.log('Here is a row: ', row);
					}
				}
				console.log('--------------------------------------------------------------------------------');
			});
	}
});

