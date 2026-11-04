export type Point = [number, number];

export type Stroke = {
    type: 'curve';
    strokeWidth: number;
    color: string;
    points: Point[];
};

export interface AppState {
    actualStroke: Stroke;
    drawnStrokes: Stroke[];
}
