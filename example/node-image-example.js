const LcsCnvs = require("../docs/module/lcs-cnvs");

const monImage = new LcsCnvs();
monImage
  .setCanvas({
    width: 1080,
    height: 1920,
    padding: 40
  })
  .addImage({
    src: "./docs/img/daron-crew.svg",
    width: 760
  })
  .then(image => {
    image
      .drawTriangleAround({
        line: {
          color: "#000000",
          width: 5,
          cap: "square",
          join: "round"
        },
        vertex: {
          nb: 20,
          onPixel: false,
          distance: 100
        }
      }).exportFrames();
  })
  .catch(err => {
    console.error(err);
  });
