import { LcsCnvs } from "./lcs-cnvs.js";

/**
 * SETTINGS
 */
const set = {
  canvas: {
    width: 2100,
    height: 2970,
    padding: 100
  },
  color: {
    fill: "#ffffff",
    stroke: "#000000"
  },
  line: {
    width: 10,
    cap: "square",
    join: "round"
  },
  vertex: {
    distance: {
      default: 20,
      min: 500,
      max: 1000
    },
    angle: {
      min: 30,
      max: 90
    },
    nb: 20
    // color: "random"
  }
};

document.addEventListener("DOMContentLoaded", event => {
  console.log(LcsCnvs);
  LcsCnvs.setCanvas(set);
  // LcsCnvs.drawTriangleAfterNewVertex();
  // LcsCnvs.drawTriangleForEachVertex();
  // LcsCnvs.drawTriangleAround();
  LcsCnvs.drawDelaunay();
});
