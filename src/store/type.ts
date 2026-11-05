export type Point = [number, number];

export type fillStyle = 'hachure' | 'solid' | 'cross-hatch ' | 'dots';

export type Stroke = {
    type: 'curve';
    strokeWidth: number;
    color: string;
    fillColor: string;
    points: Point[];
};

export interface AppState {
    // contains the points that the user are drawing
    actualStroke: Stroke;
    // contains the strokes that the user has drawn
    drawnStrokes: Stroke[];
    // number of strokes to prevent from diplaying
    historyIndex: number;
}
