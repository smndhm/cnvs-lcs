const LcsCnvs = require("../docs/module/lcs-cnvs");

const monImage = new LcsCnvs();
monImage
  .setCanvas({
    //canvas settings
    width: 2100,
    height: 2970,
    padding: -100, //padding can be negative
    fill: "#ffffff" //background color
  })
  .drawTriangleAfterNewVertex({
    color: ["#FDC741", "#01B3E3", "#DA38B5", "#FF6B01", "#25CE7B"], //if color is an Array, a color will be randomly used
    blendingMode: "multiply",
    line: {
      width: 0, //0 to remove border
      cap: "square",
      join: "round"
    },
    vertex: {
      nb: 500 //number of vertex
    }
  })
  .export();
