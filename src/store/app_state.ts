import { proxy } from 'valtio';

import { AppState } from './type';

export const appState = proxy<AppState>({
    actualStroke: {
        strokeWidth: 3,
        color: 'black',
        fillColor: 'yellow',
        type: 'curve',
        points: [],
    },
    drawnStrokes: [],
    historyIndex: 0,
});
