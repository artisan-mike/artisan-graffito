export type Point = [number, number];

export type fillStyle = 'hachure' | 'solid' | 'cross-hatch' | 'zigzag';

export type Stroke = {
    type: 'curve';
    strokeWidth: number;
    color: string;
    fillColor: string;
    fillStyle: fillStyle;
    points: Point[];
};

export interface AppState {
    // contains the points that the user are drawing
    actualStroke: Stroke;
    // contains the strokes that the user has drawn
    drawnStrokes: Stroke[];
    // number of strokes to prevent from diplaying
    historyIndex: number;
    // track the pressing state
    isMousePressed: boolean;
}
