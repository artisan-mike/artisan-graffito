import { proxy } from 'valtio';

import { AppState } from './type';

export const appState = proxy<AppState>({
    actualStroke: { strokeWidth: 3, color: 'green', points: [], type: 'curve' },
    drawnStrokes: [],
});
