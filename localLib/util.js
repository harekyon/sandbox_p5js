export function timestamp(p) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var millis = date.getMilliseconds();

  year = year.toString().substr(2);
  month = ("00" + month).substr(-2, 2);
  day = ("00" + day).substr(-2, 2);
  minute = ("00" + minute).substr(-2, 2);
  second = ("00" + second).substr(-2, 2);

  return [year, month, day, "_", hour, minute, second, "_", millis].join("");
}

export function sortColors(colors, method, p) {
  const chroma = require("chroma-js");
  // sort red
  if (method == "red")
    colors.sort(function (a, b) {
      if (p.red(a) < p.red(b)) return -1;
      if (p.red(a) > p.red(b)) return 1;
      return 0;
    });

  // sort p.green
  if (method == "green")
    colors.sort(function (a, b) {
      if (p.green(a) < p.green(b)) return -1;
      if (p.green(a) > p.green(b)) return 1;
      return 0;
    });

  // sort blue
  if (method == "blue")
    colors.sort(function (a, b) {
      if (p.blue(a) < p.blue(b)) return -1;
      if (p.blue(a) > p.blue(b)) return 1;
      return 0;
    });

  // sort hue
  if (method == "hue")
    colors.sort(function (a, b) {
      //convert a and b from RGB to HSV
      var aHue = chroma(p.red(a), p.green(a), p.blue(a)).get("hsv.h");
      var bHue = chroma(p.red(b), p.green(b), p.blue(b)).get("hsv.h");

      if (aHue < bHue) return -1;
      if (aHue > bHue) return 1;
      return 0;
    });

  // sort saturation
  if (method == "saturation")
    colors.sort(function (a, b) {
      //convert a and b from RGB to HSV
      var aSat = chroma(p.red(a), p.green(a), p.blue(a)).get("hsv.s");
      var bSat = chroma(p.red(b), p.green(b), p.blue(b)).get("hsv.s");

      if (aSat < bSat) return -1;
      if (aSat > bSat) return 1;
      return 0;
    });

  // sort brightness
  if (method == "brightness")
    colors.sort(function (a, b) {
      //convert a and b from RGB to HSV
      var aBright = chroma(p.red(a), p.green(a), p.blue(a)).get("hsv.v");
      var bBright = chroma(p.red(b), p.green(b), p.blue(b)).get("hsv.v");

      if (aBright < bBright) return -1;
      if (aBright > bBright) return 1;
      return 0;
    });

  // sort grayscale
  if (method == "grayscale")
    colors.sort(function (a, b) {
      var aGrey = p.red(a) * 0.222 + p.green(a) * 0.707 + p.blue(a) * 0.071;
      var bGrey = p.red(b) * 0.222 + p.green(b) * 0.707 + p.blue(b) * 0.071;

      if (aGrey < bGrey) return -1;
      if (aGrey > bGrey) return 1;
      return 0;
    });

  // sort alpha
  if (method == "alpha")
    colors.sort(function (a, b) {
      if (p.alpha(a) < p.alpha(b)) return -1;
      if (p.alpha(a) > p.alpha(b)) return 1;
      return 0;
    });

  return colors;
}

export function aseEncode(p5colors) {
  //   console.log(p5colors);
  const p5 = require("p5");
  var aseUtils = require("ase-utils");
  var swatches = {
    version: "1.0",
    groups: [],
    colors: [],
  };

  if (Array.isArray(p5colors)) {
    p5colors.forEach(function (c) {
      checkAndAddSwatch(c);
    });
  } else {
    checkAndAddSwatch(p5colors);
  }

  function checkAndAddSwatch(c) {
    if (c instanceof p5.Color) {
      swatches.colors.push({
        name: c._array.slice(0, 3).join("-"),
        model: "RGB",
        color: c._array.slice(0, 3),
        type: "global",
      });
    } else {
      throw new Error("Needs p5.Color array as argument.");
    }
  }

  return aseUtils.encode(swatches);
}
