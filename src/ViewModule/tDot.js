const T_DOT = {
    X: 0,
    Y: 1,
};

class TDot extends Array {
    static getX(arr) {
        return arr[T_DOT.X];
    }
    static getY(arr) {
        return arr[T_DOT.Y];
    }
    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
    }
    get x() {
        return this[0];
    }
    set x(x) {
        this[0] = x;
    }
    get y() {
        return this[1];
    }
    set y(y) {
        this[1] = y;
    }
}

export { TDot, T_DOT };
