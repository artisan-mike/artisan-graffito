import { appState } from '@/store/app_state';

export function handleUndoClick() {
    // if there is no stroke in the app state, do nothing
    if (appState.drawnStrokes.length === 0) return;

    // if the number of drawn strokes are equal to the number of history
    // index, do nothing
    if (appState.drawnStrokes.length === appState.historyIndex) return;

    // increment history index by one to undo
    appState.historyIndex = appState.historyIndex + 1;
}

export function handleRedoClick() {
    // if the historyIndex is 0, do nothing
    if (appState.historyIndex === 0) return;

    // decrement the historyIndex number
    appState.historyIndex = appState.historyIndex - 1;
}
