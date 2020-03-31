class LcsCnvs {
  constructor() {
    this.settings = {};
    this.polygons = [];
    this.isModule = typeof module !== "undefined";
    if (this.isModule && typeof this.document === "undefined") {
      const { JSDOM } = require("jsdom");
      this.document = new JSDOM().window.document;
    } else {
      this.document = document;
    }
  }

  /**
   *
   * @param {*} settingsCanvas
   */
  setCanvas(settingsCanvas) {
    //SETTINGS
    this.settings.canvas = settingsCanvas;
    //CANVAS
    this.canvas = this.document.createElement("canvas");
    //CANVAS SIZES
    this.canvas.width = this.settings.canvas.width;
    this.canvas.height = this.settings.canvas.height;
    //CTX
    this.ctx = this.canvas.getContext("2d");
    //FILL COLOR
    if (this.settings.canvas.fill) {
      this.ctx.fillStyle = this.getColor(this.settings.canvas.fill, [
        { x: 0, y: 0 },
        { x: 0, y: this.canvas.height }
      ]);
      //ADD BACKGROUND
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    return this;
  }

  /**
   *
   * @param {*} settingsPolygon
   */
  drawTriangleAfterNewVertex(settingsPolygon) {
    //SETTINGS
    this.settings.polygon = settingsPolygon;
    //SET POLYGONS
    let polygons = new Set();
    //SET VERTICES
    let vertices = new Set();
    for (let i = 0; i < this.settings.polygon.vertex.nb; i++) {
      let vertex;
      do {
        vertex = this.getRandomVertex([
          {
            x: this.settings.canvas.padding,
            y: this.settings.canvas.padding
          },
          {
            x: this.settings.canvas.width - this.settings.canvas.padding,
            y: this.settings.canvas.height - this.settings.canvas.padding
          }
        ]);
      } while (this.isVertexOnPosition(vertex));
      if (vertices.size >= 2) {
        const closestVertices = this.getClosestVertices(
          [...vertices],
          vertex,
          2
        );
        polygons.add([vertex].concat(closestVertices));
      }
      vertices.add(vertex);
    }
    //DRAW POLYGONS
    for (const polygon of polygons) {
      this.polygons.push({
        vertices: polygon,
        color: this.getColor(this.settings.polygon.color)
      });
    }
    return this;
  }

  /**
   *
   * @param {*} settingsPolygon
   */
  drawTriangleForEachVertex(settingsPolygon) {
    //SETTINGS
    this.settings.polygon = settingsPolygon;
    //SET VERTICES
    let vertices = new Set();
    for (let i = 0; i < this.settings.polygon.vertex.nb; i++) {
      let vertex;
      do {
        vertex = this.getRandomVertex([
          {
            x: this.settings.canvas.padding,
            y: this.settings.canvas.padding
          },
          {
            x: this.settings.canvas.width - this.settings.canvas.padding,
            y: this.settings.canvas.height - this.settings.canvas.padding
          }
        ]);
      } while (this.isVertexOnPosition(vertex));
      vertices.add(vertex);
    }
    //SET POLYGONS
    for (let vertex of vertices) {
      const copyVertices = new Set(vertices);
      copyVertices.delete(vertex);
      const closestVertices = this.getClosestVertices(
        [...copyVertices],
        vertex,
        2
      );
      this.polygons.push({
        vertices: [vertex].concat(closestVertices),
        color: this.getColor(this.settings.polygon.color)
      });
    }
    return this;
  }

  /**
   *
   * @param {*} settingsPolygon
   */
  drawTriangleAround(settingsPolygon) {
    //SETTINGS
    this.settings.polygon = settingsPolygon;
    //CHECK IF VERTEX DISTANCE IS SET
    if (!this.settings.polygon.vertex.distance) {
      console.warn(
        "this.settings.polygon.vertex.distance not set, auto set at 10"
      );
      this.settings.polygon.vertex.distance = 10;
    }
    let canvasArea = [
      {
        x: this.settings.canvas.padding,
        y: this.settings.canvas.padding
      },
      {
        x: this.settings.canvas.width - this.settings.canvas.padding,
        y: this.settings.canvas.height - this.settings.canvas.padding
      }
    ];
    let verticesArea = JSON.parse(JSON.stringify(canvasArea));
    let verticesMaxArea = JSON.parse(JSON.stringify(canvasArea));
    //SET VERTICES
    let vertices = new Set();
    for (let i = 0; i < this.settings.polygon.vertex.nb; i++) {
      let vertex;
      do {
        vertex = this.getRandomVertex(verticesMaxArea);
      } while (
        (vertices.size && this.isVertexInArea(vertex, verticesArea)) ||
        !this.isVertexInArea(vertex, verticesMaxArea) ||
        !this.isVertexInArea(vertex, canvasArea) ||
        this.isVertexOnPosition(vertex)
      );
      //SET POLYGONS
      if (vertices.size >= 2) {
        const closestVertices = this.getClosestVertices(
          [...vertices],
          vertex,
          2
        );
        this.polygons.push({
          vertices: [vertex].concat(closestVertices),
          color: this.getColor(this.settings.polygon.color)
        });
      }
      vertices.add(vertex);
      verticesArea = this.getVerticesArea(vertices);
      verticesMaxArea = JSON.parse(JSON.stringify(verticesArea));
      verticesMaxArea[0].x -= this.settings.polygon.vertex.distance;
      verticesMaxArea[0].y -= this.settings.polygon.vertex.distance;
      verticesMaxArea[1].x += this.settings.polygon.vertex.distance;
      verticesMaxArea[1].y += this.settings.polygon.vertex.distance;
    }
    return this;
  }

  /**
   *
   * @param {*} settingsPolygon
   */
  drawDelaunay(settingsPolygon) {
    if (!this.isModule && typeof Delaunay === "undefined") {
      console.error(
        "You must load Delaunay's script: https://github.com/ironwallaby/delaunay"
      );
      return this;
    }
    //SETTINGS
    this.settings.polygon = settingsPolygon;
    //SET VERTICES
    let vertices = new Set();
    for (let i = 0; i < this.settings.polygon.vertex.nb; i++) {
      let vertex;
      do {
        vertex = this.getRandomVertex([
          {
            x: this.settings.canvas.padding,
            y: this.settings.canvas.padding
          },
          {
            x: this.settings.canvas.width - this.settings.canvas.padding,
            y: this.settings.canvas.height - this.settings.canvas.padding
          }
        ]);
      } while (this.isVertexOnPosition(vertex));
      vertices.add(vertex);
    }
    //ADAPT FORMAT FOR DELAUNAY'S SCRIPT
    const verticesArray = [...vertices].map(vertex => {
      return [vertex.x, vertex.y];
    });
    //SET TRIANGLES
    const triangles = this.isModule
      ? require("./delaunay").triangulate(verticesArray)
      : Delaunay.triangulate(verticesArray);
    //SET POLYGONS
    for (var i = 0; i < triangles.length; i += 3) {
      this.polygons.push({
        vertices: [
          [...vertices][triangles[i]],
          [...vertices][triangles[i + 1]],
          [...vertices][triangles[i + 2]]
        ],
        color: this.getColor(this.settings.polygon.color)
      });
    }
    return this;
  }

  drawPop(settingsPolygon) {
    //SETTINGS
    this.settings.polygon = settingsPolygon;
    // CHECK IF AN IMAGE IS ALREADY LOADED
    if (!this.settings.image) {
      console.error("An image must be loaded first.");
      return this;
    }
    //CHECK IF VERTEX DISTANCE IS SET
    if (!this.settings.polygon.vertex.distance) {
      const distance =
        (this.settings.image.width < this.settings.image.height
          ? this.settings.image.width
          : this.settings.image.height) / 2;
      console.warn(
        `this.settings.polygon.vertex.distance not set, auto set at ${distance}`
      );
      this.settings.polygon.vertex.distance = distance;
    }
    //SET POLYGONS
    let polygons = new Set();
    //SET AREA
    const area = [
      {
        x:
          this.settings.image.area[0].x - this.settings.polygon.vertex.distance,
        y: this.settings.image.area[0].y - this.settings.polygon.vertex.distance
      },
      {
        x:
          this.settings.image.area[1].x + this.settings.polygon.vertex.distance,
        y: this.settings.image.area[1].y + this.settings.polygon.vertex.distance
      }
    ];
    for (let i = 0; i < this.settings.polygon.vertex.nb; i++) {
      // first in pixel vertex
      let vertexIn1;
      do {
        vertexIn1 = this.getRandomVertex(area);
      } while (!this.isVertexOnPixel(vertexIn1));
      // second in pixel vertex
      let vertexIn2;
      do {
        vertexIn2 = this.getRandomVertex(area);
      } while (!this.isVertexOnPixel(vertexIn2));
      // third out pixel vertex
      let vertexOut;
      do {
        vertexOut = this.getRandomVertex(area);
      } while (this.isVertexOnPixel(vertexOut));
      polygons.add([vertexIn1, vertexIn2, vertexOut]);
    }
    //DRAW POLYGONS
    for (const polygon of polygons) {
      this.polygons.push({
        vertices: polygon,
        color: this.getColor(this.settings.polygon.color)
      });
    }
    return this;
  }

  /**
   *
   * @param {*} settingsImage
   */
  addImage(settingsImage) {
    this.settings.image = settingsImage;
    return new Promise((resolve, reject) => {
      if (this.isModule) {
        const { loadImage } = require("canvas");
        loadImage(this.settings.image.src)
          .then(img => {
            this.drawImage(img);
            resolve(this);
          })
          .catch(error => {
            reject(error);
          });
      } else {
        let img = new Image();
        img.onload = () => {
          this.drawImage(img);
          resolve(this);
        };
        img.onerror = error => {
          reject(error);
        };
        img.src = this.settings.image.src;
      }
    });
  }

  /**
   *
   * @param {*} image
   */
  drawImage(image) {
    if (this.settings.image.width) {
      image.height = (image.height * this.settings.image.width) / image.width;
      image.width = this.settings.image.width;
    }
    //add data to image setting
    this.settings.image.width = image.width;
    this.settings.image.height = image.height;
    this.settings.image.area = [
      {
        x: (this.canvas.width - image.width) / 2,
        y: (this.canvas.height - image.height) / 2
      },
      {
        x: (this.canvas.width - image.width) / 2 + image.width,
        y: (this.canvas.height - image.height) / 2 + image.height
      }
    ];
    //draw centered image
    this.ctx.drawImage(
      image,
      this.settings.image.area[0].x,
      this.settings.image.area[0].y,
      image.width,
      image.height
    );
  }

  drawPolygons() {
    for (const polygon of this.polygons) {
      this.drawPolygon(polygon.vertices, polygon.color);
    }
    return this;
  }

  /**
   *
   * @param {*} querySelector
   */
  append(querySelector, interval = 0) {
    if (this.isModule) {
      console.error("Can't use append in Module");
      return;
    }
    const element = this.document.querySelector(querySelector);
    element.append(this.canvas);
    (async () => {
      for (const polygon of this.polygons) {
        this.drawPolygon(polygon.vertices, polygon.color);
        if (interval) {
          await new Promise(resolve => setTimeout(resolve, interval));
        }
      }
    })();
  }

  export(settingsExport = {}) {
    if (!this.isModule) {
      console.error("Can't use export in Browser");
      return;
    }
    const path = require("path");
    const fs = require("fs");
    const fsPromises = fs.promises;
    // PATH
    if (!settingsExport.path) {
      settingsExport.path = "output";
    }
    settingsExport.path = path.normalize(settingsExport.path);
    if (!fs.existsSync(settingsExport.path)) {
      fs.mkdirSync(settingsExport.path);
    }
    // FILENAME
    if (!settingsExport.filename) {
      settingsExport.filename = "";
    } else {
      settingsExport.filename += "-";
    }
    // EXPORT FRAMES
    (async () => {
      for await (const [i, polygon] of this.polygons.entries()) {
        // CANVAS
        const canvas = this.document.createElement("canvas");
        // CANVAS SIZES
        canvas.width = this.settings.canvas.width;
        canvas.height = this.settings.canvas.height;
        // CTX
        const ctx = canvas.getContext("2d");
        // FILL COLOR
        if (settingsExport.fill) {
          ctx.fillStyle = this.getColor(settingsExport.fill, [
            { x: 0, y: 0 },
            { x: 0, y: canvas.height }
          ]);
          // ADD BACKGROUND
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        // ADD POLYGON
        this.drawPolygon(polygon.vertices, polygon.color);
        // ADD POLYGONS TO EXPORT CANVAS
        ctx.drawImage(this.canvas, 0, 0, canvas.width, canvas.height);

        if (settingsExport.allFrames || this.polygons.length - 1 === i) {
          // EXPORT
          const fileExport = `${settingsExport.path}/${
            settingsExport.filename
          }${Date.now()}.png`;
          try {
            await fsPromises.writeFile(
              fileExport,
              canvas.toDataURL().replace(/^data:image\/png;base64,/, ""),
              "base64"
            );
            console.log(i + 1, fileExport);
          } catch (error) {
            console.error(error);
          }
        }
      }
    })();
    return this;
  }

  /**
   *
   * @param {*} vertex
   */
  isVertexOnPixel(vertex) {
    return (
      vertex.x >= 0 &&
      vertex.y >= 0 &&
      JSON.stringify(
        Array.from(this.ctx.getImageData(vertex.x, vertex.y, 1, 1).data)
      ) !== JSON.stringify(Array.from([0, 0, 0, 0]))
    );
  }

  /**
   *
   * @param {*} vertex
   */
  isVertexOnPosition(vertex) {
    return (
      typeof this.settings.polygon.vertex.onPixel !== "undefined" &&
      ((this.settings.polygon.vertex.onPixel === false &&
        this.isVertexOnPixel(vertex)) ||
        (this.settings.polygon.vertex.onPixel === true &&
          !this.isVertexOnPixel(vertex)))
    );
  }

  /**
   *
   * @param {*} color
   * @param {*} area
   */
  getColor(color, area) {
    if (Array.isArray(color)) {
      return this.getRandomArrayValue(color);
    } else if (typeof color === "object") {
      let linearGradient = this.ctx.createLinearGradient(
        area[0].x,
        area[0].y,
        area[1].x,
        area[1].y
      );
      for (let index in color) {
        linearGradient.addColorStop(index, color[index]);
      }
      return linearGradient;
    } else {
      return color;
    }
  }

  /**
   *
   * @param {*} vertices
   * @param {*} color
   */
  drawPolygon(vertices, color) {
    //STROKE COLOR
    this.ctx.strokeStyle = this.getColor(this.settings.polygon.line.color, [
      { x: 0, y: this.settings.canvas.padding },
      { x: 0, y: this.canvas.height - this.settings.canvas.padding }
    ]);
    //LINE STYLE
    if (this.settings.polygon.line.width) {
      this.ctx.lineWidth = this.settings.polygon.line.width;
    }
    this.ctx.lineCap = this.settings.polygon.line.cap;
    this.ctx.lineJoin = this.settings.polygon.line.join;
    //BLENDING MODE
    if (this.settings.polygon.blendingMode) {
      this.ctx.globalCompositeOperation = this.settings.polygon.blendingMode;
    }
    this.ctx.beginPath();
    this.ctx.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 1; i < vertices.length; i++) {
      this.ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    this.ctx.closePath();
    if (color) {
      this.ctx.fillStyle = color;
      this.ctx.fill();
      if (!this.settings.polygon.line.width) {
        this.ctx.strokeStyle = color;
      }
    }
    this.ctx.stroke();
  }

  /**
   *
   * @param {*} vertexA
   * @param {*} vertexB
   */
  getVerticesDistance(vertexA, vertexB) {
    return (
      Math.pow(vertexA.x - vertexB.x, 2) + Math.pow(vertexA.y - vertexB.y, 2)
    );
  }

  /**
   *
   * @param {*} vertices
   * @param {*} vertex
   * @param {*} count
   */
  getClosestVertices(vertices, vertex, count) {
    return vertices
      .sort((a, b) => {
        return (
          this.getVerticesDistance(a, vertex) -
          this.getVerticesDistance(b, vertex)
        );
      })
      .slice(0, count);
  }

  /**
   *
   * @param {*} min
   * @param {*} max
   */
  getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   *
   * @param {*} area
   */
  getRandomVertex(area) {
    return {
      x: this.getRandomNumberBetween(area[0].x, area[1].x),
      y: this.getRandomNumberBetween(area[0].y, area[1].y)
    };
  }

  /**
   *
   * @param {*} vertex
   * @param {*} area
   */
  isVertexInArea(vertex, area) {
    return (
      vertex.x > area[0].x &&
      vertex.x < area[1].x &&
      vertex.y > area[0].y &&
      vertex.y < area[1].y
    );
  }

  /**
   *
   * @param {*} vertices
   */
  getVerticesArea(vertices) {
    let area = [
      { x: null, y: null },
      { x: null, y: null }
    ];
    for (let vertex of vertices) {
      area[0].x = vertex.x < area[0].x ? vertex.x : area[0].x || vertex.x;
      area[0].y = vertex.y < area[0].y ? vertex.y : area[0].y || vertex.y;
      area[1].x = vertex.x > area[1].x ? vertex.x : area[1].x || vertex.x;
      area[1].y = vertex.y > area[1].y ? vertex.y : area[1].y || vertex.y;
    }
    return area;
  }

  /**
   *
   * @param {*} array
   */
  getRandomArrayValue(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}
if (typeof module !== "undefined") module.exports = LcsCnvs;
