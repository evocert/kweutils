<@
try{

	//println(_scriptinclude("kweutils/lib/vendor/lodash/lodash.min.js"));//@efert - does not works
	//println(_scriptinclude("/lib/vendor/lodash/lodash.min.js"));//@efert - works in script, does not work in ws cgi
	//resourcing.addresouce("path",webbing.Send("url",/*headers*/null));
	var ws=webing.SendReceive("ws://localhost:1030",null);
	//ws.Println("#!/usr/bin/python");
	//ws.Println("#!./bin/myprogram");
	ws.Println("#!js");
	ws.Println("<@");
	ws.Println("var configpath='./www/kweutils/lib/config.goja';");
	/*
	ws.Println("require=null;");
	ws.Println("requirejs=null;");
	ws.Println("define=null;");
	ws.Println("eval(fsutils.File2String('./www/kweutils/lib/vendor/requirejs/require.evocert.js'));");
	*/
	ws.Println("require([configpath],function(){");
	//ws.Println("	require(['/lib/vendor/lodash/lodash.min.js'],function(_){");//@efert - does not work
	ws.Println("	require(['./www/kweutils/lib/vendor/lodash/lodash.min.js'],function(_){");//@efert - works
	//ws.Println("		require(['lodash'],function(_){");//@efert - unable to set up in config due to above issue
	ws.Println("		println('lib loaded');");
	ws.Println("		println(typeof(_));");
	ws.Println("	});");
	ws.Println("});");
	ws.Println("@>");
	ws.Println("#!commit");
	for(var i=ws.Readln();i!="";i=ws.Readln()){
		println(i);
	}
	ws.Close();
	println("END");
}catch(e){
	println(e.toString());
}
@>
