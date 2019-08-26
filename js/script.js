import { LcsCnvs } from "./lcs-cnvs.js";

document.addEventListener("DOMContentLoaded", event => {
  LcsCnvs.drawTriangleAfterNewVertex({
    canvas: {
      width: 2100,
      height: 2970,
      padding: 100 //-100
    },
    color: {
      fill: "#ffffff",
      stroke: "#000000"
    },
    line: {
      width: 10, //0
      cap: "square",
      join: "round"
    },
    vertex: {
      nb: 5000
      // color: ["#8C2786", "#26A6A6", "#F2CE1B", "#F27D16", "#F24F13"]
    }
  });

  LcsCnvs.drawTriangleForEachVertex({
    canvas: {
      width: 2200,
      height: 2200,
      padding: 100
    },
    color: {
      fill: "#ffffff",
      stroke: "#000000"
    },
    line: {
      width: 0,
      cap: "square", //butt, round et square.
      join: "round"
    },
    vertex: {
      nb: 750,
      color: ["#33A9AC", "#FFA646", "#F86041", "#982062", "#343779"]
    }
  });

  LcsCnvs.drawTriangleAround({
    canvas: {
      width: 2200,
      height: 2200,
      padding: 0
    },
    color: {
      fill: "#ffffff",
      stroke: "#000000"
    },
    line: {
      width: 0,
      cap: "square", //butt, round et square.
      join: "round"
    },
    vertex: {
      nb: 1200,
      distance: 10,
      color: ["#F23054", "#8C4558", "#025E73", "#037F8C", "#4BB8BE"]
    }
  });

  LcsCnvs.drawDelaunay({
    canvas: {
      width: 2100,
      height: 2970,
      padding: 400 //-100
    },
    color: {
      fill: "#ffffff",
      stroke: "#000000"
    },
    line: {
      width: 0, //0
      cap: "square",
      join: "round"
    },
    vertex: {
      nb: 25, //2000
      color: ["#1F90FF", "#1CE867", "#FBFF2C", "#E8941C", "#FF2B31"] //["#F40080", "#D9048E", "#A6038B", "#7C038C", "#570080"]
    }
  });
});
