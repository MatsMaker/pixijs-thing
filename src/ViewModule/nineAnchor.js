import { TDot } from './tDot';
import { RecArea } from './tRecArea';

const NINE_ANCHOR = {
    LEFT_TOP: 0,
    CENTER_TOP: 1,
    RIGHT_TOP: 2,

    LEFT_CENTER: 3,
    CENTER_CENTER: 4,
    RIGHT_CENTER: 5,

    LEFT_BOTTOM: 6,
    CENTER_BOTTOM: 7,
    RIGHT_BOTTOM: 8,
};

function nineAnchor(thing, nineSize, nineTransformType) {
    const anchor = RecArea.getDot(nineTransformType, nineSize);
    thing.x = TDot.getX(anchor) + thing.tOffset.x;
    thing.y = TDot.getY(anchor) + thing.tOffset.y;
}

export { NINE_ANCHOR, nineAnchor };
