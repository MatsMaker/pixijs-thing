import { windowSizeSelect } from "../ResizeModule/resize.select";
import { demoComponent } from "../ViewComponent/demo.component";
import { NINE_ANCHOR } from "../ViewModule/nineAnchor";
import { TDot } from "../ViewModule/tDot";
import { calcRecArea } from "../ViewModule/tRecArea";
import { insertThing } from "../ViewModule/View.module";

export function exampleSelector(state) {
  return [windowSizeSelect(state)];
}

export function exampleComponent(props, prev) {
  const [windowSize] = props;
  const demo2 = insertThing(this, demoComponent);
  const nineSize = calcRecArea(new TDot(0, 0), new TDot(...windowSize)); // NOTE it calc you can move to slice of render module
  demo2.tNineAnchor(nineSize, NINE_ANCHOR.CENTER_CENTER);
  return [demo2];
}
