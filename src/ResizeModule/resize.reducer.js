function getWindowSize(doomWindow = window) {
    const width = doomWindow.innerWidth;
    const height = doomWindow.innerHeight;
    return [width, height];
}

function resizeReducer(state, action) {
    const [width, height] = getWindowSize(action?.payload);
    state.size = [width, height];
    state.center = [width / 2, height / 2];
    return state;
}

export { resizeReducer };