import { appState } from '@/store/app_state';

/**
 * @description Assign the clicked color to the actualStroke state fill color
 */
export function handleFillPick(color: string) {
    appState.actualStroke.fillColor = color;
}

/**
 * @description Assign the clicked color to the actualStroke state stroke color
 */
export function handleStrokePick(color: string) {
    appState.actualStroke.color = color;
}
