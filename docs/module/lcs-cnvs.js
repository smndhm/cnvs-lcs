class LcsCnvs {
  constructor() {
    this.settings = {};
  }

  /**
   *
   * @param {*} settingsCanvas
   */
  setCanvas(settingsCanvas) {
    //SETTINGS
    this.settings.canvas = settingsCanvas;
    //CANVAS
    this.canvas = document.createElement("canvas"); //TODO: check for document
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
   * Add vertex and draw triangle with closest vertices
   */
  drawTriangleAfterNewVertex(settingPolygon) {
    //SETTINGS
    this.settings.polygon = settingPolygon;
    let vertices = new Set();
    let polygons = new Set();
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
      } while (
        typeof this.settings.polygon.vertex.onPixel !== "undefined" &&
        ((this.settings.polygon.vertex.onPixel === false &&
          this.isVertexOnPixel(vertex)) ||
          (this.settings.polygon.vertex.onPixel === true &&
            !this.isVertexOnPixel(vertex)))
      );

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
    for (const polygon of polygons) {
      this.drawPolygon(polygon, this.getColor(this.settings.polygon.color));
    }
    return this;
  }

  addImage(settingImage) {
    this.settings.image = settingImage;
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => {
        if (this.settings.image.width) {
          img.height = (img.height * this.settings.image.width) / img.width;
          img.width = this.settings.image.width;
        }
        //draw centered image
        this.ctx.drawImage(
          img,
          (this.canvas.width - img.width) / 2,
          (this.canvas.height - img.height) / 2,
          img.width,
          img.height
        );
        resolve(this);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = this.settings.image.src;
    });
  }

  append(querySelector) {
    const element = document.querySelector(querySelector);
    element.append(this.canvas);
  }

  isVertexOnPixel(vertex) {
    return (
      JSON.stringify(
        Array.from(this.ctx.getImageData(vertex.x, vertex.y, 1, 1).data)
      ) !== JSON.stringify(Array.from([0, 0, 0, 0]))
    );
  }

  /**
   *
   * @param {*} color
   * @param {*} area
   */
  getColor(color, area) {
    if (Array.isArray(color)) {
      return getRandomArrayValue(color);
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
   * DRAW POLYGON
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
   * GET VERTICES DISTANCE
   */
  getVerticesDistance(vertexA, vertexB) {
    return (
      Math.pow(vertexA.x - vertexB.x, 2) + Math.pow(vertexA.y - vertexB.y, 2)
    );
  }

  /**
   * GET CLOSEST VERTICES
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
   * GET RANDOM NUMBER BETWEEN
   */
  getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * GET RANDOM VERTEX
   */
  getRandomVertex(area) {
    return {
      x: this.getRandomNumberBetween(area[0].x, area[1].x),
      y: this.getRandomNumberBetween(area[0].y, area[1].y)
    };
  }
}
