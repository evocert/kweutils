/*
package main
import (
	        "github.com/gopherjs/gopherjs/js"
)
func main(){
	        js.Global.Set("test0",func(){
			                println("TEST0")
			        });
	        js.Module.Get("exports").Set("test1",func(){
			                println("TEST1")
			        })
}
*/
//modifications necessary on output for amd
/*
define([
	"module",
	"goja/gopherjs/test0/index",
],function(
	module,
	obj	
){
	console.log([module.id,'start'].join(':'));
	console.log(obj);
	obj.test1();
});
define(function (require, exports, module) {
var $glo...
});
*/
//https://medium.com/@kentquirk/how-to-use-gopherjs-to-turn-go-code-into-a-javascript-library-1e947703db7a
//https://github.com/vgsantoniazzi/js-hcl-parser
define([
	"module",
	"goja/gopherjs/test0/index",
],function(
	module,
	obj	
){
	console.log([module.id,'start'].join(':'));
	console.log(obj);
	obj.test1();
});
