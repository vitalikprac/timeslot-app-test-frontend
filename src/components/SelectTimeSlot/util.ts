import {createRef, MutableRefObject, RefObject} from "react";
import {Point, WEEK_DAYS, WeekHours} from "./SelectTimeSlot";

export const getWeekHours = (cells: MutableRefObject<RefObject<HTMLTableDataCellElement>[][]>, color: string) => {
    const weekHours: WeekHours = {};
    for (let i = 0; i < cells.current.length; i++) {
        weekHours[WEEK_DAYS[i]] = [];
        for (let j = 0; j < cells.current[i].length; j++) {
            if (cells.current[i][j].current?.style.backgroundColor === color) {
                weekHours[WEEK_DAYS[i]]!.push(j + 1);
            }
        }
        if (weekHours[WEEK_DAYS[i]]?.length === 0) {
            delete weekHours[WEEK_DAYS[i]];
        }
    }
    return weekHours;
}

export const generateDayNumbers = (size: number) => {
    return new Array(size).fill(' ');
}

export const fillArea = (cells: MutableRefObject<RefObject<HTMLTableDataCellElement>[][]>, {
    x: x1,
    y: y1
}: Point, {x: x2, y: y2}: Point, fillColor: string) => {
    if (x1 > x2) {
        [x1, x2] = [x2, x1];
    }
    if (y1 > y2) {
        [y1, y2] = [y2, y1];
    }
    for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
            cells.current[i][j].current!.style.backgroundColor = fillColor
        }
    }
}

export const fillCellsRef = (n: number, m: number) => {
    const cells: RefObject<HTMLTableDataCellElement>[][] = [];
    for (let i = 0; i < n; i++) {
        cells.push([]);
        for (let j = 0; j < m; j++) {
            cells[i].push(createRef());
        }
    }
    return cells;
}


export const getXYFromDataCellElement = (target: HTMLTableDataCellElement) => {
    return [target.dataset.x, target.dataset.y].map(n => parseInt(n!, 10)).map(b => isNaN(b) ? null : b);
}
