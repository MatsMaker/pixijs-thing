import { Application } from "pixi.js";
import Thing from "./Thing";
import { v4 as uuidv4 } from "uuid";
import { gameStore } from "../gameStore";
import { mainSceneThing } from "../ViewElement/mainScene/mainScene.thing";

/// #if DEBUG
// eslint-disable-next-line
import * as PIXI from "pixi.js";
import isEqual from "./isEqual";
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
/// #endif
const app = new Application({
  resizeTo: window,
  backgroundAlpha: 0,
  useContextAlpha: true,
  preserveDrawingBuffer: true,
});

app.view.style.position = "absolute";
app.view.style.left = "0px";
app.view.style.top = "0px";

const noWatchArr = [];
function defaultSelector() {
  return noWatchArr;
}

const componentsStore = new Map();
const sceneRef = insertThing(app.stage, mainSceneThing);

function insertThing(
  place,
  fThing,
  selector = defaultSelector,
  subscribe = gameStore.subscribe
) {
  let unsubscribe;
  const uidKey = uuidv4();
  const self = new Thing(fThing.name, uidKey);

  function render() {
    const prev = componentsStore.get(uidKey);
    const newData = selector(gameStore.getState());
    if (!isEqual(prev?.data, newData)) {
      const current = {
        data: newData,
        self,
        unsubscribe,
      };
      componentsStore.set(uidKey, current);
      const newView = fThing.call(self, newData, prev?.data);
      if (newView === null) {
        self.removeChildren();
        unsubscribe();
      } else if (newView) {
        self.removeChildren();
        self.addChild(...newView);
      }
    }
  }
  unsubscribe = subscribe(render);

  place.addChild(self);
  render();

  return self;
}

function removeThing(ref) {
  let element;
  const children = [...ref.children];
  for (let i = 0; i < children.length; i++) {
    element = children[i];
    if (element instanceof Thing) {
      removeThing(element);
    }
  }
  const view = componentsStore.get(ref.uuid);
  view.unsubscribe();
  componentsStore.delete(ref.uuid);
  ref.destroy();
}

export { sceneRef, app, componentsStore, removeThing, insertThing };
