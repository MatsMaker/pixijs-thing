import { demoComponent } from "../../ViewComponent/demo.component";
import { counterThing, counterSelector } from "../counter";
import { exampleComponent, exampleSelector } from "../example.element";

export function mainSceneThing(props, prev) {
  if (prev) {
    this.resize();
  } else {
    this.tAddChild(counterThing, counterSelector);
    const demo1 = this.tAddChild(demoComponent);
    this.tRemoveChild(demo1);

    this.tAddChild(exampleComponent, exampleSelector);
    /// #if DEMO_MODE
    console.log("Example: Demo mod is active");
    /// #endif
  }
}
