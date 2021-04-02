import React, {MouseEvent, RefObject, useEffect, useRef, useState} from 'react';
import classes from './SelectTimeSlot.module.scss';
import {fillArea, fillCellsRef, generateDayNumbers, getWeekHours, getXYFromDataCellElement} from './util';


export const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
type WeekDays = typeof WEEK_DAYS[number];
export type WeekHours = {
    [a in WeekDays]?: number[];
};

export interface Point {
    x: number,
    y: number
}


interface SelectTimeSlotProp {
    timeSlot?: WeekHours
    color?: string
    onSave: (weekHours: WeekHours) => void
}

const HOURS_IN_DAY = 24;

const NONE_COLOR = 'white';

const SelectTimeSlot = ({timeSlot, onSave, color = 'red'}: SelectTimeSlotProp) => {

    const [filling, setFilling] = useState(false);
    const [fillColor, setFillColor] = useState(color);
    const [fromPoint, setFromPoint] = useState<Point>({
        x: 0,
        y: 0
    });

    const cells = useRef<RefObject<HTMLTableDataCellElement>[][]>(fillCellsRef(WEEK_DAYS.length, HOURS_IN_DAY));

    useEffect(() => {
        if (timeSlot) {
            const timeSlotEntries = Object.entries(timeSlot);
            const timeSlotParsed = timeSlotEntries.map(([a, b]: any) => ([WEEK_DAYS.indexOf(a), b]))
            timeSlotParsed.forEach(([i, hours]) => {
                for (let j = 0; j < hours.length; j++) {
                    cells.current[i][hours[j] - 1].current!.style.backgroundColor = color;
                }
            })
        }
    }, [timeSlot, color]);


    const onMouseDown = (e: MouseEvent<HTMLTableElement>) => {
        setFilling(true);
        const target = e.target as HTMLTableDataCellElement;
        const [x, y] = getXYFromDataCellElement(target)
        if (x!=null && y!=null) {
            const localColor = target.style.backgroundColor === color ? NONE_COLOR : color;
            setFillColor(localColor);
            fillArea(cells, {x, y}, {x, y}, localColor);
            setFromPoint({x, y});
        }
    }
    const onMouseUp = (e: MouseEvent<HTMLTableElement>) => {
        setFilling(false);
    }

    const onMouseOver = (e: MouseEvent<HTMLTableElement>) => {
        const target = e.target as HTMLTableDataCellElement;
        const [x, y] = getXYFromDataCellElement(target)
        if (x!=null && y!=null && filling) {
            fillArea(cells, fromPoint, {x, y}, fillColor);
        }
    }

    const onClickSave = () => {
        onSave(getWeekHours(cells, color));
    }

    return (
        <div className={classes.main}>
            <div><b>Hi test. Please select timeslot 😀</b></div>
            <table onMouseOver={onMouseOver} onMouseUp={onMouseUp} onMouseDown={onMouseDown}
                   className={classes.table + ' noSelect'}>
                <thead>
                <tr>
                    <th/>
                    {generateDayNumbers(HOURS_IN_DAY).map((cell, index) => (
                        <th key={index + 1}>{index + 1}</th>
                    ))}
                </tr>
                {cells.current.map((row, i) => (
                    <tr key={i}>
                        <td>{WEEK_DAYS[i]}</td>
                        {row.map((cell, j) => (
                            <td
                                ref={cells.current[i][j]}
                                key={i + j}
                                data-x={i}
                                data-y={j}
                                className={classes.cells}/>
                        ))}
                    </tr>
                ))}
                </thead>
            </table>
            <button className={classes.button} onClick={onClickSave}>Save</button>
        </div>
    );
};

export {SelectTimeSlot};
