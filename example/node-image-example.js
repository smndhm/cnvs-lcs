const LcsCnvs = require("../docs/module/lcs-cnvs");

const monImage = new LcsCnvs();
monImage
  .setCanvas({
    width: 1080,
    height: 1920,
    padding: 40
  })
  .addImage({
    src: "./docs/img/daron-crew.svg", // path to image
    width: 760
  })
  .then(image => {
    image
      .drawTriangleAfterNewVertex({
        blendingMode: "multiply",
        line: {
          color: "rgba(0, 0, 0, .25)",
          width: 5, //0 to remove border
          cap: "square",
          join: "round"
        },
        vertex: {
          onPixel: false,
          nb: 12000 //number of vertex
        }
      })
      .export({
        allFrames: false,
        fill: "#ffffff",
        path: "output",
        filename: "daron-crew-lines"
      });
  });
