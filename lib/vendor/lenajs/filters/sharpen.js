define(["module",'../operations/convolution'],function(module,convolution){

const sharpen = function (pixels) {
  const operator = [0, -0.2, 0, -0.2, 1.8, -0.2, 0, -0.2, 0]

  return convolution(pixels, operator)
}

module.exports=sharpen
});
