/**
 * Daron Crew Example
 * With image loading
 */

document.addEventListener("DOMContentLoaded", event => {
  let settings = {
    canvas: {
      // canvas settings
      width: 2100,
      height: 2970,
      padding: 100 // padding can be negative
    },
    polygon: {
      line: {
        color: "#000000",
        width: 5, // 0 to remove border
        cap: "square",
        join: "round"
      },
      vertex: {
        nb: 12000, // number of vertex
        onPixel: false
      }
    },
    image: {
      src: "./img/daron-crew.svg",
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
          canvas.settings.polygon = image.settings.polygon;
          canvas.polygons = image.polygons;
          canvas.append("body"); // display
        });
    });
});
