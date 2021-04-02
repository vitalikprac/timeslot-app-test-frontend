import React, {createRef, MouseEvent, RefObject, useEffect, useRef, useState} from 'react';
import classes from './SelectTimeSlot.module.scss';

interface Point {
    x: number,
    y: number
}

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
type WeekDays = typeof WEEK_DAYS[number];
export type WeekHours = {
    [a in WeekDays]?: number[];
};


interface SelectTimeSlotProp {
    timeSlot?: WeekHours
    color?: string
    onSave: (weekHours: WeekHours) => void
}

const HOURS_IN_DAY = 24;

const NONE_COLOR = 'white';

const SelectTimeSlot = ({timeSlot,onSave, color = 'red'}: SelectTimeSlotProp) => {

    const [filling, setFilling] = useState(false);
    const [fillColor, setFillColor] = useState(color);
    const [fromPoint, setFromPoint] = useState<Point>({
        x: 0,
        y: 0
    })



    const getWeekHours = () => {
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

    const fillCellsRef = (n: number, m: number) => {
        const cells: RefObject<HTMLTableDataCellElement>[][] = [];
        for (let i = 0; i < n; i++) {
            cells.push([]);
            for (let j = 0; j < m; j++) {
                cells[i].push(createRef());
            }
        }
        return cells;
    }
    const cells = useRef<RefObject<HTMLTableDataCellElement>[][]>(fillCellsRef(WEEK_DAYS.length, HOURS_IN_DAY));

    useEffect(()=>{
        if (timeSlot){
            const timeSlotEntries = Object.entries(timeSlot);
            const timeSlotParsed = timeSlotEntries.map(([a,b]:any)=>([WEEK_DAYS.indexOf(a),b]))
            timeSlotParsed.forEach(([i,hours])=>{
                for (let j = 0; j < hours.length ;j++){
                    cells.current[i][hours[j]-1].current!.style.backgroundColor = fillColor;
                }
            })
        }
    },[timeSlot,fillColor]);

    const generateDayNumbers = (size: number) => {
        return new Array(size).fill(' ');
    }

    const fillArea = ({x: x1, y: y1}: Point, {x: x2, y: y2}: Point, fillColor: string) => {
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

    const onMouseDown = (e: MouseEvent<HTMLTableElement>) => {
        setFilling(true);
        const target = e.target as HTMLTableDataCellElement;
        const [x, y] = [target.dataset.x, target.dataset.y].map(n => parseInt(n!, 10));

        if (!isNaN(x) && !isNaN(y)) {
            if (target.style.backgroundColor === color) {
                setFillColor(NONE_COLOR);
                fillArea({x, y}, {x, y}, NONE_COLOR);
            } else {
                setFillColor(color);
                fillArea({x, y}, {x, y}, color);
            }
            setFromPoint({x, y});

        }
    }
    const onMouseUp = (e: MouseEvent<HTMLTableElement>) => {
        setFilling(false);
    }


    const onMouseOver = (e: MouseEvent<HTMLTableElement>) => {
        const target = e.target as HTMLTableDataCellElement;
        const [x, y] = [target.dataset.x, target.dataset.y].map(n => parseInt(n!, 10));
        if (!isNaN(x) && !isNaN(y)) {
            if (filling) {
                fillArea(fromPoint, {x, y}, fillColor);
            }
        }
    }

    const onClickSave = () => {
        onSave(getWeekHours());
    }

    return (
        <div className={classes.main}>
            <div><b>Hi test. Please select timeslot 😀</b></div>
            <table onMouseOver={onMouseOver} onMouseUp={onMouseUp} onMouseDown={onMouseDown}
                   className={classes.table + ' noSelect'}>
                <thead>
                <tr>
                    <th>&nbsp;</th>
                    {generateDayNumbers(HOURS_IN_DAY).map((cell, index) => {
                        return <th key={index + 1}>{index + 1}</th>
                    })}
                </tr>
                {cells.current.map((row, i) => {
                    return <tr key={i}>
                        <td>{WEEK_DAYS[i]}</td>
                        {row.map((cell, j) => {
                            return <td
                                ref={cells.current[i][j]}
                                key={i + j}
                                data-x={i}
                                data-y={j}
                                className={classes.cells}/>
                        })}
                    </tr>
                })}
                </thead>
            </table>
            <button className={classes.button} onClick={onClickSave}>Save</button>
        </div>
    );
};

export {SelectTimeSlot};
