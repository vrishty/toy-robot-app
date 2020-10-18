import {
    LEFT,
    MOVE,
    PLACE,
    REPORT,
    RIGHT,
    MAX_UNIT,
    MIN_UNIT,
    MOVEMENT_MAP,
    DIRECTIONS_MAP
} from "../../constants";

const isNil = value => typeof value === "undefined" || value === null;

const isNotNumber = value => isNil(value) || isNaN(value) || `${value}`.trim() === "";

const isValidUnit = value => (value >= MIN_UNIT && value <= MAX_UNIT);

//Validate the units entered for PLACE command
const validateUnits = (x, y) => {
    if (isNotNumber(x) || isNotNumber(y)) {
        return false;
    }
    return (isValidUnit(Number(x)) && isValidUnit(Number(y)))
};

const getDegrees = (degree, variance) => {
    return (360 + degree + variance) % 360;
};

export function ToyRobot() {
    let unitX,
    unitY,
    directionInDegree,
    isPlacedOnTable = false;

    const setUnits = (x,y) => {
        unitX = Number(x);
        unitY = Number(y);
    }

    const placeRobot = (place = "") => {
        const [xUnit, yUnit, direction] = typeof place === "string" ? place.split(",") : "";
        if (!validateUnits(xUnit, yUnit)) {
            return ["ERROR: Invalid/Incomplete position for PLACE. Try units within 0 to 5", ""];
        }
        if (isNil(direction) || isNil(DIRECTIONS_MAP[direction])) {
            return ["ERROR: Invalid direction for PLACE. Try either EAST, WEST, NORTH or SOUTH", ""];
        }
        setUnits(xUnit, yUnit);
        directionInDegree = DIRECTIONS_MAP[direction];
        isPlacedOnTable = true;
        return ["", ""];
    };

    const moveRobot = () => {
        const variance = MOVEMENT_MAP[directionInDegree];
        console.log("variance : " + variance);
        const newUnitX = unitX + variance.x;
        const newUnitY = unitY + variance.y;
        if (validateUnits(newUnitX, newUnitY)) {
            setUnits(newUnitX, newUnitY);
            return ["", ""];
        }
        return ["ERROR: MOVE is not allowed in current direction. Try LEFT or RIGHT before MOVE", ""];
    };

    const turnLeft = () => {
        directionInDegree = getDegrees(directionInDegree, -90);
        return ["", ""];
    };

    const turnRight = () => {
        directionInDegree = getDegrees(directionInDegree, 90);
        return ["", ""];
    };

    const reportRobot = () => {
        return ["", `${unitX},${unitY},${DIRECTIONS_MAP.getDirectionFromDegree(directionInDegree)}`]
    };
    //commands from terminal
    const getInstruction = ({ command, args }) => {
        if (!command) {
            return ["", ""];
        }
        if (!isPlacedOnTable && command !== PLACE) {
            return ["ERROR: Place the robot on the table first", ""];
        }
        switch (command) {
            case PLACE:
                return placeRobot(args._[0]);
            case REPORT:
                return reportRobot();
            case MOVE:
                return moveRobot();
            case LEFT:
                return turnLeft();
            case RIGHT:
                return turnRight();
            default:
                return ["", ""];
        }
    };
    //to be used in terminal commands
    return {
        getInstruction
    };
}
