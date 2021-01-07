define(["module","./printCanvas"],function(module,printCanvas){
//import printCanvas from './printCanvas'

const redrawCanvas = function (selector, filter) {
  let ctx = selector.getContext('2d')

  ctx = [ctx.getImageData(0, 0, selector.width, selector.height)]

  return printCanvas(selector, filter.apply(null, ctx))
}

module.exports=redrawCanvas
});
