import { LcsCnvs } from "../../module/lcs-cnvs.js";

const getRandomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

document.addEventListener("DOMContentLoaded", event => {
  let settings = {
    canvas: {
      width: getRandomNumberBetween(1000, 5000),
      height: getRandomNumberBetween(1000, 5000),
      padding: getRandomNumberBetween(-100, 250)
    },
    color: {
      fill: "#ffffff",
      stroke: "#000000"
    },
    line: {
      width: getRandomNumberBetween(0, 10),
      cap: "square",
      join: "round"
    },
    vertex: {
      nb: getRandomNumberBetween(20, 5000),
      distance: getRandomNumberBetween(1, 20)
      // color: ["#8C2786", "#26A6A6", "#F2CE1B", "#F27D16", "#F24F13"]
    }
  };

  console.log(settings);

  switch (getRandomNumberBetween(0, 3)) {
    case 0:
      LcsCnvs.drawTriangleAfterNewVertex(settings);
      break;
    case 1:
      LcsCnvs.drawTriangleForEachVertex(settings);
      break;
    case 2:
      LcsCnvs.drawTriangleAround(settings);
      break;
    case 3:
      LcsCnvs.drawDelaunay(settings);
      break;
  }
});
