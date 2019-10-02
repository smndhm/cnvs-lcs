const LcsCnvs = require("./docs/module/lcs-cnvs");
const { JSDOM } = require("jsdom");
const fs = require("fs");

JSDOM.fromFile("./docs/img/daron-crew.svg").then(dom => {
  //document
  const document = dom.window.document;
  //svg
  const svg = document.querySelector("svg");
  //paths
  const paths = svg.querySelectorAll("path");
  //
  const maFeuilleBlanche = new LcsCnvs();
  maFeuilleBlanche.setCanvas({
    width: 2100,
    height: 2970,
    fill: "#ffffff"
  });

  let promises = [];

  console.log(`#1`);
  (async function() {
    console.log(`#2`);
    for await (const [i, path] of paths.entries()) {
      console.log(`#3.${i}`);
      //empty svg
      svg.innerHTML = "";
      //append path
      svg.append(path);
      //save
      const pathFile = `tmp.${i}`;
      fs.writeFile(`./${pathFile}.svg`, svg.outerHTML, function(error) {
        if (error) throw error;
        console.log(`#4.${i}`);
        const monImage = new LcsCnvs();
        monImage
          .setCanvas({
            width: 2100,
            height: 2970,
            padding: 100
          })
          .addImage({ src: `./${pathFile}.svg`, width: 1500 })
          .then(image => {
            console.log(`#5.${i}`);
            const monGribouillis = image
              .drawTriangleAfterNewVertex({
                line: {
                  color: "#000000",
                  width: 5,
                  cap: "square",
                  join: "round"
                },
                vertex: {
                  nb: 1000,
                  onPixel: true
                }
              })
              .canvas.toDataURL();

            maFeuilleBlanche.addImage({ src: monGribouillis });

            console.log(`#6.${i}`);
          })
          .catch(err => {
            console.error(err);
          });
      });
    }

    console.log(`#7`);
    fs.writeFile(
      "draw.png",
      maFeuilleBlanche.canvas
        .toDataURL()
        .replace(/^data:image\/png;base64,/, ""),
      "base64",
      function(err) {
        if (err) throw err;
        console.log(`#8`);
      }
    );
    console.log(`#9`);
  })();
  console.log(`#10`);
});
