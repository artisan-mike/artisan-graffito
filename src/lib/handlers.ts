import { MouseEvent } from 'react';

import { appState } from '@/store/appState';

import {
    calculateMousePositionOnCanvas,
    calculatePointsDistance,
    throttle,
} from './utils';

/**
 * @description retrieve the mouse position when the user click
 * on the canvas element and push it to actualStroke state
 */
export function handleMouseDown(ev: MouseEvent<HTMLCanvasElement>) {
    // get the canva element
    const canvas = ev.currentTarget;
    // calculate the actual mouse position
    const { newX, newY } = calculateMousePositionOnCanvas(canvas, ev);

    // push this point directy in the state
    if (appState.actualStroke.points.length === 0) {
        appState.actualStroke.points.push([newX, newY]);
        return;
    }
}

/**
 * @description Track the mouse positions when it is clicked moves
 * at the same time on the canvas element
 */
export const handleMouseMove = throttle(
    (ev: MouseEvent<HTMLCanvasElement>, isMousePressed: boolean) => {
        if (!isMousePressed) return;
        // get the canva element
        const canvas = ev.currentTarget;
        // calculate the actual mouse position
        const { newX, newY } = calculateMousePositionOnCanvas(canvas, ev);

        // get the last point in the actualStroke state
        // get the points in the actualStroke state
        const actualPoints = appState.actualStroke.points;
        const lastPointIndex = actualPoints.length - 1;
        const lastX = actualPoints[lastPointIndex][0];
        const lastY = actualPoints[lastPointIndex][1];

        // if the new x and y are both too close to last x and y
        // skipe this point
        if (calculatePointsDistance([newX, newY], [lastX, lastY]) < 10) return;

        // push the point to actualStroke state
        appState.actualStroke.points.push([newX, newY]);
        console.log(appState.actualStroke.points);
    },
    4,
);

/**
 * @description Push the actual stroke state data to the drawn
 * stroke state then clear the actualStroke state
 */
export function handleMouseUp() {
    appState.drawnStrokes.push({ ...appState.actualStroke });
    appState.actualStroke.points = [];
    console.log(appState);
}
