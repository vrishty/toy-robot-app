export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const MOVE = "MOVE";
export const PLACE = "PLACE";
export const REPORT = "REPORT";

export const MAX_UNIT = 5;
export const MIN_UNIT = 0;

export const DIRECTIONS_MAP = {
    EAST: 0,
    SOUTH: 90,
    WEST: 180,
    NORTH: 270,
    getDirectionFromDegree: function (degree) {
        return Object.keys(this).filter(direction => this[direction] === degree)[0]
    }
};

export const MOVEMENT_MAP = {
    0: { x: 1, y: 0 },
    90: { x: 0, y: -1 },
    180: { x: -1, y: 0 },
    270: { x: 0, y: 1 }
};