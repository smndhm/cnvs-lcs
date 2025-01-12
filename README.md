# lcs-cnvs

![Lucas drawing](README/lcs-drw.png "Lucas Drawing")

At first, the idea was to generate something close to Lucas's drawing.  
I've tried several approaches to get there, but as the results where interesting I kept them.

## Approaches

### #1 Add vertex and draw triangle with closest vertices

| 20 vertices                 | 2000 vertices               |
| --------------------------- | --------------------------- |
| ![](README/method-01-a.png) | ![](README/method-01-b.png) |

### #2 Add all vertices and then for each vertex draw triangle with closest vertices

| 20 vertices                 | 2000 vertices               |
| --------------------------- | --------------------------- |
| ![](README/method-02-a.png) | ![](README/method-02-b.png) |

### #3 Add vertex close to vertices zone and draw triangle with closest vertices

| 20 vertices                 | 2000 vertices               |
| --------------------------- | --------------------------- |
| ![](README/method-03-a.png) | ![](README/method-03-b.png) |

### Delaunay!

Since I couldn't find a way to get there I did research and find out [Delaunay triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation) and then [this script](https://github.com/ironwallaby/delaunay).

| 20 vertices                 | 2000 vertices               |
| --------------------------- | --------------------------- |
| ![](README/method-04-a.png) | ![](README/method-04-b.png) |

Even if Lucas's drawing wasn't only based on triangles, this is really what I tried to get. **And I have its validation ;)**

## API

The API can be used in script in Browser or with [Node.js](https://nodejs.org/).  
**For Node.js, your project require [`jsdom`](https://www.npmjs.com/package/jsdom) and [`canvas`](https://www.npmjs.com/package/canvas).**

### Init

First, we need to set a canvas:

#### .setCanvas(settings)

```javascript
const canvasSettings = {
  width: 2100,
  height: 2970,
  padding: 100, // padding can be negative
  fill: "#ffffff" // background color
};

const mySheet = new LcsCnvs();
mySheet.setCanvas(canvasSettings);
```

### Draw

And now we can draw:

#### .drawTriangleAfterNewVertex(settings)

```javascript
mySheet.drawTriangleAfterNewVertex(polygonSettings);
```

#### .drawTriangleForEachVertex(settings)

```javascript
mySheet.drawTriangleForEachVertex(polygonSettings);
```

#### .drawTriangleAround(settings)

```javascript
mySheet.drawTriangleAround(polygonSettings);
```

#### .drawDelaunay(settings)

```javascript
mySheet.drawDelaunay(polygonSettings);
```

##### Settings

By changing the polygon settings, outputs can be very differents.

Here is a polygon setting example:

```javascript
{
  color: ["#1F90FF", "#1CE867", "#FBFF2C", "#E8941C", "#FF2B31"] // if color is an Array, a color will be randomly used
  blendingMode: "multiply",
  line: {
    color: {
      // line color
      "0": "#ff0000", // if color is an Object, it will be a gradient
      "0.5": "#00ff00",
      "1": "#0000ff" // from 0 to 1
    },
    width: 5, // 0 to remove border
    cap: "square",
    join: "round"
  },
  vertex: {
    nb: 12000, // number of vertex
    distance: 5, // maximum vertex distance from vertice area (only used for the drawTriangleAround method)
    onPixel: true // used if you don't wan't vertex on loaded image, need a transparent background
  }
}
```

### Display

And then, <u>in your browser</u>, display result:

#### .append(querySelector[, delay])

**delay** option will create an animation displaying polygons one after one.

```javascript
mySheet.append("body", 100);
```

Or export file <u>with Node.js</u>:

#### .export([settings])

By default, exported files will go to `output/${timestamp}.png`

```javascript
const exportSettings = {
  allFrames: true, // export each frames after adding polygons
  fill: "#ffffff", // background color
  path: "export", // export folder
  filename: "blu" // export filename
};

mySheet.export(exportSettings);

// files will export to 'export/blu-${timestamp}.png'
```

**allFrames** option will export all the frames after a new polygon is added.  
You can use this option to generate video using [FFMpeg](https://www.ffmpeg.org/):

```shell
ffmpeg -framerate 33  -pattern_type glob -i 'output/*.png' -c:v libx264 -pix_fmt yuv420p -filter:v fps=fps=30 output/gif.mp4
```

Or a gif using [Convert](https://imagemagick.org/script/convert.php) from [ImageMagick](https://imagemagick.org/):

```shell
convert output/*.png output/polygons.gif
```

| #1                          | #2                          | #3                          | #4                          | #5                        |
| --------------------------- | --------------------------- | --------------------------- | --------------------------- | ------------------------- |
| ![](README/method-01-c.png) | ![](README/method-02-c.png) | ![](README/method-03-c.png) | ![](README/method-04-c.png) | ![](README/method-01.gif) |

### Extra

Because _I had to_ use those generative for [Daron Crew](https://www.instagram.com/daroncrew) artworks, I added this extra method:

#### .addImage(settings)

```javascript
const imageSettings = {
  src: "./img/daron-crew.svg", // path to image
  width: 1520 // desired width (height is calculated)
};

mySheet.addImage(imageSettings).then(sheet => {
  sheet.append("body");
});
```

**The image will be vertically and horizontally centered.**

There is also a dedicated polygon parameter: `onPixel`.
If defined, it will condition if vertex must be positionned on used pixel (`true`) or not (`false`).
**Must be used on a canvas without background.**

| onPixel: undefined            | onPixel: false                          | onPixel: true                           |
| ----------------------------- | --------------------------------------- | --------------------------------------- |
| ![](README/method-01-img.png) | ![](README/method-01-img-onPixel-0.png) | ![](README/method-01-img-onPixel-1.png) |

## Example

[Here some code examples](example) and [Here a demo](https://smndhm.github.io/lcs-cnvs/).

## next

No jealous, I have to take a look at the drawing of the brother...

![](README/thbt-drw.png)
