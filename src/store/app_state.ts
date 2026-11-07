import { proxy } from 'valtio';

import { AppState } from './type';

export const appState = proxy<AppState>({
    actualStroke: {
        strokeWidth: 3,
        color: 'black',
        fillColor: 'yellow',
        fillStyle: 'hachure',
        type: 'curve',
        points: [],
    },
    drawnStrokes: [],
    historyIndex: 0,
    isMousePressed: false,
    touchesInTheScreen: new Set(),
});
