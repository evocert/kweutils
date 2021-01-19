define([
        "module",
        "console"
],function(
        module,
        console
){
        println([module.id,"start"].join(":"));
        var url="http://127.0.0.1:80/kweutils/lib/init.goja.js?action=runtest&parameters=jquery";
	println("hitting..."+url);
        try{
        	println(remoting.SendRespondString(url,{},{}));
        }catch(e){console.error(e.toString());}
});
