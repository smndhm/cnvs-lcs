/**
 * Daron Crew Example
 * With image loading
 */

document.addEventListener("DOMContentLoaded", async event => {
  let settings = {
    canvas: {
      // canvas settings
      width: 2970,
      height: 2100,
      padding: 100 // padding can be negative
    },
    polygon: {
      line: {
        width: 0, // 0 to remove border
        cap: "square",
        join: "round"
      },
      vertex: {
        nb: 100, // number of vertex
        distance: 100
      },
      color: ["#FDC741", "#01B3E3", "#DA38B5", "#FF6B01", "#25CE7B"] //if color is an Array, a color will be randomly used
      // blendingMode: "multiply"
    },
    image: {
      src: "./img/daron-new.png",
      width: 2000
    }
  };

  // Dessin
  const monDessin = new LcsCnvs();
  const dessin = await monDessin
    .setCanvas(settings.canvas)
    .addImage(settings.image);
  dessin.drawPop(settings.polygon).drawPolygons(); // Add drawing

  const maFeuilleBlanche = new LcsCnvs();
  const feuille = await maFeuilleBlanche
    .setCanvas({
      width: 2970,
      height: 2100,
      fill: "#ffffff"
    })
    .addImage({ src: dessin.canvas.toDataURL() });

  await feuille.addImage(settings.image);

  feuille.append("body");
});
