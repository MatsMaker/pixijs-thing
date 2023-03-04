import { Text } from "pixi.js";

export function demoComponent() {
  console.log("demo: r");
  return [
    new Text("Example demo component", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xff1010,
      align: "center",
    }),
  ];
}
