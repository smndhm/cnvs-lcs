const colors = [
  // ["#F40080", "#D9048E", "#A6038B", "#7C038C", "#570080"],
  // ["#FF1E42", "#CCD1D1", "#003943", "#00AC8B", "#F1B321"],
  // ["#33A9AC", "#FFA646", "#F86041", "#982062", "#343779"],
  // ["#1F90FF", "#1CE867", "#FBFF2C", "#E8941C", "#FF2B31"],
  // ["#8C2786", "#26A6A6", "#F2CE1B", "#F27D16", "#F24F13"],
  ["#FDC741", "#01B3E3", "#DA38B5", "#FF6B01", "#25CE7B"]
];

const getRandomArrayValue = array => {
  return array[Math.floor(Math.random() * array.length)];
};

document.addEventListener("DOMContentLoaded", event => {
  let settings = {
    canvas: {
      //canvas settings
      width: 2100,
      height: 2970,
      padding: 250 //padding can be negative
      // fill: "#ffffff" //background color
    },
    polygon: {
      color: getRandomArrayValue(colors),
      blendingMode: "multiply",
      line: {
        // width: 5, //0 to remove border
        cap: "square",
        join: "round"
      },
      vertex: {
        nb: 5000, //number of vertex
        onlyOnPixel: true
      }
    },
    image: {
      src: "./img/daron-crew.svg",
      width: 1520
    }
  };

  console.log(settings);

  const monDessin = new LcsCnvs();
  monDessin
    .setCanvas(settings.canvas)
    .addImage(settings.image)
    .then(canvas => {
      settings.image.width = 1360;
      canvas
        .drawTriangleAfterNewVertex(settings.polygon)
        .addImage(settings.image)
        .then(canvas => {
          canvas.append("body");
        });
    });
});
