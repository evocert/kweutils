define([
	"module",
	"./getImage",
	"./printCanvas",
],function(
	module,
	getImage,
	printCanvase
){
//import getImage from './getImage'
//import printCanvas from './printCanvas'

const filterImage = function (selector, filter, image, amount = 0) {
  let args = [getImage(image), amount]
  return printCanvas(selector, filter.apply(null, args))
}

module.exports=filterImage;
});
