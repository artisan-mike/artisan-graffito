'use client';

import { useEffect, useRef } from 'react';
import rough from 'roughjs';

export function LogoHeader() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const rc = rough.canvas(canvas);

        const { width, height } = canvas.getBoundingClientRect();
        canvas.width = width * 2;
        canvas.height = height * 2;
        canvas.getContext('2d')?.scale(2, 2);

        rc.curve(
            [
                [20, 80],
                [200, 40],
                [210, 45],
                [40, 180],
                [100, 20],
                [230, 145],
                [20, 80],
            ],
            { fill: 'yellow', stroke: 'black' },
        );
    });

    return (
        <h1 className="relative m-auto mt-3 mb-8 w-fit text-center text-[5rem]!">
            <span className="text-text-strong relative z-10">Graffito</span>
            <canvas
                ref={canvasRef}
                className="absolute -top-5 -left-5 h-9 w-9 bg-transparent"
            ></canvas>
        </h1>
    );
}
