const LcsCnvs = require("../module/lcs-cnvs");

const monImage = new LcsCnvs();
monImage.setCanvas({
  //canvas settings
  width: 2100,
  height: 2970,
  padding: -100, //padding can be negative
  fill: "#ffffff" //background color
});

const imgData = monImage.canvas.toDataURL();

console.log(imgData);
