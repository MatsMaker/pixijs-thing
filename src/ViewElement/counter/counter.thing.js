import { Text } from "pixi.js";
import { gameStore } from "../../gameStore";
import { counterSlice } from "./counter.slice";

export function counterThing(props, prev) {
  console.log("counter: rerender");

  const [counter] = props;
  const text = "Counter: " + counter;
  let textRef;

  if (prev) {
    textRef = this.tGetRef("textRef");
    textRef.text = text;
  } else {
    textRef = new Text(text, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xff1010,
      align: "center",
    });
    this.tSaveRef("textRef", textRef, false);
    textRef.interactive = true;
    textRef.buttonMode = true;

    textRef.on("click", () => {
      gameStore.dispatch(counterSlice.actions.increment());
    });

    return [textRef];
  }
}
