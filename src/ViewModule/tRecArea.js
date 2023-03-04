import { NINE_ANCHOR } from "./nineAnchor";

function calcRecArea(fromTDot, toTDot) {
  const xCenter = (toTDot.x - fromTDot.x) / 2;
  const yCenter = (toTDot.y - fromTDot.y) / 2;
  return [
    [
      [fromTDot.x, fromTDot.y],
      [xCenter, fromTDot.y],
      [toTDot.x, fromTDot.y],
    ],
    [
      [fromTDot.x, yCenter],
      [xCenter, yCenter],
      [toTDot.x, yCenter],
    ],
    [
      [fromTDot.x, toTDot.y],
      [xCenter, toTDot.y],
      [toTDot.x, toTDot.y],
    ],
  ];
}

class RecArea {
  #nineSize;

  static getDot(nineTransformType, nineSize) {
    switch (nineTransformType) {
      case NINE_ANCHOR.LEFT_TOP:
        return nineSize[0][0];
      case NINE_ANCHOR.CENTER_TOP:
        return nineSize[0][1];
      case NINE_ANCHOR.RIGHT_TOP:
        return nineSize[0][2];
      case NINE_ANCHOR.LEFT_CENTER:
        return nineSize[1][0];
      case NINE_ANCHOR.CENTER_CENTER:
        return nineSize[1][1];
      case NINE_ANCHOR.RIGHT_CENTER:
        return nineSize[1][2];
      case NINE_ANCHOR.LEFT_BOTTOM:
        return nineSize[2][0];
      case NINE_ANCHOR.CENTER_BOTTOM:
        return nineSize[2][1];
      case NINE_ANCHOR.RIGHT_BOTTOM:
        return nineSize[2][2];
      default:
        throw "Wrong nineTransformType";
    }
  }

  constructor(arr) {
    if (arr.length === 2) {
      this.#nineSize = calcRecArea(arr[0], arr[1]);
    } else if (arr.length === 3) {
      this.#nineSize = arr; /// TODO: need make deep clone from arr
    } else {
      throw "Arr is required and mast be Array";
    }
  }
  get leftTop() {
    return this.#nineSize[0][0];
  }
  get centerTop() {
    return this.#nineSize[0][1];
  }
  get rightTop() {
    return this.#nineSize[0][2];
  }
  get leftCenter() {
    return this.#nineSize[1][0];
  }
  get centerCenter() {
    return this.#nineSize[1][1];
  }
  get rightCenter() {
    return this.#nineSize[1][2];
  }
  get leftBottom() {
    return this.#nineSize[2][0];
  }
  get centerBottom() {
    return this.#nineSize[2][1];
  }
  get rightBottom() {
    return this.#nineSize[2][2];
  }
  get asArray() {
    return this.#nineSize;
  }
}

export { RecArea, calcRecArea };
