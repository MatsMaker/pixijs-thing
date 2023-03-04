import { coreInitAction } from "./Core";
import { gameStore } from "./gameStore";
import { resizeListener } from "./ResizeModule";
import { app } from "./ViewModule/View.module";

window.appInfo = {
  // eslint-disable-next-line
  shortHash: COMMIT_INFO.shortHash,
  // eslint-disable-next-line
  commit: COMMIT_INFO.commit,
  // eslint-disable-next-line
  commitDate: COMMIT_INFO.date,
};

window.addEventListener("load", () => {
  document.body.appendChild(app.view);
  gameStore.dispatch(coreInitAction());
  resizeListener();
});
