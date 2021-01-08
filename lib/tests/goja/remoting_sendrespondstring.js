define([
	"module",
	"console"
],function(
	module,
	console
){
	console.log([module.id,"start"].join(":"));
	console.log(typeof(remoting));
	console.log(typeof(remoting.SendRespondString));
	try{
		//func (clnt *Client) SendRespondString(rqstpath string, rqstheaders map[string]string, rspheaders map[string]string, a ...interface{}) (rspstr string, err error) {
	var url="http://127.0.0.1:1031/kweutils/lib/init.goja.js?action=runtest&parameters=jquery";
	remoting.SendRespondString(url,{},{});
	}catch(e){console.error(e.toString());}
});
