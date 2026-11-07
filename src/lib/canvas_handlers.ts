import { appState } from '@/store/app_state';

import {
    calculateMousePositionOnCanvas,
    calculatePointsDistance,
    throttle,
} from './utils';

/**
 * @description Retrieve the mouse point position when the user click
 * on the canvas element, remove all the strokes behind the history index
 * then push the point to the actualStroke state
 */
export function handleMouseDown(ev: PointerEvent, canvas: HTMLCanvasElement) {
    // update isMousePressed app state
    appState.isMousePressed = true;
    // add th touch id the app state
    appState.touchesInTheScreen.add(ev.pointerId);

    // calculate the actual mouse position
    const { newX, newY } = calculateMousePositionOnCanvas(canvas, ev);

    // remove the strokes behind the history index
    appState.drawnStrokes.splice(
        appState.drawnStrokes.length - appState.historyIndex,
    );

    // reset the history index
    appState.historyIndex = 0;

    // push this point directly in the state
    appState.actualStroke.points.push([newX, newY]);
}

/**
 * @description Track the mouse positions when it is clicked moves
 * at the same time on the canvas element
 */
export const handleMouseMove = throttle(
    (ev: MouseEvent, canvas: HTMLCanvasElement) => {
        // if there are two fingers in the screen to nothing ad clear the
        // points in the state
        if (appState.touchesInTheScreen.size > 1) {
            appState.actualStroke.points = [];
            return;
        }
        // if the mouse is not pressed, do nothing
        if (!appState.isMousePressed) return;

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
    },
    4,
);

/**
 * @description Push the actual stroke state data to the drawn
 * stroke state then clear the actualStroke state
 */
export function handleMouseUp(canvas: HTMLCanvasElement) {
    // clear the pointer ids in the state
    appState.touchesInTheScreen.clear();

    // update the isMousePressed app state
    appState.isMousePressed = false;

    // if there is no point in the actual stroke do nothing
    if (appState.actualStroke.points.length === 0) return;

    // if the stoke does not appear on the canvas don't draw it
    let doesAppearInTheCanvas = false;
    const canvasBox = canvas.getBoundingClientRect();
    const actualPoints = appState.actualStroke.points;
    for (let index = 0; index < actualPoints.length; index++) {
        if (doesAppearInTheCanvas) break;
        const [pointX, pointY] = actualPoints[index];
        const { width, height } = canvasBox;
        if (pointX > 0 && pointX < width && pointY > 0 && pointY < height)
            doesAppearInTheCanvas = true;
    }
    if (!doesAppearInTheCanvas) {
        appState.actualStroke.points = [];
        return;
    }

    appState.drawnStrokes.push({ ...appState.actualStroke });
    appState.actualStroke.points = [];
}

/**
 * @description Save the image contained in the canvas as png image
 */
export function saveToPng(canvas: HTMLCanvasElement | null) {
    if (!canvas) return;

    // create a png blop object from the image contained in the canvas
    canvas.toBlob((blop) => {
        if (!blop) return;

        // create an url that point to the blop object
        const url = URL.createObjectURL(blop);

        // create a link that point to the url and click it to
        // download the blop object
        const link = document.createElement('a');
        link.href = url;
        link.download = 'dessin.png';
        link.click();
    }, 'image/png');
}
