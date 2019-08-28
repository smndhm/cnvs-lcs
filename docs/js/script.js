import { LcsCnvs } from "../module/lcs-cnvs.js";

document.addEventListener("DOMContentLoaded", event => {
  let settings = {
    canvas: {
      //canvas settings
      width: 2100,
      height: 2970,
      padding: 100 //padding can be negative
    },
    color: {
      fill: "#ffffff", //background color
      stroke: "#000000"
    },
    line: {
      width: 10, //0 to remove border
      cap: "square",
      join: "round"
    },
    vertex: {
      nb: 5000 //number of vertex
    }
  };

  console.log(settings);

  LcsCnvs.drawTriangleAfterNewVertex(settings);
  // LcsCnvs.drawTriangleForEachVertex(settings);
  // LcsCnvs.drawTriangleAround(settings);
  // LcsCnvs.drawDelaunay(settings);
});
