/**
 * test file
 */

document.addEventListener("DOMContentLoaded", event => {
  // Settings
  let settings = {
    canvas: {
      //canvas settings
      width: 2100,
      height: 2970,
      padding: 100
    },
    polygon: {
      line: {
        width: 5, //0 to remove border
        cap: "square",
        join: "round"
      },
      vertex: {
        nb: 5000, //number of vertex
        distance: 2,
        onPixel: true
      }
    },
    image: {
      src: "./img/circle.svg",
      width: 1520
    }
  };
  console.log(settings);

  // Dessin
  const monImage = new LcsCnvs();
  monImage
    .setCanvas(settings.canvas)
    .addImage(settings.image)
    .then(image => {
      const monImg = image // image Loaded
        .drawTriangleAfterNewVertex(settings.polygon) // Add drawing
        .canvas.toDataURL(); // to real image

      const maFeuilleBlanche = new LcsCnvs();
      maFeuilleBlanche
        .setCanvas({
          width: 2100,
          height: 2970,
          fill: "#ffffff"
        })
        .addImage({ src: monImg }) // add created image to blank page
        .then(canvas => {
          canvas.append("body"); // display
        });
    });
});
