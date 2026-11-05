import { appState } from '@/store/app_state';
import { fillStyle } from '@/store/type';

/**
 * @description update the fill style in the actualStroke app state
 */
export function handleFillStylePick(style: fillStyle) {
    appState.actualStroke.fillStyle = style;
}
