import { appState } from '@/store/app_state';

/**
 * @description When the range change, update the
 * stroke width in the actualStroke state
 */
export function handleRangeChange(value: number) {
    appState.actualStroke.strokeWidth = value;
}
