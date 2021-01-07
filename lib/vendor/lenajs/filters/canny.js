define(["module",'./sobelHorizontal','./sobelVertical','./bigGaussian','./laplacian','./thresholding'],function(module,sobelHorizontal,sobelVertical,bigGaussian,laplacian,thresholding){



//import gradient from '../operations/gradient'
//import nonMaximumSuppression from '../operations/nonMaximumSuppression'

const canny = function (pixels) {
  pixels = bigGaussian(pixels)
  const deltaX = sobelHorizontal(pixels)
  const deltaY = sobelVertical(pixels)
  const r = gradient(deltaX, deltaY) //Magnitude and Angle of edges
  const lp = laplacian(pixels) //The laplacian represent better the magnitude

  pixels = nonMaximumSuppression(lp, r.direction)

  return thresholding(pixels, 8)
}

module.exports=canny
});
