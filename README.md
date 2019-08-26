# cnvs-lcs

Generatives from Lucas drawing

![Lucas drawing](README/lcs-drw.png "Lucas Drawing")

## Methods

I've tried several methods to get there, but as the results where interesting I kept them.

### #1 Add vertex and draw triangle with closest vertices

![Add vertex and draw triangle with closest vertices](README/method-01.png "Method 01")

```javascript
LcsCnvs.drawTriangleAfterNewVertex({
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
    nb: 5000
  }
});
```

### #2 Add all vertices and then for each vertex draw triangle with closest vertices

![Add all vertices and then for each vertex draw triangle with closest vertices](README/method-02.png "Method 02")

```javascript
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
    cap: "square",
    join: "round"
  },
  vertex: {
    nb: 750,
    color: ["#33A9AC", "#FFA646", "#F86041", "#982062", "#343779"]
  }
});
```

### #3 Add vertex close to vertices zone and draw triangle with closest vertices

![Add vertex close to vertices zone and draw triangle with closest vertices](README/method-03.png "Method 03")

```javascript
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
    cap: "square",
    join: "round"
  },
  vertex: {
    nb: 1200,
    distance: 10,
    color: ["#F23054", "#8C4558", "#025E73", "#037F8C", "#4BB8BE"]
  }
});
```

### Delaunay !

Since I couldn't find a way to get there I did research and find out [Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation) and then [this script](https://github.com/ironwallaby/delaunay).

![Delaunay](README/method-04.png "Method 04")

```javascript
LcsCnvs.drawDelaunay({
  canvas: {
    width: 2100,
    height: 2970,
    padding: 400
  },
  color: {
    fill: "#ffffff",
    stroke: "#000000"
  },
  line: {
    width: 0,
    cap: "square",
    join: "round"
  },
  vertex: {
    nb: 25,
    color: ["#1F90FF", "#1CE867", "#FBFF2C", "#E8941C", "#FF2B31"]
  }
});
```

## Settings

Here is a basic setting:

```javascript
{
  canvas: { //canvas settings
    width: 2100,
    height: 2970,
    padding: 100 //padding can be negative
  },
  color: {
    fill: "#ffffff", //background color
    stroke: { //line color
      "0": "#ff0000", //if color is an Object, it will be a gradient
      "0.5": "#00ff00",
      "1": "#0000ff" //from 0 to 1
    }
  },
  line: {
    width: 10, //0 to remove border
    cap: "square",
    join: "round"
  },
  vertex: {
    nb: 25, //number of vertex
    color: ["#1F90FF", "#1CE867", "#FBFF2C", "#E8941C", "#FF2B31"] //if color is an Array, a color will be randomly used
  }
}
```

By changing those settings, outputs can be very differents.
