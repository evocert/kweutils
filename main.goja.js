<@
	try{
		var GOJA=true;
		eval(fsutils.File2String('./www/kweutils/lib/core/require.goja.js'));
			//--- server
			require.config({
				baseUrl:"./www/kweutils/",
				paths:{
					"db":"lib/core/db.goja",
					"class":"lib/core/class.goja",
					"idutils":"lib/core/idutils",
					"console":"lib/core/console",
					"Promise":"lib/core/Promise.goja",
					"Application":"lib/system/Application",
					"Module":"lib/system/Module",
					"System":"lib/system/System",
					'underscore':'lib/vendor/underscore/underscore',
				}
			});
			require([
				'console',
				'Promise',
				'System',
				'Module',
				'Application',
				'db',
				'underscore'
			],function(console,Promise,System,Module,Application,db,_){
				console.time('foo');
				console.log('main:');
				console.count();
				console.count();
				console.count();
				console.count();
				console.count('foo');
				console.count('bar');
				console.count('foo');
				console.count('bar');
				console.count('bar');
				console.count('foo');
				console.count('bar');
				console.count('bar');
				console.count('bar');
				console.timeLog('foo');
				console.count('foo');
				console.count('bar');
				console.count('bar');
				console.count('bar');
				console.count('bar');
				console.countReset();
				console.countReset('foo');
				console.countReset('bar');
				console.countReset('baz');
				console.count('foo');
				console.count('bar');
				console.count('baz');
				console.timeLog('foo');
				console.timeEnd('foo');
				return;
				var DBALIAS='mydb';
				var LOOPDB=true;
				//--------------------------------------------------------------------------------
				//main function
				//--------------------------------------------------------------------------------
				//--underscore test - begin
				_.each([1,2,3],console.log);
				console.log(_.map([1,2,3],function(num){return num*3;}));
				console.log(_.map({one:1,two:2,three:3},function(num,key){return num*3;}));
				console.log(_.reduce([1,2,3],function(memo,num){return memo+num;},0));
				console.log(_.reduceRight([[0,1],[2,3],[4,5]],function(a,b){return a.concat(b);},[]));
				console.log(_.find([1,2,3,4,5,6],function(num){return num%2==0;}));
				console.log(_.filter([1,2,3,4,5,6],function(num){return num%2==0;}));
				console.log(_.findWhere([{k0:'foo'},{k0:'bar'},{k0:'foo'}],{k0:"foo"}));
				console.log(_.where([{k0:'foo'},{k0:'bar'},{k0:'foo'}],{k0:"foo"}));
				console.log(_.reject([1,2,3,4,5,6],function(num){return num%2==0;}));
				console.log(_.pluck([{name:'moe',age:40},{name:'larry',age:50},{name:'curly',age:60}],"name"));
				console.log(_.max([{name:'moe',age:40},{name:'larry',age:50},{name:'curly',age:60}],function(stooge){return stooge.age}));
				console.log(_.min([{name:'moe',age:40},{name:'larry',age:50},{name:'curly',age:60}],function(stooge){return stooge.age}));
				//--underscore test - end
				//--database test - begin
				var dbtst;
				dbtst=function(){
					console.log('Initializing database');
					db.exec(
						DBALIAS,
						"create table if not exists system(a varchar,b varchar)",
						[{}]
					).then(function(data){
						console.log('Removing systems');
						return db.exec(
							DBALIAS,
							"delete from system",
							[{}]
						);
					}).then(function(data){
						console.log('Creating system');
						var sysmgr=System.SystemMgr;;
						sys=new System.System();
						for(var i=0;i<1;i++)sys.addmod(
							new Module().addmod(
								new Module().addmod(
									new Module().addmod(
										new Module().addmod((function(){
											var modbuf=[];
											for(var i=0;i<1;i++)
												modbuf.push(new Module());
											return modbuf;
										})())
									)
								)
							)
						);
						for(var i=0;i<1;i++)sys.addapp(
							new Application().addmod(
								new Module().addmod(
									new Module().addmod(
										new Module().addmod((function(){
											var modbuf=[];
											for(var i=0;i<1;i++)
												modbuf.push(new Module());
											return modbuf;
										})())
									)
								)
							)
						);
						console.log('Committing system');
						return db.exec(
							DBALIAS,
							"insert into system values(@@A@@,@@B@@)",
							[{
								A:sys.id,
								B:sys.serialize()
							}]
						);
					}).then(function(data){
						console.log('Retrieving system');
						return db.query(
							DBALIAS,
							"select * from system",
							[{}]
						);
					}).then(function(res){
						res.rows.forEach(function(sys){
							try{
								var sysobj=JSON.parse(sys[1]);
								console.log('System parsed');
								console.log(sysobj,0,2);
								//recloop();
							}catch(e){
								console.error('failed to parse system');
							}
						});
						if(LOOPDB)dbtst();
					});
				}
				dbtst();
				//--database test - end
				return;
				//--------------------------------------------------------------------------------

				var t0=new Date();
				var sysmgr=System.SystemMgr;;
				var sys=null;
				//adding systems
				for(var i=0;i<4;i++){
					sys=new System.System();
					//adding modules
					sys.addmod(
						new Module().addmod(
							new Module().addmod(
								new Module().addmod(
									new Module().addmod((function(){
										var modbuf=[];
										for(var i=0;i<32;i++)
											modbuf.push(new Module());
										return modbuf;
									})())
								)
							)
						)
					);
					sys.addmod(new Module());
					//adding applications
					for(var j=0;j<4;j++){
						sys.addapp(
							new Application().addmod([
								//adding modules
								new Module().addmod(
									new Module().addmod([
										new Module(),
										new Module(),
										new Module(),
										new Module(),
									])
								),
								new Module().addmod(
									(function(){
										var modbuf=[];
										for(var i=0;i<4;i++){
											modbuf.push(new Module().addmod(
												(function(){
													var modbuf=[];
													for(var j=0;j<4;j++){
														modbuf.push(new Module())
													}
													return modbuf;
												})()
											));
										}
										return modbuf;
									})()

								)
							])
						);
					}
				}
				var s=sysmgr.serialize();
				var t1=new Date();
				//console.log(sysmgr.serialize());
				console.log(sysmgr.serialize());
				console.log([t1-t0,'ms'].join(''));
			});
	}catch(e){
		println(e.toString());
	}
@>
