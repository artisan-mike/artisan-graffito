'use client';

import { cn } from 'cn';
import { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';
import { RoughCanvas } from 'roughjs/bin/canvas';
import { useSnapshot } from 'valtio';

import {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
} from '@/lib/handlers';
import { appState } from '@/store/appState';

interface CanvasProps extends React.ComponentProps<'canvas'> {}

export function Canvas({ className, ...rest }: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const roughCanvasRef = useRef<RoughCanvas | null>(null);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const { actualStroke, drawnStrokes } = useSnapshot(appState);

    // initialize roughCanvas on the first render
    useEffect(() => {
        if (!canvasRef.current) return;
        roughCanvasRef.current = rough.canvas(canvasRef.current);
    }, []);

    // draw the strokes in the actual strokes state whenever it changes
    useEffect(() => {
        if (!roughCanvasRef.current) return;
        const roughCanvas = roughCanvasRef.current;
        const actualPoints = Array.from(appState.actualStroke.points);

        if (actualStroke.points.length > 0) {
            roughCanvas.curve(actualPoints, {
                strokeWidth: actualStroke.strokeWidth,
                fill: 'none',
                seed: 1,
                roughness: 0,
                bowing: 0,
                preserveVertices: true,
                simplification: 0.5,
            });
        }
    }, [actualStroke]);

    // draw the strokes in the drawn strokes whenever it changes
    useEffect(() => {
        if (!roughCanvasRef.current) return;
        const roughCanvas = roughCanvasRef.current;
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;

        // clear the canvas before drawing the drawn strokes
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);

        const drawnStrokes = Array.from(appState.drawnStrokes);
        drawnStrokes.map((drawnStroke) => {
            roughCanvas.curve(drawnStroke.points, {
                strokeWidth: drawnStroke.strokeWidth,
                fill: 'green',
                fillStyle: 'solid',
                seed: 1,
                roughness: 0,
                bowing: 0,
                preserveVertices: true,
                simplification: 0.5,
            });
        });

        return () => {
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [drawnStrokes]);

    return (
        <canvas
            ref={canvasRef}
            width={700}
            height={700}

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
            className={cn(
                'border-2 border-text-strong bg-white m-auto',
                className,
            )}
            {...rest}
        ></canvas>
    );
}
