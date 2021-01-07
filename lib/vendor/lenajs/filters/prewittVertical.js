define(["module",'../operations/convolution'],function(module,convolution){

const prewittVertical = function (pixels) {
  const divider = 3
  const operator = [-1 / divider, 0, 1 / divider, -1 / divider, 0, 1 / divider, -1 / divider, 0, 1 / divider]

  return convolution(pixels, operator)
}

module.exports=prewittVertical
});
