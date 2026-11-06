'use client';

import { DownloadIcon } from '@phosphor-icons/react';
import { cn } from 'cn';
import { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { Options } from 'roughjs/bin/core';
import { useSnapshot } from 'valtio';

import {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    saveToPng,
} from '@/lib/canvas_handlers';
import { appState } from '@/store/app_state';
import { HEIGHT, WIDTH } from '@/store/constant_datas';
import { AppState, Point } from '@/store/type';

import { Button } from '../sharables/Button';

interface CanvasProps extends React.ComponentProps<'div'> {}

export function Canvas({ className, ...rest }: CanvasProps) {
    // contains the rendering canvas element and the corresponding rc
    // used for redering the strokes in app state
    const renderingCanvasRef = useRef<HTMLCanvasElement>(null);
    const renderingRcRef = useRef<RoughCanvas | null>(null);
    // contains the drawing canvas elemet and the correspoind rc
    // used for drawing the points in the actualStrokes app state
    const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
    const drawingRcRef = useRef<RoughCanvas | null>(null);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const { actualStroke, drawnStrokes, historyIndex } = useSnapshot(appState);

    const defaultStrokeOption = useRef<Options>({
        hachureGap: 8,
        seed: 7,
        roughness: 0.5,
        bowing: 0,
        preserveVertices: true,
        simplification: 0.5,
        hachureAngle: 45,
        fillWeight: 1,
    });

    // initialize the rcs (RoughCavas) on the first render
    useEffect(() => {
        if (!renderingCanvasRef.current) return;
        if (!drawingCanvasRef.current) return;
        drawingRcRef.current = rough.canvas(drawingCanvasRef.current);
        renderingRcRef.current = rough.canvas(renderingCanvasRef.current);

        // get state form local storage if there is any
        const localData = localStorage.getItem('appState');
        if (localData) {
            const parsedLocalData = JSON.parse(localData) as AppState;
            appState.actualStroke = parsedLocalData.actualStroke;
            appState.drawnStrokes = parsedLocalData.drawnStrokes;
            appState.historyIndex = parsedLocalData.historyIndex;
        }
    }, []);

    // draw the strokes in the actual strokes state whenever it changes
    useEffect(() => {
        if (!drawingRcRef.current) return;
        if (!drawingCanvasRef.current) return;
        const roughCanvas = drawingRcRef.current;
        const canvas = drawingCanvasRef.current;
        // quadruple the pixel density of the canva
        canvas.width = WIDTH * 2;
        canvas.height = HEIGHT * 2;
        canvas.getContext('2d')?.scale(2, 2);

        const actualPoints = Array.from(appState.actualStroke.points);

        if (actualStroke.points.length > 0) {
            roughCanvas.curve(actualPoints, {
                strokeWidth: actualStroke.strokeWidth,
                fill: actualStroke.fillColor,
                fillStyle: actualStroke.fillStyle,
                stroke:
                    actualStroke.strokeWidth === 0
                        ? 'none'
                        : actualStroke.color,
                ...defaultStrokeOption.current,
            });
        }

        return () => {
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [actualStroke, defaultStrokeOption]);

    // render the strokes in the drawn strokes whenever it changes
    useEffect(() => {
        if (!renderingRcRef.current) return;
        const roughCanvas = renderingRcRef.current;
        if (!renderingCanvasRef.current) return;
        const canvas = renderingCanvasRef.current;
        // quadruple the pixel density of the canva
        canvas.width = WIDTH * 2;
        canvas.height = HEIGHT * 2;
        canvas.getContext('2d')?.scale(2, 2);

        const ctx = canvas.getContext('2d');
        if (ctx) {
            // clear the canvas before rendering the drawn strokes
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // create a white bg in the canvas
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        drawnStrokes.forEach((drawnStroke, index) => {
            // if the drawn stroke index is greater that the drawnStroke state
            //  length minus the history index, skip drawing it
            if (index >= drawnStrokes.length - historyIndex) return;

            // roughCanvas will mutate the passed points so we need to create
            // a copy of the state to avoid infinite loop
            let points: Point[] = drawnStroke.points.map((point) => [...point]);
            roughCanvas.curve(points, {
                strokeWidth: drawnStroke.strokeWidth,
                fill: drawnStroke.fillColor,
                fillStyle: drawnStroke.fillStyle,
                stroke:
                    drawnStroke.strokeWidth === 0 ? 'none' : drawnStroke.color,
                ...defaultStrokeOption.current,
            });
        });

        // add the drawn strokes to the local storage after each rendering
        localStorage.setItem('appState', JSON.stringify(appState));

        return () => {
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [drawnStrokes, historyIndex]);

    return (
        <div className="relative m-auto max-w-[80rem] bg-red-100">
            <div className="w-full overflow-x-scroll">
                <div
                    className={cn(
                        'relative m-auto w-fit bg-red-500 ',
                        className,
                    )}
                    {...rest}
                >
                    <canvas
                        ref={drawingCanvasRef}
                        onMouseMove={(e) => {
                            handleMouseMove(e, isMousePressed);
                        }}
                        onMouseDown={(e) => {
                            setIsMousePressed(true);
                            handleMouseDown(e);
                        }}
                        onMouseUp={() => {
                            setIsMousePressed(false);
                            handleMouseUp();
                        }}
                        onMouseLeave={() => {
                            setIsMousePressed(false);
                        }}

                        className="border-text-strong absolute top-0 left-1/2 z-10 -translate-x-1/2 border-2"
                        style={{ width: WIDTH, height: HEIGHT }}
                    ></canvas>
                    <canvas
                        ref={renderingCanvasRef}
                        className="border-text-strong border-2"
                        style={{ width: WIDTH, height: HEIGHT }}
                    ></canvas>
                </div>
            </div>
            <Button
                onClick={() => {
                    saveToPng(renderingCanvasRef.current);
                }}
                className="absolute -top-3 w-9 -translate-y-full"
            >
                <DownloadIcon className="text-5xl" />
                Enregistrer l'image
            </Button>
        </div>
    );
}
