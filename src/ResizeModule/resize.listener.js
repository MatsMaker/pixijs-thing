import { gameStore } from "../gameStore";
import { resizeSlice } from "./resize.slice";

function resizeListener() {
  var debounce = require("debounce");
  window.onresize = debounce(resize, process.env.LOW_FPS);
  function resize(event) {
    gameStore.dispatch(resizeSlice.actions.resize(event.currentTarget));
  }
}

export { resizeListener };
