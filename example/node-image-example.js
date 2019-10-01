const LcsCnvs = require("../docs/module/lcs-cnvs");

const monImage = new LcsCnvs();
monImage
  .setCanvas({
    width: 2100,
    height: 2970,
    padding: 100
  })
  .addImage({
    src: "./docs/img/circle.svg",
    width: 1500
  })
  .then(image => {
    const monGribouillis = image
      .drawTriangleAfterNewVertex({
        line: {
          color: "#000000",
          width: 5,
          cap: "square",
          join: "round"
        },
        vertex: {
          nb: 10000,
          onPixel: false
        }
      })
      .canvas.toDataURL();

    const maFeuilleBlanche = new LcsCnvs();
    maFeuilleBlanche
      .setCanvas({
        width: 2100,
        height: 2970,
        fill: "#ffffff"
      })
      .addImage({ src: monGribouillis })
      .then(monCollage => {
        const imgData = monCollage.canvas
          .toDataURL()
          .replace(/^data:image\/png;base64,/, "");

        require("fs").writeFile("circle.png", imgData, "base64", function(err) {
          if (err) throw err;
        });
      });
  })
  .catch(err => {
    console.error(err);
  });
