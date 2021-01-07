define(["module",'../operations/convolution'],function(module,convolution){

const laplacian = function (pixels) {
  const operator = [0, -1, 0, -1, 4, -1, 0, -1, 0]

  return convolution(pixels, operator)
}

module.exports=laplacian
});
