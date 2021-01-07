define(["module",'../operations/convolution'],function(module,convolution ){

const roberts = function (pixels) {
  const operator = [0, 0, 0, 1, -1, 0, 0, 0, 0]

  return convolution(pixels, operator)
}

module.exports=roberts
});
