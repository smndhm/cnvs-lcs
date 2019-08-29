import { Delaunay } from "./delaunay.js";

export let LcsCnvs;
(function() {
  "use strict";

  /**
   * GET RANDOM NUMBER BETWEEN
   */
  const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  /**
   * GET RANDOM VERTEX
   */
  const getRandomVertex = area => {
    return {
      x: getRandomNumberBetween(area[0].x, area[1].x),
      y: getRandomNumberBetween(area[0].y, area[1].y)
    };
  };

  /**
   * GET VERTICES DISTANCE
   */
  const getVerticesDistance = (vertexA, vertexB) => {
    return (
      Math.pow(vertexA.x - vertexB.x, 2) + Math.pow(vertexA.y - vertexB.y, 2)
    );
  };

  /**
   * GET CLOSEST VERTICES
   */
  const getClosestVertices = (vertices, vertex, count) => {
    return vertices
      .sort((a, b) => {
        return getVerticesDistance(a, vertex) - getVerticesDistance(b, vertex);
      })
      .slice(0, count);
  };

  /**
   * IS VERTEX IN CANVAS
   */
  const isVertexInArea = (vertex, area) => {
    return (
      vertex.x > area[0].x &&
      vertex.x < area[1].x &&
      vertex.y > area[0].y &&
      vertex.y < area[1].y
    );
  };

  /**
   * GET VERTICES AREA
   */
  const getVerticesArea = vertices => {
    let area = [{ x: null, y: null }, { x: null, y: null }];
    for (let vertex of vertices) {
      area[0].x = vertex.x < area[0].x ? vertex.x : area[0].x || vertex.x;
      area[0].y = vertex.y < area[0].y ? vertex.y : area[0].y || vertex.y;
      area[1].x = vertex.x > area[1].x ? vertex.x : area[1].x || vertex.x;
      area[1].y = vertex.y > area[1].y ? vertex.y : area[1].y || vertex.y;
    }
    return area;
  };

  /**
   * GET RANDOM ARRAY
   */
  const getRandomArrayValue = array => {
    return array[Math.floor(Math.random() * array.length)];
  };

  LcsCnvs = {
    // INIT SETTINGS
    setCanvas: settings => {
      LcsCnvs.settings = settings;
      LcsCnvs.canvas = document.createElement("canvas"); //TODO: check for document

      //CANVAS SIZE
      LcsCnvs.canvas.width = LcsCnvs.settings.canvas.width;
      LcsCnvs.canvas.height = LcsCnvs.settings.canvas.height;

      //CTX
      LcsCnvs.ctx = LcsCnvs.canvas.getContext("2d");

      //FILL COLOR
      if (LcsCnvs.settings.color.fill) {
        LcsCnvs.ctx.fillStyle = LcsCnvs.getColor(LcsCnvs.settings.color.fill, [
          { x: 0, y: 0 },
          { x: 0, y: LcsCnvs.canvas.height }
        ]);
        //ADD BACKGROUND
        LcsCnvs.ctx.fillRect(0, 0, LcsCnvs.canvas.width, LcsCnvs.canvas.height);
      }

      //STROKE COLOR
      LcsCnvs.ctx.strokeStyle = LcsCnvs.getColor(
        LcsCnvs.settings.color.stroke,
        [
          { x: 0, y: LcsCnvs.settings.canvas.padding },
          { x: 0, y: LcsCnvs.canvas.height - LcsCnvs.settings.canvas.padding }
        ]
      );

      //LINE STYLE
      if (LcsCnvs.settings.line.width) {
        LcsCnvs.ctx.lineWidth = LcsCnvs.settings.line.width;
      }
      LcsCnvs.ctx.lineCap = LcsCnvs.settings.line.cap;
      LcsCnvs.ctx.lineJoin = LcsCnvs.settings.line.join;

      document.body.append(LcsCnvs.canvas); //TODO: put this at the end of drawing ?
    },

    getColor: (color, area) => {
      if (Array.isArray(color)) {
        return getRandomArrayValue(color);
      } else if (typeof color === "object") {
        let linearGradient = LcsCnvs.ctx.createLinearGradient(
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
    },

    /**
     * DRAW POLYGON
     */
    drawPolygon: (vertices, color) => {
      LcsCnvs.ctx.beginPath();
      LcsCnvs.ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        LcsCnvs.ctx.lineTo(vertices[i].x, vertices[i].y);
      }
      LcsCnvs.ctx.closePath();
      if (color) {
        LcsCnvs.ctx.fillStyle = color;
        LcsCnvs.ctx.fill();
        if (!LcsCnvs.settings.line.width) {
          LcsCnvs.ctx.strokeStyle = color;
        }
      }
      if (LcsCnvs.settings.vertex.blendingMode) {
        LcsCnvs.ctx.globalCompositeOperation =
          LcsCnvs.settings.vertex.blendingMode;
      }
      LcsCnvs.ctx.stroke();
    },

    /**
     * Add vertex and draw triangle with closest vertices
     */
    drawTriangleAfterNewVertex: settings => {
      LcsCnvs.setCanvas(settings);
      let vertices = new Set();
      for (let i = 0; i < LcsCnvs.settings.vertex.nb; i++) {
        const vertex = getRandomVertex([
          {
            x: LcsCnvs.settings.canvas.padding,
            y: LcsCnvs.settings.canvas.padding
          },
          {
            x: LcsCnvs.settings.canvas.width - LcsCnvs.settings.canvas.padding,
            y: LcsCnvs.settings.canvas.height - LcsCnvs.settings.canvas.padding
          }
        ]);
        if (vertices.size >= 2) {
          const closestVertices = getClosestVertices([...vertices], vertex, 2);
          LcsCnvs.drawPolygon(
            [vertex].concat(closestVertices),
            LcsCnvs.getColor(LcsCnvs.settings.vertex.color)
          );
        }
        vertices.add(vertex);
      }
    },

    /**
     * Add every vertices and then foreach draw triangle with closest vertices
     */
    drawTriangleForEachVertex: settings => {
      LcsCnvs.setCanvas(settings);
      let vertices = new Set();
      for (let i = 0; i < LcsCnvs.settings.vertex.nb; i++) {
        const vertex = getRandomVertex([
          {
            x: LcsCnvs.settings.canvas.padding,
            y: LcsCnvs.settings.canvas.padding
          },
          {
            x: LcsCnvs.settings.canvas.width - LcsCnvs.settings.canvas.padding,
            y: LcsCnvs.settings.canvas.height - LcsCnvs.settings.canvas.padding
          }
        ]);
        vertices.add(vertex);
      }
      for (let vertex of vertices) {
        const copyVertices = new Set(vertices);
        copyVertices.delete(vertex);
        const closestVertices = getClosestVertices(
          [...copyVertices],
          vertex,
          2
        );
        LcsCnvs.drawPolygon(
          [vertex].concat(closestVertices),
          LcsCnvs.getColor(LcsCnvs.settings.vertex.color)
        );
      }
    },

    /**
     * Add vertex close to vertices zone and draw triangle with closest vertices
     */
    drawTriangleAround: settings => {
      LcsCnvs.setCanvas(settings);
      let vertices = new Set();
      let canvasArea = [
        {
          x: LcsCnvs.settings.canvas.padding,
          y: LcsCnvs.settings.canvas.padding
        },
        {
          x: LcsCnvs.settings.canvas.width - LcsCnvs.settings.canvas.padding,
          y: LcsCnvs.settings.canvas.height - LcsCnvs.settings.canvas.padding
        }
      ];
      let verticesArea = JSON.parse(JSON.stringify(canvasArea));
      let verticesMaxArea = JSON.parse(JSON.stringify(canvasArea));
      for (let i = 0; i < LcsCnvs.settings.vertex.nb; i++) {
        let vertex;
        do {
          vertex = getRandomVertex(verticesMaxArea);
        } while (
          (vertices.size && isVertexInArea(vertex, verticesArea)) ||
          !isVertexInArea(vertex, verticesMaxArea) ||
          !isVertexInArea(vertex, canvasArea)
        );

        if (vertices.size >= 2) {
          const closestVertices = getClosestVertices([...vertices], vertex, 2);
          LcsCnvs.drawPolygon(
            [vertex].concat(closestVertices),
            LcsCnvs.getColor(LcsCnvs.settings.vertex.color)
          );
        }

        vertices.add(vertex);
        verticesArea = getVerticesArea(vertices);
        verticesMaxArea = JSON.parse(JSON.stringify(verticesArea));
        verticesMaxArea[0].x -= LcsCnvs.settings.vertex.distance;
        verticesMaxArea[0].y -= LcsCnvs.settings.vertex.distance;
        verticesMaxArea[1].x += LcsCnvs.settings.vertex.distance;
        verticesMaxArea[1].y += LcsCnvs.settings.vertex.distance;
      }
    },

    // Add all vertices and use Delaunay's triangulation to get triangles
    drawDelaunay: settings => {
      LcsCnvs.setCanvas(settings);
      let vertices = new Set();
      for (let i = 0; i < LcsCnvs.settings.vertex.nb; i++) {
        const vertex = getRandomVertex([
          {
            x: LcsCnvs.settings.canvas.padding,
            y: LcsCnvs.settings.canvas.padding
          },
          {
            x: LcsCnvs.settings.canvas.width - LcsCnvs.settings.canvas.padding,
            y: LcsCnvs.settings.canvas.height - LcsCnvs.settings.canvas.padding
          }
        ]);
        vertices.add(vertex);
      }
      const verticesArray = [...vertices].map(vertex => {
        return [vertex.x, vertex.y];
      });
      var triangles = Delaunay.triangulate(verticesArray);
      for (var i = 0; i < triangles.length; i += 3) {
        LcsCnvs.drawPolygon(
          [
            [...vertices][triangles[i]],
            [...vertices][triangles[i + 1]],
            [...vertices][triangles[i + 2]]
          ],
          LcsCnvs.getColor(LcsCnvs.settings.vertex.color)
        );
      }
    }
  };

  if (typeof module !== "undefined") module.exports = LcsCnvs;
})();
