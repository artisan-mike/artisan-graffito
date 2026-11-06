/**
 * @fileoverview contains utility functions that resolve
 * a specific prolem logic
 */

/**
 * @description Calculate the distance between two points
 */
export function calculatePointsDistance(
    firstCords: [x: number, y: number],
    secondCords: [x: number, y: number],
) {
    const xDistance = Math.abs(firstCords[0] - secondCords[0]);
    const yDistance = Math.abs(firstCords[1] - secondCords[1]);

    return xDistance + yDistance;
}

/**
 * @description Allow a function ro run for a maximum of times per secondes
 */
export function throttle<T extends unknown[]>(
    func: (...args: T) => void,
    delay: number,
) {
    let lastCall = 0;
    return function (...args: T) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            func(...args);
            lastCall = now;
        }
    };
}

/**
 * @description Calculate the mouse position on the canvas
 */
export function calculateMousePositionOnCanvas(
    canvas: HTMLCanvasElement,
    ev: MouseEvent,
) {
    const rect = canvas.getBoundingClientRect();

    // calculate the actual point position on the canvas element
    const newX = ev.clientX - rect.left;
    const newY = ev.clientY - rect.top;

    return { newX, newY };
}
