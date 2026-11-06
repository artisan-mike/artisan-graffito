import { appState } from '@/store/app_state';

/**
 * @description Undo the latest change in the drawn strokes
 * by increasing the history index state by one
 */
export function handleUndoClick() {
    console.log('firing button');

    // if there is no stroke in the app state, do nothing
    if (appState.drawnStrokes.length === 0) return;
    console.log(appState.drawnStrokes.length);

    // if the number of drawn strokes are equal to the number of history
    // index, do nothing
    if (appState.drawnStrokes.length === appState.historyIndex) return;

    // increment history index by one to undo
    appState.historyIndex = appState.historyIndex + 1;
    console.log(appState.historyIndex);

    console.log('finished execution');
}

/**
 * @description Redo the previous change if any by decreasing
 * the history index state by one
 */
export function handleRedoClick() {
    // if the historyIndex is 0, do nothing
    if (appState.historyIndex === 0) return;

    // decrement the historyIndex number
    appState.historyIndex = appState.historyIndex - 1;
}

/**
 * @description reset the drawing board entirely by setting history index to
 * drawn strokes length plus one, the user can still undo the reset if it
 * is not already overwriten
 */
export function handleResetClick() {
    appState.historyIndex = appState.drawnStrokes.length;
}

/**
 * @description Reload all undoaed changes in app state, can be used to used
 * to revert an accidental reset
 */
export function handleReloadClick() {
    appState.historyIndex = 0;
}
